import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespoComponent } from './respo.component';

describe('RespoComponent', () => {
  let component: RespoComponent;
  let fixture: ComponentFixture<RespoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RespoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
