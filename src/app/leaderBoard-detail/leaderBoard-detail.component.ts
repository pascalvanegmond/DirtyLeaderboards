import { Component, Input, OnInit } from '@angular/core';
import { LeaderBoard } from '../models/leaderBoard';
import { StageResults } from '../models/stageResults';
import { LeaderBoardService } from '../services/leaderBoard.service';

@Component({
  selector: 'app-leaderBoard-detail',
  templateUrl: './leaderBoard-detail.component.html',
  styleUrls: ['./leaderBoard-detail.component.css']
})
export class LeaderBoardDetailComponent implements OnInit {

  @Input() leaderBoard?: LeaderBoard;
  stageResults: StageResults
  stageResultsByCar: StageResults

  constructor(private leaderBoardService: LeaderBoardService) { }

  ngOnInit() {
  }

  AllStageData(): void {
    this.stageResults = this.leaderBoardService.GetStageLeaderBoardTime(this.leaderBoard.dirtRally2StageId)
  }

  AllStageDataByCar(): void {
    this.stageResultsByCar = this.leaderBoardService.GetStageLeaderBoardTimeByCar(
      this.leaderBoard.dirtRally2StageId, 
      this.leaderBoard.dirtRally2CarId
    )
  }

  DisplayReadableTime(timeInMs: number): string {
    if(!timeInMs){
      return null
    }
    return new Date(timeInMs).toISOString().slice(14,-1)
  }

  CalculatePosition(toCalculate: number, total: number): string{
    let position = ((toCalculate / total)*100).toFixed(2)
    return toCalculate + "/ " + total + " - " + position + "%"
  }
  
}
