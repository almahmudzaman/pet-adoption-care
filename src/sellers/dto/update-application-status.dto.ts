export class UpdateApplicationStatusDto {
  status: 'approved' | 'rejected';
  reason?: string;
}
