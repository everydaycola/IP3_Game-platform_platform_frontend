export const gamesQueryKey={
    all:["gameList"] as const,
    currentGame: (gameId: string) => ["currentGame", gameId] as const,
}

export const favoriteGamesQueryKey={
    all:["favoriteGames"] as const,
    currentGame: (gameId: string) => ["currentFavorite", gameId] as const,
}