enum STATUS {
  ERROR = 1,
  SUCCESS = 0,
}

export default interface HttpSend<Data = unknown> {
  message: string;
  status: STATUS;
  data?: Data;
}
