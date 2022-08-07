import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'src/models/color.model';
import { ColorUtility } from 'src/utilities/color.utility';

@Pipe({
  name: 'lineColorClass',
  pure: true,
})
export class LineColorClassPipe implements PipeTransform {
  transform(color: Color): String {
    if (!color) {
      return ColorUtility.mapToClass(Color.Default);
    }

    return ColorUtility.mapToClass(color);
  }
}
