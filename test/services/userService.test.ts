import {describe, it, expect, vi, type Mocked} from "vitest";
import axios, {type AxiosStatic} from "axios";
import {getPlatformUserData} from "../../src/services/userService.ts";
import type {User} from "../../src/models/auth/user.ts";

vi.mock("axios");

describe("userService", () => {
    describe("", () => {
        it("fetches platform user data successfully", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockUser: User = {
                name: "Test User",
                email: "test@example.com",
                roles:[]
            };
            mockedAxios.get.mockResolvedValueOnce({data: mockUser});
            //Act
            const result = await getPlatformUserData();
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/user");
            expect(result).toEqual(mockUser);
        });

        it("throws when axios fails", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));
            //Act
            await expect(getPlatformUserData()).rejects.toThrow("Failed to fetch");
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/user");
        });
    })
});
