import {ReportCycleItem} from './report-cycle-item'
export interface ReportCycle {
    cycle_id: number;
    name: string;
    folder_name: string;
    start_date: string;   // ISO date, e.g. "2025-01-15"
    end_date: string;     // ISO date, e.g. "2025-06-15"
    items?: ReportCycleItem[];
  }
  
  export interface ReportCycleResponse {
    message: string;
    data: ReportCycle;
  }
  
  export interface ReportCyclesPaginated {
    items: ReportCycle[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }