import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  constructor(private http: HttpClient) { }

  getImageAsBlob(imageUrl: string, mimeType: string): Observable<File> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      map((resp: Blob) => new File([resp], 'image', { type: 'image/' + mimeType }))
    );
  }
}
