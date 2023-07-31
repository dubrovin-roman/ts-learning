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
