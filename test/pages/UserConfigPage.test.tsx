import { describe, expect, it, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserConfigPage } from "../../src/pages/UserConfigPage";
import type { User } from "../../src/models/auth/user";
vi.mock("../../src/stores/securityStore", () => ({
    useSecurityStore: vi.fn(),
}));
import { useSecurityStore } from "../../src/stores/securityStore";

function setSecurityStore(state: any) {
    (useSecurityStore as unknown as Mock).mockImplementation(selector =>
        selector(state)
    );
}

describe("UserConfigPage", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });


    it("does not redirect when not initialised", () => {
        //Arrange
        setSecurityStore({
            isInitialised: false,
            loggedInUser: undefined,
            isAuthenticated: () => false,
            login: vi.fn(),
            logout: vi.fn(),
        });
        //Act
        render(
            <MemoryRouter initialEntries={["/user-config"]}>
                <Routes>
                    <Route path="/user-config" element={<UserConfigPage />} />
                    <Route path="/games" element={<div>Games page</div>} />
                </Routes>
            </MemoryRouter>
        );
        //Assert
        expect(screen.queryByText("Games page")).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /inloggen/i })).toBeInTheDocument();
    });

    it("redirects to /games when initialised and not authenticated", () => {
        //Arrange
        setSecurityStore({
            isInitialised: true,
            loggedInUser: undefined,
            isAuthenticated: () => false,
            login: vi.fn(),
            logout: vi.fn(),
        });
        //Act
        render(
            <MemoryRouter initialEntries={["/user-config"]}>
                <Routes>
                    <Route path="/user-config" element={<UserConfigPage />} />
                    <Route path="/games" element={<div>Games page</div>} />
                </Routes>
            </MemoryRouter>
        );
        //Assert
        expect(screen.getByText("Games page")).toBeInTheDocument();
    });

    it("shows UserConfigPage when initialised and authenticated", () => {
        //Arrange
        const user: User = {
            name: "testUser",
            firstName: "testUser",
            lastName: "test",
            username: "testUserName",
            email: "test@test.com",
            roles: ["user"],
        };

        setSecurityStore({
            isInitialised: true,
            loggedInUser: user,
            isAuthenticated: () => true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        //Act
        render(
            <MemoryRouter initialEntries={["/user-config"]}>
                <Routes>
                    <Route path="/user-config" element={<UserConfigPage />} />
                    <Route path="/games" element={<div>Games page</div>} />
                </Routes>
            </MemoryRouter>
        );
        //Assert
        expect(screen.getByText("Uw voorkeuren beheren")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /uitloggen/i })).toBeInTheDocument();
        expect(screen.getByText("testUserName")).toBeInTheDocument();
        expect(screen.getByText("Email: test@test.com")).toBeInTheDocument();
    });
});
