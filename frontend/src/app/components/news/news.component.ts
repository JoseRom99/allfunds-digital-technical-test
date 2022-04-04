import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {
  public news: News[] | undefined;
  constructor(
    private _newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this._newsService.getNews().subscribe(
      response =>{
        if(response.newsList){
          this.news = response.newsList;
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  archiveNews(_id:string){
    this._newsService.archiveNews(_id).subscribe(
      response =>{
        this.getNews();
      },
      error =>{
        console.log(error);
      }
    );
  }

}
