export default class RSvg {
    document: Document;
  constructor(rawSvg: string) {
    const parser = new DOMParser();
    this.document = parser.parseFromString(rawSvg, 'image/svg+xml');
  }
  addEventListener() {

  }
}
