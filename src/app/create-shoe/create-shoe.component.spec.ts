import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoeComponent } from './create-shoe.component';

describe('CreateShoeComponent', () => {
  let component: CreateShoeComponent;
  let fixture: ComponentFixture<CreateShoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
