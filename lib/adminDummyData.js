/**
 * Green Future Technology (GFT) — Admin Fallback & Display Constants
 * Cleaned: Zero mock financial records, zero fake users, zero fake payouts.
 */

export const usersData = [];

export const packagesData = [
  { id: 'pkg_gft_1', name: 'GFT-1', amount: 3000, percentage: 5, status: 'Pending Confirmation' },
  { id: 'pkg_gft_2', name: 'GFT-2', amount: 5000, percentage: 5, status: 'Pending Confirmation' },
  { id: 'pkg_gft_3', name: 'GFT-3', amount: 10000, percentage: 5, status: 'Pending Confirmation' },
  { id: 'pkg_gft_4', name: 'GFT-4', amount: 20000, percentage: 6, status: 'Pending Confirmation' },
  { id: 'pkg_gft_5', name: 'GFT-5', amount: 30000, percentage: 6, status: 'Pending Confirmation' },
  { id: 'pkg_gft_6', name: 'GFT-6', amount: 40000, percentage: 7, status: 'Pending Confirmation' },
  { id: 'pkg_gft_7', name: 'GFT-7', amount: 50000, percentage: 7, status: 'Pending Confirmation' },
  { id: 'pkg_gft_8', name: 'GFT-8', amount: 100000, percentage: 8, status: 'Pending Confirmation' },
];

export const withdrawalsData = [];

export const dashboardStats = {
  totalUsers: 0,
  activeUsers: 0,
  inactiveUsers: 0,
  pendingUsers: 0,
  totalPackagesSold: 0,
  totalTurnover: 0,
  totalWithdrawals: 0,
  totalIncomeDistributed: 0,
  totalTokensIssued: 0,
  totalSupportTickets: 0,
};

export const chartDataRevenue = [
  { name: 'Jan', revenue: 0 },
  { name: 'Feb', revenue: 0 },
  { name: 'Mar', revenue: 0 },
  { name: 'Apr', revenue: 0 },
  { name: 'May', revenue: 0 },
  { name: 'Jun', revenue: 0 },
];

export const chartDataRegistrations = [
  { name: 'Mon', users: 0 },
  { name: 'Tue', users: 0 },
  { name: 'Wed', users: 0 },
  { name: 'Thu', users: 0 },
  { name: 'Fri', users: 0 },
  { name: 'Sat', users: 0 },
  { name: 'Sun', users: 0 },
];

export const activityFeed = [];

export const kycData = [];

export const ticketsData = [];

export const genealogyNodes = [];

export const genealogyEdges = [];

export const designationsData = [
  { id: 1, name: 'Silver', turnover: 250000, percentage: 2.0, rewards: 'GFT Smart Mobile / Pin', status: 'Rule Confirmed' },
  { id: 2, name: 'Gold', turnover: 750000, percentage: 1.5, rewards: 'Fossil Hybrid Watch', status: 'Rule Confirmed' },
  { id: 3, name: 'Emerald', turnover: 1500000, percentage: 1.0, rewards: 'Emerald Ring / Gold Coin', status: 'Rule Confirmed' },
  { id: 4, name: 'Platinum', turnover: 3000000, percentage: 0.75, rewards: 'Yamaha R15 V4 Bike', status: 'Rule Confirmed' },
  { id: 5, name: 'Diamond', turnover: 6000000, percentage: 0.50, rewards: 'GFT Diamond Trophy & Cruise', status: 'Rule Confirmed' },
];
