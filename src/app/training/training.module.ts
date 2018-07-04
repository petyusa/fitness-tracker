import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgModule } from '@angular/core';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { TrainingService } from './training.service';
import { SharedModule } from '../shared/shared.module';
import { StopTrainingComponent } from './current-training/stop-training.component';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent
  ],
  imports: [AngularFirestoreModule, SharedModule],
  exports: [],
  providers: [TrainingService],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
