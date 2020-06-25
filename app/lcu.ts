import WebSocket from 'ws';

import { Emitter, EventReceiver, EventKey, BaseEmitter } from './Emitter';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export interface LCUData {
  username: string;
  password: string;
  address: string;
  port: string;
}

interface MessageEvent {
  data: any;
  type: string;
  target: WebSocket;
}

export const getLcuUrl = ({ username, password, address, port }: LCUData, endpoint: string, protocol: 'http' | 'https' | 'ws' | 'wss' = 'https', withBasicAuth = true) => {
  const auth = withBasicAuth ? `${username}:${password}@` : '';
  return `${protocol}://${auth}${address}:${port}${endpoint && !endpoint.startsWith('/') ? `/${endpoint}` : endpoint}`;
}

// export const lcuFetch = (lcuData: LCUData, endpoint: string, options: RequestInit) => fetch(getLcuUrl(lcuData, endpoint), options);

enum WEB_SOCKET_MESSAGE {
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

export enum LCU_SOCKET_TOPIC {
  JSONAPIEVENT = 'OnJsonApiEvent'
}

type LCUWebsocketCallback = (this: WebSocket, ev: any) => any;

type WebSocketEmitter = BaseEmitter<Record<LCU_SOCKET_TOPIC, LCUWebsocketCallback>>;


export class LCUWebSocket implements WebSocketEmitter {
  private session: null | string = null;
  private socket: WebSocket;
  private emitter = new Emitter();

  constructor(lcuData: LCUData, endpoint: string) {
    // super(getLcuUrl(lcuData, endpoint, 'ws', false), 'wamp');
    this.socket = new WebSocket(getLcuUrl(lcuData, endpoint, 'wss'), 'wamp');
    this.socket.addEventListener('message', this.onMessage.bind(this))
    this.socket.addEventListener('error', console.log);
  }

  close() {
    this.socket.close();
    this.session = null;
  }

  subscribe(topic: LCU_SOCKET_TOPIC) {
    this.sendMessage(WEB_SOCKET_MESSAGE.SUBSCRIBE, topic);
  }

  unsubscribe(topic: LCU_SOCKET_TOPIC) {
    this.sendMessage(WEB_SOCKET_MESSAGE.UNSUBSCRIBE, topic);
  }

  sendMessage(type: WEB_SOCKET_MESSAGE, topic: LCU_SOCKET_TOPIC) {
    return this.socket.send(JSON.stringify([type, topic]))
  }

  on(topic: LCU_SOCKET_TOPIC, callback: EventReceiver<LCUWebsocketCallback>) {
    this.emitter.on(topic, callback);
  }

  onOpen(cb: Parameters<WebSocket["addEventListener"]>[1]) {
    this.socket.addEventListener('open', cb);
  }

  off(topic: LCU_SOCKET_TOPIC, callback: EventReceiver<LCUWebsocketCallback>) {
    this.emitter.off(topic, callback);
  }

  emit(topic: LCU_SOCKET_TOPIC, callback: EventKey<LCUWebsocketCallback>) {
    throw new Error('did you mean to call emit on an LCUWebSocket?')
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
        const [topic, payload] = data as unknown as [LCU_SOCKET_TOPIC, any];
        this.emitter.emit(topic, payload);
        break;
      }
      default:
        console.log('Unknown type, if you see this file an issue with at https://discord.gg/hPtrMcx with the following data:', [type, data]);
        break;
    }
  }
}