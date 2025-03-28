import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { BackendService } from '../service/backend.service';
import { ToastController } from '@ionic/angular';
import { Product } from '../entity-models';

@Component({
    selector: 'app-barcode-scanner',
    templateUrl: './barcode-scanner.component.html',
    styleUrls: ['./barcode-scanner.component.scss'],
    standalone: false
})
export class BarcodeScannerComponent {

    constructor(private readonly router: Router,
        private readonly backendService: BackendService,
        private readonly toastController: ToastController) { }

    async scanBarcode() {
        try {
            console.log('Starting barcode scan...');
            const result = await CapacitorBarcodeScanner.scanBarcode({
                hint: CapacitorBarcodeScannerTypeHint.ALL,
                cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK
            });
            if (result.ScanResult) {
                console.log('Scan successful:', result.ScanResult);
                this.saveBarcodeData(result.ScanResult);
            } else {
                console.log('No barcode detected.');
                this.showToast('No barcode detected.');
            }
        } catch (error) {
            console.error('Scan error:', error);
        }
    }

    saveBarcodeData(barcodeData: string) {
        const product: Product = {};
        product.Barcode = barcodeData;
        this.backendService.saveBarcodeData(product).subscribe({
            next: (data) => {
                const scanResult = 'Barcode / QR : ' + barcodeData + ' has been saved successfully';
                this.showToast(scanResult);
                console.log('Backend response:', data);
            },
            error: (error) => {
                console.error('Backend error:', error);
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

    goToAddProduct() {
        this.router.navigate(['/add-barcode']);
    }

    goToViewBarCode() {
        this.router.navigate(['/view-barcodes']);
    }

}
