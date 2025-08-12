import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsPage } from './chefs.page';

describe('ChefsPage', () => {
  let component: ChefsPage;
  let fixture: ComponentFixture<ChefsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
