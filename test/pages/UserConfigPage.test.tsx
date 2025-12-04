import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {UserConfigPage} from "../../src/pages/UserConfigPage.tsx";
import SecurityContext from "../../src/context/SecurityContext.ts";
import type {User} from "../../src/models/user.ts";

vi.mock('axios')

describe('UserConfig', () => {
    it("does not redirect when not initialised", () => {
        //Arrange
        //ACT
        render(
            <SecurityContext.Provider
                value={{
                    isInitialised: false,
                    isAuthenticated: () => false,
                    loggedInUser: undefined,
                    login: vi.fn(),
                    logout: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={["/user-config"]}>
                    <Routes>
                        <Route path="/user-config" element={<UserConfigPage />} />
                        <Route path="/games" element={<div>Games page</div>} />
                    </Routes>
                </MemoryRouter>
            </SecurityContext.Provider>
        );
        //Assert
        expect(screen.queryByText("Games page")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: /inloggen/i})).toBeInTheDocument();
    });

    it("redirects to /games when initialised and not authenticated", () => {
        //Arrange
        //Act
        render(
            <SecurityContext.Provider
                value={{
                    isInitialised: true,
                    isAuthenticated: () => false,
                    loggedInUser: undefined,
                    login: vi.fn(),
                    logout: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={["/user-config"]}>
                    <Routes>
                        <Route path="/user-config" element={<UserConfigPage />} />
                        <Route path="/games" element={<div>Games page</div>} />
                    </Routes>
                </MemoryRouter>
            </SecurityContext.Provider>
        );
        //Assert
        expect(screen.getByText("Games page")).toBeInTheDocument();
    });
    it("shows UserConfigPage when initialised and authenticated", () => {
        const user: User = {
            name:"testUser",
            firstName: "testUser",
            lastName: "test",
            username: "testUserName",
            email: "test@test.com",
            roles:["user"]
        };

        render(
            <SecurityContext.Provider
                value={{
                    isInitialised: true,
                    isAuthenticated: () => true,
                    loggedInUser: user,
                    login: vi.fn(),
                    logout: vi.fn(),
                }}
            >
                <MemoryRouter initialEntries={["/user-config"]}>
                    <Routes>
                        <Route path="/user-config" element={<UserConfigPage />} />
                        <Route path="/games" element={<div>Games page</div>} />
                    </Routes>
                </MemoryRouter>
            </SecurityContext.Provider>
        );

        expect(screen.getByText("Uw voorkeuren beheren")).toBeInTheDocument();
        expect(screen.getByText("testUser")).toBeInTheDocument();
        expect(screen.getByText("test@test.com")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /uitloggen/i})).toBeInTheDocument();
    });

})