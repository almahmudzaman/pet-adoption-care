export class PaymentHistoryQueryDto {
  status?: 'pending' | 'completed' | 'failed';
  startDate?: Date;
  endDate?: Date;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}
