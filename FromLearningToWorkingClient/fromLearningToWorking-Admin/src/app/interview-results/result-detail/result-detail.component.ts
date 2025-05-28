import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from '../../shared/services/results.service';
import { InterviewResult } from '../../shared/models/interview-result.model';


@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
  resultId: number=0;
  interviewResult: InterviewResult | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService
  ) { }

  ngOnInit(): void {
    this.resultId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchInterviewResult();
  }

  fetchInterviewResult(): void {
    this.resultsService.getResultById(this.resultId).subscribe(
      (result: InterviewResult) => {
        this.interviewResult = result;
      },
      error => {
        console.error('Error fetching interview result:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/results-list']); // ניווט חזרה לרשימת התוצאות
  }
}