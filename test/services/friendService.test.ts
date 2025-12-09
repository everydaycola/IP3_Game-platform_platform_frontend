import {describe, it, expect, vi, type Mocked} from "vitest";
import axios, {type AxiosStatic} from "axios";

import {
    findAllFriends,
    findAllOpenFriendRequests,
    acceptFriendRequest,
    denyFriendRequest,
    postFriendRequest,
    deleteFriend,
    getFriendRecommendations
} from "../../src/services/friendService";

vi.mock("axios");

describe("FriendService", () => {
    describe("fetches all friends", () => {
        it("fetches all friends", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockFriends = {friends: []};
            mockedAxios.get.mockResolvedValueOnce({data: mockFriends});
            //Act
            const result = await findAllFriends();
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/user/friends");
            expect(result).toEqual(mockFriends);
        });
    });

    describe("findAllOpenFriendRequest", () => {
        it("fetches all open friend requests", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockRequests = {requests: []};
            mockedAxios.get.mockResolvedValueOnce({data: mockRequests});
            //Act
            const result = await findAllOpenFriendRequests();
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/user/friends/requests");
            expect(result).toEqual(mockRequests);
        });
    })

    describe("acceptFriendRequest", () => {
        it("accepts a friend request", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockRelation = {status: "accepted"};
            mockedAxios.patch.mockResolvedValueOnce({data: mockRelation});
            //Act
            const result = await acceptFriendRequest("john");
            //Assert
            expect(mockedAxios.patch).toHaveBeenCalledWith("/user/friends/john/accept");
            expect(result).toEqual(mockRelation);
        });
    });

    describe("denyFriendRequest", () => {
        it("denies a friend request", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockRelation = {status: "denied"};
            mockedAxios.patch.mockResolvedValueOnce({data: mockRelation});
            //Act
            const result = await denyFriendRequest("john");
            //Assert
            expect(mockedAxios.patch).toHaveBeenCalledWith("/user/friends/john/deny");
            expect(result).toEqual(mockRelation);
        });
    })

    describe("postFriendRequest", () => {
        it("posts a friend request", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockFriendList = {friends: ["john"]};
            mockedAxios.post.mockResolvedValueOnce({data: mockFriendList});
            //Act
            const result = await postFriendRequest("john");
            //Assert
            expect(mockedAxios.post).toHaveBeenCalledWith("/user/friends/john");
            expect(result).toEqual(mockFriendList);
        });
    });

    describe("deleteFriend", () => {
        it("returns true when friend deletion succeeds", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            mockedAxios.delete.mockResolvedValueOnce({});
            //Act
            const result = await deleteFriend("john");
            //Assert
            expect(mockedAxios.delete).toHaveBeenCalledWith("/user/friends/john");
            expect(result).toBe(true);
        });

        it("rethrows error when deleteFriend fails with non-404 error", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const error = {response: {status: 500}};
            mockedAxios.delete.mockRejectedValueOnce(error);
            //Act
            //Assert
            await expect(deleteFriend("john")).rejects.toEqual(error);
        });
    })


    describe("getFriendRecommendations", () => {
        it("fetches recommendations without nameQuery", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockRecs = {recommendations: []};
            mockedAxios.get.mockResolvedValueOnce({data: mockRecs});
            //Act
            const result = await getFriendRecommendations();
            //Assert
            expect(mockedAxios.get).toHaveBeenCalledWith("/user/friends/recommendations?");
            expect(result).toEqual(mockRecs);
        });

        it("fetches recommendations with nameQuery", async () => {
            //Arrange
            const mockedAxios = axios as unknown as Mocked<AxiosStatic>;
            const mockRecs = {recommendations: ["alice"]};
            mockedAxios.get.mockResolvedValueOnce({data: mockRecs});
            const result = await getFriendRecommendations("ali");

            //Act
            expect(mockedAxios.get)
                .toHaveBeenCalledWith("/user/friends/recommendations?nameQuery=ali");
            //Assert
            expect(result).toEqual(mockRecs);
        });
    })
});
