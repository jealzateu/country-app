import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionDropdownComponent } from './region-dropdown.component';
import { By } from '@angular/platform-browser';

describe('RegionDropdownComponent', () => {
  let component: RegionDropdownComponent;
  let fixture: ComponentFixture<RegionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedRegion and emit regionChange on region change', () => {
    spyOn(component.regionChange, 'emit');

    const event = {
      target: { value: 'Asia' }
    } as unknown as Event;

    component.onRegionChange(event);

    expect(component.selectedRegion).toBe('Asia');
    expect(component.regionChange.emit).toHaveBeenCalledWith('Asia');

    const emptyEvent = {
      target: { value: '' }
    } as unknown as Event;

    component.onRegionChange(emptyEvent);

    expect(component.selectedRegion).toBeNull();
    expect(component.regionChange.emit).toHaveBeenCalledWith(null);
  });

  it('should emit event when select element value changes (integration)', () => {
    spyOn(component.regionChange, 'emit');

    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;

    selectEl.value = 'Europe';
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectedRegion).toBe('Europe');
    expect(component.regionChange.emit).toHaveBeenCalledWith('Europe');
  });
});
