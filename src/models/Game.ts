export type Game = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    icon: string;
}

export type CompactGame = Omit<Game,  "description" | "price" | "image">