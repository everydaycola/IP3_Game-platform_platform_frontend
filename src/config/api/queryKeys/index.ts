export const gamesQueryKey={
    all:["gameList"] as const,
    currentGame: (gameId: string) => ["currentGame", gameId] as const,
}

export const favoriteGamesQueryKey={
    all:["favoriteGames"] as const,
    currentGame: (gameId: string) => ["currentFavorite", gameId] as const,
}

export const userDataQueryKey={
    current:["currentUserData"] as const,
}

export const friendsQueryKey={
    all:["friends"] as const,
}

export const friendRequestQueryKey={
    all:["friend-requests"] as const,
}
