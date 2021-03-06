import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private API_URL = environment.backend_url;
    private optionsWithJSON = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    upload(image: File): Observable<any> {
        const url = `${this.API_URL}/upload`;
        const uploadData = new FormData();
        uploadData.append('file', image, 'file');
        return this.http.post<any>(url, uploadData);
    }

    classifyUrl(image: string): Observable<any> {
        image = encodeURIComponent(image);
        const url = `${this.API_URL}/classify-url?url=${image}`;
        return this.http.get<any>(url, this.optionsWithJSON);
    }
}
