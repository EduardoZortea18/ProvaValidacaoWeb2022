import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import urlcat from 'urlcat';
import { HeadersOptions } from '../models/header-options.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://localhost:8080';
  readonly DEFAULT_HEADERS_OPTIONS: HeadersOptions = {
		useAuthorizationHeader: true,
		customHeaders: new HttpHeaders(),
	};
  constructor(private readonly httpClient: HttpClient) { }

  get<TResponseType>(
    path: string,
  ): Observable<TResponseType> {
    return this.httpClient.get<TResponseType>(this.url(path));
  }

  post<TResponseType, TRequestType>(
    path: string,
    requestObj: TRequestType,
    token: string,
  ): Observable<TResponseType> {
    return this.httpClient.post<TResponseType>(this.url(path), requestObj, this.buildRequestHeaders(
      {
        useAuthorizationHeader: true,
		    customHeaders: new HttpHeaders(),
        overrideAuthorizationToken: token,
      }
    ));
  }

  postLogin<TResponseType, TRequestType>(
    path: string,
    requestObj: TRequestType,
  ): Observable<TResponseType> {
    return this.httpClient.post<TResponseType>(this.url(path), requestObj);
  }

  private buildRequestHeaders(headersOptions: HeadersOptions = this.DEFAULT_HEADERS_OPTIONS): { headers: HttpHeaders } {
		let headers = new HttpHeaders();

		if (headersOptions.useAuthorizationHeader) {
			const tokenToUse = headersOptions.overrideAuthorizationToken;
			headers = headers.append('Authorization', `Bearer ${tokenToUse}`);
			headers = headers.append('Access-Control-Allow-Origin', '*');
		}

		return { headers };
	}

  private url(path = ''): string {
    return this.buildUrl(this.baseUrl, path);
  }

  private buildUrl(baseUrl: string, path: string): string {
    return urlcat(baseUrl, path ?? {});
  }


}
