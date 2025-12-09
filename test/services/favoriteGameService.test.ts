import {describe, it, expect, vi, type Mocked} from "vitest";
import axios, {type AxiosStatic} from "axios";

import {
    getFavoriteGames,
    isFavoriteGame,
    addFavoriteGame,
    removeFavoriteGame
} from "../../src/services/favoriteGameService";

vi.mock("axios");

describe("FavoriteGameService", () => {
    describe("getFavoriteGames", () => {
        it("fetches favorite games", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockGames = [{id: "g1"}, {id: "g2"}];
            mockedAxios.get.mockResolvedValueOnce({data: mockGames});
            //Act
            const result = await getFavoriteGames();

            expect(mockedAxios.get).toHaveBeenCalledWith("/games/favorite");
            expect(result).toEqual(mockGames);
        });
    })

    describe("isFavoriteGame", () => {
        it("returns true when game is favorite (200 OK)", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.get.mockResolvedValueOnce({status: 200});
            //Act
            const result = await isFavoriteGame("g1");

            expect(mockedAxios.get).toHaveBeenCalledWith("/games/favorite/g1");
            expect(result).toBe(true);
        });

        it("rethrows error when axios fails with non-404 status", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const error = {response: {status: 500}};
            mockedAxios.get.mockRejectedValueOnce(error);
            //Act
            //Assert
            await expect(isFavoriteGame("g1")).rejects.toEqual(error);
        });
    })

    describe("addFavoriteGame", () => {
        it("adds a game to favorites", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockGame = {id: "g1", name: "Test Game"};
            mockedAxios.post.mockResolvedValueOnce({data: mockGame});
            //Act
            const result = await addFavoriteGame("g1");
            //Assert
            expect(mockedAxios.post).toHaveBeenCalledWith("/games/favorite/g1");
            expect(result).toEqual(mockGame);
        });
    })

    describe("removeFavoriteGame", () => {
        it("removes a favorite game", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.delete.mockResolvedValueOnce({});
            //Act
            const result = await removeFavoriteGame("g1");
            //Assert
            expect(mockedAxios.delete).toHaveBeenCalledWith("/games/favorite/g1");
            expect(result).toBe(true);
        });
    })
});
