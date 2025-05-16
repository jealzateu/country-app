import { RegionNamePipe } from './region-name.pipe';

describe('RegionNamePipe', () => {
  let pipe: RegionNamePipe;

  beforeEach(() => {
    pipe = new RegionNamePipe();
  });

  it('should transform a string to uppercase', () => {
    const result = pipe.transform('america');
    expect(result).toBe('AMERICA');
  });

  it('should return empty string when value is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should return empty string when value is empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
