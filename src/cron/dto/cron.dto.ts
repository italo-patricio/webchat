/**
 *
    Seconds: 0-59
    Minutes: 0-59
    Hours: 0-23
    Day of Month: 1-31
    Months: 0-11 (Jan-Dec)
    Day of Week: 0-6 (Sun-Sat
    http://crontab.org/
 */
export class CronDto {
  name: string;
  second = '*';
  minute = '*';
  hour = '*';
  dayOfMonth = '*';
  month = '*';
  dayOfWeek = '*';

  constructor(obj: any) {
    Object.assign(this, obj);
  }

  get timeStr() {
    return `${this.second} ${this.minute} ${this.hour} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;
  }
}
