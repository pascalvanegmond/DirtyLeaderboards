import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LeaderBoards } from '../models/leaderBoards';
import { LeaderBoardsOverAll } from '../models/leaderBoardsOverAll';
import { StageResults } from '../models/stageResults';
import { StageDriver } from '../models/stageDriver';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {
  baseUrl = "http://localhost:4200/api/"

  constructor(
    private http: HttpClient
  ) { }

  GetLeaderBoardsForUser(user: string): Observable<LeaderBoards> {
    return this.http.get<LeaderBoards>(
      this.baseUrl + "dirt_rally2/leaderboards/best_times_by_nickname?nickname="+ user
      )
      .pipe(
        catchError(this.handleError<LeaderBoards>('GetLeaderBoardsForUser', null))
      )
  }

  GetLeaderBoardsFromStage(stageId: string): Observable<LeaderBoardsOverAll> {
    return this.http.get<LeaderBoardsOverAll>(
      this.baseUrl + "dirt_rally2/leaderboards?stage_id="+ stageId
      )
      .pipe(
        catchError(this.handleError<LeaderBoardsOverAll>('GetLeaderBoardsFromStage', null))
      )
  }

  GetLeaderBoardsFromStageWithOffset(stageId: string, offset: number): Observable<LeaderBoardsOverAll> {
    return this.http.get<LeaderBoardsOverAll>(
      this.baseUrl + "dirt_rally2/leaderboards?stage_id="+ stageId + "&offset=" + offset
      )
      .pipe(
        catchError(this.handleError<LeaderBoardsOverAll>('GetLeaderBoardsFromStage', null))
      )
  }

  GetLeaderBoardsFromStageByCarId(stageId: string, carId: string): Observable<LeaderBoardsOverAll> {
    return this.http.get<LeaderBoardsOverAll>(
      this.baseUrl + "dirt_rally2/leaderboards?stage_id="+ stageId + "&car_ids=" + carId)
      .pipe(
        catchError(this.handleError<LeaderBoardsOverAll>('GetLeaderBoardsFromStageByCarId', null))
      )
  }

  GetLeaderBoardsFromStageByCarIdWithOffset(stageId: string, carId: string, offset: number): Observable<LeaderBoardsOverAll> {
    return this.http.get<LeaderBoardsOverAll>(
      this.baseUrl + "dirt_rally2/leaderboards?stage_id="+ stageId + "&car_ids=" + carId + "&offset=" + offset)
      .pipe(
        catchError(this.handleError<LeaderBoardsOverAll>('GetLeaderBoardsFromStageByCarIdWithOffset', null))
      )
  }

  Calculate99Percentile(numberOrRecords: number): number{
    if(numberOrRecords < 1){
      return numberOrRecords
    }
    return (Math.round(numberOrRecords /100) * 99);
  }

  GetStageLeaderBoardTime(stageId: string): StageResults{
    const stageResult = {} as StageResults

    this.GetLeaderBoardsFromStage(stageId).subscribe(leaderBoards => {
      stageResult.lastUpdate = leaderBoards.lastUpdate
      stageResult.offset = leaderBoards.offset
      stageResult.total = leaderBoards.total
      
      let firstDriver = leaderBoards.times[0];
      let stageDriver: StageDriver = { 
        nickname: firstDriver.nickname,
        bestTime: firstDriver.bestTime,
        position: firstDriver.rank.position,
        car: firstDriver.car
      }
      stageResult.bestDriver = stageDriver
      stageResult.stage = firstDriver.stage

      let offset = this.Calculate99Percentile(stageResult.total)

      this.GetLeaderBoardsFromStageWithOffset(stageId, offset)
        .subscribe(leastDrive => {
          let lastDriver = leastDrive.times[0];
          let stageDriver: StageDriver = { 
            nickname: lastDriver.nickname,
            bestTime: lastDriver.bestTime,
            position: lastDriver.rank.position,
            car: lastDriver.car
          }
          stageResult.leastDriver = stageDriver
        })
    })

    return stageResult
  }

  GetStageLeaderBoardTimeByCar(stageId: string, carId: string): StageResults{
    const stageResult = {} as StageResults

    this.GetLeaderBoardsFromStageByCarId(stageId, carId).subscribe(leaderBoards => {
      stageResult.lastUpdate = leaderBoards.lastUpdate
      stageResult.offset = leaderBoards.offset
      stageResult.total = leaderBoards.total
      
      let firstDriver = leaderBoards.times[0];
      let stageDriver: StageDriver = { 
        nickname: firstDriver.nickname,
        bestTime: firstDriver.bestTime,
        position: firstDriver.rank.position,
        car: firstDriver.car
      }
      stageResult.bestDriver = stageDriver
      stageResult.stage = firstDriver.stage

      let offset = this.Calculate99Percentile(stageResult.total)

      this.GetLeaderBoardsFromStageByCarIdWithOffset(stageId, carId, offset)
        .subscribe(leastDrive => {
          let lastDriver = leastDrive.times[0];
          let stageDriver: StageDriver = { 
            nickname: lastDriver.nickname,
            bestTime: lastDriver.bestTime,
            position: lastDriver.rank.position,
            car: lastDriver.car
          }
          stageResult.leastDriver = stageDriver
        })
    })

    return stageResult
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
