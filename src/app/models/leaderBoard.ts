import { Car } from "./car";
import { Rank } from "./rank";
import { Stage } from "./stage";

export interface LeaderBoard {
  id: string,
  nickname: string,
  bestTime: number,
  dirtRally2CarId: string,
  dirtRally2StageId: string
  createdAt: Date,
  updatedAt: Date,
  rank: Rank,
  car: Car,
  stage: Stage
}