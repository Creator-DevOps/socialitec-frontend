import {Report} from './report'
export interface Institution {
  institution_id: number;
  institution_name: string;
  description: string;
  phone: string;
  email: string;
  neighborhood: string;
  street: string;
  number: string;
  postal_code: string;
  reports:Report[];
}

export interface InstitutionResponse {
  message: string;
  data: Institution;
}

export interface InstitutionsPaginated {
  items: Institution[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
