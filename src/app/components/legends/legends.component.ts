// src/app/components/legends/legends.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LegendService } from '../../services/legend.service';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { LegendDialogComponent } from '../../legend-dialog/legend-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-legends',
  templateUrl: './legends.component.html',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./legends.component.css']
})
export class LegendsComponent implements OnInit {
  legends: any[] = [];
  selectedLegend: any;
  guessedLegend: any;
  guessForm: FormGroup;
  feedback: string = '';
  isCorrect: boolean = false;
  attempts: any[] = []; // Stocke toutes les tentatives

  constructor(private legendService: LegendService, private fb: FormBuilder, private dialog: MatDialog) {
    this.guessForm = this.fb.group({
      guess: ['']
    });
  }

  ngOnInit(): void {
    this.legendService.getLegends().subscribe(data => {
      this.legends = data;
      this.selectRandomLegend();
    });
  }

  selectRandomLegend(): void {
    const randomIndex = Math.floor(Math.random() * this.legends.length);
    this.selectedLegend = this.legends[randomIndex];
  }

  rejouer(): void {
    this.selectRandomLegend();
    this.feedback = '';
    this.isCorrect = false;
    this.attempts = [];
  }

  onSubmit(): void {
    const guess = this.guessForm.get('guess')?.value;

    this.feedback = '';
    this.isCorrect = false;

    this.guessedLegend = this.legends.find(legend => legend.name.toLowerCase() === guess.toLowerCase());

    if (this.guessedLegend) {
      if (this.guessedLegend.name.toLowerCase() === this.selectedLegend.name.toLowerCase()) {
        this.feedback = `Correct! You selected the correct legend: ${this.guessedLegend.name}.`;
        this.isCorrect = true;

        this.dialog.open(LegendDialogComponent, {
          data: {
            legend: this.guessedLegend,
            rejouer: this.rejouer.bind(this)
          }
        });
      } else {
        this.feedback = `Incorrect! Try again.`;
        this.isCorrect = false;
      }

      this.attempts.push({ ...this.guessedLegend });

    } else {
      this.feedback = 'This legend does not exist. Try a valid name.';
      this.isCorrect = false;
    }

    // Réinitialiser le champ de saisie après soumission
    this.guessForm.reset();
  }
}
