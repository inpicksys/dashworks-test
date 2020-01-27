import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VideoService, API_URL } from './shared/video.service';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatSelectModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatFormFieldModule, MatRadioModule, MatInputModule, MatButtonToggleModule, MatProgressSpinnerModule, MatSliderModule, MatCardModule } from '@angular/material';
import { MatCheckboxComponent } from './mat-checkbox/mat-checkbox.component';
import { MatInputComponent } from './mat-input/mat-input.component';
import { MatSelectComponent } from './mat-select/mat-select.component';
import { MatRadioComponent } from './mat-radio/mat-radio.component';

export const metaReducers: MetaReducer<any>[] = environment.production
  ? []
  : []; // [storeFreeze];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MatCheckboxComponent,
    MatInputComponent,
    MatSelectComponent,
    MatRadioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([MatCheckboxComponent, MatInputComponent, MatRadioComponent, MatSelectComponent]),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,

    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [VideoService,
    {
      provide: API_URL,
      useValue: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet'
    },
    // {
    //   provide: API_URL,
    //   useFactory: function (appInitializer: VideoService) {

    //     return appInitializer.apiUrl;
    //   },
    //   deps: [VideoService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private videoService: VideoService) {
    // this.videoService.getList("john");
  }
}
