import { PDFDocument } from "pdf-lib";
import * as htmlToImage from "html-to-image";

export const convertToPdf = async (targetList: HTMLDivElement[], fileName: string): Promise<void> => {
  const pdfDoc = await PDFDocument.create();

  for (const target of targetList) {
    const page = pdfDoc.addPage();

    const dataUrl = await htmlToImage.toPng(target, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
    });

    const pngImage = await pdfDoc.embedPng(dataUrl);
    const { width, height } = pngImage.size();
    page.setSize(width, height);
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  const pdfUint8Array = new Uint8Array(pdfBytes);
  
  const blob = new Blob([pdfUint8Array], { type: "application/pdf" });  
  downloadBlob(blob, `${ fileName ?? '履歴書' }.pdf`);
};

const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // ファイル名に利用できない文字をアンダースコアに置換
  a.download = fileName.replace(/[\\/:*?"<>|]/g, "_");
  a.click();
  URL.revokeObjectURL(url);
};
