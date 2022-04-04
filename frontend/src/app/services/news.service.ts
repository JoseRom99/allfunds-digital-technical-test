import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class NewsService{
    public url: string;
    public headers: HttpHeaders;
    constructor(
        private _http: HttpClient,
    ){
        this.url = Global.url;
        this.headers = new HttpHeaders().set('Content-Type','text/event-stream');
    }

    getNews(): Observable<any>{
        return this._http.get(this.url+'news',{headers: this.headers});
    }

    getArchivedNews(): Observable<any>{
        return this._http.get(this.url+'archive',{headers: this.headers});
    }

    archiveNews(_id:string): Observable<any>{
        return this._http.put(this.url+'archive/'+_id,{headers: this.headers});
    }

    deleteArchivedNews(_id:string): Observable<any>{
        return this._http.delete(this.url+'archive/'+_id,{headers: this.headers});
    }
}