/**
 * Represents an administrative user from API.
 */
export interface User {
  id: number;
  email: string;
  username: string;
  phone?: string;
  name_first: string;
  name_last: string;
  role?: string;
  created_at?: string;
}