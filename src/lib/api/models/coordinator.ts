export interface Coordinator {
    user_id: number;
    name: string;
    email: string;
    departament: string;
    user_type: number;
  }
  export interface Admin{
        user_id: number;
    name: string;
    email: string;
     position:string;
     user_type:number;
  }
  export interface User {
  user_id: number;
  name: string;
  email: string;
  user_type: number;
  position?: string;
  departament?: string;
  control_number?: string;
  major?: string;
  semester?: number;
  credits?: number;
  status?: string;
  hours?: number;
}

  
  export interface CoordinatorResponse {
    message: string;
    data: Coordinator;
  }
  
  export interface CoordinatorsPaginated {
    items: Coordinator[];
    limit: number;
    page: number;
    pages: number;
    total: number;
  }
  