// Resume templates data
const resumeTemplates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, conservative layout ideal for most industries',
    previewImage: 'classic_preview.png',
    colors: [
      { id: 'blue', name: 'Blue', primary: '#1a4b77', secondary: '#e8f1f8' },
      { id: 'gray', name: 'Gray', primary: '#4a4a4a', secondary: '#f0f0f0' },
      { id: 'maroon', name: 'Maroon', primary: '#7d2836', secondary: '#f8e8eb' }
    ]
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with accent colors and clean layout',
    previewImage: 'modern_preview.png',
    colors: [
      { id: 'teal', name: 'Teal', primary: '#008080', secondary: '#e5f2f2' },
      { id: 'purple', name: 'Purple', primary: '#5d3b8a', secondary: '#eee8f4' },
      { id: 'green', name: 'Green', primary: '#2e7d32', secondary: '#e8f3e8' }
    ]
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Emphasis on leadership and achievements for senior roles',
    previewImage: 'executive_preview.png',
    colors: [
      { id: 'navy', name: 'Navy', primary: '#0a2240', secondary: '#e6eaef' },
      { id: 'black', name: 'Black', primary: '#2d2d2d', secondary: '#ebebeb' },
      { id: 'burgundy', name: 'Burgundy', primary: '#6d213c', secondary: '#f1e7eb' }
    ]
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Focus on technical skills and certifications for specialized roles',
    previewImage: 'technical_preview.png',
    colors: [
      { id: 'slate', name: 'Slate', primary: '#3c4858', secondary: '#ebeef0' },
      { id: 'blue', name: 'Blue', primary: '#0277bd', secondary: '#e5f4fb' },
      { id: 'orange', name: 'Orange', primary: '#e65100', secondary: '#fdeee5' }
    ]
  }
];

// Professional summary templates based on military roles
const summaryTemplates = {
  infantry: [
    "Accomplished military leader with {years} years of experience in tactical operations, team leadership, and security management. Skilled in coordinating complex operations, risk assessment, and personnel training. Seeking to leverage strong leadership abilities and operational expertise in a {targetRole} position.",
    "Results-driven professional with {years} years of military experience in high-pressure environments. Demonstrated success in team leadership, tactical planning, and security operations. Adept at problem-solving and decision-making under challenging conditions. Looking to transition proven leadership and operational skills to a {targetRole} role."
  ],
  intelligence: [
    "Detail-oriented intelligence specialist with {years} years of experience in data analysis, information security, and risk assessment. Proven track record in gathering, analyzing, and presenting critical information to support strategic decision-making. Seeking to apply analytical expertise and security clearance experience as a {targetRole}.",
    "Analytical professional with {years} years of military intelligence experience. Skilled in data collection, pattern recognition, and security protocols. Demonstrated ability to synthesize complex information and communicate findings clearly. Looking to leverage strong analytical capabilities in a {targetRole} position."
  ],
  logistics: [
    "Experienced logistics professional with {years} years of military experience managing complex supply chains, inventory systems, and distribution networks. Proven ability to optimize operations, reduce costs, and ensure timely delivery in challenging environments. Seeking to apply extensive logistics expertise as a {targetRole}.",
    "Results-oriented supply chain specialist with {years} years of military logistics experience. Skilled in inventory management, procurement, and distribution operations. Demonstrated success in optimizing resource allocation and improving operational efficiency. Looking to transition proven logistics capabilities to a {targetRole} role."
  ],
  medic: [
    "Healthcare professional with {years} years of military medical experience in high-pressure environments. Skilled in emergency response, patient care, and medical team coordination. Proven ability to remain calm and effective under extreme conditions. Seeking to leverage medical expertise and crisis management skills as a {targetRole}.",
    "Dedicated healthcare specialist with {years} years of military experience providing medical support in diverse environments. Proficient in emergency medicine, triage, and patient assessment. Demonstrated ability to make critical decisions quickly and effectively. Looking to apply medical knowledge and emergency response capabilities in a {targetRole} position."
  ],
  comms: [
    "Technical communications specialist with {years} years of military experience managing complex communication systems and networks. Skilled in troubleshooting, system maintenance, and technical documentation. Seeking to leverage communications expertise and problem-solving abilities as a {targetRole}.",
    "Results-driven communications professional with {years} years of military experience. Proficient in network administration, telecommunications systems, and technical support. Demonstrated ability to maintain critical communications infrastructure in challenging environments. Looking to apply technical skills and operational experience in a {targetRole} role."
  ],
  engineering: [
    "Skilled engineering professional with {years} years of military experience in construction, project management, and technical operations. Proven ability to lead teams, solve complex problems, and complete projects in challenging environments. Seeking to leverage engineering expertise and leadership skills as a {targetRole}.",
    "Results-oriented engineer with {years} years of military experience managing construction projects and technical operations. Proficient in project planning, resource allocation, and risk management. Demonstrated success in completing complex projects under strict deadlines. Looking to transition proven engineering capabilities to a {targetRole} position."
  ],
  mechanic: [
    "Experienced maintenance professional with {years} years of military experience servicing and repairing complex mechanical systems. Skilled in diagnostics, preventative maintenance, and technical documentation. Seeking to apply mechanical expertise and problem-solving abilities as a {targetRole}.",
    "Detail-oriented maintenance specialist with {years} years of military experience ensuring operational readiness of critical equipment. Proficient in mechanical repair, quality control, and systems troubleshooting. Demonstrated ability to maintain peak performance of complex machinery in challenging environments. Looking to leverage technical skills in a {targetRole} role."
  ],
  admin: [
    "Organized administrative professional with {years} years of military experience managing office operations, records, and personnel documentation. Skilled in data management, process improvement, and organizational support. Seeking to leverage administrative expertise and attention to detail as a {targetRole}.",
    "Efficient administrative specialist with {years} years of military experience coordinating office functions and managing documentation systems. Proficient in records management, scheduling, and office software. Demonstrated ability to maintain accurate information and streamline administrative processes. Looking to apply organizational skills in a {targetRole} position."
  ],
  cyber: [
    "Cybersecurity professional with {years} years of military experience protecting critical information systems and networks. Skilled in threat analysis, security protocols, and incident response. Seeking to leverage cybersecurity expertise and technical knowledge as a {targetRole}.",
    "Detail-oriented security specialist with {years} years of military experience in cybersecurity operations. Proficient in network security, vulnerability assessment, and threat mitigation. Demonstrated ability to protect sensitive information in high-risk environments. Looking to apply cybersecurity skills and analytical capabilities in a {targetRole} role."
  ],
  mp: [
    "Security professional with {years} years of military law enforcement experience. Skilled in security operations, investigations, and emergency response. Proven ability to maintain safety and security in challenging environments. Seeking to leverage law enforcement expertise and leadership skills as a {targetRole}.",
    "Dedicated security specialist with {years} years of military police experience. Proficient in security protocols, personnel management, and crisis response. Demonstrated success in maintaining order and ensuring compliance with regulations. Looking to transition proven security capabilities to a {targetRole} position."
  ]
};

