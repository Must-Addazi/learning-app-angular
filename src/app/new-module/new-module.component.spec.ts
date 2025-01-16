import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewModuleComponent } from './new-module.component';

describe('NewModuleComponent', () => {
  let component: NewModuleComponent;
  let fixture: ComponentFixture<NewModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
