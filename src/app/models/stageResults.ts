import { Stage } from "./stage";
import { StageDriver } from "./stageDriver";

export interface StageResults {
    lastUpdate: string
    offset: number
    bestDriver: StageDriver
    leastDriver: StageDriver
    total: number
    totalByCar: number
    stage: Stage
}