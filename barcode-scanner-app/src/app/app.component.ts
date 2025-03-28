import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false,
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        this.initializeApp();
    }

    async initializeApp() {
        // Configure the status bar
        try {
            await StatusBar.setStyle({ style: Style.Light }); // Use Style.Dark if your status bar icons should be dark
            await StatusBar.setBackgroundColor({ color: '#ffffff' }); // Set the status bar background to white
            await StatusBar.setOverlaysWebView({ overlay: false }); // Ensure the status bar does not overlay the webview
        } catch (error) {
            console.error('Error configuring status bar:', error);
        }
    }
}