// Achievement bullet point templates
const achievementTemplates = {
  leadership: [
    "Led a team of {teamSize} personnel, achieving {achievement} while maintaining {metric}",
    "Supervised {teamSize} team members in {task}, resulting in {achievement}",
    "Managed {project} operations with {teamSize} staff, exceeding targets by {metric}",
    "Directed {teamSize}-person team responsible for {responsibility}, improving {metric} by {percentage}%"
  ],
  technical: [
    "Maintained {equipment} systems with {percentage}% uptime, exceeding standards by {metric}",
    "Implemented {system} resulting in {achievement} and {metric} improvement",
    "Developed {solution} for {problem}, reducing {metric} by {percentage}%",
    "Engineered {solution} that improved {process} efficiency by {percentage}%"
  ],
  logistics: [
    "Managed inventory of {value} worth of equipment with {percentage}% accuracy",
    "Coordinated distribution of {resource} across {scope}, reducing delivery time by {percentage}%",
    "Oversaw procurement of {resource}, saving {value} through efficient sourcing",
    "Streamlined {process} workflow, increasing throughput by {percentage}% while maintaining quality"
  ],
  training: [
    "Trained {number} personnel in {skill}, resulting in {achievement}",
    "Developed {program} curriculum that improved {metric} by {percentage}%",
    "Conducted {number} training sessions on {topic}, achieving {result}",
    "Created {resource} that standardized training for {number} team members"
  ],
  security: [
    "Implemented {protocol} security measures, reducing incidents by {percentage}%",
    "Managed security for {asset} valued at {value}, maintaining zero breaches",
    "Conducted {number} security assessments, identifying and mitigating {number} vulnerabilities",
    "Developed {procedure} that improved security response time by {percentage}%"
  ]
};

// Military to civilian phrasing suggestions
const phrasingSuggestions = {
  commanded: "led",
  executed: "implemented",
  mission: "project",
  deployed: "allocated",
  troops: "team members",
  subordinates: "team members",
  officer: "manager",
  enlisted: "staff",
  battalion: "organization",
  company: "department",
  platoon: "team",
  squad: "group",
  drill: "train",
  briefing: "presentation",
  reconnaissance: "research",
  combat: "high-pressure environment",
  weapon: "equipment",
  target: "goal",
  objective: "goal",
  operation: "project",
  tactical: "strategic",
  barracks: "facility",
  ordered: "directed",
  regulations: "policies",
  classified: "confidential",
  sergeant: "supervisor",
  captain: "manager",
  major: "senior manager",
  colonel: "director",
  general: "executive"
};

export { resumeTemplates, summaryTemplates, achievementTemplates, phrasingSuggestions };
