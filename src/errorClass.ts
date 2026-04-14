export class AppErrorClass extends Error {
  statusCode: number;
  msg: string;
  constructor(statusCode: number, msg: string) {
    super(msg);

    this.statusCode = statusCode;
    this.msg = msg;
  }
}
