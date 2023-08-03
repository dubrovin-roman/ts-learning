enum PaymentStatus {
  SUCCESS = "success",
  FAILED = "failed",
}

interface IPayment {
  sum: number;
  from: number;
  to: number;
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
  databaseId: number;
}

interface IDataFailed {
  errorMessage: string;
  errorCode: number;
}

interface IPaymentResponseSuccess {
  status: PaymentStatus.SUCCESS;
  data: IDataSuccess;
}

interface IPaymentResponseFailed {
  status: PaymentStatus.FAILED;
  data: IDataFailed;
}

type Resp = IPaymentResponseSuccess | IPaymentResponseFailed;

function isIPaymentResponseSuccess(
  response: Resp
): response is IPaymentResponseSuccess {
  return (response as IPaymentResponseSuccess).status === PaymentStatus.SUCCESS;
}

function getDatabaseIdSuccess(resp: Resp): number {
  if (isIPaymentResponseSuccess(resp)) {
    return resp.data.databaseId;
  } else {
    throw new Error(`${resp.data.errorMessage}`);
  }
}
