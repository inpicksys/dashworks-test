// Import the core angular services.
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

export var API_URL = new InjectionToken<string>('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet');


export interface Thumbnail { //default only
    name: string;
    url: string;
    width: number;
    height: number;
}

export interface VideoEntity {
    id: string;
    thumbnails: Thumbnail;
    publishedAt: Date;
    title: string;
    description: string;
    // constructor(data?) {
    //     data = data || {};

    //     this.id = data.id.videoId || null;
    //     this.thumbnails = data.thumbnails || [];
    //     this.description = data.description || '';
    //     this.title = data.title || '';
    // }
}

interface VideoListResponse {

}

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    public apiUrl: string;
    private httpClient: HttpClient;

    // I initialize the geocode service.
    constructor(@Inject(API_URL) apiUrl: string,
        httpClient: HttpClient) {
        this.apiUrl = apiUrl;
        this.httpClient = httpClient;
    }

    // ---
    // PUBLIC METHODS.
    // ---

    public getList2(query: string): Observable<any> {
        var url = `${this.apiUrl}&q=${query}`;
        return this.httpClient.get(url);
    }

    public extractVideoList(items: any): VideoEntity[] {
        let result: VideoEntity[] = items.map((item: any) => {
            let videoItem = {
                id: item.id.videoId || null,
                title: item.snippet.title || null,
                description: item.snippet.description || null,
                publishedAt: item.snippet.publishedAt || null,
                thumbnails: {
                    url: item.snippet.thumbnails['default'].url,
                    width: item.snippet.thumbnails['default'].width,
                    height: item.snippet.thumbnails['default'].height
                }
            }
            return videoItem;
        });
        return result;
    }

    public async getList(query: string): Promise<string> {
        var url = `${this.apiUrl}&q=${query}`;
        var result = await this.httpClient.get(url).toPromise();

        // var country = result.country || 'Unknown';
        // var city = result.city || 'Unknown';
        // var coordinates = (result.loc || '').split(',');
        let list = result.toString();
        return list;
        // return {
        //     ip: ipAddress,
        //     country: country,
        //     city: city,
        //     latitude: +coordinates.shift() || 0,
        //     longitude: +coordinates.shift() || 0
        // }; 
    }

}
