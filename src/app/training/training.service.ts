import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

export class TrainingService {
  private availableExercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchavailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            } as Exercise;
          });
        })
      );
  }

  getExercises() {
    return this.availableExercises.slice();
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find((ex) => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getFinishedExercises() {
    return this.exercises.slice();
  }
}
