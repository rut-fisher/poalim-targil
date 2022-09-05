import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      let now = new Date();
      let date = new Date(value);
      if (now.getFullYear() > date.getFullYear() || now.getMonth() > date.getMonth() || now.getDate() > date.getDate())
        return date.toLocaleDateString("en-US");
      var hoursDiff = now.getHours() - date.getHours();
      if (hoursDiff)
        return hoursDiff + " hours ago"
      var minuteDiff = now.getMinutes() - date.getMinutes();
      if (minuteDiff)
        return minuteDiff + "minuts ago"
      var secondDiff = now.getSeconds() - date.getSeconds()
      if (secondDiff)
        return secondDiff + " seconds ago"
    }
    return "";
  }
}
