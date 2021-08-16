import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'thaiDate'
})
export class ThaiDatePipe implements PipeTransform {

  transform(value: any, args: string = 'long'): any {
    if (args === 'full') {
      const thDate = `${moment(value).locale('th').format('DD MMMM')} ${moment(value).get('year') + 543}`;
      return thDate;
    } else if (args === 'medium') {
      const thDate = `${moment(value).locale('th').format('DD MMM')} ${moment(value).get('year') + 543}`;
      return thDate;
    } else if (args === 'short') {
      const thDate = `${moment(value).locale('th').add(543, 'year').format('DD MMM YY')} `;
      return thDate;
    } else if (args === 'short2') {
      const thDate = `${moment(value).locale('th').add(543, 'year').format('DD/MM/YYYY')} `;
      return thDate;
    }else if (args === 'thdatetime') {
      const thDate = `${moment(value).locale('th').add(-7, 'hours').add(543, 'year').format('DD MMM YY HH:mm')} `;
      return thDate;
    }else {
      const thDate = `${moment(value).locale('th').format('DD MM')} ${moment(value).get('year') + 543}`;
      return thDate;
    }
  }


}
