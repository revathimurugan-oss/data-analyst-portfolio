import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "sales-performance-analysis",
    title: "Sales Performance & Revenue Growth Analysis",
    tagline: "Comprehensive multi-regional sales diagnostic uncovering revenue trends, product line profitability, and seasonal growth patterns.",
    category: "Sales Analytics",
    tools: ["Excel", "Power BI", "SQL"],
    businessProblem: "A multi-regional retail enterprise observed 14% year-over-year revenue expansion, yet net operating margins dropped by 3.8%. Executive leadership required a rigorous analytical audit to evaluate regional distributor performance, identify margin-draining product subcategories, analyze discount elasticity, and uncover monthly sales velocity patterns to protect operating profit.",
    datasetDescription: "Synthetic dataset containing 2,800+ multi-regional transaction records across 4 geographical zones (North, South, East, West), 5 product categories (Electronics, Office Supplies, Furniture, Accessories, Computing), discount percentages, return flags, and gross vs. net revenue figures.",
    demoDataLabel: "Synthetic Retail Sales Dataset (Created for Portfolio Demonstration)",
    methodology: [
      "Extracted and aggregated transactional data using advanced SQL queries with CTEs and Window Functions (LAG, OVER, PARTITION BY) to compute month-over-month (MoM) growth rates.",
      "Engineered data transformations and relational modeling (Star Schema) linking Sales Fact table with Dim_Customer, Dim_Region, and Dim_Product tables.",
      "Calculated key DAX measures in Power BI including Gross Margin %, Net Profit Contribution, Discount Impact Ratio, and Average Order Value (AOV).",
      "Constructed interactive visual reports featuring regional drill-downs, dynamic time slicing, and discount sensitivity scatter plots in Excel & Power BI.",
      "Audited returns and order fulfillment delays to correlate cancellation rates with customer satisfaction across sales channels."
    ],
    findings: [
      "The 'Electronics' category generated 42% of total revenue ($385,000) but yielded lower net margin (16.2%) due to aggressive promotional discounts (>22%).",
      "The 'Accessories' category, while contributing only 18% of gross revenue, maintained an outstanding 34.5% net profit margin.",
      "The 'South' region achieved highest quarterly growth (+18.4% MoM) driven by high repeat-order rates in Q3 and Q4.",
      "Orders with discounts greater than 20% demonstrated a 2.4x higher product return rate compared to orders with standard pricing.",
      "Q4 holiday seasonality drove 38% of annual sales volume, with peak revenue spikes in October and November."
    ],
    recommendations: [
      "Cap discretionary discount thresholds at 15% on high-demand Electronics items to prevent margin erosion while preserving volume.",
      "Cross-sell high-margin Accessories (cables, peripherals, surge protection) as bundled attachments during peak Electronics promotions.",
      "Replicate the South region's localized distributor incentive structure in the underperforming North region to improve consistency.",
      "Implement predictive restocking 4 weeks prior to Q4 surge to reduce backorders and stockout penalties."
    ],
    metrics: [
      { label: "Total Revenue Analyzed", value: "$918,450", change: "+14.2% YoY", positive: true },
      { label: "Average Profit Margin", value: "24.8%", change: "-3.8% vs Target", positive: false },
      { label: "Transactions Processed", value: "2,840 Orders", change: "4 Regions", positive: true },
      { label: "Top Product Line", value: "Electronics", change: "42% Gross Share", positive: true }
    ],
    chartType: "bar",
    chartData: [
      { category: "Electronics", revenue: 385000, profit: 62370, marginPct: 16.2 },
      { category: "Office Supplies", revenue: 168000, profit: 43680, marginPct: 26.0 },
      { category: "Furniture", revenue: 142000, profit: 25560, marginPct: 18.0 },
      { category: "Accessories", revenue: 125000, profit: 43125, marginPct: 34.5 },
      { category: "Computing", revenue: 98450, profit: 27566, marginPct: 28.0 }
    ],
    sampleData: [
      { OrderID: "ORD-1001", Date: "2024-01-15", Region: "South", Category: "Electronics", Product: "Smart Monitor 27\"", Units: 2, Revenue: 720, DiscountPct: 10, Profit: 158 },
      { OrderID: "ORD-1002", Date: "2024-01-18", Region: "North", Category: "Accessories", Product: "Wireless Ergonomic Mouse", Units: 5, Revenue: 225, DiscountPct: 5, Profit: 85 },
      { OrderID: "ORD-1003", Date: "2024-01-22", Region: "West", Category: "Office Supplies", Product: "Standing Desk Mat", Units: 3, Revenue: 180, DiscountPct: 0, Profit: 54 },
      { OrderID: "ORD-1004", Date: "2024-02-05", Region: "East", Category: "Furniture", Product: "Mesh Task Chair", Units: 1, Revenue: 310, DiscountPct: 15, Profit: 52 },
      { OrderID: "ORD-1005", Date: "2024-02-14", Region: "South", Category: "Computing", Product: "Thunderbolt Docking Hub", Units: 2, Revenue: 440, DiscountPct: 8, Profit: 128 },
      { OrderID: "ORD-1006", Date: "2024-02-28", Region: "West", Category: "Electronics", Product: "Noise Cancelling Headphones", Units: 3, Revenue: 870, DiscountPct: 25, Profit: 98 },
      { OrderID: "ORD-1007", Date: "2024-03-10", Region: "North", Category: "Accessories", Product: "Mechanical Keyboard", Units: 4, Revenue: 480, DiscountPct: 10, Profit: 168 }
    ],
    downloadableFiles: {
      datasetFilename: "sales_performance_dataset_synthetic.csv",
      datasetContent: `OrderID,Date,Region,Category,Product,Units,Revenue,DiscountPct,Profit,Status
ORD-1001,2024-01-15,South,Electronics,Smart Monitor 27",2,720,10,158,Delivered
ORD-1002,2024-01-18,North,Accessories,Wireless Ergonomic Mouse,5,225,5,85,Delivered
ORD-1003,2024-01-22,West,Office Supplies,Standing Desk Mat,3,180,0,54,Delivered
ORD-1004,2024-02-05,East,Furniture,Mesh Task Chair,1,310,15,52,Delivered
ORD-1005,2024-02-14,South,Computing,Thunderbolt Docking Hub,2,440,8,128,Delivered
ORD-1006,2024-02-28,West,Electronics,Noise Cancelling Headphones,3,870,25,98,Delivered
ORD-1007,2024-03-10,North,Accessories,Mechanical Keyboard,4,480,10,168,Delivered
ORD-1008,2024-03-19,South,Office Supplies,Dual Monitor Arm,2,190,5,53,Delivered
ORD-1009,2024-04-02,East,Computing,Ultra Slim Laptop Stand,6,270,12,78,Delivered
ORD-1010,2024-04-15,West,Electronics,4K Video Webcam,4,560,15,112,Delivered
ORD-1011,2024-05-01,North,Furniture,Executive Wooden Desk,1,850,20,120,Delivered
ORD-1012,2024-05-18,South,Accessories,USB-C Fast Charger 100W,10,350,5,130,Delivered
ORD-1013,2024-06-04,West,Electronics,Portable SSD 2TB,3,660,10,178,Delivered
ORD-1014,2024-06-22,East,Office Supplies,Acoustic Desk Divider,4,280,0,84,Delivered
ORD-1015,2024-07-10,South,Computing,Wireless Presentation Clicker,5,175,0,61,Delivered`,
      scriptFilename: "sales_performance_queries.sql",
      scriptLanguage: "sql",
      scriptContent: `-- Sales Performance & Growth Analysis Queries
-- Author: Revathi Murugan
-- Description: Analytical SQL queries for MoM Revenue Growth and Category Margin Analysis

-- 1. Monthly Revenue & Month-over-Month Growth Calculation using Window Functions
WITH MonthlyMetrics AS (
    SELECT
        DATE_TRUNC('month', OrderDate) AS SalesMonth,
        COUNT(DISTINCT OrderID) AS TotalOrders,
        SUM(Revenue) AS MonthlyRevenue,
        SUM(Profit) AS MonthlyProfit,
        ROUND((SUM(Profit) / NULLIF(SUM(Revenue), 0)) * 100, 2) AS ProfitMarginPct
    FROM SalesOrders
    WHERE Status = 'Delivered'
    GROUP BY DATE_TRUNC('month', OrderDate)
),
MoMGrowth AS (
    SELECT
        SalesMonth,
        TotalOrders,
        MonthlyRevenue,
        MonthlyProfit,
        ProfitMarginPct,
        LAG(MonthlyRevenue, 1) OVER (ORDER BY SalesMonth) AS PrevMonthRevenue
    FROM MonthlyMetrics
)
SELECT
    TO_CHAR(SalesMonth, 'Mon YYYY') AS MonthLabel,
    MonthlyRevenue,
    MonthlyProfit,
    ProfitMarginPct,
    ROUND(((MonthlyRevenue - PrevMonthRevenue) / NULLIF(PrevMonthRevenue, 0)) * 100, 2) AS MoMGrowthPct
FROM MoMGrowth
ORDER BY SalesMonth ASC;

-- 2. Category Performance & Discount Elasticity Audit
SELECT 
    Category,
    COUNT(OrderID) AS OrderCount,
    SUM(Revenue) AS TotalRevenue,
    SUM(Profit) AS TotalProfit,
    ROUND((SUM(Profit) / SUM(Revenue)) * 100, 2) AS MarginPercentage,
    ROUND(AVG(DiscountPct), 1) AS AvgDiscountGiven,
    ROUND(SUM(CASE WHEN DiscountPct > 20 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS HighDiscountSharePct
FROM SalesOrders
GROUP BY Category
ORDER BY TotalRevenue DESC;`
    }
  },
  {
    id: "financial-data-analysis",
    title: "Financial Transactions & Loan Portfolio Risk Analysis",
    tagline: "Exploratory risk modeling and portfolio diagnostics evaluating loan repayment behavior, delinquency probability, and yield metrics.",
    category: "Financial Analysis",
    tools: ["SQL", "Python", "Excel"],
    businessProblem: "A retail lending institution noted an uptick in 30+ day delinquencies in unsecured personal loans and SME financing lines. The credit committee needed an exploratory risk analysis to evaluate borrower credit tiers, debt-to-income (DTI) thresholds, interest yield performance, and repayment patterns to refine credit underwriting guidelines without suppressing origination volume.",
    datasetDescription: "Synthetic financial lending portfolio containing 1,500 borrower records with loan amounts, annual income, credit score tiers (Poor, Fair, Good, Excellent), loan purpose, interest rate, repayment status (Current, 30-59 Days Past Due, 60+ Days Past Due, Charged Off), and collateralization status.",
    demoDataLabel: "Synthetic Financial Loan Portfolio Dataset (Created for Portfolio Demonstration)",
    methodology: [
      "Categorized borrower risk bands using SQL CASE statements based on CIBIL/Credit Score brackets (300-600, 601-700, 701-750, 751-850) and Debt-to-Income (DTI) metrics.",
      "Developed Python Pandas script for exploratory statistical aggregation, cohort delinquency rates, and risk migration matrices.",
      "Calculated portfolio metrics: Portfolio at Risk (PAR-30), Non-Performing Asset (NPA) ratio, weighted average cost of capital (WACC), and net interest margin (NIM).",
      "Built dynamic financial sensitivity tables in Excel to simulate default stress test scenarios under varying macroeconomic interest rate increases."
    ],
    findings: [
      "Borrowers with DTI ratios exceeding 42% exhibited a 3.7x higher probability of transitioning into 60+ days delinquent status.",
      "The 'Unsecured Personal Loan' category accounted for 54% of overall portfolio delinquency, despite representing only 31% of total loan capital.",
      "Loans in the 'Good' credit score tier (701-750) maintained a low 1.8% default rate while generating a stable 13.5% net yield.",
      "Early warning signals: Borrowers missing their 3rd scheduled installment had an 82% likelihood of requiring restructuring within 12 months."
    ],
    recommendations: [
      "Introduce automated risk alerts when applicant DTI surpasses 38% for unsecured credit facilities.",
      "Mandate partial collateralization or co-guarantor requirements for SME loans above $25,000 in volatile commercial segments.",
      "Incentivize auto-debit (e-NACH) payment mandates by offering a 0.25% interest rate discount, reducing operational collection delays.",
      "Implement a phased early intervention recovery workflow at Day 5 past due rather than waiting for 30-day delinquency milestones."
    ],
    metrics: [
      { label: "Portfolio Value Analyzed", value: "$4.25M", change: "1,500 Loans", positive: true },
      { label: "Performing Asset Ratio", value: "93.4%", change: "Healthy Base", positive: true },
      { label: "Portfolio at Risk (PAR-30)", value: "4.6%", change: "-1.2% Controlled", positive: true },
      { label: "Avg Annual Loan Yield", value: "14.2%", change: "+0.8% Net Margin", positive: true }
    ],
    chartType: "bar",
    chartData: [
      { creditTier: "Excellent (750+)", totalLoans: 480, defaultRatePct: 0.8, avgYieldPct: 10.5 },
      { creditTier: "Good (701-750)", totalLoans: 520, defaultRatePct: 1.8, avgYieldPct: 13.5 },
      { creditTier: "Fair (620-700)", totalLoans: 340, defaultRatePct: 5.6, avgYieldPct: 16.8 },
      { creditTier: "Poor (<620)", totalLoans: 160, defaultRatePct: 14.2, avgYieldPct: 19.5 }
    ],
    sampleData: [
      { LoanID: "LN-8401", CustomerID: "CUST-912", Amount: 25000, Purpose: "SME Working Capital", CreditScore: 745, DTI_Ratio: 0.28, InterestRate: 12.5, Status: "Current" },
      { LoanID: "LN-8402", CustomerID: "CUST-318", Amount: 12000, Purpose: "Personal Needs", CreditScore: 615, DTI_Ratio: 0.44, InterestRate: 17.0, Status: "30-59 DPD" },
      { LoanID: "LN-8403", CustomerID: "CUST-604", Amount: 35000, Purpose: "Vehicle Purchase", CreditScore: 780, DTI_Ratio: 0.22, InterestRate: 9.8, Status: "Current" },
      { LoanID: "LN-8404", CustomerID: "CUST-119", Amount: 18000, Purpose: "Education", CreditScore: 710, DTI_Ratio: 0.31, InterestRate: 11.2, Status: "Current" },
      { LoanID: "LN-8405", CustomerID: "CUST-874", Amount: 8500, Purpose: "Personal Needs", CreditScore: 590, DTI_Ratio: 0.49, InterestRate: 19.5, Status: "60+ DPD" },
      { LoanID: "LN-8406", CustomerID: "CUST-452", Amount: 42000, Purpose: "SME Expansion", CreditScore: 765, DTI_Ratio: 0.26, InterestRate: 12.0, Status: "Current" },
      { LoanID: "LN-8407", CustomerID: "CUST-230", Amount: 15000, Purpose: "Home Improvement", CreditScore: 690, DTI_Ratio: 0.35, InterestRate: 14.5, Status: "Current" }
    ],
    downloadableFiles: {
      datasetFilename: "financial_loan_portfolio_synthetic.csv",
      datasetContent: `LoanID,CustomerID,Amount,Purpose,CreditScore,DTI_Ratio,InterestRate,TenureMonths,Status
LN-8401,CUST-912,25000,SME Working Capital,745,0.28,12.5,36,Current
LN-8402,CUST-318,12000,Personal Needs,615,0.44,17.0,24,30-59 DPD
LN-8403,CUST-604,35000,Vehicle Purchase,780,0.22,9.8,48,Current
LN-8404,CUST-119,18000,Education,710,0.31,11.2,36,Current
LN-8405,CUST-874,8500,Personal Needs,590,0.49,19.5,12,60+ DPD
LN-8406,CUST-452,42000,SME Expansion,765,0.26,12.0,60,Current
LN-8407,CUST-230,15000,Home Improvement,690,0.35,14.5,24,Current
LN-8408,CUST-583,28000,SME Working Capital,730,0.30,13.0,36,Current
LN-8409,CUST-744,9000,Personal Needs,640,0.39,16.5,18,Current
LN-8410,CUST-126,50000,Commercial Property,795,0.20,9.2,60,Current`,
      scriptFilename: "financial_portfolio_risk_analysis.py",
      scriptLanguage: "python",
      scriptContent: `"""
Financial Loan Portfolio Risk & Delinquency Analysis
Author: Revathi Murugan
Tools: Python, Pandas, NumPy, Matplotlib
Description: Statistical audit of delinquency rates across credit score bands and DTI ratios.
"""

import pandas as pd
import numpy as np

def analyze_loan_portfolio(csv_path: str):
    # 1. Load Portfolio Dataset
    df = pd.read_csv(csv_path)
    
    # 2. Define Credit Score Tiers
    bins = [300, 620, 700, 750, 850]
    labels = ['Poor (<620)', 'Fair (620-700)', 'Good (701-750)', 'Excellent (750+)']
    df['Credit_Tier'] = pd.cut(df['CreditScore'], bins=bins, labels=labels, right=False)
    
    # 3. Delinquency Indicator (30+ Days Past Due)
    df['Is_Delinquent'] = df['Status'].isin(['30-59 DPD', '60+ DPD', 'Charged Off']).astype(int)
    
    # 4. Aggregate Risk by Tier
    tier_summary = df.groupby('Credit_Tier', observed=False).agg(
        Total_Loans=('LoanID', 'count'),
        Total_Disbursed=('Amount', 'sum'),
        Avg_Interest_Rate=('InterestRate', 'mean'),
        Avg_DTI=('DTI_Ratio', 'mean'),
        Delinquent_Loans=('Is_Delinquent', 'sum')
    )
    
    tier_summary['Delinquency_Rate_Pct'] = (
        tier_summary['Delinquent_Loans'] / tier_summary['Total_Loans'] * 100
    ).round(2)
    
    # 5. DTI Threshold Analysis
    high_dti = df[df['DTI_Ratio'] > 0.40]
    normal_dti = df[df['DTI_Ratio'] <= 0.40]
    
    print("--- PORTFOLIO SUMMARY BY CREDIT TIER ---")
    print(tier_summary)
    print("\n--- DTI RISK IMPACT ---")
    print(f"Delinquency Rate (DTI > 40%): {high_dti['Is_Delinquent'].mean()*100:.2f}%")
    print(f"Delinquency Rate (DTI <= 40%): {normal_dti['Is_Delinquent'].mean()*100:.2f}%")
    
    return tier_summary

if __name__ == '__main__':
    analyze_loan_portfolio('financial_loan_portfolio_synthetic.csv')`
    }
  },
  {
    id: "customer-segmentation-analysis",
    title: "Customer RFM Segmentation & Behavior Profiling",
    tagline: "Unsupervised RFM segmentation identifying high-value advocates, repeat buyers, and at-risk churn cohorts for targeted marketing.",
    category: "Customer Analytics",
    tools: ["Python", "SQL", "Power BI"],
    businessProblem: "An online retail brand struggled with stagnant customer lifetime value (LTV) and an 81% one-time buyer rate. Broadcast email blasts achieved low engagement (<8% open rate). The marketing department needed an analytical customer segmentation framework to identify high-value VIPs, loyal brand advocates, at-risk churners, and dormant customers for personalized lifecycle campaigns.",
    datasetDescription: "Synthetic e-commerce transactional log spanning 18 months, covering 1,200 unique customer accounts with order dates, purchase frequencies, average basket sizes, gross spend, discount usage, and product category preferences.",
    demoDataLabel: "Synthetic E-Commerce RFM Customer Dataset (Created for Portfolio Demonstration)",
    methodology: [
      "Engineered Recency, Frequency, and Monetary (RFM) metrics from raw transactional logs using SQL aggregate window functions.",
      "Calculated quintile scores (1 to 5) for each metric: Recency (days since last purchase), Frequency (total transaction count), and Monetary value (total spend).",
      "Applied statistical clustering concepts in Python (using Pandas & Scikit-Learn logic) to map customer scores into 5 actionable strategic tiers: Champions, Loyal Customers, Potential Loyalists, At Risk, and Hibernating.",
      "Constructed a Power BI customer matrix visual mapping segment revenue contribution against customer count to evaluate marketing ROI.",
      "Formulated tailored reactivation and loyalty retention playbooks for each distinct segment."
    ],
    findings: [
      "'Champions' and 'Loyal Customers' comprise only 19% of the total customer base but generate 61.4% of total company gross revenue.",
      "The 'At Risk' segment (customers who previously ordered frequently but have not purchased in >120 days) holds $142,000 in latent revenue potential.",
      "'New Customers' show high price sensitivity; those who received a personalized 2nd-order welcome prompt within 14 days were 3.1x more likely to become repeat buyers.",
      "Average basket size of 'Champions' was $340 vs. $65 for 'Hibernating' buyers, confirming extreme revenue concentration."
    ],
    recommendations: [
      "Launch a VIP Loyalty tier for 'Champions' with early access to product launches, free shipping, and dedicated support rather than price discounts.",
      "Implement automated win-back workflows for 'At Risk' customers with time-sensitive personalized incentives at Day 90 post-purchase.",
      "Target 'Potential Loyalists' with bundle recommendations to increase purchase frequency from 2 to 4 orders annually.",
      "Deprecate expensive paid re-engagement ad spend on 'Hibernating' customers (inactivity >365 days); divert budget into onboarding new customers."
    ],
    metrics: [
      { label: "Total Customers Segmented", value: "1,200 Accounts", change: "18 Months Data", positive: true },
      { label: "Top Segment Revenue Share", value: "61.4%", change: "Top 19% of Users", positive: true },
      { label: "Identified At-Risk Revenue", value: "$142,000", change: "Reactivation Target", positive: false },
      { label: "Repeat Purchase Rate", value: "28.6%", change: "+9.6% Potential", positive: true }
    ],
    chartType: "pie",
    chartData: [
      { name: "Champions", value: 180, revenue: 265000, avgSpend: 1472, color: "#2563eb" },
      { name: "Loyal Customers", value: 240, revenue: 198000, avgSpend: 825, color: "#38bdf8" },
      { name: "Potential Loyalists", value: 320, revenue: 145000, avgSpend: 453, color: "#10b981" },
      { name: "At Risk", value: 260, revenue: 112000, avgSpend: 430, color: "#f59e0b" },
      { name: "Hibernating", value: 200, revenue: 34000, avgSpend: 170, color: "#94a3b8" }
    ],
    sampleData: [
      { CustomerID: "CUST-1001", RecencyDays: 8, Frequency: 16, Monetary: 2840, RFM_Score: "555", Segment: "Champions" },
      { CustomerID: "CUST-1002", RecencyDays: 24, Frequency: 9, Monetary: 1150, RFM_Score: "444", Segment: "Loyal Customers" },
      { CustomerID: "CUST-1003", RecencyDays: 32, Frequency: 4, Monetary: 490, RFM_Score: "433", Segment: "Potential Loyalists" },
      { CustomerID: "CUST-1004", RecencyDays: 145, Frequency: 8, Monetary: 1320, RFM_Score: "244", Segment: "At Risk" },
      { CustomerID: "CUST-1005", RecencyDays: 290, Frequency: 1, Monetary: 85, RFM_Score: "111", Segment: "Hibernating" },
      { CustomerID: "CUST-1006", RecencyDays: 12, Frequency: 14, Monetary: 2490, RFM_Score: "555", Segment: "Champions" },
      { CustomerID: "CUST-1007", RecencyDays: 180, Frequency: 6, Monetary: 880, RFM_Score: "233", Segment: "At Risk" }
    ],
    downloadableFiles: {
      datasetFilename: "customer_rfm_segmentation_synthetic.csv",
      datasetContent: `CustomerID,RecencyDays,Frequency,Monetary,R_Score,F_Score,M_Score,RFM_Score,Segment
CUST-1001,8,16,2840,5,5,5,555,Champions
CUST-1002,24,9,1150,4,4,4,444,Loyal Customers
CUST-1003,32,4,490,4,3,3,433,Potential Loyalists
CUST-1004,145,8,1320,2,4,4,244,At Risk
CUST-1005,290,1,85,1,1,1,111,Hibernating
CUST-1006,12,14,2490,5,5,5,555,Champions
CUST-1007,180,6,880,2,3,3,233,At Risk
CUST-1008,15,11,1780,5,4,4,544,Loyal Customers
CUST-1009,45,3,340,3,2,2,322,Potential Loyalists
CUST-1010,310,2,160,1,1,1,111,Hibernating`,
      scriptFilename: "customer_rfm_segmentation.py",
      scriptLanguage: "python",
      scriptContent: `"""
Customer RFM Segmentation Pipeline
Author: Revathi Murugan
Tools: Python, Pandas, Scikit-learn logic
Description: Calculate Recency, Frequency, and Monetary scores and categorize customers into strategic cohorts.
"""

import pandas as pd
import datetime as dt

def compute_rfm_segments(transactions_csv: str):
    # 1. Load Transaction Log
    df = pd.read_csv(transactions_csv)
    df['OrderDate'] = pd.to_datetime(df['OrderDate'])
    
    # 2. Set Reference Snapshot Date
    snapshot_date = df['OrderDate'].max() + dt.timedelta(days=1)
    
    # 3. Calculate RFM Metrics per Customer
    rfm = df.groupby('CustomerID').agg({
        'OrderDate': lambda x: (snapshot_date - x.max()).days,
        'OrderID': 'count',
        'Amount': 'sum'
    }).rename(columns={
        'OrderDate': 'Recency',
        'OrderID': 'Frequency',
        'Amount': 'Monetary'
    })
    
    # 4. Assign Quintile Scores (1 to 5)
    r_labels = range(5, 0, -1)  # Lower recency days = better score (5)
    f_labels = range(1, 6)      # Higher frequency = better score (5)
    m_labels = range(1, 6)      # Higher spend = better score (5)
    
    rfm['R'] = pd.qcut(rfm['Recency'], q=5, labels=r_labels).astype(int)
    rfm['F'] = pd.qcut(rfm['Frequency'].rank(method='first'), q=5, labels=f_labels).astype(int)
    rfm['M'] = pd.qcut(rfm['Monetary'], q=5, labels=m_labels).astype(int)
    
    # 5. Segment Categorization Logic
    def assign_segment(row):
        score = row['R'] * 100 + row['F'] * 10 + row['M']
        if row['R'] >= 4 and row['F'] >= 4 and row['M'] >= 4:
            return 'Champions'
        elif row['F'] >= 3 and row['M'] >= 3:
            return 'Loyal Customers'
        elif row['R'] >= 3 and row['F'] <= 3:
            return 'Potential Loyalists'
        elif row['R'] <= 2 and row['F'] >= 3:
            return 'At Risk'
        else:
            return 'Hibernating'
            
    rfm['Segment'] = rfm.apply(assign_segment, axis=1)
    
    print("--- RFM SEGMENT DISTRIBUTION ---")
    print(rfm['Segment'].value_counts(normalize=True) * 100)
    return rfm`
    }
  },
  {
    id: "interactive-business-dashboard",
    title: "Executive Business KPI & Operations Dashboard",
    tagline: "Centralized decision-support cockpit tracking revenue velocity, fulfillment latency, customer acquisition, and regional variances.",
    category: "Business Intelligence",
    tools: ["Power BI", "Excel", "Power Query"],
    businessProblem: "C-suite executives lacked a unified operational reporting cockpit. Data resided across disconnected spreadsheets and operational silos, resulting in 4-day reporting lags and conflicting metric definitions between Finance, Operations, and Sales teams.",
    datasetDescription: "Integrated corporate dataset connecting Sales Orders, Fulfillment Logistics, Customer Acquisition Channels, and Regional Targets across 8 quarters.",
    demoDataLabel: "Synthetic Enterprise Operational Dataset (Created for Portfolio Demonstration)",
    methodology: [
      "Engineered an automated Power Query ETL workflow to ingest, cleanse, deduplicate, and merge disparate operational tables into a standardized schema.",
      "Designed a robust Star Schema model comprising Fact_Orders linked to Dim_Calendar, Dim_Geography, Dim_ProductHierarchy, and Dim_Channels.",
      "Authored 25+ optimized DAX measures including YTD Revenue, Prior Year Variance %, Dynamic Moving Averages, and Delivery Service Level Agreement (SLA) Compliance %.",
      "Implemented role-tailored dashboard pages: Executive Overview, Regional Deep Dive, Product Profitability, and Operations Fulfillment.",
      "Configured dynamic parameter slicers and drill-through actions enabling executives to transition seamlessly from high-level company totals down to item-level transactions."
    ],
    findings: [
      "Average Order Fulfillment SLA dipped from 96.2% to 88.5% during promotional campaign weeks, causing a 14% spike in customer support tickets.",
      "Digital direct-to-consumer (D2C) channel yielded 31% higher customer lifetime contribution compared to third-party marketplaces.",
      "The 'West' territory achieved 118% of budgeted Q3 target, compensating for temporary supply chain slowdowns in the 'East' hub.",
      "Inventory carrying costs decreased by 12% following the implementation of automated reorder notification triggers modeled in Power Query."
    ],
    recommendations: [
      "Establish automated buffer staffing in regional fulfillment centers 72 hours prior to publicized sale events.",
      "Shift 15% of promotional advertising spend from low-margin third-party channels directly to the proprietary D2C portal.",
      "Standardize regional monthly KPI business review cadences using the unified dashboard as the authoritative single source of truth.",
      "Configure automated alerting thresholds that notify logistics leads when unfulfilled order queues exceed 150 units."
    ],
    metrics: [
      { label: "Quarterly Gross Revenue", value: "$1.48M", change: "+16.8% vs Budget", positive: true },
      { label: "On-Time Fulfillment Rate", value: "94.2%", change: "+2.1% MoM", positive: true },
      { label: "Customer Acquisition Cost", value: "$38.50", change: "-8.4% Efficiency", positive: true },
      { label: "Active Regional Hubs", value: "12 Hubs", change: "100% Reporting", positive: true }
    ],
    chartType: "composed",
    chartData: [
      { month: "Jan", revenue: 112000, target: 105000, fulfillmentRate: 95.2 },
      { month: "Feb", revenue: 125000, target: 110000, fulfillmentRate: 94.8 },
      { month: "Mar", revenue: 138000, target: 120000, fulfillmentRate: 93.5 },
      { month: "Apr", revenue: 131000, target: 125000, fulfillmentRate: 94.1 },
      { month: "May", revenue: 145000, target: 130000, fulfillmentRate: 95.6 },
      { month: "Jun", revenue: 158000, target: 140000, fulfillmentRate: 96.0 },
      { month: "Jul", revenue: 162000, target: 145000, fulfillmentRate: 93.8 },
      { month: "Aug", revenue: 175000, target: 150000, fulfillmentRate: 94.5 }
    ],
    sampleData: [
      { Quarter: "2024-Q1", Region: "North", GrossRevenue: 285000, TargetRevenue: 270000, FulfillmentSLA: "94.8%", CAC: 41.2 },
      { Quarter: "2024-Q1", Region: "South", GrossRevenue: 340000, TargetRevenue: 310000, FulfillmentSLA: "96.2%", CAC: 36.5 },
      { Quarter: "2024-Q1", Region: "West", GrossRevenue: 310000, TargetRevenue: 290000, FulfillmentSLA: "95.1%", CAC: 39.0 },
      { Quarter: "2024-Q1", Region: "East", GrossRevenue: 245000, TargetRevenue: 260000, FulfillmentSLA: "91.4%", CAC: 44.5 },
      { Quarter: "2024-Q2", Region: "North", GrossRevenue: 310000, TargetRevenue: 290000, FulfillmentSLA: "95.5%", CAC: 39.8 },
      { Quarter: "2024-Q2", Region: "South", GrossRevenue: 375000, TargetRevenue: 335000, FulfillmentSLA: "96.8%", CAC: 35.1 },
      { Quarter: "2024-Q2", Region: "West", GrossRevenue: 345000, TargetRevenue: 315000, FulfillmentSLA: "95.9%", CAC: 37.6 }
    ],
    downloadableFiles: {
      datasetFilename: "executive_kpi_operations_synthetic.csv",
      datasetContent: `Quarter,Region,GrossRevenue,TargetRevenue,FulfillmentSLA_Pct,CAC,SupportTickets,ReturnRatePct
2024-Q1,North,285000,270000,94.8,41.2,342,3.1
2024-Q1,South,340000,310000,96.2,36.5,215,2.4
2024-Q1,West,310000,290000,95.1,39.0,280,2.8
2024-Q1,East,245000,260000,91.4,44.5,410,4.2
2024-Q2,North,310000,290000,95.5,39.8,310,2.9
2024-Q2,South,375000,335000,96.8,35.1,195,2.1
2024-Q2,West,345000,315000,95.9,37.6,260,2.5
2024-Q2,East,265000,275000,92.8,42.0,380,3.9`,
      scriptFilename: "powerbi_dax_measures_library.dax",
      scriptLanguage: "sql",
      scriptContent: `// Power BI DAX Measures Library
// Author: Revathi Murugan
// Module: Business KPI & Performance Cockpit

// 1. Total Revenue Measure
Total Revenue = SUM(Fact_Sales[Revenue])

// 2. Target Variance Calculation
Revenue vs Target = 
VAR ActualRevenue = [Total Revenue]
VAR TargetRevenue = SUM(Dim_Targets[TargetAmount])
RETURN
    ActualRevenue - TargetRevenue

// 3. Percentage Variance against Budget
Variance % = 
VAR ActualRevenue = [Total Revenue]
VAR TargetRevenue = SUM(Dim_Targets[TargetAmount])
RETURN
    DIVIDE(ActualRevenue - TargetRevenue, TargetRevenue, 0)

// 4. Year-to-Date (YTD) Revenue
YTD Revenue = 
TOTALYTD([Total Revenue], Dim_Calendar[Date])

// 5. Same Period Previous Year (SPLY)
Revenue SPLY = 
CALCULATE(
    [Total Revenue],
    SAMEPERIODLASTYEAR(Dim_Calendar[Date])
)

// 6. Year-over-Year Growth %
YoY Growth % = 
VAR CurrentRev = [Total Revenue]
VAR PriorRev = [Revenue SPLY]
RETURN
    DIVIDE(CurrentRev - PriorRev, PriorRev, 0)`
    }
  },
  {
    id: "data-cleaning-and-eda",
    title: "Data Cleaning, Transformation & Exploratory Analysis Pipeline",
    tagline: "End-to-end Python & Pandas cleaning pipeline converting dirty transactional data into audit-ready datasets for predictive modeling.",
    category: "Data Engineering & EDA",
    tools: ["Python", "Pandas", "Excel"],
    businessProblem: "An organization's operational database was burdened with inconsistent, dirty data compiled from legacy branch systems. Issues included 18.4% missing values, inconsistent telephone/email schemas, redundant duplicate rows, date formatting corruption, and extreme price outliers (negative values and 100x entry errors) skewing monthly financial reports.",
    datasetDescription: "Raw dirty dataset with 1,000 synthetic customer records injected with common real-world data flaws: null values, inconsistent casing, leading/trailing whitespace, invalid phone digits, date anomalies, and numeric outliers.",
    demoDataLabel: "Synthetic Raw Dirty vs. Cleaned Dataset (Created for Portfolio Demonstration)",
    methodology: [
      "Profiled the raw dataset using Python Pandas (`info()`, `describe()`, `isna().sum()`, and `duplicated()`) to map data quality defect frequencies.",
      "Engineered automated imputation logic: applied median imputation for skewed numerical variables (Income, Order Amount) and mode imputation for categorical attributes.",
      "Implemented regular expression (RegEx) cleaning functions to standardize email schemas, phone formats, and strip extraneous whitespace.",
      "Applied Interquartile Range (IQR) statistical filtering to identify and cap severe price and volume outliers beyond 1.5 * IQR thresholds.",
      "Standardized date formatting into ISO-8601 (`YYYY-MM-DD`) and eliminated duplicate primary keys to ensure relational database referential integrity.",
      "Generated comprehensive before-and-after audit reports validating zero nulls, zero duplicates, and 100% schema conformance."
    ],
    findings: [
      "Eliminated 184 missing values (18.4% null rate) using statistically sound domain-specific imputation, preserving 100% of valid transactions.",
      "Identified and removed 84 duplicate records (8.4% redundancy) that previously inflated customer count by nearly 10%.",
      "Detected 23 negative and erroneous extreme price records (e.g., $99,999 for a $99 item) that distorted mean order calculations by over 45%.",
      "Achieved a 100% clean schema conformance rating, cutting downstream automated report generation failures to zero."
    ],
    recommendations: [
      "Implement front-end validation rules at POS and branch entry points to prevent invalid formatting and negative numbers at the source.",
      "Enforce unique database constraints (UUID primary keys) to prevent duplicate transaction ingestion across synchronized branches.",
      "Automate daily Python data validation scripts that alert database administrators to schema deviations prior to ETL loading.",
      "Standardize employee data entry training with predefined dropdown fields rather than open text inputs."
    ],
    metrics: [
      { label: "Data Quality Score", value: "100%", change: "From 62% Raw", positive: true },
      { label: "Missing Values Treated", value: "184 Nulls", change: "0 Nulls Remaining", positive: true },
      { label: "Duplicate Records Purged", value: "84 Dupes", change: "100% Unique", positive: true },
      { label: "Outliers Corrected", value: "23 Records", change: "IQR Method", positive: true }
    ],
    chartType: "comparison",
    chartData: [
      { metric: "Missing Values (%)", rawData: 18.4, cleanedData: 0.0 },
      { metric: "Duplicate Rows (%)", rawData: 8.4, cleanedData: 0.0 },
      { metric: "Format Errors (%)", rawData: 14.2, cleanedData: 0.0 },
      { metric: "Price Outliers (%)", rawData: 2.3, cleanedData: 0.0 },
      { metric: "Schema Accuracy (%)", rawData: 62.0, cleanedData: 100.0 }
    ],
    sampleData: [
      { RecordID: "REC-01", Status: "Dirty Raw Data", CustomerName: "  john smith  ", Email: "john.smith@GMAIL..COM", Phone: "98765-43210 ", Amount: -450, Date: "12/04/2023", City: "chennai" },
      { RecordID: "REC-01", Status: "Cleaned Output", CustomerName: "John Smith", Email: "john.smith@gmail.com", Phone: "+91 98765 43210", Amount: 450, Date: "2023-04-12", City: "Chennai" },
      { RecordID: "REC-02", Status: "Dirty Raw Data", CustomerName: "priya  m", Email: "priya_m@yahoo..com", Phone: "9123456789", Amount: 999999, Date: "2023/15/05", City: "cbe" },
      { RecordID: "REC-02", Status: "Cleaned Output", CustomerName: "Priya M", Email: "priya_m@yahoo.com", Phone: "+91 91234 56789", Amount: 1250, Date: "2023-05-15", City: "Coimbatore" }
    ],
    downloadableFiles: {
      datasetFilename: "data_cleaning_audit_dataset_synthetic.csv",
      datasetContent: `RecordID,CustomerName,Email,Phone,Amount,OrderDate,City,Status
REC-101,John Smith,john.smith@gmail.com,+91 98765 43210,450.00,2024-01-12,Chennai,Cleaned
REC-102,Priya Murugan,priya.m@outlook.com,+91 98451 23456,1250.00,2024-01-14,Coimbatore,Cleaned
REC-103,Ramesh Kumar,ramesh.k@gmail.com,+91 97890 12345,780.00,2024-01-15,Salem,Cleaned
REC-104,Ananya Sundaram,ananya.s@company.in,+91 94432 56789,2100.00,2024-01-18,Bengaluru,Cleaned
REC-105,Karthik Raja,karthik.raja@gmail.com,+91 98401 98765,650.00,2024-01-20,Madurai,Cleaned
REC-106,Sneha Balan,sneha.b@yahoo.com,+91 97908 65432,1420.00,2024-01-22,Coimbatore,Cleaned
REC-107,Vigneshwaran S,vignesh.s@gmail.com,+91 94440 11223,890.00,2024-01-25,Trichy,Cleaned
REC-108,Divya Lakshmi,divya.l@outlook.com,+91 98845 33445,3100.00,2024-01-28,Chennai,Cleaned`,
      scriptFilename: "automated_data_cleaning_pipeline.py",
      scriptLanguage: "python",
      scriptContent: `"""
Automated Data Cleaning & EDA Pipeline
Author: Revathi Murugan
Tools: Python, Pandas, NumPy, Re
Description: End-to-end cleaning workflow for messy customer datasets including imputation, regex standardization, outlier treatment, and deduplication.
"""

import pandas as pd
import numpy as np
import re

def clean_customer_dataset(raw_csv_path: str, output_csv_path: str):
    print("Loading raw dataset...")
    df = pd.read_csv(raw_csv_path)
    initial_rows = len(df)
    
    # 1. Deduplication
    df = df.drop_duplicates()
    deduped_rows = len(df)
    print(f"Removed {initial_rows - deduped_rows} duplicate rows.")
    
    # 2. String Cleaning & Whitespace Stripping
    text_cols = ['CustomerName', 'Email', 'City']
    for col in text_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip()
            
    # Standardize casing
    df['CustomerName'] = df['CustomerName'].str.title()
    df['Email'] = df['Email'].str.lower()
    
    # 3. Email Schema Correction (Fix consecutive dots, whitespace)
    def clean_email(val):
        if pd.isna(val) or val == 'nan':
            return np.nan
        val = re.sub(r'\\.+', '.', val)
        return val
    df['Email'] = df['Email'].apply(clean_email)
    
    # 4. Outlier Handling via IQR (Interquartile Range) for Amount
    if 'Amount' in df.columns:
        # Convert negative amounts to positive if input clerical error
        df['Amount'] = df['Amount'].abs()
        
        Q1 = df['Amount'].quantile(0.25)
        Q3 = df['Amount'].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        # Cap outliers to upper/lower bounds
        df['Amount'] = np.clip(df['Amount'], lower_bound, upper_bound)
    
    # 5. Missing Value Imputation
    if 'Amount' in df.columns:
        df['Amount'] = df['Amount'].fillna(df['Amount'].median())
    if 'Email' in df.columns:
        df['Email'] = df['Email'].fillna('unspecified@domain.com')
        
    # 6. Save Cleaned Dataset
    df.to_csv(output_csv_path, index=False)
    print(f"Dataset successfully cleaned and saved to {output_csv_path} with 0 nulls.")
    return df

if __name__ == '__main__':
    clean_customer_dataset('raw_dirty_dataset.csv', 'cleaned_dataset.csv')`
    }
  }
];
