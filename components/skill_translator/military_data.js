// Military data for Skill Translator component

// Military branches
const militaryBranches = [
  { id: 'army', name: 'Army' },
  { id: 'navy', name: 'Navy' },
  { id: 'airforce', name: 'Air Force' },
  { id: 'marines', name: 'Marines' },
  { id: 'coastguard', name: 'Coast Guard' },
  { id: 'spacef', name: 'Space Force' }
];

// Military ranks
const militaryRanks = {
  army: [
    { id: 'e1', name: 'E-1 Private' },
    { id: 'e2', name: 'E-2 Private E-2' },
    { id: 'e3', name: 'E-3 Private First Class' },
    { id: 'e4', name: 'E-4 Specialist/Corporal' },
    { id: 'e5', name: 'E-5 Sergeant' },
    { id: 'e6', name: 'E-6 Staff Sergeant' },
    { id: 'e7', name: 'E-7 Sergeant First Class' },
    { id: 'e8', name: 'E-8 Master Sergeant/First Sergeant' },
    { id: 'e9', name: 'E-9 Sergeant Major' },
    { id: 'o1', name: 'O-1 Second Lieutenant' },
    { id: 'o2', name: 'O-2 First Lieutenant' },
    { id: 'o3', name: 'O-3 Captain' },
    { id: 'o4', name: 'O-4 Major' },
    { id: 'o5', name: 'O-5 Lieutenant Colonel' },
    { id: 'o6', name: 'O-6 Colonel' },
    { id: 'o7', name: 'O-7 Brigadier General' },
    { id: 'o8', name: 'O-8 Major General' },
    { id: 'o9', name: 'O-9 Lieutenant General' },
    { id: 'o10', name: 'O-10 General' },
    { id: 'w1', name: 'W-1 Warrant Officer' },
    { id: 'w2', name: 'W-2 Chief Warrant Officer 2' },
    { id: 'w3', name: 'W-3 Chief Warrant Officer 3' },
    { id: 'w4', name: 'W-4 Chief Warrant Officer 4' },
    { id: 'w5', name: 'W-5 Chief Warrant Officer 5' }
  ],
  navy: [
    { id: 'e1', name: 'E-1 Seaman Recruit' },
    { id: 'e2', name: 'E-2 Seaman Apprentice' },
    { id: 'e3', name: 'E-3 Seaman' },
    { id: 'e4', name: 'E-4 Petty Officer Third Class' },
    { id: 'e5', name: 'E-5 Petty Officer Second Class' },
    { id: 'e6', name: 'E-6 Petty Officer First Class' },
    { id: 'e7', name: 'E-7 Chief Petty Officer' },
    { id: 'e8', name: 'E-8 Senior Chief Petty Officer' },
    { id: 'e9', name: 'E-9 Master Chief Petty Officer' },
    { id: 'o1', name: 'O-1 Ensign' },
    { id: 'o2', name: 'O-2 Lieutenant Junior Grade' },
    { id: 'o3', name: 'O-3 Lieutenant' },
    { id: 'o4', name: 'O-4 Lieutenant Commander' },
    { id: 'o5', name: 'O-5 Commander' },
    { id: 'o6', name: 'O-6 Captain' },
    { id: 'o7', name: 'O-7 Rear Admiral Lower Half' },
    { id: 'o8', name: 'O-8 Rear Admiral Upper Half' },
    { id: 'o9', name: 'O-9 Vice Admiral' },
    { id: 'o10', name: 'O-10 Admiral' },
    { id: 'w1', name: 'W-1 Warrant Officer 1' },
    { id: 'w2', name: 'W-2 Chief Warrant Officer 2' },
    { id: 'w3', name: 'W-3 Chief Warrant Officer 3' },
    { id: 'w4', name: 'W-4 Chief Warrant Officer 4' },
    { id: 'w5', name: 'W-5 Chief Warrant Officer 5' }
  ],
  airforce: [
    { id: 'e1', name: 'E-1 Airman Basic' },
    { id: 'e2', name: 'E-2 Airman' },
    { id: 'e3', name: 'E-3 Airman First Class' },
    { id: 'e4', name: 'E-4 Senior Airman' },
    { id: 'e5', name: 'E-5 Staff Sergeant' },
    { id: 'e6', name: 'E-6 Technical Sergeant' },
    { id: 'e7', name: 'E-7 Master Sergeant' },
    { id: 'e8', name: 'E-8 Senior Master Sergeant' },
    { id: 'e9', name: 'E-9 Chief Master Sergeant' },
    { id: 'o1', name: 'O-1 Second Lieutenant' },
    { id: 'o2', name: 'O-2 First Lieutenant' },
    { id: 'o3', name: 'O-3 Captain' },
    { id: 'o4', name: 'O-4 Major' },
    { id: 'o5', name: 'O-5 Lieutenant Colonel' },
    { id: 'o6', name: 'O-6 Colonel' },
    { id: 'o7', name: 'O-7 Brigadier General' },
    { id: 'o8', name: 'O-8 Major General' },
    { id: 'o9', name: 'O-9 Lieutenant General' },
    { id: 'o10', name: 'O-10 General' }
  ],
  marines: [
    { id: 'e1', name: 'E-1 Private' },
    { id: 'e2', name: 'E-2 Private First Class' },
    { id: 'e3', name: 'E-3 Lance Corporal' },
    { id: 'e4', name: 'E-4 Corporal' },
    { id: 'e5', name: 'E-5 Sergeant' },
    { id: 'e6', name: 'E-6 Staff Sergeant' },
    { id: 'e7', name: 'E-7 Gunnery Sergeant' },
    { id: 'e8', name: 'E-8 Master Sergeant/First Sergeant' },
    { id: 'e9', name: 'E-9 Master Gunnery Sergeant/Sergeant Major' },
    { id: 'o1', name: 'O-1 Second Lieutenant' },
    { id: 'o2', name: 'O-2 First Lieutenant' },
    { id: 'o3', name: 'O-3 Captain' },
    { id: 'o4', name: 'O-4 Major' },
    { id: 'o5', name: 'O-5 Lieutenant Colonel' },
    { id: 'o6', name: 'O-6 Colonel' },
    { id: 'o7', name: 'O-7 Brigadier General' },
    { id: 'o8', name: 'O-8 Major General' },
    { id: 'o9', name: 'O-9 Lieutenant General' },
    { id: 'o10', name: 'O-10 General' },
    { id: 'w1', name: 'W-1 Warrant Officer' },
    { id: 'w2', name: 'W-2 Chief Warrant Officer 2' },
    { id: 'w3', name: 'W-3 Chief Warrant Officer 3' },
    { id: 'w4', name: 'W-4 Chief Warrant Officer 4' },
    { id: 'w5', name: 'W-5 Chief Warrant Officer 5' }
  ],
  coastguard: [
    { id: 'e1', name: 'E-1 Seaman Recruit' },
    { id: 'e2', name: 'E-2 Seaman Apprentice' },
    { id: 'e3', name: 'E-3 Seaman' },
    { id: 'e4', name: 'E-4 Petty Officer Third Class' },
    { id: 'e5', name: 'E-5 Petty Officer Second Class' },
    { id: 'e6', name: 'E-6 Petty Officer First Class' },
    { id: 'e7', name: 'E-7 Chief Petty Officer' },
    { id: 'e8', name: 'E-8 Senior Chief Petty Officer' },
    { id: 'e9', name: 'E-9 Master Chief Petty Officer' },
    { id: 'o1', name: 'O-1 Ensign' },
    { id: 'o2', name: 'O-2 Lieutenant Junior Grade' },
    { id: 'o3', name: 'O-3 Lieutenant' },
    { id: 'o4', name: 'O-4 Lieutenant Commander' },
    { id: 'o5', name: 'O-5 Commander' },
    { id: 'o6', name: 'O-6 Captain' },
    { id: 'o7', name: 'O-7 Rear Admiral Lower Half' },
    { id: 'o8', name: 'O-8 Rear Admiral Upper Half' },
    { id: 'o9', name: 'O-9 Vice Admiral' },
    { id: 'o10', name: 'O-10 Admiral' },
    { id: 'w2', name: 'W-2 Chief Warrant Officer 2' },
    { id: 'w3', name: 'W-3 Chief Warrant Officer 3' },
    { id: 'w4', name: 'W-4 Chief Warrant Officer 4' }
  ],
  spacef: [
    { id: 'e1', name: 'E-1 Specialist 1' },
    { id: 'e2', name: 'E-2 Specialist 2' },
    { id: 'e3', name: 'E-3 Specialist 3' },
    { id: 'e4', name: 'E-4 Specialist 4' },
    { id: 'e5', name: 'E-5 Sergeant' },
    { id: 'e6', name: 'E-6 Technical Sergeant' },
    { id: 'e7', name: 'E-7 Master Sergeant' },
    { id: 'e8', name: 'E-8 Senior Master Sergeant' },
    { id: 'e9', name: 'E-9 Chief Master Sergeant' },
    { id: 'o1', name: 'O-1 Second Lieutenant' },
    { id: 'o2', name: 'O-2 First Lieutenant' },
    { id: 'o3', name: 'O-3 Captain' },
    { id: 'o4', name: 'O-4 Major' },
    { id: 'o5', name: 'O-5 Lieutenant Colonel' },
    { id: 'o6', name: 'O-6 Colonel' },
    { id: 'o7', name: 'O-7 Brigadier General' },
    { id: 'o8', name: 'O-8 Major General' },
    { id: 'o9', name: 'O-9 Lieutenant General' },
    { id: 'o10', name: 'O-10 General' }
  ]
};

