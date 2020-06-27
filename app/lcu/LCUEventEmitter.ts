import { ipcMain } from 'electron';

import { Emitter } from '../Emitter';
import { LCUPluginEvent } from './LCUPluginEvent';

const getPlugin = (eventUri: string) => eventUri.split('/')[1];

export class LCUEventEmitter extends Emitter<Record<LCUPluginEvent, any>> {
  constructor() {
    super();
    this.emitOnIPCMain(LCUPluginEvent.CHAMP_SELECT);
    this.emitOnIPCMain(LCUPluginEvent.MATCHMAKING);
  }

  public handleJsonApiEvent(event: { uri: string }) {
    const plugin = getPlugin(event.uri);
    switch (plugin) {
      case LCUPluginEvent.CHAMP_SELECT: {
        this.emit(LCUPluginEvent.CHAMP_SELECT, event);
        break;
      }
      case LCUPluginEvent.MATCHMAKING: {
        this.emit(LCUPluginEvent.MATCHMAKING, event);
        break;
      }
      default: {
        console.warn(`Unimplemented event ${plugin} plugin`);
        this.emit(plugin as LCUPluginEvent, event);
      }
    }
  }

  public emitOnIPCMain(pluginEventKey: LCUPluginEvent) {
    this.on(pluginEventKey, event => {
      ipcMain.emit(pluginEventKey, event);
    });
  }
}
