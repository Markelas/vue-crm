interface IStandartDateFilter {
  month: '2-digit' | 'numeric' | 'short' | 'long' | 'narrow' | undefined;
  hour?: '2-digit' | 'numeric' | undefined;
  year: '2-digit' | 'numeric' | undefined;
  day: '2-digit' | 'numeric' | undefined;
  minute?: '2-digit' | 'numeric' | undefined;
  second?: '2-digit' | 'numeric' | undefined;
}

export type { IStandartDateFilter }