// Common military roles/trades with civilian equivalents
const militaryRoles = [
  {
    id: 'infantry',
    name: 'Infantry',
    branch: ['army', 'marines'],
    civilianTitles: [
      { title: 'Security Manager', match: 92 },
      { title: 'Law Enforcement Officer', match: 88 },
      { title: 'Operations Manager', match: 85 },
      { title: 'Emergency Management Specialist', match: 82 },
      { title: 'Training Coordinator', match: 78 }
    ],
    hardSkills: ['Tactical Planning', 'Weapons Systems', 'Team Leadership', 'Risk Assessment', 'Security Protocols'],
    softSkills: ['Decision Making Under Pressure', 'Adaptability', 'Team Coordination', 'Discipline', 'Physical Endurance'],
    industries: [
      { name: 'Security', reason: 'Direct application of security and protection skills' },
      { name: 'Law Enforcement', reason: 'Tactical training and discipline are highly valued' },
      { name: 'Emergency Management', reason: 'Experience with crisis response and management' },
      { name: 'Operations', reason: 'Ability to execute complex operational plans' }
    ]
  },
  {
    id: 'intelligence',
    name: 'Intelligence Specialist',
    branch: ['army', 'navy', 'airforce', 'marines', 'coastguard', 'spacef'],
    civilianTitles: [
      { title: 'Intelligence Analyst', match: 95 },
      { title: 'Cybersecurity Analyst', match: 90 },
      { title: 'Risk Assessment Specialist', match: 87 },
      { title: 'Research Analyst', match: 85 },
      { title: 'Data Scientist', match: 80 }
    ],
    hardSkills: ['Intelligence Analysis', 'Data Collection', 'Report Writing', 'Security Clearance', 'Geospatial Analysis'],
    softSkills: ['Critical Thinking', 'Attention to Detail', 'Problem Solving', 'Confidentiality', 'Analytical Thinking'],
    industries: [
      { name: 'Government Contracting', reason: 'Direct application of intelligence skills' },
      { name: 'Cybersecurity', reason: 'Understanding of security threats and analysis' },
      { name: 'Data Analytics', reason: 'Experience with data collection and analysis' },
      { name: 'Financial Services', reason: 'Risk assessment and analytical capabilities' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics Specialist',
    branch: ['army', 'navy', 'airforce', 'marines', 'coastguard', 'spacef'],
    civilianTitles: [
      { title: 'Supply Chain Manager', match: 94 },
      { title: 'Logistics Coordinator', match: 92 },
      { title: 'Procurement Specialist', match: 88 },
      { title: 'Inventory Control Manager', match: 85 },
      { title: 'Operations Manager', match: 82 }
    ],
    hardSkills: ['Supply Chain Management', 'Inventory Control', 'Procurement', 'Shipping/Receiving', 'ERP Systems'],
    softSkills: ['Organization', 'Problem Solving', 'Time Management', 'Attention to Detail', 'Communication'],
    industries: [
      { name: 'Logistics & Transportation', reason: 'Direct application of logistics expertise' },
      { name: 'Manufacturing', reason: 'Experience with inventory and supply chain' },
      { name: 'Retail', reason: 'Understanding of distribution and inventory management' },
      { name: 'Healthcare', reason: 'Critical supply management experience' }
    ]
  },
  {
    id: 'medic',
    name: 'Combat Medic/Corpsman',
    branch: ['army', 'navy', 'airforce', 'marines'],
    civilianTitles: [
      { title: 'Emergency Medical Technician', match: 95 },
      { title: 'Healthcare Administrator', match: 88 },
      { title: 'Medical Assistant', match: 85 },
      { title: 'Paramedic', match: 90 },
      { title: 'Occupational Health Specialist', match: 82 }
    ],
    hardSkills: ['Emergency Medical Care', 'Triage', 'Patient Assessment', 'Medication Administration', 'Medical Documentation'],
    softSkills: ['Crisis Management', 'Composure Under Pressure', 'Empathy', 'Communication', 'Decision Making'],
    industries: [
      { name: 'Healthcare', reason: 'Direct application of medical training' },
      { name: 'Emergency Services', reason: 'Experience with emergency response' },
      { name: 'Public Health', reason: 'Understanding of health protocols and care' },
      { name: 'Pharmaceutical', reason: 'Knowledge of medications and treatments' }
    ]
  },
  {
    id: 'comms',
    name: 'Communications Specialist',
    branch: ['army', 'navy', 'airforce', 'marines', 'coastguard', 'spacef'],
    civilianTitles: [
      { title: 'IT Network Administrator', match: 90 },
      { title: 'Telecommunications Specialist', match: 92 },
      { title: 'Systems Engineer', match: 85 },
      { title: 'Technical Support Specialist', match: 82 },
      { title: 'Communications Manager', match: 80 }
    ],
    hardSkills: ['Network Administration', 'Radio Communications', 'Troubleshooting', 'Encryption', 'Technical Documentation'],
    softSkills: ['Problem Solving', 'Clear Communication', 'Teamwork', 'Adaptability', 'Attention to Detail'],
    industries: [
      { name: 'Information Technology', reason: 'Direct application of technical skills' },
      { name: 'Telecommunications', reason: 'Experience with communication systems' },
      { name: 'Technical Support', reason: 'Troubleshooting and problem-solving abilities' },
      { name: 'Defense Contracting', reason: 'Familiarity with military communication systems' }
    ]
  },
  {
    id: 'engineering',
    name: 'Combat Engineer',
    branch: ['army', 'marines'],
    civilianTitles: [
      { title: 'Civil Engineer', match: 88 },
      { title: 'Construction Manager', match: 85 },
      { title: 'Project Manager', match: 82 },
      { title: 'Safety Manager', match: 80 },
      { title: 'Demolition Specialist', match: 90 }
    ],
    hardSkills: ['Construction', 'Demolition', 'Blueprint Reading', 'Heavy Equipment Operation', 'Fortification'],
    softSkills: ['Problem Solving', 'Risk Assessment', 'Teamwork', 'Adaptability', 'Decision Making'],
    industries: [
      { name: 'Construction', reason: 'Direct application of engineering and building skills' },
      { name: 'Civil Engineering', reason: 'Experience with structural work and planning' },
      { name: 'Project Management', reason: 'Coordination of complex engineering tasks' },
      { name: 'Mining', reason: 'Experience with explosives and safety protocols' }
    ]
  },
  {
    id: 'mechanic',
    name: 'Vehicle/Aircraft Mechanic',
    branch: ['army', 'navy', 'airforce', 'marines', 'coastguard', 'spacef'],
    civilianTitles: [
      { title: 'Automotive Technician', match: 92 },
      { title: 'Aircraft Maintenance Technician', match: 95 },
      { title: 'Maintenance Manager', match: 85 },
      { title: 'Quality Control Inspector', match: 82 },
      { title: 'Fleet Manager', match: 80 }
    ],
    hardSkills: ['Mechanical Repair', 'Preventative Maintenance', 'Diagnostics', 'Technical Documentation', 'Quality Control'],
    softSkills: ['Problem Solving', 'Attention to Detail', 'Technical Aptitude', 'Time Management', 'Safety Consciousness'],
    industries: [
      { name: 'Automotive', reason: 'Direct application of mechanical skills' },
      { name: 'Aviation', reason: 'Experience with complex mechanical systems' },
      { name: 'Manufacturing', reason: 'Understanding of mechanical processes and quality' },
      { name: 'Transportation', reason: 'Fleet maintenance and management experience' }
    ]
  },
  {
    id: 'admin',
    name: 'Administrative Specialist',
    branch: ['army', 'navy', 'airforce', 'marines', 'coastguard', 'spacef'],
    civilianTitles: [
      { title: 'Office Manager', match: 90 },
      { title: 'Administrative Assistant', match: 95 },
      { title: 'Executive Assistant', match: 85 },
      { title: 'Records Manager', match: 88 },
      { title: 'Human Resources Assistant', match: 82 }
    ],
    hardSkills: ['Records Management', 'Office Software', 'Data Entry', 'Scheduling', 'Document Processing'],
    softSkills: ['Organization', 'Communication', 'Time Management', 'Attention to Detail', 'Multitasking'],
    industries: [
      { name: 'Business Administration', reason: 'Direct application of administrative skills' },
      { name: 'Human Resources', reason: 'Experience with personnel documentation' },
      { name: 'Legal Services', reason: 'Attention to detail and records management' },
      { name: 'Healthcare Administration', reason: 'Experience with confidential documentation' }
    ]
  },
  {
    id: 'cyber',
    name: 'Cyber Operations Specialist',
    branch: ['army', 'navy', 'airforce', 'marines', 'spacef'],
    civilianTitles: [
      { title: 'Cybersecurity Analyst', match: 95 },
      { title: 'Information Security Specialist', match: 92 },
      { title: 'Network Security Engineer', match: 88 },
      { title: 'Security Operations Center Analyst', match: 90 },
      { title: 'Penetration Tester', match: 85 }
    ],
    hardSkills: ['Network Security', 'Threat Analysis', 'Security Tools', 'Vulnerability Assessment', 'Incident Response'],
    softSkills: ['Analytical Thinking', 'Problem Solving', 'Attention to Detail', 'Continuous Learning', 'Communication'],
    industries: [
      { name: 'Cybersecurity', reason: 'Direct application of security skills' },
      { name: 'Information Technology', reason: 'Understanding of networks and systems' },
      { name: 'Financial Services', reason: 'Experience protecting sensitive information' },
      { name: 'Government Contracting', reason: 'Familiarity with security protocols' }
    ]
  },
  {
    id: 'mp',
    name: 'Military Police',
    branch: ['army', 'navy', 'airforce', 'marines'],
    civilianTitles: [
      { title: 'Police Officer', match: 95 },
      { title: 'Security Manager', match: 90 },
      { title: 'Federal Agent', match: 85 },
      { title: 'Corrections Officer', match: 88 },
      { title: 'Private Investigator', match: 80 }
    ],
    hardSkills: ['Law Enforcement', 'Security Protocols', 'Investigation', 'Report Writing', 'Crisis Management'],
    softSkills: ['Authority', 'Composure', 'Observation', 'Communication', 'Decision Making'],
    industries: [
      { name: 'Law Enforcement', reason: 'Direct application of policing skills' },
      { name: 'Security', reason: 'Experience with security protocols and enforcement' },
      { name: 'Federal Government', reason: 'Understanding of law enforcement procedures' },
      { name: 'Corrections', reason: 'Experience with security and personnel management' }
    ]
  }
];

export { militaryBranches, militaryRanks, militaryRoles };
