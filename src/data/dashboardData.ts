export interface DashboardFilterState {
  timeframe: 'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
  region: 'ALL' | 'North' | 'South' | 'East' | 'West';
  category: 'ALL' | 'Electronics' | 'Office Supplies' | 'Furniture' | 'Accessories' | 'Computing';
}

export interface SyntheticOrderItem {
  orderId: string;
  month: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  region: 'North' | 'South' | 'East' | 'West';
  category: 'Electronics' | 'Office Supplies' | 'Furniture' | 'Accessories' | 'Computing';
  revenue: number;
  cost: number;
  units: number;
  customerSegment: 'Champions' | 'Loyal' | 'Potential' | 'At Risk';
  returned: boolean;
}

// 60 representative synthetic monthly records across combinations
export const rawDashboardRecords: SyntheticOrderItem[] = [
  // Q1
  { orderId: "ORD-Q1-01", month: "Jan", quarter: "Q1", region: "North", category: "Electronics", revenue: 48000, cost: 36000, units: 140, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q1-02", month: "Jan", quarter: "Q1", region: "South", category: "Accessories", revenue: 22000, cost: 14000, units: 280, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q1-03", month: "Jan", quarter: "Q1", region: "East", category: "Office Supplies", revenue: 19000, cost: 13500, units: 190, customerSegment: "Potential", returned: true },
  { orderId: "ORD-Q1-04", month: "Jan", quarter: "Q1", region: "West", category: "Computing", revenue: 31000, cost: 22000, units: 95, customerSegment: "Champions", returned: false },
  
  { orderId: "ORD-Q1-05", month: "Feb", quarter: "Q1", region: "North", category: "Furniture", revenue: 28000, cost: 21000, units: 60, customerSegment: "At Risk", returned: false },
  { orderId: "ORD-Q1-06", month: "Feb", quarter: "Q1", region: "South", category: "Electronics", revenue: 54000, cost: 41000, units: 160, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q1-07", month: "Feb", quarter: "Q1", region: "East", category: "Accessories", revenue: 18000, cost: 11000, units: 210, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q1-08", month: "Feb", quarter: "Q1", region: "West", category: "Office Supplies", revenue: 22000, cost: 15500, units: 230, customerSegment: "Potential", returned: false },

  { orderId: "ORD-Q1-09", month: "Mar", quarter: "Q1", region: "North", category: "Computing", revenue: 35000, cost: 24500, units: 110, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q1-10", month: "Mar", quarter: "Q1", region: "South", category: "Furniture", revenue: 32000, cost: 24000, units: 75, customerSegment: "Loyal", returned: true },
  { orderId: "ORD-Q1-11", month: "Mar", quarter: "Q1", region: "East", category: "Electronics", revenue: 42000, cost: 32000, units: 130, customerSegment: "At Risk", returned: false },
  { orderId: "ORD-Q1-12", month: "Mar", quarter: "Q1", region: "West", category: "Accessories", revenue: 26000, cost: 16000, units: 310, customerSegment: "Champions", returned: false },

  // Q2
  { orderId: "ORD-Q2-01", month: "Apr", quarter: "Q2", region: "North", category: "Office Supplies", revenue: 25000, cost: 17500, units: 250, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q2-02", month: "Apr", quarter: "Q2", region: "South", category: "Computing", revenue: 39000, cost: 27000, units: 120, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q2-03", month: "Apr", quarter: "Q2", region: "East", category: "Furniture", revenue: 27000, cost: 20000, units: 65, customerSegment: "At Risk", returned: true },
  { orderId: "ORD-Q2-04", month: "Apr", quarter: "Q2", region: "West", category: "Electronics", revenue: 58000, cost: 44000, units: 175, customerSegment: "Champions", returned: false },

  { orderId: "ORD-Q2-05", month: "May", quarter: "Q2", region: "North", category: "Accessories", revenue: 29000, cost: 18000, units: 340, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q2-06", month: "May", quarter: "Q2", region: "South", category: "Office Supplies", revenue: 28000, cost: 19500, units: 290, customerSegment: "Potential", returned: false },
  { orderId: "ORD-Q2-07", month: "May", quarter: "Q2", region: "East", category: "Computing", revenue: 36000, cost: 25000, units: 115, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q2-08", month: "May", quarter: "Q2", region: "West", category: "Furniture", revenue: 34000, cost: 25500, units: 80, customerSegment: "At Risk", returned: false },

  { orderId: "ORD-Q2-09", month: "Jun", quarter: "Q2", region: "North", category: "Electronics", revenue: 56000, cost: 42500, units: 170, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q2-10", month: "Jun", quarter: "Q2", region: "South", category: "Accessories", revenue: 33000, cost: 20500, units: 390, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q2-11", month: "Jun", quarter: "Q2", region: "East", category: "Office Supplies", revenue: 24000, cost: 17000, units: 240, customerSegment: "Potential", returned: false },
  { orderId: "ORD-Q2-12", month: "Jun", quarter: "Q2", region: "West", category: "Computing", revenue: 42000, cost: 29500, units: 130, customerSegment: "Champions", returned: true },

  // Q3
  { orderId: "ORD-Q3-01", month: "Jul", quarter: "Q3", region: "North", category: "Computing", revenue: 41000, cost: 28500, units: 125, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q3-02", month: "Jul", quarter: "Q3", region: "South", category: "Electronics", revenue: 64000, cost: 48500, units: 190, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q3-03", month: "Jul", quarter: "Q3", region: "East", category: "Accessories", revenue: 24000, cost: 15000, units: 290, customerSegment: "Potential", returned: false },
  { orderId: "ORD-Q3-04", month: "Jul", quarter: "Q3", region: "West", category: "Office Supplies", revenue: 29000, cost: 20500, units: 300, customerSegment: "Champions", returned: false },

  { orderId: "ORD-Q3-05", month: "Aug", quarter: "Q3", region: "North", category: "Furniture", revenue: 36000, cost: 27000, units: 85, customerSegment: "At Risk", returned: true },
  { orderId: "ORD-Q3-06", month: "Aug", quarter: "Q3", region: "South", category: "Computing", revenue: 48000, cost: 33500, units: 150, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q3-07", month: "Aug", quarter: "Q3", region: "East", category: "Electronics", revenue: 51000, cost: 39000, units: 155, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q3-08", month: "Aug", quarter: "Q3", region: "West", category: "Accessories", revenue: 35000, cost: 22000, units: 410, customerSegment: "Champions", returned: false },

  { orderId: "ORD-Q3-09", month: "Sep", quarter: "Q3", region: "North", category: "Electronics", revenue: 62000, cost: 47000, units: 185, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q3-10", month: "Sep", quarter: "Q3", region: "South", category: "Furniture", revenue: 41000, cost: 30500, units: 95, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q3-11", month: "Sep", quarter: "Q3", region: "East", category: "Office Supplies", revenue: 27000, cost: 19000, units: 280, customerSegment: "Potential", returned: false },
  { orderId: "ORD-Q3-12", month: "Sep", quarter: "Q3", region: "West", category: "Computing", revenue: 46000, cost: 32000, units: 145, customerSegment: "Champions", returned: false },

  // Q4
  { orderId: "ORD-Q4-01", month: "Oct", quarter: "Q4", region: "North", category: "Accessories", revenue: 38000, cost: 24000, units: 450, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q4-02", month: "Oct", quarter: "Q4", region: "South", category: "Electronics", revenue: 78000, cost: 59000, units: 240, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q4-03", month: "Oct", quarter: "Q4", region: "East", category: "Furniture", revenue: 35000, cost: 26000, units: 80, customerSegment: "At Risk", returned: true },
  { orderId: "ORD-Q4-04", month: "Oct", quarter: "Q4", region: "West", category: "Office Supplies", revenue: 34000, cost: 24000, units: 350, customerSegment: "Champions", returned: false },

  { orderId: "ORD-Q4-05", month: "Nov", quarter: "Q4", region: "North", category: "Computing", revenue: 52000, cost: 36500, units: 160, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q4-06", month: "Nov", quarter: "Q4", region: "South", category: "Accessories", revenue: 45000, cost: 28500, units: 530, customerSegment: "Loyal", returned: false },
  { orderId: "ORD-Q4-07", month: "Nov", quarter: "Q4", region: "East", category: "Electronics", revenue: 69000, cost: 52500, units: 210, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q4-08", month: "Nov", quarter: "Q4", region: "West", category: "Furniture", revenue: 44000, cost: 33000, units: 105, customerSegment: "Potential", returned: false },

  { orderId: "ORD-Q4-09", month: "Dec", quarter: "Q4", region: "North", category: "Electronics", revenue: 84000, cost: 64000, units: 260, customerSegment: "Champions", returned: true },
  { orderId: "ORD-Q4-10", month: "Dec", quarter: "Q4", region: "South", category: "Computing", revenue: 59000, cost: 41000, units: 180, customerSegment: "Champions", returned: false },
  { orderId: "ORD-Q4-11", month: "Dec", quarter: "Q4", region: "East", category: "Office Supplies", revenue: 33000, cost: 23000, units: 340, customerSegment: "Potential", returned: false },
  { orderId: "ORD-Q4-12", month: "Dec", quarter: "Q4", region: "West", category: "Accessories", revenue: 48000, cost: 30000, units: 560, customerSegment: "Loyal", returned: false }
];

export function getFilteredDashboardData(filters: DashboardFilterState) {
  const filtered = rawDashboardRecords.filter(item => {
    if (filters.timeframe !== 'ALL' && item.quarter !== filters.timeframe) return false;
    if (filters.region !== 'ALL' && item.region !== filters.region) return false;
    if (filters.category !== 'ALL' && item.category !== filters.category) return false;
    return true;
  });

  const totalRevenue = filtered.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalCost = filtered.reduce((acc, curr) => acc + curr.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const profitMarginPct = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const totalUnits = filtered.reduce((acc, curr) => acc + curr.units, 0);
  const totalOrders = filtered.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const returnsCount = filtered.filter(item => item.returned).length;
  const returnRatePct = totalOrders > 0 ? (returnsCount / totalOrders) * 100 : 0;

  // Monthly trend
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyMap: Record<string, { revenue: number; profit: number; target: number; units: number }> = {};

  filtered.forEach(item => {
    if (!monthlyMap[item.month]) {
      monthlyMap[item.month] = { revenue: 0, profit: 0, target: 0, units: 0 };
    }
    monthlyMap[item.month].revenue += item.revenue;
    monthlyMap[item.month].profit += (item.revenue - item.cost);
    monthlyMap[item.month].units += item.units;
    monthlyMap[item.month].target += Math.round(item.revenue * 0.92);
  });

  const monthlyTrend = monthOrder
    .filter(m => monthlyMap[m] !== undefined)
    .map(m => ({
      month: m,
      revenue: monthlyMap[m].revenue,
      profit: monthlyMap[m].profit,
      target: monthlyMap[m].target,
      units: monthlyMap[m].units
    }));

  // Category breakdown
  const catMap: Record<string, { revenue: number; profit: number; orders: number }> = {};
  filtered.forEach(item => {
    if (!catMap[item.category]) {
      catMap[item.category] = { revenue: 0, profit: 0, orders: 0 };
    }
    catMap[item.category].revenue += item.revenue;
    catMap[item.category].profit += (item.revenue - item.cost);
    catMap[item.category].orders += 1;
  });

  const categoryBreakdown = Object.keys(catMap).map(cat => ({
    category: cat,
    revenue: catMap[cat].revenue,
    profit: catMap[cat].profit,
    marginPct: Math.round((catMap[cat].profit / catMap[cat].revenue) * 100),
    orders: catMap[cat].orders
  }));

  // Regional breakdown
  const regionMap: Record<string, { revenue: number; profit: number; orders: number }> = {};
  filtered.forEach(item => {
    if (!regionMap[item.region]) {
      regionMap[item.region] = { revenue: 0, profit: 0, orders: 0 };
    }
    regionMap[item.region].revenue += item.revenue;
    regionMap[item.region].profit += (item.revenue - item.cost);
    regionMap[item.region].orders += 1;
  });

  const regionalBreakdown = Object.keys(regionMap).map(reg => ({
    region: reg,
    revenue: regionMap[reg].revenue,
    profit: regionMap[reg].profit,
    marginPct: Math.round((regionMap[reg].profit / regionMap[reg].revenue) * 100),
    orders: regionMap[reg].orders
  }));

  // Segment breakdown
  const segmentMap: Record<string, number> = {};
  filtered.forEach(item => {
    segmentMap[item.customerSegment] = (segmentMap[item.customerSegment] || 0) + item.revenue;
  });

  const segmentBreakdown = Object.keys(segmentMap).map(seg => ({
    segment: seg,
    revenue: segmentMap[seg],
    percentage: Math.round((segmentMap[seg] / (totalRevenue || 1)) * 100)
  }));

  return {
    kpis: {
      totalRevenue,
      totalProfit,
      profitMarginPct: Math.round(profitMarginPct * 10) / 10,
      totalOrders,
      totalUnits,
      avgOrderValue: Math.round(avgOrderValue),
      returnRatePct: Math.round(returnRatePct * 10) / 10
    },
    monthlyTrend,
    categoryBreakdown,
    regionalBreakdown,
    segmentBreakdown,
    filteredRecords: filtered
  };
}
