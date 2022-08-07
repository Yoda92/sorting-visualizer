import { Color } from "./color.model";

export class Line {
    value: number;
    color: Color;

    constructor(value: number, color: Color) {
        this.value = value;
        this.color = color;
    }
}