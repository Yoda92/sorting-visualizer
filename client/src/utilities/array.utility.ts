export class ArrayUtility {
  public static max(array: Array<number>): number {
    if (!array || array.length <= 0) {
      throw new Error();
    }

    return Math.max(...array);
  }

  public static shuffle<T>(array: Array<T>): void {
    if (!array || array.length <= 0) {
      return;
    }

    let currentIndex: number = array.length;
    let randomIndex: number;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
}
