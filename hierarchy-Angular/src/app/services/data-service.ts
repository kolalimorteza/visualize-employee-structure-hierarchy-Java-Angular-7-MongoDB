import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

    constructor(private _httpClient: HttpClient) { }

    changeMessage(message: string) {
        this.messageSource.next(message);
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
    getNodeHierarchy(guid: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`api/getHierarchyByEmployeeId/${guid}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        }
        );
    }

    getEmployeesByName(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`api/getEmployeesByName/${name}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        }
        );
    }

    getAllEmployees(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`api/getAllEmployee`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        }
        );
    }

}