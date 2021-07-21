import {User} from "./User";
import {House} from "./House";

export interface RentInfo {
    id: number | null | undefined,
    tenant: User,
    house: House,
    enterDate: Date,
    leaveDate: Date,
    hasReview: boolean
}