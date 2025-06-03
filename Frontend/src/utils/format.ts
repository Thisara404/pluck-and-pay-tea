export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR'
  }).format(num);
};

export const formatCurrency = (amount: number) => {
  return `LKR ${amount.toFixed(2)}`;
};

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};