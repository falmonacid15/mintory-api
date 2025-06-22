export interface AuthResponse {
  accessToken: string;
  payload: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
  };
  message: string;
}
