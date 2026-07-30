export interface DemoRequestPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
}

export type DemoRequestFieldErrors = Partial<Record<keyof DemoRequestPayload, string>>;

export interface DemoRequestResponse {
  success: boolean;
  errors?: DemoRequestFieldErrors;
  message?: string;
}
