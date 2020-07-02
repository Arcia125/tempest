import { BrowserWindow } from 'electron';
import log from 'electron-log';

import { LCUPluginEvent } from '../../src/shared/LCUPluginEvent';
import { Emitter } from '../Emitter';

const getPlugin = (eventUri: string): LCUPluginEvent => eventUri.split('/')[1] as LCUPluginEvent;

const plugins = Object.values(LCUPluginEvent);

export class LCUEventEmitter extends Emitter<Record<LCUPluginEvent, any>> {

  public handleJsonApiEvent(event: { uri: string }) {
    const plugin = getPlugin(event.uri);
    if (plugins.includes(plugin)) this.emit(plugin, event);
    else {
      log.warn(`Unimplemented event plugin ${plugin} ${event.uri}`);
      this.emit(plugin, event);
    }
    // switch (plugin) {
    //   case LCUPluginEvent.CHAMP_SELECT:
    //   case LCUPluginEvent.MATCHMAKING:
    //     this.emit(plugin, event);
    //     break;
    //   default: {
    //     console.warn(`Unimplemented event plugin ${plugin} ${event.uri}`);
    //     this.emit(plugin as LCUPluginEvent, event);
    //   }
    // }
  }

  private emitOn(emit: LCUEventEmitter["emit"], pluginEventKey: LCUPluginEvent) {
    this.on(pluginEventKey, event => {
      log.info('emitting', pluginEventKey);
      emit(pluginEventKey, event);
    });
  }
  private emitOnWindow(window: BrowserWindow, pluginEventKey: LCUPluginEvent) {
    this.emitOn(window.webContents.send.bind(window.webContents), pluginEventKey);
  }

  public registerWindowEmitters(window: BrowserWindow, pluginEventKeys: LCUPluginEvent[]) {
    log.info('Registering plugins on window');
    pluginEventKeys.forEach(pluginEventKey => {
      log.info(`   ${pluginEventKey}`);
      this.emitOnWindow(window, pluginEventKey);
    })
  }
}
