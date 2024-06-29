import * as MakerJs from 'makerjs';
import RPath from './RPath';

export interface RModel {
  strokeColor: string | undefined;
  strokeWidth: number | undefined;
  rotation: number | undefined;
  iModel: MakerJs.IModel | undefined;
  toIModel(): MakerJs.IModel;
  isEqual(other: RModel): boolean;
  toSVG(): string;
  toRPath(): RPath;
}
export class RModel implements RModel {
  constructor(strokeWidth?: number, strokeColor?: string, rotation?: number) {
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
    this.rotation = rotation;
  }
}
