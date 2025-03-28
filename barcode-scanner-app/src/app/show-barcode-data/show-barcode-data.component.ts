import { Component, OnInit } from '@angular/core';
import { Product } from '../entity-models';
import { BackendService } from '../service/backend.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-show-barcode-data',
    templateUrl: './show-barcode-data.component.html',
    standalone: false,
    styleUrls: ['./show-barcode-data.component.scss'],
})
export class ShowBarcodeDataComponent implements OnInit {

    products: Product[] = [];

    pageLoader = true;

    constructor(
        private readonly backendService: BackendService,
        private readonly alertController: AlertController,
        private readonly router: Router,
        private readonly toastController: ToastController
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts() {
        this.backendService.getAllBarcodesAndQRsData().subscribe({
            next: res => {this.products = res; this.pageLoader = false},
            error: err => {console.log(err); this.pageLoader = false}
        });
    }

    // Delete a product
    async deleteProduct(productId: number) {
        const alert = await this.alertController.create({
            header: 'Confirm Delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Delete',
                    handler: () => { this.deleteProductFromDb(productId) },
                },
            ],
        });
        await alert.present();
    }

    deleteProductFromDb(id: number) {
        this.backendService.deleteProductById(id).subscribe({
            next: () => {this.loadProducts(); this.showToast('Product Deleted Successfully')},
            error: () => {this.showToast('Error in deleting product')}
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

    // Navigate to edit page with the selected product
    editProduct(productId: number) {
        this.router.navigate(['/edit-product', productId]);
    }

    goToMainMenu() {
        this.router.navigate(['/barcode-scanner']);
    }

}
