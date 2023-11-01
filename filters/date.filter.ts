import { IStandartDateFilter } from './date.filters.types'

export default function dateFilter (value: Date, format = 'date') {
  // Фильтр для отображения текущего времени в привычном формате
  const options: IStandartDateFilter = {
    day: undefined,
    month: undefined,
    year: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined
  }

  if (format.includes('date')) { // Если в функцию предали тип date, то отображаем день.мес.год
    options.day = '2-digit' // 2 Цифры
    options.month = 'short' // Месяц сокращенно
    options.year = 'numeric' // Отображение года
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value))
}
