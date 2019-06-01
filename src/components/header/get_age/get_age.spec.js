import { getAge } from './get_age';

describe('get_age', () => {
  it('should get the age of a 1 year old', () => {
    expect(getAge(new Date(2000, 0, 1), new Date(2001, 0, 1))).toBe(1);
  });
  it('should get my age in 2019', () => {
    expect(getAge(new Date(1993, 9, 1), new Date(2019, 5, 1))).toBe(25);
  });
  it('should get my age at 25 but its really close to 26', () => {
    expect(getAge(new Date(1993, 9, 1), new Date(2019, 8, 30))).toBe(25);
  });
});
