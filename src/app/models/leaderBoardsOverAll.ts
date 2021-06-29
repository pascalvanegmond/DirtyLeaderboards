import { LeaderBoard } from "./leaderBoard";

export interface LeaderBoardsOverAll {
    lastUpdate: string
    offset: number
    times: LeaderBoard[]
    total: number
}