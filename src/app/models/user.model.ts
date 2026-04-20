/**
 * Represents an administrative user from API.
 */
export interface User {
  id: number;
  email: string;
  username: string;
  phone?: string;
  name: {
    firstname: string;
    lastname: string;
  };
}
