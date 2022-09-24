import EventEmitter from "events";

export default class CustomEvents {
  events: EventEmitter;
  rejections: {
    [key: string]: {
      reject: (error: Error) => void;
      extend: (time: number) => void;
      cancel: () => void;
    };
  };

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
    timeoutSeconds = 60 * 2 // 2 minutes
  ) {
    return new Promise((resolve, reject) => {
      if (this.rejections[successEvent]) {
        this.rejections[successEvent].cancel();
        this.rejections[successEvent].reject(Error(`Retrying`));
        delete this.rejections[successEvent];
      }
      let onSuccess: (params: any) => void;
      let onFailure: (message: string) => void;
      let timeout: NodeJS.Timeout;
      const extend = (time: number = 60 * 2) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.events.removeListener(successEvent, onSuccess);
          delete this.rejections[successEvent];
          rejectEvent && this.events.removeListener(rejectEvent, onFailure);
          reject(Error(`Timeout`));
        }, time * 1000);
      };
      const cancel = () => clearTimeout(timeout);
      onSuccess = (params: any) => {
        cancel();
        delete this.rejections[successEvent];
        rejectEvent && this.events.removeListener(rejectEvent, onFailure);
        resolve(params);
      };
      onFailure = (message: string) => {
        cancel();
        delete this.rejections[successEvent];
        this.events.removeListener(successEvent, onSuccess);
        reject(Error(message));
      };
      this.rejections[successEvent] = { reject, cancel, extend };
      extend(timeoutSeconds);
      this.events.once(successEvent, onSuccess);
      rejectEvent && this.events.once(rejectEvent, onFailure);
    });
  }

  extendTimeout(successEvent: string, timeoutSeconds: number) {
    if (this.rejections[successEvent]) {
      this.rejections[successEvent].extend(timeoutSeconds);
      return true;
    }
    return false;
  }

  emit(event: string, params?: any) {
    this.events.emit(event, params);
  }

  removeAllListeners(reason?: string) {
    this.events.removeAllListeners();
    for (const id in this.rejections) {
      try {
        this.rejections[id].cancel();
        this.rejections[id].reject(Error(reason || "no reason"));
      } catch (err) {}
    }
    this.rejections = {};
  }
}
