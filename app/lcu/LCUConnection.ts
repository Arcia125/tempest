import LCUConnector from 'lcu-connector';

import { LCUData } from "./LCUData";

export class LCUConnection {
  private lcuConnectionPromise: Promise<LCUData> | null = null;

  private static createLCUConnection(lcuConnector: LCUConnector) {
    return new Promise<LCUData>((resolve, reject) => {
      let resolved = false;
      lcuConnector.on('connect', (data) => {
        if (!resolved) {
          resolve(data as unknown as LCUData);
          resolved = true;
        }
      });
      lcuConnector.start();
    });
  }


  private createLCUConnection() {
    return LCUConnection.createLCUConnection(this.lcuConnector);
  }

  private resetLCUConnection() {
    this.lcuConnector.stop();
    return this.initLCUConnection();
  }


  private initLCUConnection() {
    return (this.lcuConnectionPromise = this.createLCUConnection());
  }


  public constructor(private lcuConnector: LCUConnector) { }


  public init() {
    this.initLCUConnection();

    return this;
  }


  public getLCUData(fresh: boolean = false): Promise<LCUData> {
    if (fresh) {
      return this.resetLCUConnection();
    }
    return this.lcuConnectionPromise || this.initLCUConnection();
  }
}
