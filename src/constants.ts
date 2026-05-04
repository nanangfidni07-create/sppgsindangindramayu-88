export const SCHOOLS = [
  "SDN Dermayu",
  "TK Gandasari",
  "Al Maadi",
  "Al Wasliyah",
  "MTS Al-Wasliyah",
  "SMP Al-Irsyad",
  "KB Ushafa",
  "TK Ushafa",
  "SD Al-Khoir",
  "SDN 1 Sindang",
  "SDN 2 Sindang",
  "SD Al-Irsyad",
  "SMA PGRI 2 Sindang"
];

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}
