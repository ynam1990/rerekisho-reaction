import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { savePrefsToLocalStorage, loadPrefsFromLocalStorage } from './local_storage_io';

// 外部参照の関数をモックします
vi.mock('@/shared/model/appPrefsSlice', () => {
  return {
    isPartialLocalPrefs: vi.fn(),
  };
});
import { isPartialLocalPrefs, type LocalPrefs } from '@/shared/model/appPrefsSlice';
const isPartialLocalPrefsMock = vi.mocked(isPartialLocalPrefs);

describe('local_storage_io', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // テストで使用するキーと、内部で生成される(と期待される)ストレージキーを定義
  const clientPrefsKey = 'prefs_key_for_test_user';
  const storageKey = `rr_${ clientPrefsKey }_prefs`;
  // 仮の保存データ
  const mockData = { someKey: 'someValue' } as Partial<LocalPrefs>;

  describe('savePrefsToLocalStorage', () => {
    it('localStorageに保存してtrueを返す', () => {
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // 関数を呼び出して結果を取得
      const result = savePrefsToLocalStorage(clientPrefsKey, mockData);

      // 検証：呼び出し結果がtrueであること
      expect(result).toBe(true);
      // 検証：localStorage.setItemが1回呼び出されていること
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      // 検証：localStorage.setItemが正しいキーと値で呼び出されていること
      expect(setItemSpy).toHaveBeenCalledWith(storageKey, JSON.stringify(mockData));
      // 検証：console.errorが呼び出されていないこと
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('localStorage.setItemがエラーならfalseを返す', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        // モック：QuotaExceededErrorを模倣して例外を投げる
        throw new Error('quota exceeded');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = savePrefsToLocalStorage(clientPrefsKey, mockData);

      // 検証：呼び出し結果がfalseであること
      expect(result).toBe(false);
      // 検証：console.errorが1回呼び出されていること
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('loadPrefsFromLocalStorage', () => {
    it('JSONをparseしてisPartialLocalPrefsがtrueならparsedを返す', () => {
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // モックデータを保存する
      localStorage.setItem(storageKey, JSON.stringify(mockData));

      // isPartialLocalPrefsがtrueを返すようにモック
      isPartialLocalPrefsMock.mockReturnValue(true);

      // 関数を呼び出して結果を取得
      const result = loadPrefsFromLocalStorage(clientPrefsKey);

      // 検証：呼び出し結果がmockDataであること
      expect(result).toEqual(mockData);
      // 検証：localStorage.getItemが正しいキーで呼び出されていること
      expect(getItemSpy).toHaveBeenCalledWith(storageKey);
      // 検証：isPartialLocalPrefsが正しい引数で呼び出されていること
      expect(isPartialLocalPrefsMock).toHaveBeenCalledWith(mockData);
      // 検証：console.errorが呼び出されていないこと
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('保存データが無ければnullを返す', () => {
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = loadPrefsFromLocalStorage(clientPrefsKey);

      // 検証：呼び出し結果がnullであること
      expect(result).toBeNull();
      // 検証：localStorage.getItemが正しいキーで呼び出されていること
      expect(getItemSpy).toHaveBeenCalledWith(storageKey);
      // 検証：console.errorが呼び出されていないこと
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('isPartialLocalPrefsがfalseならnullを返す', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const invalidMockData = { unknown: 'value' };
      localStorage.setItem(storageKey, JSON.stringify(invalidMockData));

      isPartialLocalPrefsMock.mockReturnValue(false);

      const result = loadPrefsFromLocalStorage(clientPrefsKey);

      // 検証：呼び出し結果がnullであること
      expect(result).toBeNull();
      // 検証：isPartialLocalPrefsが正しい引数で呼び出されていること
      expect(isPartialLocalPrefsMock).toHaveBeenCalledWith(invalidMockData);
      // 検証：console.errorが呼び出されていないこと
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('JSONが壊れていてparseが例外を投げたらnullを返す', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      localStorage.setItem(storageKey, 'invalid json');

      const result = loadPrefsFromLocalStorage(clientPrefsKey);

      // 検証：呼び出し結果がnullであること
      expect(result).toBeNull();
      // 検証：console.errorが1回呼び出されていること
      expect(console.error).toHaveBeenCalledTimes(1);
    });    
  });
});
