import { Component, OnInit } from '@angular/core';
import { InterviewResult } from '../../shared/models/interview-result.model';
import { ResultsService } from '../../shared/services/results.service';
import { TotalResult } from '../../shared/models/totalResult.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-results',
  imports: [FormsModule],
  templateUrl: './topic-results.component.html',
  styleUrl: './topic-results.component.css'
})
export class TopicResultsComponent implements OnInit {


  topic: string = '';
  results: TotalResult[] = [];

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {}

  searchByTopic(): void {
    if (this.topic.trim()) {
      this.resultsService.getResultsByTopic(this.topic).subscribe(results => {
        this.results = results.sort((a, b) => b.score - a.score); 
      });
    }
  }
}