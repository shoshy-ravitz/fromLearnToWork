import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResultsComponent } from './topic-results.component';

describe('TopicResultsComponent', () => {
  let component: TopicResultsComponent;
  let fixture: ComponentFixture<TopicResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
