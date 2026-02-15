import { describe, it, expect } from '@jest/globals';
import { dataURLToBytes } from './format_data_url.js';

describe('dataURLToBytes', () => {
  it('Data URLからmimeTypeとbytesを取り出せる', () => {
    const result = dataURLToBytes('data:text/plain;base64,dGVzdA==');

    expect(result.mimeType).toBe('text/plain');
    expect(Array.from(result.bytes)).toEqual([116, 101, 115, 116]);
  });

  it('Data URL形式でない場合はエラーを投げる', () => {
    expect(() => dataURLToBytes('not-data-url')).toThrow('Invalid Data URL format');
  });

  it('base64部分が空の場合はエラーを投げる', () => {
    expect(() => dataURLToBytes('data:text/plain;base64,')).toThrow('Invalid Data URL format');
  });
});
