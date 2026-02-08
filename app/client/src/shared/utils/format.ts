export const formatPostalCode = (postalCode: string) => {
  if (postalCode.length <= 3) return postalCode;
  
  return `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
};

export const measureTextLineCount = (
  text: string,
  containerWidth: number,
  styleSet: {
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
  },
  availableHeight?: number,
  rowHeight?: number,
): {
  lineCount: number,
  rowCount: number,
  firstPartLineCount: number,
  firstPartRowCount: number,
  exceededIndex: number
} => {
  const dummy = document.createElement('div');
  dummy.style.visibility = 'hidden';
  dummy.style.width = containerWidth + 'px';
  dummy.style.height = 'auto';
  dummy.style.padding = '0';
  dummy.style.fontSize = styleSet.fontSize + 'px';
  dummy.style.letterSpacing = styleSet.letterSpacing + 'px';
  dummy.style.lineHeight = styleSet.lineHeight.toString();
  dummy.style.whiteSpace = 'pre-wrap';
  dummy.innerText = text;
  document.body.appendChild(dummy);

  const height = dummy.offsetHeight;

  const lineHeight = styleSet.fontSize * styleSet.lineHeight;
  const lineCount = Math.ceil(height / lineHeight);
  const rowCount = rowHeight ? Math.ceil(height / rowHeight) : lineCount;

  // もしmaxLinesが指定されていて、行数がそれを超えた場合、超過した文字のインデックスを計算します
  let exceededIndex = -1;
  let firstPartRowCount = 0;
  let firstPartLineCount = 0;
  if (availableHeight && rowHeight && height > availableHeight) {
    // 二分探査で超過インデックスを特定します
    let low = 0;
    let high = text.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      dummy.innerText = text.slice(0, mid);
      const currentHeight = dummy.offsetHeight;

      if (currentHeight > availableHeight) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    exceededIndex = low - 1;
    firstPartLineCount = Math.ceil(dummy.offsetHeight / lineHeight);
    firstPartRowCount = Math.ceil(firstPartLineCount * lineHeight / rowHeight);
  }

  // クリーンアップ
  dummy.remove();

  return {
    lineCount,
    rowCount,
    firstPartLineCount,
    firstPartRowCount,
    exceededIndex,
  };
};
