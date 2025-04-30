export interface ErrorDetail {
    loc: string[];
    msg: string;
    type: string;
  }
  
  export interface ErrorResponse {
    detail: string | ErrorDetail[];
  }
  
  export interface ErrorObj {
    error: string;
    message: string;
    code?: number;
    api_error?: ErrorDetail[];}