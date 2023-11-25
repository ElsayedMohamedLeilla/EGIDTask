import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICES
import { AppLoaderService } from './services/app-loader/app-loader.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    //SharedPipesModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    AppLoaderService
  ],
  exports: [
    //SharedPipesModule
  ]
})
export class SharedModule { }
