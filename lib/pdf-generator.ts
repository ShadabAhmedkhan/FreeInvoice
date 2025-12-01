/**
 * PDF Generator using html2canvas and jsPDF
 */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generate PDF from an HTML element
 */
export async function generatePDF(
    elementId: string,
    filename: string = 'invoice.pdf'
): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
}

/**
 * Print invoice
 */
export function printInvoice(): void {
    window.print();
}
