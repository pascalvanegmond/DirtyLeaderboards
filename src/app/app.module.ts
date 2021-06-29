import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeaderBoardComponent } from './leaderBoard/leaderBoard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeaderBoardDetailComponent } from './leaderBoard-detail/leaderBoard-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaderBoardComponent,
    LeaderBoardDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
