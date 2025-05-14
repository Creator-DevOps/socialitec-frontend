export interface Student {
    user_id: number;
    name: string;
    email: string;
    control_number: string;
    major: string;
    semester: number;
    credits: number;
    user_type: number;
  }
  
  export interface StudentResponse {
    message: string;
    data: Student;
  }
  
  export interface StudentsPaginated {
    items: Student[];
    limit: number;
    page: number;
    pages: number;
    total: number;
  }