export const USER_NAME = 'cfo@integrity.ai';
export const USER_SECRET = 'demo123';

export const ALLOW_UNKNOWN_PARAMS = false;

export const LOGIN_KEY = 'LOGIN_KEY';
export const SESSION_TIME = 3600;

// export const BASE_URL = 'https://s85j4uvfo1.execute-api.ap-southeast-1.amazonaws.com/dev';
export const BASE_URL = 'http://localhost:3000/dev';
export const CLIENT_ID = 'client-4';

export const GET_ROI_URL = `${BASE_URL}/v1/get-roi?client=${CLIENT_ID}`;
export const GET_COST_URL = `${BASE_URL}/v1/get-cost?client=${CLIENT_ID}`;
export const GET_USAGE_URL = `${BASE_URL}/v1/get-usage?client=${CLIENT_ID}`;
export const GET_TRANSACTIONS_URL = `${BASE_URL}/v1/get-transactions?client=${CLIENT_ID}`;
export const GET_COST_ANOMALIES_URL = `${BASE_URL}/v1/get-anomalies?client=${CLIENT_ID}&type=COST`;

export const POST_ROI_URL = `${BASE_URL}/v1/create-roi`;
export const POST_COST_URL = `${BASE_URL}/v1/create-cost`;
export const POST_USAGE_URL = `${BASE_URL}/v1/create-usage`;
export const POST_UPLOAD_PDF = `${BASE_URL}/v1/upload-file?client=${CLIENT_ID}`;

export const GENERIC_HEADERS = { 'Content-Type': 'application/json' };


export const TEMPLATES = {
  COST: {
    FIELDS: ['industry', 'category', 'subcategory', 'description', 'costType', 'vendor', 'department', 'modelService', 'cloudRegion', 'environment', 'usageUnit', 'quantity', 'unitCost', 'monthlyCost', 'annualizedCost', 'billingAccount', 'contractId', 'startDate', 'endDate', 'owner', 'tags', 'notes'],
    FIELDS_LABELS: ['Industry', 'Category', 'Subcategory', 'Description', 'Cost Type', 'Vendor / Source', 'Department / BU', 'Model / Service', 'Cloud Region', 'Environment (Dev/Prod)', 'Usage Unit', 'Quantity', 'Unit Cost (USD)', 'Monthly Cost', 'Annualized Cost', 'Billing Account', 'Contract ID', 'Start Date', 'End Date', 'Owner', 'Tags (AI, Cloud, Agentic, etc.)', 'Notes'],
    PLACEHOLDER: ['Industry', 'Category', 'Subcategory', 'Description', 'Cost Type', 'Vendor / Source', 'Department / BU', 'Model / Service', 'Cloud Region', 'Environment (Dev/Prod)', 'Usage Unit', 'Quantity', 'Unit Cost (USD)', 'Monthly Cost', 'Annualized Cost', 'Billing Account', 'Contract ID', 'Start Date', 'End Date', 'Owner', 'Tags (AI, Cloud, Agentic, etc.)', 'Notes'],
    MANDATORY: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false],
    TYPES: ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'string', 'string', 'date', 'date', 'string', 'string', 'string'],
    LABEL: 'Cost',
    POST_API: POST_COST_URL
  },
  ROI: {
    FIELDS: ['industry', 'project', 'aiCategory', 'objective', 'baselineMetric', 'baselineValue', 'postAiValue', 'improvement', 'annualizedBenefit', 'annualizedCost', 'benefitDriver', 'linkedCostId', 'paybackPeriod', 'roi', 'npv', 'irr', 'strategicPillar', 'businessUnit', 'owner', 'status', 'validationSource', 'notes'],
    FIELDS_LABELS: ['Industry', 'Initiative / Project', 'AI Category', 'Objective', 'Baseline Metric', 'Baseline Value', 'Post-AI Value', 'Δ% Improvement', 'Annualized Benefit (USD)', 'Annualized Cost (USD)', 'Benefit Driver', 'Linked Cost ID', 'Payback Period (Months)', 'ROI (%)', 'NPV (5y)', 'IRR (est %)', 'Strategic Pillar', 'Business Unit', 'Owner', 'Status', 'Validation Source', 'Notes'],
    PLACEHOLDER: ['Industry', 'Initiative / Project', 'AI Category', 'Objective', 'Baseline Metric', 'Baseline Value', 'Post-AI Value', 'Δ% Improvement', 'Annualized Benefit (USD)', 'Annualized Cost (USD)', 'Benefit Driver', 'Linked Cost ID', 'Payback Period (Months)', 'ROI (%)', 'NPV (5y)', 'IRR (est %)', 'Strategic Pillar', 'Business Unit', 'Owner', 'Status', 'Validation Source', 'Notes'],
    MANDATORY: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    TYPES: ['string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'number', 'number', 'string', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'],
    LABEL: 'ROI',
    POST_API: POST_ROI_URL
  },
  USAGE: {
    FIELDS: ['industry', 'systemName', 'functionName', 'model', 'version', 'region', 'usageType', 'metric', 'dailyAvg', 'monthlyTotal', 'unitCost', 'monthlyCost', 'linkedCostId', 'linkedRoiId', 'humanHours', 'autoResolution', 'errorRate', 'downtime', 'owner', 'department', 'notes'],
    FIELDS_LABELS: ['Industry', 'System', 'Function', 'Model / API', 'Version', 'Region', 'Usage Type', 'Metric', 'Daily Avg', 'Monthly Total', 'Unit Cost', 'Monthly Cost', 'Linked Cost ID', 'Linked ROI ID', 'Human Hours', 'Auto-Resolution %', 'Error Rate', 'Downtime', 'Owner', 'Department', 'Notes'],
    PLACEHOLDER: ['Industry', 'System', 'Function', 'Model / API', 'Version', 'Region', 'Usage Type', 'Metric', 'Daily Avg', 'Monthly Total', 'Unit Cost', 'Monthly Cost', 'Linked Cost ID', 'Linked ROI ID', 'Human Hours', 'Auto-Resolution %', 'Error Rate', 'Downtime', 'Owner', 'Department', 'Notes'],
    MANDATORY: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    TYPES: ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'number', 'number', 'number', 'number', 'string', 'string', 'number', 'number', 'number', 'number', 'string', 'string', 'string'],
    LABEL: 'Usage',
    POST_API: POST_USAGE_URL
  }
};

export const CATEGORIES = ['AI Model Costs', 'Infrastructure & Compute', 'Agent Platform Licenses', 'Talent Costs', 'Data & Integration', 'Revenue Growth', 'Cost Reduction', 'Operational Efficiency'];
export const CATEGORIES_ICONS = ['brain', 'database', 'cpu', 'users', 'layers', 'trendingUp', 'dollar', 'zap'];
export const CHART_COLOR_LIST = ['#DC143CCF', '#00D68FFF', '#FFD700CF', '#00006FAF', '#FFB6C1CF', '#8DB6CDCF', '#00C5CDCF', '#FFFF00CF', '#FFA500CF', '#8B5A00CF', '#FF4500CF', '#800080CF', '#FA8072CF', '#FF3E96CF', '#BA55D3CF', '#191970CF', '#00FF7FCF', '#B7B7B7CF', '#000000CF', '#006400CF', '#ADFF2FCF', '#EEEE00CF', '#3D59ABCF', '#AB82FFCF', '#CDB5CDCF', '#FF69B4CF', '#FF0000CF']

export const SUPPORTED_PDF_FILE_TYPES = {
  AWS_BILL: 'AWS_BILL'
}