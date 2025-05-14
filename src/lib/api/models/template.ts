import { Document } from "./document";
export interface Template {
  document_id: number;
  document_name: string;
  document_type: number;
  file_path: string;
  coordinator_id: number;
  document: Document;
  description: string;
}
export interface TemplateResponse {
  message: string;
  data: Template;
}
export interface TemplatesPaginated {
  items: Template[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
