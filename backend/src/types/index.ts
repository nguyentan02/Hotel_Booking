import { Request } from 'express';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  avatarUrl: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface PaginationResult {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
