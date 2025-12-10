export type Game = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    icon: string;
    genre:string;
    url:string;
}

export type CompactGame = Omit<Game,  "description" | "price" | "image">

//Todo: implement a achievement list.
