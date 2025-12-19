import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AchievementPage } from "../../src/pages/AchievementPage";
import { useGamesList } from "../../src/hooks/api/games/useGamesList.tsx";

vi.mock("../../src/hooks/api/games/useGamesList.tsx", () => ({
    useGamesList: vi.fn(),
}));
vi.mock("../../src/components/GameFullAchievementList.tsx", () => ({
    GameFullAchievementList: ({ gameName, filter }: any) => (
        <div data-testid={`game-${gameName}`}>Filter: {filter}</div>
    ),
}));

describe("AchievementPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    const mockGames = [
        {
            id: 1,
            name: "GameOne",
            achievements: [{ id: 1, name: "Achieve1" }],
        },
        {
            id: 2,
            name: "GameTwo",
            achievements: [{ id: 2, name: "Achieve2" }],
        },
        {
            id: 3,
            name: "GameThree",
            achievements: [],
        },
    ];
    it("renders the headings and filter text", () => {
        //Arrange
        (useGamesList as any).mockReturnValue({ games: [] });
        //Act
        render(<AchievementPage />);
        //Assert
        expect(screen.getByText("Achievements")).toBeInTheDocument();
        expect(
            screen.getByText(
                "After we implement a 'purchase system' users will only see achievements for games they own."
            )
        ).toBeInTheDocument();
    });

    it("renders GameFullAchievementList for games with achievements", () => {
        //Arrange
        (useGamesList as any).mockReturnValue({ games: mockGames });
        //Act
        render(<AchievementPage />);
        //Assert
        expect(screen.getByTestId("game-GameOne")).toBeInTheDocument();
        expect(screen.getByTestId("game-GameTwo")).toBeInTheDocument();
        // GameThree has no achievements, should not render
        expect(screen.queryByTestId("game-GameThree")).not.toBeInTheDocument();
    });
});
