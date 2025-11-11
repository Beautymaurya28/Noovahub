import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VetsPage } from './vets.page';

describe('VetsPage', () => {
  let component: VetsPage;
  let fixture: ComponentFixture<VetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
