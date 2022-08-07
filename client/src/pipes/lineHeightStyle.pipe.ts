import { Pipe, PipeTransform } from '@angular/core';
import { Line } from 'src/models/line.model';
import { ArrayUtility } from 'src/utilities/array.utility';

@Pipe({
  name: 'lineHeightStyle',
  pure: true,
})
export class LineHeightStylePipe implements PipeTransform {
  transform(value: number, maxValue: number): String {
    if (!value || !maxValue) {
      return '0%';
    }

    return Math.min(value / maxValue, 1) * 100 + '%';
  }
}
