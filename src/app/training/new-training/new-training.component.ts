import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((exercises) => {
      this.exercises = exercises;
    });
    this.trainingService.fetchavailableExercises();
  }

  onStartTraining(form: NgForm) {
    const id = form.value.exercise;
    this.trainingService.startExercise(id);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
