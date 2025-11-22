export function subDateDays(date: Date, subDays: number) {
  return new Date(date.getTime() - 86400000 * subDays);
}

export function getDatePart(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseCommaFloat(str: string): number {
  if (typeof str === 'string') {
    return parseFloat(str.replace(',', '.'));
  }
  return str;
}
