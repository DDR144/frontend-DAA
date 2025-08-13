import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAkS2QIJO1rv1v5_YcaOjTNC2mmDYNIaGY',
        authDomain: 'da-ii-2025-9c42b.firebaseapp.com',
        projectId: 'da-ii-2025-9c42b',
        storageBucket: 'da-ii-2025-9c42b.firebasestorage.app',
        messagingSenderId: '566574661008',
        appId: '1:566574661008:web:b43109c3a0846c9c8bc715',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),    
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
  ],
};
