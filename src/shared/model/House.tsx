import {User} from "./User";
import {HouseFile} from "./HouseFile";

export interface House {
    id: number,
    name: string,
    room: number | null,
    capacity: number | null,
    style: string,
    address: string,
    image: string,
    photos: HouseFile[],
    rank: number,
    description: string,
    owner: User,
    rentStatus: number
}