import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefComponent } from './chef.component';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
