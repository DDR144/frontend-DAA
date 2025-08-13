import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefAddComponent } from './chef.add.component';

describe('ChefAddComponent', () => {
  let component: ChefAddComponent;
  let fixture: ComponentFixture<ChefAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
