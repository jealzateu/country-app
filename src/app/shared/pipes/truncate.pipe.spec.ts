import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should truncate the string if longer than limit', () => {
    const result = pipe.transform('Hello, world!', 5);
    expect(result).toBe('Hello...');
  });

  it('should not truncate if string length is equal to limit', () => {
    const result = pipe.transform('Hello', 5);
    expect(result).toBe('Hello');
  });

  it('should not truncate if string length is less than limit', () => {
    const result = pipe.transform('Hi', 5);
    expect(result).toBe('Hi');
  });

  it('should return empty string if value is undefined', () => {
    const result = pipe.transform(undefined, 5);
    expect(result).toBe('');
  });

  it('should return empty string if value is null', () => {
    const result = pipe.transform(null, 5);
    expect(result).toBe('');
  });
});
