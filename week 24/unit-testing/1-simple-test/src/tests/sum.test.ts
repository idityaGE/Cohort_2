import { describe, expect, test } from '@jest/globals';
import { sum, multiply } from '../index';

describe('sum module', () => {
  test('1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('2 + 3 = 5', () => {
    expect(sum(2, 3)).toBe(5);
  });
  test('3 + 4 = 7', () => {
    expect(sum(3, 4)).toBe(7);
  });
  test('4 + 5 = 9', () => {
    expect(sum(4, 5)).toBe(9);
  });
  test('5 + 6 = 11', () => {
    expect(sum(5, 6)).toBe(11);
  });
});

describe('multiply module', () => {
  test('1 * 2 = 2', () => {
    expect(multiply(1, 2)).toBe(2);
  })
  test('2 * 3 = 6', () => {
    expect(multiply(2, 3)).toBe(6);
  })
  test('3 * 4 = 12', () => {
    expect(multiply(3, 4)).toBe(12);
  })
})