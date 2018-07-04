import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  private loadingSubs: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService, private uiService: UIService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe((exercises) => {
      this.exercises = exercises;
    });
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchavailableExercises();
  }

  onStartTraining(form: NgForm) {
    const id = form.value.exercise;
    this.trainingService.startExercise(id);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }
}
