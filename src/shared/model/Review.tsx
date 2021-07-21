import {User} from "./User";
import {House} from "./House";
import {RentInfo} from "./RentInfo";

export interface Review {
    id: number | null | undefined,
    user: User,
    house: House,
    postTime: Date,
    rentInfo: RentInfo,
    score: number,
    detail: string
}