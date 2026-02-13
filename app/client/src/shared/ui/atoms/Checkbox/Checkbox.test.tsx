import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithThemeForTest } from '@/test/test_utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('値がtrueのときhidden inputが存在する', () => {
    // 描画
    renderWithThemeForTest(<Checkbox name="test" value={ true } />);

    const input = document.querySelector('input[type="hidden"]');

    // 検証：hidden inputが存在する
    expect(input).toBeInTheDocument();
    // 検証：hidden inputのvalue属性が'true'
    expect(input).toHaveAttribute('value', 'true');
  });

  it('値がfalseのときhidden inputは存在しない', () => {
    // 描画
    renderWithThemeForTest(<Checkbox name="test" value={ false } />);

    const input = document.querySelector('input[type="hidden"]');

    // 検証：hidden inputが存在しない
    expect(input).toBeNull();
  });

  it('クリックすると状態が反転しhidden inputが現れる', async () => {
    const user = userEvent.setup();

    renderWithThemeForTest(<Checkbox name="test" value={ false } />);

    const wrapper = screen.getByRole('checkbox');
    await user.click(wrapper);

    const input = document.querySelector('input[type="hidden"]');

    // 検証：hidden inputが存在する
    expect(input).toBeInTheDocument();
    // 検証：hidden inputのvalue属性が'true'
    expect(input).toHaveAttribute('value', 'true');
  });

  it('onChangeが新しい値を引数として呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithThemeForTest(<Checkbox name="test" value={ false } onChange={ handleChange } />);

    const wrapper = screen.getByRole('checkbox');
    await user.click(wrapper);

    // 検証：onChangeが1回呼ばれる
    expect(handleChange).toHaveBeenCalledTimes(1);
    // 検証：onChangeが新しい値(e, true)を引数として呼ばれる(イベントオブジェクトeは検証しない)
    expect(handleChange.mock.calls[0][1]).toBe(true);

    // 再度クリックしてfalseに戻せることも検証します
    await user.click(wrapper);
    
    // 検証：onChangeが新しい値(e, false)を引数として呼ばれる(イベントオブジェクトeは検証しない)
    expect(handleChange.mock.calls[1][1]).toBe(false);
  });
});
