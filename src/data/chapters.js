export const CHAPTER_COLORS = {
  8:  '#3b82f6',
  9:  '#8b5cf6',
  10: '#10b981',
  12: '#ef4444',
}

export const CHAPTERS = [
  { id: 'all', label: 'All Chapters' },
  { id: '8',   label: 'Ch. 8 - Sources of Capital' },
  { id: '9',   label: 'Ch. 9 - Legal Challenges' },
  { id: '10',  label: 'Ch. 10 - Marketing Challenges' },
  { id: '12',  label: 'Ch. 12 - Business Plan' },
]

export const TOPICS_BY_CHAPTER = {
  8:  [
    'Bootstrapping',
    'Debt Financing',
    'Equity Financing',
    'IPOs and SPACs',
    'Private Placements',
    'Crowdfunding',
    'Venture Capital',
    'Angel Financing',
  ],
  9:  [
    'Patents',
    'Copyrights',
    'Trademarks and Trade Secrets',
    'Sole Proprietorships',
    'Partnerships',
    'Corporations',
    'LLCs and S-Corps',
    'Bankruptcy',
  ],
  10: [
    'Entrepreneurial Marketing',
    'Market Research',
    'Market Segmentation',
    'Consumer Behavior',
    'Distribution Channels',
    'Pricing Strategies',
    'Social Media Marketing',
    'Marketing Plan',
  ],
  12: [
    'Business Model Canvas',
    'Benefits of a Business Plan',
    'Executive Summary',
    'Market and Competitor Analysis',
    'Operations and Management Segments',
    'Financial Segment',
    'Pitching the Plan',
    'Updating the Business Plan',
  ],
}

export const TOPIC_CARDS = [
  {
    ch: 8, title: 'Ch. 8', sub: 'Sources of Capital',
    topics: ['Bootstrapping', 'Debt vs Equity Financing', 'IPOs & SPACs', 'Venture Capital & Angels', 'Crowdfunding', 'Private Placements'],
  },
  {
    ch: 9, title: 'Ch. 9', sub: 'Legal Challenges',
    topics: ['IP: Patents, TM, Copyright', 'Trade Secrets', 'Business Forms', 'Partnerships & Corps', 'LLC & S-Corp', 'Bankruptcy'],
  },
  {
    ch: 10, title: 'Ch. 10', sub: 'Marketing Challenges',
    topics: ['Entrepreneurial Marketing', 'Market Research', 'Segmentation', 'Distribution Channels', 'Pricing Strategies', 'Social Media'],
  },
  {
    ch: 12, title: 'Ch. 12', sub: 'Developing a Business Plan',
    topics: ['Business Model Canvas', 'Executive Summary', 'Market & Competitor Analysis', 'Ops & Mgmt Segments', 'Financial Segment', 'Pitching'],
  },
]

export const DIFF_COLORS = {
  easy:   { bg: '#d1fae5', text: '#065f46', label: 'Easy' },
  medium: { bg: '#fef3c7', text: '#92400e', label: 'Medium' },
  hard:   { bg: '#fee2e2', text: '#991b1b', label: 'Hard' },
}
