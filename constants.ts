
import { Client, Invoice, InvoiceStatus, Settings } from './types';

export const clients: Client[] = [
  { id: 'c1', name: 'Rohan Sharma', email: 'rohan.s@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=c1', address: '123 Tech Park, Bengaluru, 560100', gstNumber: '29ABCDE1234F1Z5' },
  { id: 'c2', name: 'Priya Patel', email: 'priya.p@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=c2', address: '456 Business Hub, Mumbai, 400050', gstNumber: '27FGHIJ5678K1Z4' },
  { id: 'c3', name: 'Amit Singh', email: 'amit.s@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=c3', address: '789 Commerce Center, Delhi, 110001', gstNumber: '07LMNOP9101Q1Z3' },
  { id: 'c4', name: 'Sneha Reddy', email: 'sneha.r@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=c4', address: '101 Innovation Plaza, Hyderabad, 500081', gstNumber: '36RSTUV1122W1Z2' },
];

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-001',
    client: clients[0],
    items: [{ id: 'i1', description: 'Web Development Services', quantity: 40, rate: 375 }],
    issueDate: '2024-07-20',
    dueDate: '2024-08-04',
    status: InvoiceStatus.Paid,
    notes: 'Thank you for your business.',
    subtotal: 15000, gst: 2700, total: 17700,
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-002',
    client: clients[1],
    items: [{ id: 'i1', description: 'UI/UX Design Retainer', quantity: 1, rate: 22500 }],
    issueDate: '2024-07-15',
    dueDate: '2024-07-30',
    status: InvoiceStatus.Pending,
    notes: 'Monthly retainer for July.',
    subtotal: 22500, gst: 4050, total: 26550,
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-003',
    client: clients[2],
    items: [{ id: 'i1', description: 'Logo Design', quantity: 1, rate: 8000 }],
    issueDate: '2024-06-10',
    dueDate: '2024-06-25',
    status: InvoiceStatus.Overdue,
    notes: '',
    subtotal: 8000, gst: 1440, total: 9440,
  },
  {
    id: 'inv4',
    invoiceNumber: 'INV-2024-004',
    client: clients[3],
    items: [{ id: 'i1', description: 'Content Writing (10 articles)', quantity: 10, rate: 3500 }],
    issueDate: '2024-07-22',
    dueDate: '2024-08-06',
    status: InvoiceStatus.Pending,
    notes: 'As per our agreement.',
    subtotal: 35000, gst: 6300, total: 41300,
  },
    {
    id: 'inv5',
    invoiceNumber: 'INV-2024-005',
    client: clients[0],
    items: [{ id: 'i1', description: 'Website Maintenance', quantity: 1, rate: 12000 }],
    issueDate: '2024-07-01',
    dueDate: '2024-07-16',
    status: InvoiceStatus.Paid,
    notes: '',
    subtotal: 12000, gst: 2160, total: 14160,
  },
  {
    id: 'inv6',
    invoiceNumber: 'INV-2024-006',
    client: clients[1],
    items: [
        { id: 'i1', description: 'E-commerce Platform Development', quantity: 1, rate: 40000 },
        { id: 'i2', description: 'Domain & Hosting (1 Year)', quantity: 1, rate: 5000 },
    ],
    issueDate: '2024-07-25',
    dueDate: '2024-08-09',
    status: InvoiceStatus.Draft,
    notes: 'Project kickoff invoice.',
    subtotal: 45000, gst: 8100, total: 53100,
  },
];

export const settings: Settings = {
    userName: "Ananya Roy",
    userEmail: "ananya@freelance.com",
    companyName: "Ananya Roy Designs",
    companyAddress: "7th Main, Indiranagar, Bengaluru, 560038",
    companyGst: "29AABBCCDDE1Z2"
};
