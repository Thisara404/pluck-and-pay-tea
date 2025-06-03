import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePluckerRecordsReport = (
  title: string,
  dateRange: { start: string; end: string },
  pluckerData: {
    name: string;
    records: { date: string; weight: number; earnings: number }[];
    totalWeight: number;
    totalEarnings: number;
  }[]
) => {
  const doc = new jsPDF();
  
  // Add title and date range
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  
  // Add date range
  doc.setFontSize(12);
  doc.text(`Report Period: ${new Date(dateRange.start).toLocaleDateString()} to ${new Date(dateRange.end).toLocaleDateString()}`, 14, 30);
  
  // Add generation date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 37);
  
  let y = 50;
  const margin = 14;
  const pageWidth = doc.internal.pageSize.width;
  
  // For each plucker, create a section
  pluckerData.forEach((plucker, index) => {
    // Check if we need a new page
    if (y > doc.internal.pageSize.height - 60) {
      doc.addPage();
      y = 20;
    }
    
    // Add plucker name as section header
    doc.setFillColor(22, 160, 133);  // Tea color
    doc.setTextColor(255, 255, 255);
    doc.rect(margin, y, pageWidth - 2 * margin, 10, 'F');
    doc.setFontSize(12);
    doc.text(`${plucker.name}`, margin + 3, y + 7);
    y += 15;
    
    // Add summary
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Total Collection: ${plucker.totalWeight} kg`, margin, y);
    doc.text(`Total Earnings: LKR ${plucker.totalEarnings}`, margin + 100, y);
    y += 10;
    
    // Add records table header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
    doc.setFontSize(10);
    doc.text("Date", margin + 3, y + 6);
    doc.text("Weight (kg)", margin + 50, y + 6);
    doc.text("Earnings (LKR)", margin + 100, y + 6);
    y += 10;
    
    // Add record rows
    doc.setFontSize(9);
    plucker.records.forEach(record => {
      // Check if we need a new page
      if (y > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y = 20;
        
        // Re-add header on new page
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setFontSize(10);
        doc.text("Date", margin + 3, y + 6);
        doc.text("Weight (kg)", margin + 50, y + 6);
        doc.text("Earnings (LKR)", margin + 100, y + 6);
        y += 10;
        doc.setFontSize(9);
      }
      
      // Add record data
      doc.text(new Date(record.date).toLocaleDateString(), margin + 3, y);
      doc.text(record.weight.toString(), margin + 50, y);
      doc.text(record.earnings.toFixed(2), margin + 100, y);
      y += 6;
    });
    
    // Add spacing between pluckers
    y += 10;
  });
  
  // Add summary at the end
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Check if we need a new page for summary
  if (y > doc.internal.pageSize.height - 40) {
    doc.addPage();
    y = 20;
  }
  
  // Calculate grand totals
  const totalWeight = pluckerData.reduce((sum, plucker) => sum + plucker.totalWeight, 0);
  const totalEarnings = pluckerData.reduce((sum, plucker) => sum + plucker.totalEarnings, 0);
  
  doc.setDrawColor(22, 160, 133);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  
  doc.setFontSize(12);
  // Use font-weight instead of setFontStyle which doesn't exist in newer jsPDF
  doc.setFont(doc.getFont().fontName, "bold");
  doc.text(`Report Summary - ${pluckerData.length} Pluckers`, margin, y);
  y += 8;
  doc.text(`Total Collection: ${totalWeight} kg`, margin, y);
  doc.text(`Total Earnings: LKR ${totalEarnings.toFixed(2)}`, margin + 100, y);
  
  // Save the PDF
  const fileName = `plucker_records_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};