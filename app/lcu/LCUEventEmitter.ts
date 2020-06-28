import { ipcMain, BrowserWindow } from 'electron';

import { Emitter } from '../Emitter';
import { LCUPluginEvent } from './LCUPluginEvent';

const getPlugin = (eventUri: string) => eventUri.split('/')[1];

const plugins = Object.values(LCUPluginEvent);

export class LCUEventEmitter extends Emitter<Record<LCUPluginEvent, any>> {
  constructor() {
    super();
  }

  public handleJsonApiEvent(event: { uri: string }) {
    const plugin = getPlugin(event.uri);
    if (plugins.includes(plugin as LCUPluginEvent)) this.emit(plugin as LCUPluginEvent, event);
    else {
      console.warn(`Unimplemented event plugin ${plugin} ${event.uri}`);
      this.emit(plugin as LCUPluginEvent, event);
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

  private emitOnIPCMain(pluginEventKey: LCUPluginEvent) {
    this.on(pluginEventKey, event => {
      console.log('emitting', pluginEventKey);
      ipcMain.emit(pluginEventKey, event);
    });
  }

  public registerIpcMainEmitters(pluginEvents: LCUPluginEvent[]) {
    pluginEvents.forEach(pluginEvent => {
      console.log(`registering plugin ${pluginEvent}`)
      this.emitOnIPCMain(pluginEvent);
    });
  }

  private emitOnWindow(window: BrowserWindow, pluginEventKey: LCUPluginEvent) {
    this.on(pluginEventKey, event => {
      window.webContents.send(pluginEventKey, event);
    })
  }

  public registerWindowEmitters(window: BrowserWindow, pluginEventKeys: LCUPluginEvent[]) {
    console.log('Regisering plugins on window');
    pluginEventKeys.forEach(pluginEventKey => {
      console.log(`   ${pluginEventKey}`);
      this.emitOnWindow(window, pluginEventKey);
    })
  }
}
