import type {Achievement} from "./Achievement.ts";

const achievement1: Achievement = {
    id:"111",
    name:"Let's go",
    description:"Start a game of go!"
}

const achievement2:Achievement ={
    id:"222",
    name:"First contact",
    description:"Make your first contact!"
}
const achievement3:Achievement ={
    id:"333",
    name:"Yet another achievement",
    description:"You have achieved! (something)"
}

export const achievementList = [achievement1, achievement2,achievement3];
