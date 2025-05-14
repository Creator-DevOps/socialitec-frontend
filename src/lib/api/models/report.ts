import { Document } from "./document";
import { Request } from "./request";
export interface Report {
  document_id: number;
  document_name: string;
  item_id:number;
  document_type: number;
  file_path: string;
  coordinator_id: number;
  document: Document;
  request_id: number;
  report_number: number;
  status: number;
  feedback: string;
  request:Request;
}
export interface ReportResponse {
  message: string;
  data: Report;
}
export interface ReportsPaginated {
  items: Report[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
