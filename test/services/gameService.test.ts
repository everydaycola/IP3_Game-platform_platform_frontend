import {describe, it, expect, vi, type Mocked} from "vitest";
import axios, {type AxiosStatic} from "axios";
import {checkGameReachable, findAllGames, getGame} from "../../src/services/gameService.ts";

vi.mock("axios");

describe("GameService", () => {

    describe("CheckGameReachable", () => {
        it("returns true when game URL is reachable", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.get.mockResolvedValueOnce({status: 200});
            //Act
            const result = await checkGameReachable("https://example.com/game");
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("https://example.com/game");
            expect(result).toBe(true);
        });

        it("returns false when axios throws an error", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
            //act
            const result = await checkGameReachable("https://example.com/game");
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("https://example.com/game");
            expect(result).toBe(false);
        });
    })

    describe("getgame", () => {
        it("fetches a single game by ID", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockGame = {id: "123", name: "Test Game"};
            mockedAxios.get.mockResolvedValueOnce({data: mockGame});
            //Act
            const game = await getGame("123");
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/games/123");
            expect(game).toEqual(mockGame);
        });
    })

    describe("FindAllGames", () => {

    it("fetches a list of games", async () => {
        //Arrange
        const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
        const mockGames = [
            {id: "1", name: "Game A"},
            {id: "2", name: "Game B"}
        ];
        mockedAxios.get.mockResolvedValueOnce({data: mockGames});
        //Act
        const games = await findAllGames();
        //Assert
        expect(mockedAxios.get).toHaveBeenCalledWith("/games");
        expect(games).toEqual(mockGames);
    });
    })
});
