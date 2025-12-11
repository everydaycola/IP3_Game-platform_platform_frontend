vi.mock("../../src/stores/securityStore", () => {
    return {
        useSecurityStore: vi.fn(),
    };
});
import {describe, it, expect, beforeEach, vi, type Mock} from "vitest";
import { useSecurityStore } from "../../src/stores/securityStore";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfilePage } from "../../src/pages/ProfilePage";
import { mockuser } from "../data/TestUserData";


function setSecurityStore(state: any) {
    (useSecurityStore as unknown as Mock).mockImplementation(selector =>
        selector(state)
    );
}

vi.mock('../../src/hooks/usePlatformUser.tsx', () => ({
    usePlatformUser: () => ({
        platformUser: { biography: "Test biography" },
    }),
}));

describe("ProfilePage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders profile page of another user without editing options", async () => {
       //Arrange
        const queryClient = new QueryClient();
        setSecurityStore({
            isInitialised: true,
            loggedInUser: undefined,
            isAuthenticated: () => false,
        });
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={["/profile/anotherUser"]}>
                    <Routes>
                        <Route path="/profile/:userName" element={<ProfilePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        //Assert
        expect(screen.queryByTestId("preference-edit-button")).not.toBeInTheDocument();
        expect(screen.queryByTestId("friend-view-button")).not.toBeInTheDocument();
    });

    it("renders profile page of current user with editing options", async () => {
        //Arrange
        const queryClient = new QueryClient();
        setSecurityStore({
            isInitialised: true,
            loggedInUser: mockuser,
            isAuthenticated: () => true,
        });
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/profile/${mockuser.username}`]}>
                    <Routes>
                        <Route path="/profile/:userName" element={<ProfilePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        //Assert
        expect(screen.getByTestId("preference-edit-button")).toBeInTheDocument();
        expect(screen.getByTestId("friend-view-button")).toBeInTheDocument();
    });
});
