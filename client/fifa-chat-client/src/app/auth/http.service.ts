import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(public http: HttpClient) { }

    isEmailRegistered(email: string){
        return this.http.get(`http://localhost:3000/auth/isRegistered?email=${email}`);         
    }
}