import EventEmitter from "events";

export default class CustomEvents {
  events: EventEmitter;
  pending: {
    [key: string]: {
      reject: (error: Error) => void;
      reset: (time: number) => void;
      clear: () => void;
    };
  };

  constructor() {
    this.events = new EventEmitter();
    this.events.setMaxListeners(0);
    this.pending = {};
  }

  once(event: string, listener: (params: any) => void) {
    this.events.once(event, listener);
    return () => this.events.removeListener(event, listener);
  }

  wait(
    successEvent: string,
    rejectEvents?: string | null | string[],
    timeoutSeconds = 60 * 2 // 2 minutes
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.pending[successEvent]) {
        this.pending[successEvent].clear();
        this.pending[successEvent].reject(Error(`Retrying`));
        delete this.pending[successEvent];
      }
      let onSuccess: (params: any) => void;
      let onFailure: (message: string) => void;
      let timeout: NodeJS.Timeout;
      const clear = () => clearTimeout(timeout);
      const removeListeners = () => {
        delete this.pending[successEvent];
        this.events.removeListener(successEvent, onSuccess);
        if (rejectEvents) {
          if (typeof rejectEvents === "string") {
            this.events.removeListener(rejectEvents, onFailure);
          } else if (Array.isArray(rejectEvents)) {
            for (const event of rejectEvents) {
              this.events.removeListener(event, onFailure);
            }
          }
        }
      };
      const reset = (time: number = 60 * 2) => {
        clear();
        timeout = setTimeout(() => {
          removeListeners();
          reject(Error(`Timeout`));
        }, time * 1000);
      };
      onSuccess = (params: any) => {
        clear();
        removeListeners();
        resolve(params);
      };
      onFailure = (message?: string) => {
        clear();
        removeListeners();
        reject(Error(message || "no reason"));
      };
      this.pending[successEvent] = { reject, clear, reset };
      reset(timeoutSeconds);
      this.events.once(successEvent, onSuccess);
      if (rejectEvents) {
        if (typeof rejectEvents === "string") {
          this.events.once(rejectEvents, onFailure);
        } else if (Array.isArray(rejectEvents)) {
          for (const event of rejectEvents) {
            this.events.once(event, onFailure);
          }
        }
      }
    });
  }

  resetTimeout(successEvent: string, timeoutSeconds: number) {
    if (this.pending[successEvent]) {
      this.pending[successEvent].reset(timeoutSeconds);
      return true;
    }
    return false;
  }

  emit(event: string, params?: any) {
    this.events.emit(event, params);
  }

  removeAllListeners(reason?: string) {
    this.events.removeAllListeners();
    for (const id in this.pending) {
      try {
        this.pending[id].clear();
        this.pending[id].reject(Error(reason || "no reason"));
      } catch (err) {}
    }
    this.pending = {};
  }
}
