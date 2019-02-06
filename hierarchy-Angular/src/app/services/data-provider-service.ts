import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataProviderService {
    constructor(private _httpClient: HttpClient) {

    }
    updateEmployee(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`api/updateNode`, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        }
        );
    }
}