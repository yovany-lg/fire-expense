const options = { style: 'currency', currency: 'USD' };
const numberFormat = new Intl.NumberFormat('en-US', options);

export function amountFormat(amount = 0): string {
  return numberFormat.format(amount);
}