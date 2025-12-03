import {CompactGame} from "../../src/models/Game";

export const compactGame1: CompactGame = {
    id: "1",
    name: "Tic Tac Toe",
    icon: "icon.png",
    genre: "Puzzle",
    url: "http://localhost:1234"
}

export const compactGame2: CompactGame = {
    id: "2",
    name: "Go",
    icon: "GoIcon.png",
    genre: "Strategy",
    url: "http://localhost:1235"
}
export const compactGame3: CompactGame = {
    id: "3",
    name: "Chess",
    icon: "ChessIcon.png",
    genre: "Strategy",
    url: "http://localhost:1236"
}

export const compactGameList : CompactGame[] =[compactGame1,compactGame2,compactGame3];
export const emptyCompactGameList: CompactGame[] = [];