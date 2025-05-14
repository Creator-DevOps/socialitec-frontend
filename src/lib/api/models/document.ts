export interface Document{
    document_id:number;
    document_name:string;
    document_type:number;
    file_path:string;
    coordinator_id:number;
}
export interface DocumentResponse {
  message: string;
  data: Document;
}
