import {describe, expect, it, type Mocked, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {GamePage} from "../../src/pages/GamePage";
import axios, {type AxiosStatic} from "axios";
import {compactGame1} from "../data/TestGames.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";

vi.mock('axios')

describe('GamePage', () => {
    it("renders gamepage with valid IFrame when fetches are successful", async () => {
        const gameId = compactGame1.id; // or whatever the id is
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce({data: compactGame1});

        const {container} = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={<GamePage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(compactGame1.name)).toBeInTheDocument();
            const iframe = container.querySelector("iframe");
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute('src', compactGame1.url);
        });
    });


    it("throws error when fetched without a valid gameId", async () => {
        const gameId = "6789";//Invalid ID.
        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={
                            <ErrorBoundary fallback={<div>Error!</div>}>
                                <GamePage/>
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

    it('throws an error when fetching game fails',async () => {
        const gameId = compactGame1.id;
        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } }
        });

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce(new Error("Network error"));

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={
                            <ErrorBoundary fallback={<div>Error!</div>}>
                                <GamePage/>
                            </ErrorBoundary>
                        }/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Error!")).toBeInTheDocument();
        });
    })

    it("renders fallback when no game url was set.", async () => {
        const gameId = compactGame1.id;
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce({
            data: { ...compactGame1, url: undefined }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games/${gameId}`]}>
                    <Routes>
                        <Route path="/games/:gameId" element={<GamePage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            //this text gets renderd in from ErrorCard inside GamePage.
            expect(screen.getByText("Ohnee...")).toBeInTheDocument();
        });
    });


})