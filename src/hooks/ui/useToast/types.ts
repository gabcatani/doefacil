export enum TOASTTYPE {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
  }
  
  interface IToastFunction {
    type: TOASTTYPE;
    message: string;
  }
  
  export type { IToastFunction };
  