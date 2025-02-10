import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendDialogComponent } from './legend-dialog.component';

describe('LegendDialogComponent', () => {
  let component: LegendDialogComponent;
  let fixture: ComponentFixture<LegendDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
