import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss'],
  providers: [NewsService]
})
export class ArchivedComponent implements OnInit {
  public archivedNews: News[] | undefined;
  constructor(
    private _newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.getArchivedNews();
  }

  getArchivedNews(){
    this._newsService.getArchivedNews().subscribe(
      response =>{
        if(response.archivedNewsList){
          this.archivedNews = response.archivedNewsList;
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  deleteArchivedNews(_id:string){
    this._newsService.deleteArchivedNews(_id).subscribe(
      response =>{
        this.getArchivedNews();
      },
      error =>{
        console.log(error);
      }
    );
  }

}
