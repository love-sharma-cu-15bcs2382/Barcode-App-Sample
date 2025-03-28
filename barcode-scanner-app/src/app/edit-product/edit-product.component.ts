import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../entity-models';
import { BackendService } from '../service/backend.service';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss'],
    standalone: false
})
export class EditProductComponent implements OnInit {

    product: Product = { Id: 0, Name: '', Price: 0, Barcode: '' };
    pageLoader = true;
    barCodeOrQRId: number = 0;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly backendService: BackendService,
        private readonly router: Router,
        private readonly toastController: ToastController,
        private readonly alertController: AlertController
    ) { }

    ngOnInit() {
        const productId = this.activatedRoute.snapshot.paramMap.get('id');
        if (productId) {
            this.barCodeOrQRId = Number(productId);
            this.loadProduct();
        }
    }

    loadProduct() {
        this.backendService.getBarCodeOrQRById(this.barCodeOrQRId).subscribe({
            next: res => {this.product = res; this.pageLoader = false},
            error: err => {console.log(err); this.pageLoader = false}
        });
    }

    saveProductInDb() {
        this.backendService.updateProduct(this.barCodeOrQRId, this.product).subscribe({
            next: res => {
                this.showToast('Product Updated Successfully');
            }, error: () => {
                this.showToast('Error in Updating Product');
            }
        });
    }

    async saveProduct() {
        const alert = await this.alertController.create({
            header: 'Confirm Save',
            message: 'Are you sure you want to save this product?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Save',
                    handler: () => { this.saveProductInDb() },
                },
            ],
        });
        await alert.present();
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

    goBackToProducts() {
        this.router.navigate(['/view-barcodes']);
    }

}
