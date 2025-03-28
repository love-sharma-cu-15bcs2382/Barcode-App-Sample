import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../entity-models';
import { BackendService } from '../service/backend.service';

@Component({
    selector: 'app-add-barcode-data',
    templateUrl: './add-barcode-data.component.html',
    standalone: false,
    styleUrls: ['./add-barcode-data.component.scss'],
})
export class AddBarcodeDataComponent {

    product: Product = { Id: 0, Name: '', Price: 0, Barcode: '' };
    pageLoader = false;  // Initially, the page is not loading

    constructor(
        private readonly backendService: BackendService,
        private readonly router: Router,
        private readonly toastController: ToastController
    ) { }

    saveProduct() {
        this.pageLoader = true; // Set loader to true when saving product
        this.backendService.saveBarcodeData(this.product).subscribe({
            next: (data) => {
                const scanResult = 'Barcode / QR : ' + this.product.Barcode + ' has been saved successfully';
                this.showToast(scanResult);
                console.log('Backend response:', data);
                this.pageLoader = false;
                this.product = { Id: 0, Name: '', Price: 0, Barcode: '' };
            },
            error: (error) => {
                console.error('Backend error:', error);
                this.product = { Id: 0, Name: '', Price: 0, Barcode: '' };
                this.pageLoader = false;
            }
        });
    }

    // Function to show a toast message
    async showToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,  // Toast message will display for 2 seconds
            position: 'bottom',  // You can choose top, middle, or bottom
        });
        toast.present();
    }

    // Navigate back to the product list
    goToMainMenu() {
        this.router.navigate(['/barcode-scanner']);
    }

}
