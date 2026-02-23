export class PetFilterQueryDto {
  species?: string;
  breed?: string;
  status?: string;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}
