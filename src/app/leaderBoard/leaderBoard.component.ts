import { Component, OnInit } from '@angular/core';
import { LeaderBoard } from '../models/leaderBoard';
import { LeaderBoards } from '../models/leaderBoards';
import { LeaderBoardService } from '../services/leaderBoard.service';

@Component({
  selector: 'app-leaderBoard',
  templateUrl: './leaderBoard.component.html',
  styleUrls: ['./leaderBoard.component.css']
})
export class LeaderBoardComponent implements OnInit {
  
  nickname: string = "VerzinZelf"
  leaderBoards: LeaderBoards
  leaderBoardHasData: boolean = false
  selectedBoard?: LeaderBoard
  hasError: boolean = false
  isLoading: boolean = false

  constructor(private leaderBoardService: LeaderBoardService) { }

  ngOnInit() {
  }

  GetLeaderBoardsForUser(username: string): void {
    this.isLoading = true;
    this.leaderBoardService.GetLeaderBoardsForUser(username)
      .subscribe(leaderBoards2 => {
        if(leaderBoards2){
          this.leaderBoards = leaderBoards2
          this.leaderBoardHasData = true
        }else{
          this.hasError = true
        }
        this.isLoading = false
      });
  }

  click(): void {
    this.GetLeaderBoardsForUser(this.nickname);
  }

  boardSelected(board: LeaderBoard): void{
    this.selectedBoard = board;
  }
}
