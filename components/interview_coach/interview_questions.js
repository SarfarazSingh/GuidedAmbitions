// interview_questions.js - Comprehensive question database for the AI Interview Coach

const interviewQuestions = [
    // General Questions
    {
        question: "Tell me about yourself and your background.",
        type: "general",
        categories: ["introduction"]
    },
    {
        question: "What are your greatest strengths?",
        type: "general",
        categories: ["self-assessment"]
    },
    {
        question: "What do you consider to be your weaknesses?",
        type: "general",
        categories: ["self-assessment"]
    },
    {
        question: "Why are you interested in this position?",
        type: "general",
        categories: ["motivation"]
    },
    {
        question: "Where do you see yourself in five years?",
        type: "general",
        categories: ["career-planning"]
    },
    {
        question: "Why should we hire you?",
        type: "general",
        categories: ["value-proposition"]
    },
    {
        question: "What do you know about our company?",
        type: "general",
        categories: ["research"]
    },
    {
        question: "Why are you leaving your current job?",
        type: "general",
        categories: ["motivation", "career-planning"]
    },
    {
        question: "What are your salary expectations?",
        type: "general",
        categories: ["negotiation"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Do you have any questions for us?",
        type: "general",
        categories: ["engagement"]
    },

    // Behavioral Questions
    {
        question: "Tell me about a time when you had to lead a team through a difficult situation. What was your approach, and what was the outcome?",
        type: "behavioral",
        categories: ["leadership", "problem-solving", "teamwork"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Describe a situation where you had to work under pressure to meet a tight deadline.",
        type: "behavioral",
        categories: ["stress-management", "time-management"]
    },
    {
        question: "Give me an example of a time when you had to resolve a conflict within your team.",
        type: "behavioral",
        categories: ["conflict", "teamwork", "communication"]
    },
    {
        question: "Tell me about a time when you failed at something. How did you handle it?",
        type: "behavioral",
        categories: ["resilience", "adaptability", "self-awareness"]
    },
    {
        question: "Describe a situation where you had to adapt to a significant change at work.",
        type: "behavioral",
        categories: ["adaptability", "change-management"]
    },
    {
        question: "Tell me about a time when you had to make a difficult decision with limited information.",
        type: "behavioral",
        categories: ["decision-making", "problem-solving"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Give an example of how you've contributed to improving a process or procedure in your previous role.",
        type: "behavioral",
        categories: ["innovation", "initiative"]
    },
    {
        question: "Describe a situation where you had to persuade others to accept your ideas or proposals.",
        type: "behavioral",
        categories: ["communication", "influence", "leadership"]
    },
    {
        question: "Tell me about a time when you had to learn a new skill or technology quickly.",
        type: "behavioral",
        categories: ["adaptability", "learning"]
    },
    {
        question: "Give an example of how you've handled criticism of your work.",
        type: "behavioral",
        categories: ["feedback", "self-awareness", "growth"]
    },

    // Leadership Questions
    {
        question: "How would you describe your leadership style?",
        type: "leadership",
        categories: ["leadership", "self-awareness"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Tell me about a time when you had to motivate a team during a challenging period.",
        type: "leadership",
        categories: ["leadership", "motivation", "teamwork"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "How do you delegate responsibilities to your team members?",
        type: "leadership",
        categories: ["leadership", "delegation", "teamwork"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Describe a situation where you had to provide difficult feedback to a team member.",
        type: "leadership",
        categories: ["leadership", "feedback", "communication"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "How do you handle underperforming team members?",
        type: "leadership",
        categories: ["leadership", "performance-management"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Tell me about a time when you had to make an unpopular decision.",
        type: "leadership",
        categories: ["leadership", "decision-making"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "How do you build trust within your team?",
        type: "leadership",
        categories: ["leadership", "teamwork", "trust"],
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Describe how you've mentored or developed team members in the past.",
        type: "leadership",
        categories: ["leadership", "mentoring", "development"],
        experienceLevel: ["mid", "senior", "executive"]
    },

    // Situational Questions
    {
        question: "How would you handle a situation where you're assigned more work than you can reasonably complete by the deadline?",
        type: "situational",
        categories: ["problem-solving", "time-management", "communication"]
    },
    {
        question: "What would you do if you disagreed with a decision made by your supervisor?",
        type: "situational",
        categories: ["communication", "conflict", "professionalism"]
    },
    {
        question: "How would you approach working with a difficult colleague?",
        type: "situational",
        categories: ["teamwork", "conflict", "communication"]
    },
    {
        question: "What would you do if you noticed a coworker violating company policy?",
        type: "situational",
        categories: ["ethics", "decision-making"]
    },
    {
        question: "How would you handle a situation where you made a mistake that affected the team or project?",
        type: "situational",
        categories: ["accountability", "problem-solving", "communication"]
    },
    {
        question: "What would you do if you were asked to complete a task but weren't given clear instructions?",
        type: "situational",
        categories: ["communication", "initiative", "problem-solving"]
    },
    {
        question: "How would you prioritize multiple urgent tasks with competing deadlines?",
        type: "situational",
        categories: ["time-management", "decision-making", "stress-management"]
    },

    // Technical Questions (General)
    {
        question: "How do you stay current with industry trends and developments?",
        type: "technical",
        categories: ["technical", "learning", "professional-development"]
    },
    {
        question: "Describe a complex technical problem you've solved. What was your approach?",
        type: "technical",
        categories: ["technical", "problem-solving"]
    },
    {
        question: "How do you explain technical concepts to non-technical stakeholders?",
        type: "technical",
        categories: ["technical", "communication"]
    },

    // Military-to-Civilian Transition Questions
    {
        question: "How do your military experiences translate to the skills needed for this civilian position?",
        type: "behavioral",
        categories: ["military-transition", "value-proposition"]
    },
    {
        question: "Can you give an example of how your military leadership experience would benefit our organization?",
        type: "behavioral",
        categories: ["military-transition", "leadership"]
    },
    {
        question: "How has your military experience prepared you to work in a diverse team environment?",
        type: "behavioral",
        categories: ["military-transition", "teamwork", "diversity"]
    },
    {
        question: "What aspects of military culture do you think will be different in a civilian workplace, and how will you adapt?",
        type: "situational",
        categories: ["military-transition", "adaptability", "culture"]
    },
    {
        question: "How do you plan to translate your military rank and responsibilities when discussing your experience with civilian colleagues?",
        type: "situational",
        categories: ["military-transition", "communication"]
    },
    {
        question: "Can you describe a situation in your military service where you had to be innovative or think outside the box?",
        type: "behavioral",
        categories: ["military-transition", "innovation", "problem-solving"]
    },
    {
        question: "How do you handle ambiguity and uncertainty, and how has your military experience prepared you for this?",
        type: "behavioral",
        categories: ["military-transition", "adaptability", "stress-management"]
    },
    {
        question: "What skills from your military experience do you believe will be most valuable in this role?",
        type: "general",
        categories: ["military-transition", "value-proposition"]
    },

    // Industry-Specific Questions
    // Technology
    {
        question: "How do you approach learning new technologies or programming languages?",
        type: "behavioral",
        categories: ["technical", "learning"],
        industry: "technology"
    },
    {
        question: "Describe your experience with agile development methodologies.",
        type: "technical",
        categories: ["technical", "methodology"],
        industry: "technology"
    },
    {
        question: "How do you ensure the security of applications or systems you develop?",
        type: "technical",
        categories: ["technical", "security"],
        industry: "technology",
        experienceLevel: ["mid", "senior", "executive"]
    },

    // Healthcare
    {
        question: "How do you ensure patient confidentiality and HIPAA compliance in your work?",
        type: "situational",
        categories: ["compliance", "ethics"],
        industry: "healthcare"
    },
    {
        question: "Describe your experience working in multidisciplinary healthcare teams.",
        type: "behavioral",
        categories: ["teamwork", "communication"],
        industry: "healthcare"
    },
    {
        question: "How do you stay current with healthcare regulations and best practices?",
        type: "general",
        categories: ["learning", "compliance"],
        industry: "healthcare"
    },

    // Finance
    {
        question: "How do you ensure accuracy and attention to detail in financial reporting?",
        type: "behavioral",
        categories: ["attention-to-detail", "quality"],
        industry: "finance"
    },
    {
        question: "Describe your experience with financial analysis and forecasting.",
        type: "technical",
        categories: ["technical", "analysis"],
        industry: "finance",
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "How do you approach risk management in financial decisions?",
        type: "technical",
        categories: ["risk-management", "decision-making"],
        industry: "finance",
        experienceLevel: ["mid", "senior", "executive"]
    },

    // Manufacturing
    {
        question: "Describe your experience with lean manufacturing or Six Sigma methodologies.",
        type: "technical",
        categories: ["technical", "methodology"],
        industry: "manufacturing",
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "How do you approach quality control and continuous improvement?",
        type: "behavioral",
        categories: ["quality", "improvement"],
        industry: "manufacturing"
    },
    {
        question: "Describe your experience managing or working within a supply chain.",
        type: "behavioral",
        categories: ["logistics", "operations"],
        industry: "manufacturing"
    },

    // Logistics
    {
        question: "How do you optimize logistics operations for efficiency and cost-effectiveness?",
        type: "technical",
        categories: ["logistics", "optimization"],
        industry: "logistics",
        experienceLevel: ["mid", "senior", "executive"]
    },
    {
        question: "Describe your experience with inventory management systems.",
        type: "technical",
        categories: ["logistics", "technical"],
        industry: "logistics"
    },
    {
        question: "How do you handle logistics disruptions or unexpected delays?",
        type: "situational",
        categories: ["logistics", "problem-solving", "adaptability"],
        industry: "logistics"
    }
];

// Export for use in other modules
if (typeof module !== 'undefined') {
    module.exports = { interviewQuestions };
}
