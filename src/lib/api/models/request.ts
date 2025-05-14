import { Program } from "./program";
import { Institution } from "./institution";
import {Student} from "./student"
export interface Request{
    request_id:number;
    student_id:number;
    program_id:number;
    cycle_id:number;
    coordinator_id:number;
    acceptance_status:number;
    progress_status:number;
    completed_hours:number;
    feedback:string;
    student:Student;
    institution:Institution;
    program:Program;
    created_at:Date,
    updated_at:Date
}
export interface RequestResponse {
  message: string;
  data: Request;
}

export interface RequestsPaginated {
  items: Request[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
