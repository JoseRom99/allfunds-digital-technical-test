import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class EventNewsService{
    getEventNewsService(url: string): EventSource{
        return new EventSource(url);
    }
}