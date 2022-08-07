import { Pipe, PipeTransform } from '@angular/core';
import { Line } from 'src/models/line.model';

@Pipe({
  name: 'lineWidthStyle',
  pure: true,
})
export class LineWidthStylePipe implements PipeTransform {
  transform(lines: Array<Line>): String {
    if (!lines) {
      return '0%';
    }
    
    return (1 / lines.length) * 100 + '%';
  }
}
