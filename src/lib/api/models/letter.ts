import {Document} from './document';
import { Request } from "./request";
export interface Letter{
    document:Document;
    document_id:number;
    document_name:string;
    document_type:number;
    file_path:string;
    coordinator_id:number;
    request_id:number;
    request:Request
}
export interface LetterResponse {
  message: string;
  data: Letter;
}
export interface LettersPaginated {
  items: Letter[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}