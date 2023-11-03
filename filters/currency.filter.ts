export default function currencyFilter (value: any, currency = 'RUB') {
  return new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency
  }).format(value)
}
