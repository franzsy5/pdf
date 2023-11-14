
import { PDFDocument } from 'pdf-lib';
import { PdfFile } from '../wrappers/PdfFile';

export type MergeParamsType = {
    files: PdfFile[];
}

export async function mergePDFs(params: MergeParamsType): Promise<PdfFile> {
    const mergedPdf = await PDFDocument.create(); 

    for (let i = 0; i < params.files.length; i++) {
        const pdfToMerge = await params.files[i].pdflibDocument;
        const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    return new PdfFile("mergedPDF", mergedPdf);
};