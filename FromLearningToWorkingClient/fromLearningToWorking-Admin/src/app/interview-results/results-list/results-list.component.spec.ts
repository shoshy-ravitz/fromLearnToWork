import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsListComponent } from './results-list.component';
import { ResultsService } from '../../shared/services/results.service';
import { of } from 'rxjs';

describe('ResultsListComponent', () => {
  let component: ResultsListComponent;
  let fixture: ComponentFixture<ResultsListComponent>;
  let resultsService: jasmine.SpyObj<ResultsService>;

  beforeEach(async () => {
    const resultsServiceSpy = jasmine.createSpyObj('ResultsService', ['getResults']);

    await TestBed.configureTestingModule({
      declarations: [ ResultsListComponent ],
      providers: [
        { provide: ResultsService, useValue: resultsServiceSpy }
      ]
    })
    .compileComponents();

    resultsService = TestBed.inject(ResultsService) as jasmine.SpyObj<ResultsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch results on init', () => {
    const mockResults = [{ id: 1, score: 85 }, { id: 2, score: 90 }];
    resultsService.getResults.and.returnValue(of(mockResults));

    component.ngOnInit();

    expect(resultsService.getResults).toHaveBeenCalled();
    expect(component.results).toEqual(mockResults);
  });
});