export const usersData = [
  { id: 'GFT-1001', name: 'Rahul Sharma', sponsorId: 'GFT-1000', mobile: '+91 9876543210', email: 'rahul@example.com', package: 'GFT-1', designation: 'Silver', status: 'Active', joinDate: '2025-01-15' },
  { id: 'GFT-1002', name: 'Priya Patel', sponsorId: 'GFT-1001', mobile: '+91 9876543211', email: 'priya@example.com', package: 'GFT-2', designation: 'Gold', status: 'Active', joinDate: '2025-02-10' },
  { id: 'GFT-1003', name: 'Amit Singh', sponsorId: 'GFT-1001', mobile: '+91 9876543212', email: 'amit@example.com', package: 'GFT-1', designation: 'None', status: 'Inactive', joinDate: '2025-03-05' },
  { id: 'GFT-1004', name: 'Neha Gupta', sponsorId: 'GFT-1002', mobile: '+91 9876543213', email: 'neha@example.com', package: 'GFT-3', designation: 'Emerald', status: 'Active', joinDate: '2025-04-20' },
  { id: 'GFT-1005', name: 'Vikram Reddy', sponsorId: 'GFT-1004', mobile: '+91 9876543214', email: 'vikram@example.com', package: 'GFT-1', designation: 'None', status: 'Pending', joinDate: '2025-05-12' },
];

export const packagesData = [
  { id: 1, name: 'GFT-1', amount: 50, percentage: 5, status: 'Active' },
  { id: 2, name: 'GFT-2', amount: 100, percentage: 6, status: 'Active' },
  { id: 3, name: 'GFT-3', amount: 250, percentage: 7, status: 'Active' },
  { id: 4, name: 'GFT-4', amount: 500, percentage: 8, status: 'Active' },
  { id: 5, name: 'GFT-5', amount: 1000, percentage: 9, status: 'Active' },
  { id: 6, name: 'GFT-6', amount: 2500, percentage: 10, status: 'Active' },
  { id: 7, name: 'GFT-7', amount: 5000, percentage: 12, status: 'Active' },
  { id: 8, name: 'GFT-8', amount: 10000, percentage: 15, status: 'Active' },
];

export const withdrawalsData = [
  { id: 'W-5001', user: 'Rahul Sharma', amount: 250, wallet: 'Main Wallet', date: '2026-06-20', status: 'Pending' },
  { id: 'W-5002', user: 'Priya Patel', amount: 500, wallet: 'Bonus Wallet', date: '2026-06-18', status: 'Approved' },
  { id: 'W-5003', user: 'Amit Singh', amount: 100, wallet: 'Main Wallet', date: '2026-06-15', status: 'Rejected' },
];

export const dashboardStats = {
  totalUsers: 1254,
  activeUsers: 890,
  inactiveUsers: 214,
  pendingUsers: 150,
  totalPackagesSold: 3450,
  totalTurnover: 1250000,
  totalWithdrawals: 450000,
  totalIncomeDistributed: 800000,
  totalTokensIssued: 5000000,
  totalSupportTickets: 124,
};

export const chartDataRevenue = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 8000 },
];

export const chartDataRegistrations = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 150 },
  { name: 'Wed', users: 180 },
  { name: 'Thu', users: 140 },
  { name: 'Fri', users: 200 },
  { name: 'Sat', users: 250 },
  { name: 'Sun', users: 300 },
];

export const activityFeed = [
  { id: 1, type: 'registration', message: 'New user Rahul Sharma registered', time: '5 mins ago' },
  { id: 2, type: 'kyc', message: 'Priya Patel KYC Approved', time: '1 hour ago' },
  { id: 3, type: 'package', message: 'Amit Singh purchased GFT-3', time: '2 hours ago' },
  { id: 4, type: 'withdrawal', message: 'Withdrawal of $500 requested by Neha', time: '5 hours ago' },
  { id: 5, type: 'token', message: '1000 GFT Tokens earned by Vikram', time: '1 day ago' },
];

export const kycData = [
  { id: 'KYC-001', user: 'Rahul Sharma', docType: 'Aadhaar', status: 'Pending', date: '2026-06-21' },
  { id: 'KYC-002', user: 'Priya Patel', docType: 'PAN', status: 'Approved', date: '2026-06-20' },
  { id: 'KYC-003', user: 'Amit Singh', docType: 'Bank Details', status: 'Rejected', date: '2026-06-19' },
];

export const ticketsData = [
  { id: 'T-101', user: 'Rahul Sharma', category: 'Payment', status: 'Open', date: '2026-06-21' },
  { id: 'T-102', user: 'Priya Patel', category: 'Technical', status: 'Closed', date: '2026-06-18' },
  { id: 'T-103', user: 'Amit Singh', category: 'General', status: 'In Progress', date: '2026-06-20' },
];

export const genealogyNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Rahul Sharma (GFT-1001)' } },
  { id: '2', position: { x: -100, y: 100 }, data: { label: 'Priya Patel (GFT-1002)' } },
  { id: '3', position: { x: 100, y: 100 }, data: { label: 'Amit Singh (GFT-1003)' } },
  { id: '4', position: { x: -150, y: 200 }, data: { label: 'Neha Gupta (GFT-1004)' } },
  { id: '5', position: { x: -50, y: 200 }, data: { label: 'Vikram Reddy (GFT-1005)' } },
];

export const genealogyEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
];

export const designationsData = [
  { id: 1, name: 'Silver', turnover: 5000, percentage: 2, rewards: 'Smartwatch' },
  { id: 2, name: 'Gold', turnover: 15000, percentage: 3, rewards: 'Smartphone' },
  { id: 3, name: 'Emerald', turnover: 50000, percentage: 4, rewards: 'Laptop' },
  { id: 4, name: 'Platinum', turnover: 150000, percentage: 5, rewards: 'Bike' },
  { id: 5, name: 'Diamond', turnover: 500000, percentage: 6, rewards: 'Car' },
];
