import {describe, expect, it, type Mocked, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import axios, {type AxiosStatic} from "axios";
import {compactGameList, emptyCompactGameList} from "../data/TestGames.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GamesPage} from "../../src/pages/GamesPage.tsx";
import {ErrorBoundary} from "react-error-boundary";

vi.mock('axios')

describe('GamesPage', () => {
    it("renders GamesPage when fetches are successful", async () => {
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce({data: compactGameList});

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GamesPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            compactGameList.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
            })
        });
    });

    it("renders Found no Games fallback when a list of length 0 is provided.", async () => {
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce({data: emptyCompactGameList});

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GamesPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            expect(screen.getByText("Geen games gevonden")).toBeInTheDocument();
        });
    });

    it("throws error when the endpoint is not accessible", async () => {
        const queryClient = new QueryClient({
            defaultOptions: {queries: {retry: false}}
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={
                            <ErrorBoundary fallback={<div>Error!</div>}>
                                <GamesPage/>
                            </ErrorBoundary>
                        }/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Error!")).toBeInTheDocument();
        });
    });

})