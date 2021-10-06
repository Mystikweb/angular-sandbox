import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
    SharedComponent
  ]
})
export class SharedModule { }
