import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefUpdateComponent } from './chef.update.component';

describe('ChefUpdateComponent', () => {
  let component: ChefUpdateComponent;
  let fixture: ComponentFixture<ChefUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
