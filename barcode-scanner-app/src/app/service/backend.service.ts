import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../entity-models';

@Injectable({
    providedIn: 'root', // Singleton service available app-wide
})
export class BackendService {

    UPPER_ENV__PATH = 'https://barcodescannerapp-gcahefcehseafray.eastus2-01.azurewebsites.net'

    constructor(private readonly http: HttpClient) {}

    saveBarcodeData(product: Product): Observable<{ barcode: string; message: string }> {
        const headers = this.getHeaders();
        return this.http.post<{ barcode: string; message: string }>(`${this.UPPER_ENV__PATH}/api/products`, product, { headers });
    }

    getAllBarcodesAndQRsData() {
        const headers = this.getHeaders();
        return this.http.get<Product[]>(`${this.UPPER_ENV__PATH}/api/products`, { headers });
    }

    getBarCodeOrQRById(id: number) {
        const headers = this.getHeaders();
        return this.http.get<Product>(this.UPPER_ENV__PATH + '/api/products/' + id, { headers });
    }

    updateProduct(id: number, product: Product) {
        const headers = this.getHeaders();
        const url = `${this.UPPER_ENV__PATH}/api/products/${id}`;
        console.log('Sending to backend:', product);
        return this.http.put<Product>(url, product, { headers });
    }

    deleteProductById(id: number) {
        const headers = this.getHeaders();
        const url = `${this.UPPER_ENV__PATH}/api/products/${id}`;
        return this.http.delete<void>(url, { headers });
    }

    private getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 6dv7IerQDQ', // Add the Authorization header
        });
    }
}
