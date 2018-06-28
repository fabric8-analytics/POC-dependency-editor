import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpInterceptor extends Http {

    private static ERROR_HASH: any = {
        '400': 'The request is not proper',
        '401': 'Authentication failed - could not decode JWT token',
        '403': 'No Permission to Access',
        '404': 'The request is not proper',
        '405': 'The method is not allowed for the requested URL',
        '500': 'Server responded with error Retry again later',
        '501': 'Server responded with error Retry again later',
        '502': 'The server encountered a temporary error and could not complete your request',
        '504': 'Gateway Timeout, try again later',
        'GENERIC': 'There was a problem fetching results, please try again'
    };

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http
    ) {
        super(backend, options);
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
                    .catch(this.handleError);
    }

    public handleError(error: Response): Observable<Response> {
        console.log('Inside Interceptor', error);
        let formError: any = {
            status: error.status
        };
        // formError['message'] = HttpInterceptor.ERROR_HASH[error.status.toString()];
        formError['message'] = HttpInterceptor.ERROR_HASH['GENERIC'];
        return Observable.throw(formError);
    }

}
