import { NextResponse } from "next/server";

type ApiResponse<T = any> = {
  code: number;
  msg: string;
  data?: T;
};

export function apiResponse<T>({
  data,
  msg = "success",
  code = 0,
  status = 200
}: {
  data?: T;
  msg?: string;
  code?: number;
  status?: number;
}): NextResponse {
  const response: ApiResponse<T> = {
    code,
    msg,
    data,
  };
  return NextResponse.json(response, { status });
}

export function apiErrorResponse({
  msg = "error",
  code = 1,
  status = 400
}: {
  msg?: string;
  code?: number;
  status?: number;
}): NextResponse {
  return apiResponse({ msg, code, status });
}
