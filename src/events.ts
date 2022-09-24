import EventEmitter from "events";

export default class CustomEvents {
  events: EventEmitter;
  rejections: { [key: string]: (reason?: string) => void };

  constructor() {
    this.events = new EventEmitter();
    this.events.setMaxListeners(0);
    this.rejections = {};
  }

  once(event: string, listener: (params: any) => void) {
    this.events.once(event, listener);
    return () => this.events.removeListener(event, listener);
  }

  wait(
    successEvent: string,
    rejectEvent?: string | null,
    timeout = 60 * 2 // 2 minutes
  ) {
    return new Promise((resolve, reject) => {
      const id = `${Math.random()}`;
      this.rejections[id] = reject;
      let onSuccess: any, onFailure: any, t1: any;
      onSuccess = (params: any) => {
        clearTimeout(t1);
        rejectEvent && this.events.removeListener(rejectEvent, onFailure);
        delete this.rejections[id];
        resolve(params);
      };
      onFailure = (message: string) => {
        clearTimeout(t1);
        this.events.removeListener(successEvent, onSuccess);
        delete this.rejections[id];
        reject(Error(message));
      };
      t1 = setTimeout(() => {
        this.events.removeListener(successEvent, onSuccess);
        delete this.rejections[id];
        rejectEvent && this.events.removeListener(rejectEvent, onFailure);
        reject(Error(`Timeout`));
      }, timeout * 1000);
      this.events.once(successEvent, onSuccess);
      rejectEvent && this.events.once(rejectEvent, onFailure);
    });
  }

  emit(event: string, params?: any) {
    this.events.emit(event, params);
  }

  removeAllListeners(reason?: string) {
    this.events.removeAllListeners();
    for (const id in this.rejections) {
      try {
        this.rejections[id](reason);
      } catch (err) {}
    }
    this.rejections = {};
  }
}
