import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPayementComponent } from './load-payement.component';

describe('LoadPayementComponent', () => {
  let component: LoadPayementComponent;
  let fixture: ComponentFixture<LoadPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadPayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
