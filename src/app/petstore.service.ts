import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class PetstoreService {

  private petstoreUrl = `http://petstore.swagger.io/v2/swagger.json`;

  constructor(private http: Http) { }

  getSwagger() {
    return this.http.get(this.petstoreUrl)
      .map((res: Response) => res.json());
  }

}



