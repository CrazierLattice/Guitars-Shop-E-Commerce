import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as fileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private data: DataService,
    private dialog: MatDialog
  ) {}

  public createNewOrder(userId, cartID, body, orderDialog) {
    this.http
      .post(`${environment.apiUrl}/order/purchase/${userId}/${cartID}`, body, {
        headers: {
          'Content-Type': 'application/json',
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res: any) => {
          this.getOrderReceptionFile('order.txt');
          this.dialog.open(orderDialog, { disableClose: true });

          this.data.orderData = res.newOrder;
        },
        (err) => {
          this.data.orderMessage = err.error;
          console.log(err);
        }
      );
  }

  returnBlob(res): Blob {
    return new Blob([res], { type: 'text/plain' });
  }

  public getOrderReceptionFile(x) {
    const param = new HttpParams().set('filename', x);
    const options = {
      params: param,
    };
    this.http
      .get(`${environment.apiUrl}/order/reception`, {
        ...options,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          'xx-auth': this.data.token,
        },
      })
      .subscribe(
        (res) => {
          fileSaver.saveAs(this.returnBlob(res), 'order.text');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
