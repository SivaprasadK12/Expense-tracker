import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const getFormattedDate = () =>
  new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatDate = (fullDate) => {
  return fullDate.split('T')[0] || fullDate;
};

const commonStyles = {
  theme: 'grid',
  headStyles: {
    fillColor: [110, 67, 224], // Violet
    textColor: 255,
    fontStyle: 'bold',
    halign: 'center',
  },
  styles: {
    fontSize: 10,
    cellPadding: 3,
  },
  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },
};

export const downloadIncomePDF = (incomeData = []) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(110, 67, 224);
  doc.text('Income Report', 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Date: ${getFormattedDate()}`, 14, 34);

  const tableColumn = ['Date', 'Source', 'Amount (INR)'];
  const tableRows = incomeData.map((item) => [
    formatDate(item.date),
    item.source,
    item.amount.toLocaleString('en-IN'),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    ...commonStyles,
  });

  const total = incomeData.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.setFont(undefined, 'bold');
  doc.text(
    `Total Expense: INR ${Number(total).toLocaleString('en-IN')}`,
    14,
    doc.lastAutoTable.finalY + 15
    );

  doc.save('income-report.pdf');
};

export const downloadExpensePDF = (expenseData = []) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('Expense Report', 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Date: ${getFormattedDate()}`, 14, 34);

  const tableColumn = ['Date', 'Category', 'Amount (INR)'];
  const tableRows = expenseData.map((item) => [
    formatDate(item.date),
    item.category,
    item.amount.toLocaleString('en-IN'),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    ...commonStyles,
  });

 const total = expenseData.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.setFont(undefined, 'bold');
  doc.text(
    `Total Expense: INR ${Number(total).toLocaleString('en-IN')}`,
    14,
    doc.lastAutoTable.finalY + 15
    );

  doc.save('expense-report.pdf');
};
