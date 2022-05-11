import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CategoryInterface from '../interfaces/category.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private data: DataService) {}

  public getCategories() {
    this.http.get(`${environment.apiUrl}/guitars/categories`).subscribe(
      (res) => {
        this.data.categories = res as [CategoryInterface];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public getAllGuitars() {
    this.http.get(`${environment.apiUrl}/guitars/`).subscribe(
      (res: any) => {
        console.log(res);
        this.data.guitars = res.guitars;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public getGuitarsBySearch(inputValue: string) {
    this.http
      .post(
        `${environment.apiUrl}/guitars/filter`,
        {
          query: inputValue,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe(
        (res: any) => {
          this.data.guitars = res.guitars;
        },
        (err: any) => {
          console.log(err);
        }
      );
    //
  }

  public getGuitarsByCategory(categoryId: string) {
    this.http
      .get(`${environment.apiUrl}/guitars/category/${categoryId}`)
      .subscribe(
        (res: any) => {
          this.data.guitars = res.guitars;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
