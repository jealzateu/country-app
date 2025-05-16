import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when input value changes with debounce and filters', fakeAsync(() => {
    spyOn(component.searchChange, 'emit');

    component.searchControl.setValue('ab');
    tick(300);
    expect(component.searchChange.emit).not.toHaveBeenCalled();

    component.searchControl.setValue('abc');
    tick(300);
    expect(component.searchChange.emit).toHaveBeenCalledWith('abc');

    component.searchControl.setValue('abcd');
    tick(300);
    expect(component.searchChange.emit).toHaveBeenCalledWith('abcd');

    component.searchControl.setValue('');
    tick(300);
    expect(component.searchChange.emit).toHaveBeenCalledWith('');
  }));

  it('should not emit if value does not change', fakeAsync(() => {
    spyOn(component.searchChange, 'emit');

    component.searchControl.setValue('abc');
    tick(300);
    expect(component.searchChange.emit).toHaveBeenCalledWith('abc');

    component.searchControl.setValue('abc');
    tick(300);

    expect(component.searchChange.emit).toHaveBeenCalledTimes(1);
  }));
});
