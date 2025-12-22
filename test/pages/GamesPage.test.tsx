import {describe, expect, it, type Mocked, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import axios, {type AxiosStatic} from "axios";
import {compactGameList, emptyCompactGameList, emptyFavoriteGamesList, favoriteGamesList} from "../data/TestGames.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GameLibraryPage} from "../../src/pages/GameLibraryPage.tsx";
import {ErrorBoundary} from "react-error-boundary";

vi.mock('axios')

describe('GamesPage', () => {
    it("renders GamesPage when fetches are successful", async () => {
        //Arrange
        const queryClient = new QueryClient();
        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        //Mock retrieval for games
        mockedAxios.get.mockResolvedValueOnce({data: compactGameList});
        //Mock favorite retrieval.
        mockedAxios.get.mockResolvedValueOnce({data: emptyFavoriteGamesList});

        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GameLibraryPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            compactGameList.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
            });
            const notFavorites = screen.getAllByTestId('not-favorite-icon');
            expect(notFavorites).toHaveLength(3);
        });
    });

    it("renders GamesPage when fetches are successfull and favorites are marked when list is non-empty", async () => {
        //Arrange
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        //Mock retrieval for games
        mockedAxios.get.mockResolvedValueOnce({data: compactGameList});
        //Mock favorite retrieval.
        mockedAxios.get.mockResolvedValueOnce({data: favoriteGamesList});

        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GameLibraryPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            compactGameList.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
            })
            const notFavorites = screen.getAllByTestId('not-favorite-icon');
            expect(notFavorites).toHaveLength(2);
            const favorites = screen.getAllByTestId('favorite-icon');
            expect(favorites).toHaveLength(1);
        });
    });

    it("renders GamesPage when fetches are successfull and favorites are marked when list is empty", async () => {
        //Arrange
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        //Mock retrieval for games
        mockedAxios.get.mockResolvedValueOnce({data: compactGameList});
        //Mock favorite retrieval.
        mockedAxios.get.mockResolvedValueOnce({data: emptyFavoriteGamesList});

        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GameLibraryPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            compactGameList.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument();
            })
            const notFavorites = screen.getAllByTestId('not-favorite-icon');
            expect(notFavorites).toHaveLength(3);
        });
    });

    it("renders Found no Games fallback when a list of length 0 is provided.", async () => {
        //Arragnge
        const queryClient = new QueryClient();

        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        mockedAxios.get.mockResolvedValueOnce({data: emptyCompactGameList});
        mockedAxios.get.mockResolvedValueOnce({data: emptyFavoriteGamesList});

        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={<GameLibraryPage/>}/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );

        //Assert
        await waitFor(() => {
            expect(screen.getByText("Games")).toBeInTheDocument();
            expect(screen.getByText("Geen games gevonden")).toBeInTheDocument();
        });
    });

    it("throws error when the endpoint is not accessible", async () => {
        //Arrange
        const queryClient = new QueryClient({
            defaultOptions: {queries: {retry: false}}
        });
        //Act
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/games`]}>
                    <Routes>
                        <Route path="/games" element={
                            <ErrorBoundary fallback={<div>Error!</div>}>
                                <GameLibraryPage/>
                            </ErrorBoundary>
                        }/>
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        //Assert
        await waitFor(() => {
            expect(screen.getByText("Error!")).toBeInTheDocument();
        });
    });

})