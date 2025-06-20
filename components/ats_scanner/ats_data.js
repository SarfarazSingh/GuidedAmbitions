// ATS Scanner Data
const atsData = {
    // Common keywords by industry
    industryKeywords: {
        technology: [
            "software development", "programming", "agile", "scrum", "cloud computing",
            "DevOps", "full-stack", "front-end", "back-end", "API", "database",
            "machine learning", "artificial intelligence", "data science", "cybersecurity"
        ],
        healthcare: [
            "patient care", "medical records", "HIPAA", "clinical", "healthcare",
            "treatment", "diagnosis", "patient management", "medical coding", "EMR",
            "EHR", "telemedicine", "patient advocacy", "care coordination"
        ],
        finance: [
            "financial analysis", "accounting", "budgeting", "forecasting", "risk management",
            "compliance", "financial reporting", "investment", "portfolio management",
            "banking", "financial planning", "audit", "tax", "financial modeling"
        ],
        manufacturing: [
            "production", "quality control", "supply chain", "inventory management",
            "lean manufacturing", "Six Sigma", "process improvement", "operations",
            "logistics", "procurement", "quality assurance", "manufacturing processes"
        ],
        marketing: [
            "digital marketing", "content strategy", "SEO", "SEM", "social media",
            "brand management", "market research", "campaign management", "analytics",
            "customer acquisition", "CRM", "marketing automation", "lead generation"
        ],
        military_to_civilian: [
            "leadership", "team management", "strategic planning", "logistics",
            "operations", "security clearance", "project management", "training",
            "risk assessment", "crisis management", "communication", "adaptability"
        ]
    },
    
    // Common ATS format issues
    formatIssues: [
        {
            issue: "Complex tables",
            description: "Tables may not parse correctly in ATS systems",
            solution: "Replace tables with simple bullet points or paragraphs"
        },
        {
            issue: "Headers and footers",
            description: "Content in headers and footers may be ignored by ATS",
            solution: "Move important information from headers/footers into the main body"
        },
        {
            issue: "Graphics and images",
            description: "Visual elements cannot be read by most ATS systems",
            solution: "Remove images and ensure all information is in text format"
        },
        {
            issue: "Unusual section headings",
            description: "Non-standard headings may not be recognized",
            solution: "Use conventional section titles like 'Experience', 'Education', and 'Skills'"
        },
        {
            issue: "Fancy fonts",
            description: "Uncommon fonts may not render properly",
            solution: "Stick to standard fonts like Arial, Calibri, or Times New Roman"
        },
        {
            issue: "Text boxes",
            description: "Content in text boxes may be missed by ATS",
            solution: "Avoid text boxes and keep all content in the main document flow"
        },
        {
            issue: "PDF formatting",
            description: "Some PDF features aren't ATS-friendly",
            solution: "Use simple PDF formatting or submit as .docx when possible"
        }
    ],
    
    // Sample improvement suggestions
    improvementSuggestions: [
        {
            category: "Keywords",
            suggestion: "Add missing keywords from the job description",
            details: "Include industry-specific terms that appear in the job posting"
        },
        {
            category: "Formatting",
            suggestion: "Simplify document structure",
            details: "Remove tables, columns, and complex formatting elements"
        },
        {
            category: "Content",
            suggestion: "Quantify achievements",
            details: "Add specific metrics and numbers to highlight accomplishments"
        },
        {
            category: "Sections",
            suggestion: "Use standard section headings",
            details: "Rename custom sections to match conventional resume categories"
        },
        {
            category: "Military Translation",
            suggestion: "Translate military terms to civilian equivalents",
            details: "Replace military jargon with industry-standard terminology"
        }
    ],
    
    // Military to civilian term translations
    militaryTranslations: {
        ranks: {
            "Captain": ["Manager", "Director", "Team Lead"],
            "Lieutenant": ["Supervisor", "Assistant Manager", "Project Lead"],
            "Sergeant": ["Team Leader", "Supervisor", "Coordinator"],
            "Corporal": ["Team Leader", "Assistant Supervisor", "Lead"],
            "Specialist": ["Technician", "Specialist", "Analyst"]
        },
        skills: {
            "Command and Control": ["Leadership", "Management", "Supervision"],
            "Combat Operations": ["Crisis Management", "Emergency Response", "Risk Management"],
            "Mission Planning": ["Strategic Planning", "Project Planning", "Operations Planning"],
            "Tactical Operations": ["Operations Management", "Tactical Planning", "Field Operations"],
            "Supply Chain Management": ["Logistics", "Supply Chain", "Inventory Management"],
            "Personnel Management": ["Human Resources", "Team Management", "Staff Development"]
        }
    }
};
