import {describe, expect, it,vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {mockuser} from "../data/TestUserData.ts";
import SecurityContext from "../../src/context/SecurityContext.ts";
import {ProfilePage} from "../../src/pages/ProfilePage.tsx";

vi.mock('axios')

vi.mock('../../src/hooks/usePlatformUser.tsx', () => ({
    usePlatformUser: () => ({
        platformUser: {
            biography: 'Test biography'
        }
    })
}));

describe('ProfilePage', () => {
    it("renders profile page of another user without any editing options succesfully", async () => {
        //Arrange
        const queryClient = new QueryClient();
        const searchedUser = "anotherUser";
        const mockSecurityContextValue = {
            isInitialised: true,
            isAuthenticated: () => true,
            loggedInUser: mockuser,
            login: vi.fn(),
            logout: vi.fn(),
        };
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <SecurityContext.Provider value={mockSecurityContextValue}>
                    <MemoryRouter initialEntries={[`/profile/${searchedUser}`]}>
                        <Routes>
                            <Route path="/profile/:userName"
                                   element={<ProfilePage/>}/>
                        </Routes>
                    </MemoryRouter>
                </SecurityContext.Provider>
            </QueryClientProvider>
        );

        //Assert
        await waitFor(() => {
            expect(screen.queryByTestId("preference-edit-button")).not.toBeInTheDocument();
            expect(screen.queryByTestId("friend-view-button")).not.toBeInTheDocument();
        });
    });

    it("renders profile page of the current user with editing options succesfully", async () => {
        //Arrange
        const queryClient = new QueryClient();
        const mockSecurityContextValue = {
            isInitialised: true,
            isAuthenticated: () => true,
            loggedInUser: mockuser,
            login: vi.fn(),
            logout: vi.fn(),
        };
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <SecurityContext.Provider value={mockSecurityContextValue}>
                    <MemoryRouter initialEntries={[`/profile/${mockuser.username}`]}>
                        <Routes>
                            <Route path="/profile/:userName"
                                   element={<ProfilePage/>}/>
                        </Routes>
                    </MemoryRouter>
                </SecurityContext.Provider>
            </QueryClientProvider>
        );
        //Assert
        await waitFor(() => {
            expect(screen.getByTestId("preference-edit-button")).toBeInTheDocument();
            expect(screen.getByTestId("friend-view-button")).toBeInTheDocument();
        });
    });
})