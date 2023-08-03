enum StatusCode {
  SUCCESS = "success",
  IN_PROCESS = "in_process",
  FAILED = "failed",
}

const result = {
  statusCode: StatusCode.SUCCESS,
  message: "перевод выполнен",
};

const enum Role {
  ADMIN = 1,
  USER = 2,
}

const userRole = Role.ADMIN;
