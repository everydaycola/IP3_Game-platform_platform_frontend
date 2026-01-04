import {render, screen} from "@testing-library/react";
import {describe, it, expect, vi, beforeEach} from "vitest";
import {useLobbyList} from "../../src/hooks/api/lobby/useLobbyList.tsx";
import {useGamesList} from "../../src/hooks/api/games/useGamesList.tsx";
import {useSelectionStore} from "../../src/stores/selectionStore.ts";
import {LobbyPage} from "../../src/pages/LobbyPage.tsx";

vi.mock("../../src/hooks/api/lobby/useLobbyList.tsx");
vi.mock("../../src/hooks/api/games/useGamesList.tsx");
vi.mock("../../src/stores/selectionStore.ts");
vi.mock("../../src/components/tables/LobbyTable.tsx", () => ({
    LobbyTable: ({lobbies, games}: any) => (
        <div data-testid="lobby-table">
            <span data-testid="lobbies-count">{lobbies.length}</span>
            <span data-testid="games-count">{games.length}</span>
        </div>
    )
}));

describe("LobbyPage", () => {
    const mockGames = [
        {
            id: "game1",
            name: "Game 1",
            description: "A fun action game",
            price: 0,
            image: "/images/game1.jpg",
            icon: "/icons/game1.png",
            genre: "Action",
            url: "/games/game1",
            achievements: [],
            configurableSettings: {}
        },
        {
            id: "game2",
            name: "Game 2",
            description: "A strategic puzzle game",
            price: 19.99,
            image: "/images/game2.jpg",
            icon: "/icons/game2.png",
            genre: "Strategy",
            url: "/games/game2",
            achievements: [],
            configurableSettings: {}
        },
        {
            id: "game3",
            name: "Game 3",
            description: "An immersive RPG",
            price: 59.99,
            image: "/images/game3.jpg",
            icon: "/icons/game3.png",
            genre: "RPG",
            url: "/games/game3",
            achievements: [],
            configurableSettings: {}
        },
    ];

    const mockLobbies = [
        {
            id: "1",
            gameId: "game1",
            currentGameSessionId: "session_123",
            lobbyHostId: "user_01",
            players: [],
            creationDate: new Date('2024-01-01T12:00:00Z'),
            maxPlayers: 4
        },
        {
            id: "2",
            gameId: "game2",
            currentGameSessionId: "session_456",
            lobbyHostId: "user_02",
            players: [],
            creationDate: new Date('2024-01-02T15:30:00Z'),
            maxPlayers: 8
        },
    ];

    const mockSetSelectedGameId = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useLobbyList).mockReturnValue({lobbies: mockLobbies});
        vi.mocked(useGamesList).mockReturnValue({games: mockGames});
        vi.mocked(useSelectionStore).mockReturnValue(null);
        vi.mocked(useSelectionStore).mockReturnValue(mockSetSelectedGameId);
    });

    it("renders lobby page with title", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: null, setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByRole("heading", {name: /lobbies/i})).toBeInTheDocument();
    });

    it("displays all games when no game is selected", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: null, setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByTestId("games-count")).toHaveTextContent("3");
    });

    it("filters games when a game is selected", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: "game1", setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByTestId("games-count")).toHaveTextContent("1");
    });

    it("shows 'Alles' option in game select dropdown", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: null, setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByText("Alles")).toBeInTheDocument();
    });

    it("passes lobbies to LobbyTable", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: null, setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByTestId("lobbies-count")).toHaveTextContent("2");
    });

    it("renders options card with correct title", () => {
        //arrange
        vi.mocked(useSelectionStore).mockImplementation((selector: any) =>
            selector({selectedGameId: null, setSelectedGameId: mockSetSelectedGameId})
        );
        //act
        render(<LobbyPage />);
        //assert
        expect(screen.getByRole("heading", {name: /opties/i})).toBeInTheDocument();
    });
});
