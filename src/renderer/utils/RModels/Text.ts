import { RModel } from '../RModel';
import { Font } from 'opentype.js';
import * as makerjs from 'makerjs';
import { IModel } from 'makerjs';
export default class Text extends RModel {
  iModel: IModel | undefined;
  glypes: Array<RModel> | undefined;
  constructor(
    public text: string,
    public fontSize: number,
    public font: Font,
    public centerCharacterOrigin: boolean = false,
    strokeColor?: string,
    strokeWidth?: number
  ) {
    super(strokeWidth, strokeColor);
    this.iModel = new makerjs.models.Text(
      this.font,
      this.text,
      this.fontSize,
      this.centerCharacterOrigin
    );
  }
}
