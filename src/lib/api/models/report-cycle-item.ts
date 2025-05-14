

  import { ReportCycle } from "./report-cycle";

export interface ReportCycleItem {
  item_id: number;
  cycle_id: number;
  report_number: number;
  title: string;
  start_date: string;   // ISO date
  end_date: string;     // ISO date
  cycle?: ReportCycle;
}

export interface ReportCycleItemResponse {
  message: string;
  data: ReportCycleItem;
}

export interface ReportCycleItemsPaginated {
  items: ReportCycleItem[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}