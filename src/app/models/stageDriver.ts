import { Car } from "./car";

export interface StageDriver {
    nickname: string
    bestTime: number
    position: number
    car: Car
}