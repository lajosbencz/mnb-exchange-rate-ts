import {getDatePart, subDateDays} from './util';

describe('Util', () => {
  it('should subDateDays', () => {
    const date1 = new Date();
    date1.setFullYear(2000, 0, 3);
    const date2 = subDateDays(date1, 1);
    expect(date2.getFullYear()).toEqual(2000);
    expect(date2.getMonth()).toEqual(0);
    expect(date2.getDate()).toEqual(2);
  });
  it('should getDatePart', () => {
    const date = new Date();
    date.setFullYear(2000, 0, 3);
    const datePart = getDatePart(date);
    expect(datePart).toEqual('2000-01-03');
  });
});
