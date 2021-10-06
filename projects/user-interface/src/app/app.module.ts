import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';

import {
  AngularFireAnalyticsModule,
  APP_NAME,
  APP_VERSION,
  DEBUG_MODE as ANALYTICS_DEBUG_MODE,
  ScreenTrackingService,
  UserTrackingService,
  COLLECTION_ENABLED
} from '@angular/fire/compat/analytics';

import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireRemoteConfigModule, SETTINGS as REMOTE_CONFIG_SETTINGS, DEFAULTS as REMOTE_CONFIG_DEFAULTS } from '@angular/fire/compat/remote-config';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { environment } from '../environments/environment';

import { SharedModule } from '@angular-sandbox/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireRemoteConfigModule,
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    SharedModule,
    AppRoutingModule,
    // provide modular style for AppCheck, see app.browser/server
    provideFirebaseApp(() => initializeApp(environment.firebase)),
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    { provide: FIRESTORE_SETTINGS, useValue: { ignoreUndefinedProperties: true } },
    { provide: ANALYTICS_DEBUG_MODE, useValue: true },
    { provide: COLLECTION_ENABLED, useValue: true },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9199] : undefined },
    { provide: REMOTE_CONFIG_SETTINGS, useFactory: () => isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {} },
    { provide: REMOTE_CONFIG_DEFAULTS, useValue: { background_color: 'red' } },
    { provide: USE_DEVICE_LANGUAGE, useValue: true },
    { provide: APP_VERSION, useValue: '0.0.0' },
    { provide: APP_NAME, useValue: 'Angular' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
