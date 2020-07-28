import LCUConnector from 'lcu-connector';
import { LCUData } from '../../src/shared/LCUData';


export class LCUConnection {
  public lcuData: LCUData;
  private lcuConnectionPromise: Promise<LCUData> | null = null;

  private createLCUConnection() {
    return new Promise<LCUData>((resolve, reject) => {
      let resolved = false;
      this.lcuConnector.on('connect', (data) => {
        const lcuData = data as unknown as LCUData;
        this.lcuData = lcuData
        if (!resolved) {
          resolve(lcuData);
          resolved = true;
        }
      });
      this.lcuConnector.start();
    });
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
