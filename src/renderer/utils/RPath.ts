import { IModel, IPath } from 'makerjs';
import { RModel } from './RModel';

export default class RPath {
  iPathList: Array<IPath> | undefined;
  constructor() {
    this.iPathList = [];
  }
  static getNestedPath(iModel: IModel): IPath[] {
    let returnArray: IPath[] = [];
    Object(iModel.models)
      .entries()
      .forEach(([, value]: [string, IModel]) => {
        if (Object.entries(value.models || {}).length > 0) {
          returnArray = returnArray.concat(this.getNestedPath(value));
        } else {
          for (let key in value.paths) {
            returnArray.push(value.paths[key]);
          }
        }
      });
    return returnArray;
  }
  static fromRModel(rModel: RModel): RPath {
    let rPath = new RPath();
    rPath.iPathList = this.getNestedPath(rModel.toIModel());
    return rPath;
  }
  static fromIModel(iModel: IModel): RPath {
    let rPath = new RPath();
    rPath.iPathList = this.getNestedPath(iModel);
    return rPath;
  }
}
