import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private data: DataService,
    private http: HttpClient,
    private dialog: MatDialog,
    private main: MainService
  ) {}

  public addProduct(body) {
    this.http
      .post(`${environment.apiUrl}/admin/new-product`, body, {
        headers: {
          'Content-Type': 'application/json',
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res: any) => {
          this.data.addProductMessage = res;
          this.main.getAllGuitars();
        },
        (err) => {
          this.data.addProductMessage = err.error;
          console.log(err);
        }
      );
  }

  public editProduct(productId, name, category, price, picture) {
    this.http
      .put(
        `${environment.apiUrl}/admin/edit-product/${productId}`,
        {
          name,
          category,
          price,
          picture,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'xx-auth': this.data.token,
          },
        }
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.main.getAllGuitars();
          this.dialog.closeAll();
        },
        (err) => {
          this.data.editProductError = err.error;
          console.log(err);
        }
      );
  }
}
