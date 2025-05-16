import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';

@Component({
  standalone: true,
  template: `<input type="text" appAutofocus />`,
  imports: [AutofocusDirective],
})
class TestComponent {}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should focus the input element after view init', async () => {
    await fixture.whenStable();

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(document.activeElement).toBe(inputEl);
  });
});
