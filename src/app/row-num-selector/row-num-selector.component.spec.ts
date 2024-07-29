import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowNumSelectorComponent } from './row-num-selector.component';

describe('RowNumSelectorComponent', () => {
  let component: RowNumSelectorComponent;
  let fixture: ComponentFixture<RowNumSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowNumSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowNumSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
