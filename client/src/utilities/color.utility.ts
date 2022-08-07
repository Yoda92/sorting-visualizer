import { Color } from 'src/models/color.model';

export class ColorUtility {
  public static mapToClass(color: Color) {
    switch (color) {
      case Color.Green: {
        return 'bg-green-500';
      }
      case Color.Red: {
        return 'bg-red-500';
      }
      default: {
        return 'bg-zinc-300';
      }
    }
  }
}
