import WebSocket from 'ws';

import { Emitter, EventReceiver, EventKey, BaseEmitter } from '../Emitter';
import { LCUData } from '../../src/shared/LCUData';
import { getLcuUrl } from '../../src/shared/getLcuUrl';
import { LCUSocketTopic } from './LCUSocketTopic';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

interface MessageEvent {
  data: any;
  type: string;
  target: WebSocket;
}

const enum WEB_SOCKET_MESSAGE {
  WELCOME = 0,
  PREFIX = 1,
  CALL = 2,
  CALLRESULT = 3,
  CALLERROR = 4,
  SUBSCRIBE = 5,
  UNSUBSCRIBE = 6,
  PUBLISH = 7,
  EVENT = 8
};

type LCUWebsocketCallback<T> = EventReceiver<(this: WebSocket, ev: T) => any>;

type WebSocketEmitter = BaseEmitter<Record<LCUSocketTopic, LCUWebsocketCallback<any>>>;

export class LCUWebSocket implements WebSocketEmitter {
  private session: null | string = null;
  private socket: WebSocket;
  private emitter = new Emitter();

  constructor(lcuData: LCUData, endpoint: string) {
    // super(getLcuUrl(lcuData, endpoint, 'ws', false), 'wamp');
    this.socket = new WebSocket(getLcuUrl(lcuData, endpoint, 'wss'), 'wamp');
    this.socket.addEventListener('message', this.onMessage.bind(this))
    this.socket.addEventListener('error', console.error);
  }

  close() {
    this.socket.close();
    this.session = null;
  }

  subscribe(topic: LCUSocketTopic) {
    this.sendMessage(WEB_SOCKET_MESSAGE.SUBSCRIBE, topic);
  }

  unsubscribe(topic: LCUSocketTopic) {
    this.sendMessage(WEB_SOCKET_MESSAGE.UNSUBSCRIBE, topic);
  }

  sendMessage(type: WEB_SOCKET_MESSAGE, topic: LCUSocketTopic) {
    return this.socket.send(JSON.stringify([type, topic]))
  }

  on<T>(topic: LCUSocketTopic, callback: LCUWebsocketCallback<T>) {
    this.emitter.on(topic, callback);
  }

  onOpen(cb: Parameters<WebSocket["addEventListener"]>[1]) {
    this.socket.addEventListener('open', cb);
  }

  off<T>(topic: LCUSocketTopic, callback: LCUWebsocketCallback<T>) {
    this.emitter.off(topic, callback);
  }

  emit<T>(topic: LCUSocketTopic, callback: EventKey<LCUWebsocketCallback<T>>): never {
    throw new Error('did you mean to call emit on an LCUWebSocket?');
  }

  private onMessage(message: MessageEvent) {
    if (!message.data) {
      console.warn('malformed message', message);
      return;
    }
    const [type, ...data]: [WEB_SOCKET_MESSAGE, any[]] = JSON.parse(message.data);

    if (type == null) throw new Error(`MALFORMED WEBSOCKET MESSAGE: Invalid WEB_SOCKET_MESSAGE type ${type}`);
    switch (type) {
      case WEB_SOCKET_MESSAGE.WELCOME:
        this.session = data?.[0] as unknown as string;
        console.log('session', this.session);
        // this.protocolVersion = data[1];
        // this.details = data[2];
        break;
      case WEB_SOCKET_MESSAGE.CALLRESULT:
        console.log('Unknown call, if you see this file an issue at https://discord.gg/hPtrMcx with the following data:', data);
        break;
      case WEB_SOCKET_MESSAGE.EVENT: {
        const [topic, payload] = data as unknown as [LCUSocketTopic, any];
        this.emitter.emit(topic, payload);
        break;
      }
      default:
        console.log('Unknown type, if you see this file an issue with at https://discord.gg/hPtrMcx with the following data:', [type, data]);
        break;
    }
  }
}