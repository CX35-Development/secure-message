import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipientPage } from './recipient.page';

describe('RecipientPage', () => {
  let component: RecipientPage;
  let fixture: ComponentFixture<RecipientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecipientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
