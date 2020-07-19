import { EventEmitter } from 'events';

type EventMap = Record<string | number | symbol, any>;

export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T> = (params: T) => void;

export interface BaseEmitter<T extends EventMap> {
  on<K extends EventKey<T>>
    (eventName: K, fn: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>
    (eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>
    (eventName: K, params: T[K]): void;
}

/**
 * @description utility function to create a typesafe EventEmitter
 */
function createEmitter<T extends EventMap>(): BaseEmitter<T> {
  return new EventEmitter();
}

/**
 * @description event emitter utility that allows typesafe EventEmitters.
 */
export class Emitter<T extends EventMap> implements BaseEmitter<T> {
  private innerEmitter = createEmitter();

  on<K extends EventKey<T>>(channel: K, receiver: EventReceiver<T[K]>) {
    this.innerEmitter.on(channel, receiver);
  }

  off<K extends EventKey<T>>(channel: K, receiver: EventReceiver<T[K]>) {
    this.innerEmitter.off(channel, receiver);
  }

  emit<K extends EventKey<T>>(topic: K, params: T[K]) {
    this.innerEmitter.emit(topic, params);
  }
}
