import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenderPage } from './sender.page';

describe('SenderPage', () => {
  let component: SenderPage;
  let fixture: ComponentFixture<SenderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
