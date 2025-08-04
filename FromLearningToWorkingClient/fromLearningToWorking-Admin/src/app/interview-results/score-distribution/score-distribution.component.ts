import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ResultsService } from '../../shared/services/results.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-score-distribution',
imports: [ChartsModule],
  templateUrl: './score-distribution.component.html',
  styleUrl: './score-distribution.component.css'
})
export class ScoreDistributionComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartData:  number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public isLoading = true;

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.fetchScoreDistribution();
  }

  fetchScoreDistribution(): void {
    this.resultsService.getResults().subscribe(results => {
      const scoreGroups = results.reduce((acc, result) => {
        const range = `${Math.floor(result.score / 10) * 10}-${Math.floor(result.score / 10) * 10 + 9}`;
        acc[range] = (acc[range] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      this.pieChartLabels = Object.keys(scoreGroups);
      this.pieChartData = Object.values(scoreGroups);
      this.isLoading = false;
    });
  }
}
