export type DeviceMode = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export interface UserSession {
  role: 'guest' | 'customer' | 'admin';
  name?: string;
  email?: string;
}
