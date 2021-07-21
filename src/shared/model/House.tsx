import {User} from "./User";

export interface House {
    id: number,
    name: string,
    room: number | null,
    capacity: number | null,
    style: string,
    address: string,
    image: string,
    rank: number,
    description: string,
    owner: User,
    rentStatus: number
}