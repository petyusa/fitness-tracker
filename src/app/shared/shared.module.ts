import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexModule, FormsModule],
  exports: [CommonModule, MaterialModule, FlexModule, FormsModule]
})
export class SharedModule {}
