import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  RotateCcw, 
  Download, 
  Filter, 
  Calendar, 
  MapPin, 
  Layers, 
  ArrowUpRight,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { 
  getFilteredDashboardData, 
  DashboardFilterState 
} from '../data/dashboardData';
import { formatCurrency, formatNumber, downloadFile } from '../utils/helpers';

export const InteractiveDashboardSection: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilterState>({
    timeframe: 'ALL',
    region: 'ALL',
    category: 'ALL',
  });

  const [activeTab, setActiveTab] = useState<'trends' | 'categories' | 'regions' | 'table'>('trends');

  // Dynamically compute KPIs and charts
  const data = useMemo(() => {
    return getFilteredDashboardData(filters);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      timeframe: 'ALL',
      region: 'ALL',
      category: 'ALL',
    });
  };

  const handleExportCSV = () => {
    const headers = ["OrderID", "Month", "Quarter", "Region", "Category", "Revenue", "Cost", "Units", "CustomerSegment", "Returned"];
    const rows = data.filteredRecords.map(r => 
      [r.orderId, r.month, r.quarter, r.region, r.category, r.revenue, r.cost, r.units, r.customerSegment, r.returned].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    downloadFile(`filtered_business_dashboard_${filters.timeframe}_${filters.region}.csv`, csvContent, 'text/csv');
  };

  // Harmonious sky blue palette for charts
  const SKY_PALETTE = ['#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC', '#BAE6FD'];

  return (
    <section id="dashboards" className="py-24 bg-white text-slate-800 relative overflow-hidden border-b border-sky-100/80">
      
      {/* Background Soft Sky Blue Radial Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700 uppercase tracking-wider mb-4 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>Interactive Business Intelligence Cockpit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Live Enterprise Analytics Simulator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Interact with multi-dimensional slicers, dynamic KPI recalculations, and visual diagnostic charts powered by synthetic enterprise sales data.
          </p>
        </div>

        {/* Dashboard Shell Container in Pure White + Soft Sky Blue */}
        <div className="bg-white rounded-3xl border border-sky-200/80 shadow-xl shadow-sky-100/60 overflow-hidden">
          
          {/* Top Control Bar: Slicers & Dimension Controls */}
          <div className="p-6 bg-sky-50/70 border-b border-sky-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-wider">
                  <Filter className="w-3.5 h-3.5 text-sky-500" />
                  <span>Interactive Slicers & Dimension Controls</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy-950 mt-1">
                  Filter by Timeframe, Geography & Product Line
                </h3>
              </div>

              {/* Slicers Controls */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Timeframe Slicer */}
                <div className="flex items-center gap-1.5 bg-white rounded-2xl p-1 border border-sky-200 shadow-xs">
                  <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>Quarter:</span>
                  </span>
                  {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setFilters(prev => ({ ...prev, timeframe: q }))}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        filters.timeframe === q
                          ? 'bg-sky-500 text-white shadow-sm shadow-sky-400/30'
                          : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Region Slicer */}
                <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-1.5 border border-sky-200 text-xs shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="text-slate-500 font-bold">Region:</span>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value as any }))}
                    className="bg-transparent text-navy-950 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Regions</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>

                {/* Category Slicer */}
                <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-1.5 border border-sky-200 text-xs shadow-xs">
                  <Layers className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="text-slate-500 font-bold">Category:</span>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as any }))}
                    className="bg-transparent text-navy-950 font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Computing">Computing</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={handleResetFilters}
                  className="p-2.5 rounded-2xl bg-white hover:bg-sky-50 text-slate-500 hover:text-sky-600 border border-sky-200 transition-colors shadow-xs"
                  title="Reset Slicers to Default"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

              </div>

            </div>
          </div>

          {/* Dynamic KPI Cards Row */}
          <div className="p-6 bg-white border-b border-sky-100">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              {/* KPI 1: Total Revenue */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="h-1 w-full bg-sky-500 absolute top-0 left-0" />
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1.5 tracking-tight">
                  {formatCurrency(data.kpis.totalRevenue)}
                </div>
                <div className="text-[10px] font-bold text-sky-700 mt-1 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Dynamic Sum</span>
                </div>
              </div>

              {/* KPI 2: Gross Profit */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="h-1 w-full bg-sky-400 absolute top-0 left-0" />
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Gross Profit</span>
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1.5 tracking-tight">
                  {formatCurrency(data.kpis.totalProfit)}
                </div>
                <div className="text-[10px] font-bold text-sky-700 mt-1">
                  Margin: <span className="font-extrabold text-navy-950">{data.kpis.profitMarginPct}%</span>
                </div>
              </div>

              {/* KPI 3: Total Orders */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="h-1 w-full bg-sky-300 absolute top-0 left-0" />
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Orders Logged</span>
                  <ShoppingBag className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1.5 tracking-tight">
                  {data.kpis.totalOrders} <span className="text-xs font-normal text-slate-500">Batch</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-1">
                  Units: <span className="font-bold text-navy-950">{formatNumber(data.kpis.totalUnits)}</span>
                </div>
              </div>

              {/* KPI 4: Average Order Value */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="h-1 w-full bg-sky-500 absolute top-0 left-0" />
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Avg Order Value</span>
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1.5 tracking-tight">
                  {formatCurrency(data.kpis.avgOrderValue)}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-1">
                  Per Order Basket
                </div>
              </div>

              {/* KPI 5: Return Rate */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-colors">
                <div className="h-1 w-full bg-sky-400 absolute top-0 left-0" />
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Return Rate</span>
                  <Percent className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-navy-950 mt-1.5 tracking-tight">
                  {data.kpis.returnRatePct}%
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-1">
                  Fulfillment SLA
                </div>
              </div>

              {/* KPI 6: Active Scope */}
              <div className="p-4 rounded-2xl bg-sky-100/70 border border-sky-200 shadow-xs relative overflow-hidden">
                <div className="h-1 w-full bg-sky-500 absolute top-0 left-0" />
                <div className="text-xs text-sky-800 font-bold uppercase tracking-wider">
                  Active Filter
                </div>
                <div className="text-sm font-black text-navy-950 mt-1.5 truncate">
                  {filters.region} • {filters.timeframe}
                </div>
                <div className="text-[10px] font-semibold text-sky-700 mt-1 truncate">
                  Cat: {filters.category}
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-6 border-b border-sky-100 bg-white flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('trends')}
                className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'trends'
                    ? 'border-sky-500 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-navy-950'
                }`}
              >
                Monthly Revenue & Target Trajectory
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'categories'
                    ? 'border-sky-500 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-navy-950'
                }`}
              >
                Category Profitability & Volume
              </button>

              <button
                onClick={() => setActiveTab('regions')}
                className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'regions'
                    ? 'border-sky-500 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-navy-950'
                }`}
              >
                Regional Breakdown & Segments
              </button>

              <button
                onClick={() => setActiveTab('table')}
                className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'table'
                    ? 'border-sky-500 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-navy-950'
                }`}
              >
                Filtered Raw Records ({data.filteredRecords.length})
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Interactive Chart Canvas Area */}
          <div className="p-6 sm:p-8 bg-white">
            
            {activeTab === 'trends' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-navy-950">
                      Monthly Revenue vs Budgeted Target Trajectory
                    </h4>
                    <p className="text-xs text-slate-500">
                      Visualizing sales velocity under selected slicer parameters.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    On-Target Rate: 94.6%
                  </span>
                </div>

                <div className="h-80 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyTrend}>
                      <defs>
                        <linearGradient id="colorRevSky" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.45}/>
                          <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorProfitSky" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.45}/>
                          <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(val: any) => [formatCurrency(Number(val)), 'Amount']} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" name="Actual Revenue ($)" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorRevSky)" strokeWidth={2.5} />
                      <Area type="monotone" dataKey="profit" name="Gross Profit ($)" stroke="#0284C7" fillOpacity={1} fill="url(#colorProfitSky)" strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-navy-950">
                    Category Revenue & Profit Margin Distribution
                  </h4>
                  <p className="text-xs text-slate-500">
                    Comparing volume generation against net margin contribution.
                  </p>
                </div>

                <div className="h-80 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.categoryBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                      <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(val: any, name: any) => [formatCurrency(Number(val)), name]} 
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue ($)" fill="#38BDF8" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="profit" name="Profit ($)" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'regions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-navy-950">
                    Regional Revenue Contribution
                  </h4>
                  <p className="text-xs text-slate-500">
                    Distribution of revenue across geographic zones.
                  </p>
                  <div className="h-72 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.regionalBreakdown} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0F9FF" />
                        <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                        <YAxis dataKey="region" type="category" tick={{ fontSize: 11, fill: '#64748B' }} width={60} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']} 
                        />
                        <Bar dataKey="revenue" name="Regional Revenue" fill="#38BDF8" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-navy-950">
                    Customer Segment Revenue Share
                  </h4>
                  <p className="text-xs text-slate-500">
                    Value concentration by customer cohort.
                  </p>
                  <div className="h-72 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.segmentBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={95}
                          dataKey="revenue"
                          nameKey="segment"
                          label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                        >
                          {data.segmentBreakdown.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={SKY_PALETTE[index % SKY_PALETTE.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#BAE6FD', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(val: any) => [formatCurrency(Number(val)), 'Revenue']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'table' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-600">
                    Showing <span className="font-bold text-navy-950">{data.filteredRecords.length}</span> matching records based on active slicers.
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV Dataset</span>
                  </button>
                </div>

                <div className="border border-sky-100 rounded-2xl overflow-x-auto max-h-80 overflow-y-auto bg-white">
                  <table className="w-full text-left text-xs text-slate-700 font-mono">
                    <thead className="bg-sky-50 text-slate-800 sticky top-0 uppercase tracking-wider text-[11px] font-bold border-b border-sky-200">
                      <tr>
                        <th className="px-3 py-2.5">OrderID</th>
                        <th className="px-3 py-2.5">Month</th>
                        <th className="px-3 py-2.5">Quarter</th>
                        <th className="px-3 py-2.5">Region</th>
                        <th className="px-3 py-2.5">Category</th>
                        <th className="px-3 py-2.5">Revenue</th>
                        <th className="px-3 py-2.5">Profit</th>
                        <th className="px-3 py-2.5">Units</th>
                        <th className="px-3 py-2.5">Segment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100">
                      {data.filteredRecords.map((item, i) => (
                        <tr key={i} className="hover:bg-sky-50/50 transition-colors">
                          <td className="px-3 py-2 font-semibold text-sky-700">{item.orderId}</td>
                          <td className="px-3 py-2">{item.month}</td>
                          <td className="px-3 py-2">{item.quarter}</td>
                          <td className="px-3 py-2">{item.region}</td>
                          <td className="px-3 py-2">{item.category}</td>
                          <td className="px-3 py-2 font-bold text-navy-950">{formatCurrency(item.revenue)}</td>
                          <td className="px-3 py-2 text-sky-700 font-semibold">{formatCurrency(item.revenue - item.cost)}</td>
                          <td className="px-3 py-2">{item.units}</td>
                          <td className="px-3 py-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                              {item.customerSegment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Dashboard Note */}
          <div className="p-4 bg-sky-50/60 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Interactive BI Engine: Re-aggregates instantaneously when slicers change.</span>
            </div>
            <div className="font-mono text-slate-400">
              Tech Stack: React + TypeScript + Recharts + Tailwind CSS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
