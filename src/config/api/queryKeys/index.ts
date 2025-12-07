export const gamesQueryKey={
    all:["gameList"] as const,
    currentGame: (gameId: string) => ["currentGame", gameId] as const,
}

export const friendsQueryKey={
    all:["friends"] as const,
}