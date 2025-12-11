import { describe, expect, it, beforeEach, vi, type Mocked, type Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GamePage } from "../../src/pages/GamePage";
import axios, { type AxiosStatic } from "axios";
import {compactGame1, compactGame4, favoriteGame1} from "../data/TestGames";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

vi.mock("axios");
vi.mock("../../src/stores/securityStore", () => {
    return {
        useSecurityStore: vi.fn(),
    };
});
import { useSecurityStore } from "../../src/stores/securityStore";

function setSecurityStore(state: any) {
    (useSecurityStore as unknown as Mock).mockImplementation(selector =>
        selector(state)
    );
}

describe("GamePage", () => {
    let mockedAxios: Mocked<AxiosStatic>;

    beforeEach(() => {
        vi.clearAllMocks();
        mockedAxios = axios as unknown as Mocked<AxiosStatic>;
    });

    it("renders gamepage with valid IFrame when fetches are successful (authenticated user)", async () => {
        const gameId = compactGame1.id;
        const queryClient = new QueryClient();

        // Logged-in user
        setSecurityStore({
            isInitialised: true,
            loggedInUser: { username: "player1" },
            isAuthenticated: () => true,
        });

        // Mock game fetch and favorite check
        mockedAxios.get
            .mockResolvedValueOnce({ data: compactGame1 }) // GET /games/:id
            .mockResolvedValueOnce({data : favoriteGame1}); // GET /games/favorite/:id → returns 200 → isFavorite=true

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(compactGame1.name)).toBeInTheDocument();
            const iframe = container.querySelector("iframe");
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute("src", compactGame1.url);
        });
    });

    it("renders achievements + IFrame when game has achievements (authenticated user)", async () => {
        const gameId = compactGame4.id;
        const queryClient = new QueryClient();

        setSecurityStore({
            isInitialised: true,
            loggedInUser: { username: "player1" },
            isAuthenticated: () => true,
        });

        mockedAxios.get
            .mockResolvedValueOnce({ data: compactGame4 }) // GET /games/:id
            .mockResolvedValueOnce({data : favoriteGame1}); // GET /games/favorite/:id → returns 200 → isFavorite=true

        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(compactGame4.name)).toBeInTheDocument();
            const iframe = container.querySelector("iframe");
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute("src", compactGame4.url);
            expect(screen.getByTestId("achievement-card")).toBeInTheDocument();
        });
    });

    it("renders fallback when no game url was set (authenticated user)", async () => {
        const gameId = compactGame1.id;
        const queryClient = new QueryClient();

        setSecurityStore({
            isInitialised: true,
            loggedInUser: { username: "player1" },
            isAuthenticated: () => true,
        });

        mockedAxios.get
            .mockResolvedValueOnce({data: compactGame1 }) // GET /games/:id
            .mockResolvedValueOnce({data : favoriteGame1}); // GET /games/favorite/:id → 200

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={<GamePage />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Ohnee...")).toBeInTheDocument();
        });
    });

    it("throws error when fetched without a valid gameId (user not authenticated)", async () => {
        const gameId = "6789"; // invalid
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

        setSecurityStore({
            isInitialised: true,
            loggedInUser: undefined,
            isAuthenticated: () => false,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route
                            path="/games/:gameId"
                            element={
                                <ErrorBoundary fallback={<div>Error!</div>}>
                                    <GamePage />
                                </ErrorBoundary>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Error!")).toBeInTheDocument();
        });
    });

    it("throws an error when fetching fails (authenticated user)", async () => {
        const gameId = compactGame1.id;
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

        setSecurityStore({
            isInitialised: true,
            loggedInUser: { username: "player1" },
            isAuthenticated: () => true,
        });

        mockedAxios.get
            .mockRejectedValueOnce(new Error("Network error")) // GET /games/:id
            .mockResolvedValueOnce({}); // GET /games/favorite/:id (won't matter)

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route
                            path="/games/:gameId"
                            element={
                                <ErrorBoundary fallback={<div>Error!</div>}>
                                    <GamePage />
                                </ErrorBoundary>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Error!")).toBeInTheDocument();
        });
    });
});
