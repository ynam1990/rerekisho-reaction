export const formatPostalCode = (postalCode: string) => {
  if (postalCode.length <= 3) return postalCode;
  
  return `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
};

export const measureTextLineCount = (text: string, containerWidth: number, styleSet: {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
}): number => {
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
  dummy.remove();

  const lineHeight = styleSet.fontSize * styleSet.lineHeight;

  return Math.ceil(height / lineHeight);
};
