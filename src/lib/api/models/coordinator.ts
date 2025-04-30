export interface Coordinator {
    user_id: number;
    name: string;
    email: string;
    departament: string;
    user_type: number;
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
  