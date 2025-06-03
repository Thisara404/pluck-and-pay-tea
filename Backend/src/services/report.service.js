const Record = require('../models/Record');
const Plucker = require('../models/Plucker');
const Payment = require('../models/Payment');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

exports.generatePluckerReport = async (startDate, endDate) => {
  try {
    const pluckers = await Plucker.find();
    const records = await Record.find({
      date: { $gte: startDate, $lte: endDate }
    });
    const payments = await Payment.find({
      date: { $gte: startDate, $lte: endDate }
    });

    const doc = new PDFDocument();
    const fileName = `plucker-report-${new Date().getTime()}.pdf`;
    const filePath = path.join(__dirname, '../uploads', fileName);

    // Pipe PDF to file
    return new Promise((resolve, reject) => {
      doc.pipe(fs.createWriteStream(filePath));

      // Add header
      doc.fontSize(20).text('Plucker Performance Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Period: ${startDate} to ${endDate}`, { align: 'center' });
      doc.moveDown();

      // Create table data
      const tableData = {
        headers: ['Name', 'Total Collection (kg)', 'Total Earnings (LKR)', 'Status'],
        rows: []
      };

      // Calculate data for each plucker
      pluckers.forEach(plucker => {
        const pluckerRecords = records.filter(r => 
          r.pluckerDetails?.some(pd => pd.pluckerId.toString() === plucker._id.toString())
        );

        const totalCollection = pluckerRecords.reduce((sum, r) => {
          const pluckerDetail = r.pluckerDetails.find(
            pd => pd.pluckerId.toString() === plucker._id.toString()
          );
          return sum + (pluckerDetail?.weight || 0);
        }, 0);

        const pluckerPayments = payments.filter(p =>
          p.details?.some(d => d.plucker.toString() === plucker._id.toString())
        );

        const totalEarnings = pluckerPayments.reduce((sum, p) => {
          const paymentDetail = p.details.find(
            d => d.plucker.toString() === plucker._id.toString()
          );
          return sum + (paymentDetail?.amount || 0);
        }, 0);

        tableData.rows.push([
          plucker.name,
          totalCollection.toFixed(2),
          totalEarnings.toFixed(2),
          plucker.status
        ]);
      });

      // Draw table
      doc.table(tableData, {
        prepareHeader: () => doc.font('Helvetica-Bold'),
        prepareRow: () => doc.font('Helvetica')
      });

      // Finalize PDF
      doc.end();
      doc.on('finish', () => {
        resolve({
          filePath,
          fileName,
          url: `/uploads/${fileName}`
        });
      });
      doc.on('error', reject);
    });
  } catch (error) {
    throw error;
  }
};