import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../shared/services/results.service';
import {InterviewResult} from '../../shared/models/interview-result.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  imports: [CommonModule],
})
export class ResultsListComponent implements OnInit {
  results: InterviewResult[] = [];

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    this.resultsService.getResults().subscribe(
      (data: InterviewResult[]) => {
        this.results = data;
      },
      (error) => {
        console.error('Error fetching results', error);
      }
    );
  }

  viewDetail(id: number): void {
    console.log('Viewing details for result ID:', id);
    // כאן ניתן להוסיף ניווט או לוגיקה להצגת פרטים נוספים
  }
}