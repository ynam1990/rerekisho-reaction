export const bytesToDataURL = (bytes: Uint8Array, mimeType: string): string => {
  // bytesからBase64文字列に変換
  const base64String = Buffer.from(bytes).toString('base64');
  
  // mimeTypeと合わせてData URL形式にする
  const dataUrl = `data:${ mimeType };base64,${ base64String }`;
  
  return dataUrl;
};

export const dataURLToBytes = (dataUrl: string): { bytes: Uint8Array; mimeType: string } => {
  // mimeTypeとBase64部分をキャプチャ
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid Data URL format');
  }
  
  const mimeType = matches[1] as string;
  const base64String = matches[2] as string;
  
  // Base64文字列をbytesに変換
  const bytes = Uint8Array.from(Buffer.from(base64String, 'base64'));
  
  return { bytes, mimeType };
};
