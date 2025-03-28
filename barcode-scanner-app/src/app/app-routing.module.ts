import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ShowBarcodeDataComponent } from './show-barcode-data/show-barcode-data.component';
import { AddBarcodeDataComponent } from './add-barcode-data/add-barcode-data.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
    { path: '', redirectTo: '/barcode-scanner', pathMatch: 'full' },  // Default route
    { path: 'barcode-scanner', component: BarcodeScannerComponent },
    { path: 'add-barcode', component: AddBarcodeDataComponent },
    { path: 'view-barcodes', component: ShowBarcodeDataComponent },
    { path: 'edit-product/:id', component: EditProductComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
