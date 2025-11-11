
export enum InvoiceStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Overdue = 'Overdue',
  Draft = 'Draft',
}

export type InvoiceTemplate = 'classic' | 'modern' | 'minimalist';

export interface Client {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  address: string;
  gstNumber: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id:string;
  invoiceNumber: string;
  client: Client;
  items: InvoiceItem[];
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  notes: string;
  subtotal: number;
  gst: number;
  total: number;
  template: InvoiceTemplate;
}

export interface Settings {
    userName: string;
    userEmail: string;
    companyName: string;
    companyAddress: string;
    companyGst: string;
    defaultTemplate: InvoiceTemplate;
}