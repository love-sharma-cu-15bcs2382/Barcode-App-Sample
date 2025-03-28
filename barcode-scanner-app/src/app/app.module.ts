import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { provideHttpClient } from '@angular/common/http';
import { BackendService } from './service/backend.service';
import { AddBarcodeDataComponent } from './add-barcode-data/add-barcode-data.component';
import { ShowBarcodeDataComponent } from './show-barcode-data/show-barcode-data.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent,
        BarcodeScannerComponent,
        AddBarcodeDataComponent,
        ShowBarcodeDataComponent,
        EditProductComponent
    ],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(), BackendService],
    bootstrap: [AppComponent],
})
export class AppModule { }
