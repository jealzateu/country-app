import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private readonly el: ElementRef) {}

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.el.nativeElement.focus();
    });
  }
}
