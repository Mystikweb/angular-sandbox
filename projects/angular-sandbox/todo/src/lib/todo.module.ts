import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@angular-sandbox/shared';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoModule { }
