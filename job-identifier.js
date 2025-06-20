const companyData = [
  { name: "Accenture", sector: "Consulting", country: "India", veteranFriendlinessScore: 8.5 },
  { name: "Tata Consultancy Services", sector: "Technology", country: "India", veteranFriendlinessScore: 7.8 },
  { name: "Hindustan Unilever", sector: "FMCG", country: "India", veteranFriendlinessScore: 7.2 },
  { name: "Amazon", sector: "Technology", country: "India", veteranFriendlinessScore: 8.0 },
  { name: "Deloitte", sector: "Consulting", country: "India", veteranFriendlinessScore: 8.3 },
  // Add more companies from PDF
];

const roleMappings = {
  "Logistics Officer": {
    civilianRoles: ["Supply Chain Manager", "Logistics Coordinator", "Operations Manager"],
    industries: ["Logistics", "Manufacturing", "Retail"],
    keywords: ["supply chain", "inventory", "operations"]
  },
  "Naval Engineer": {
    civilianRoles: ["Mechanical Engineer", "Project Engineer", "Maintenance Manager"],
    industries: ["Engineering", "Defense", "Manufacturing"],
    keywords: ["engineering", "maintenance", "project management"]
  },
  "Submarine Radio Operator": {
    civilianRoles: ["Communications Specialist", "Network Technician", "IT Support"],
    industries: ["Telecommunications", "Technology", "Defense"],
    keywords: ["communications", "network", "technical support"]
  },
  "Radiation Safety Officer": {
    civilianRoles: ["Health and Safety Specialist", "Environmental Compliance Officer", "Radiation Protection Technician"],
    industries: ["Healthcare", "Energy", "Defense"],
    keywords: ["safety", "compliance", "radiation protection"]
  }
  // Add more mappings from PDF
};

class JobIdentifier {
  constructor(userId) {
    this.userId = userId;
    this.db = null;
  }

  initializeFirestore() {
    if (!this.db) {
      this.db = firebase.firestore();
    }
  }

  mapMilitaryRole(militaryRole, rank, specialization) {
    const mapping = roleMappings[militaryRole] || {
      civilianRoles: ["General Manager"],
      industries: ["General"],
      keywords: ["management"]
    };
    return {
      ...mapping,
      rank,
      specialization
    };
  }

  alignIndustries(roleData, filters) {
    let industries = roleData.industries;
    if (filters.location) {
      industries = industries.filter(industry => {
        return companyData.some(c => c.sector === industry && (!filters.location || c.country.toLowerCase().includes(filters.location.toLowerCase())));
      });
    }
    if (filters.remoteWork) {
      industries = industries.filter(industry => companyData.some(c => c.sector === industry));
    }
    if (filters.skills && filters.skills.length) {
      industries = industries.filter(industry => {
        return roleData.keywords.some(keyword => filters.skills.includes(keyword));
      });
    }
    return industries.length ? industries : ["No matching industries"];
  }

  recommendCompanies(industries, filters) {
    let companies = companyData.filter(c => industries.includes(c.sector));
    if (filters.country) {
      companies = companies.filter(c => c.country.toLowerCase().includes(filters.country.toLowerCase()));
    }
    companies.sort((a, b) => b.veteranFriendlinessScore - a.veteranFriendlinessScore);
    return companies.slice(0, 5);
  }

  async saveProfile(profileData) {
    try {
      this.initializeFirestore();
      await this.db.collection("users").doc(this.userId).collection("jobProfiles").add(profileData);
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      return false;
    }
  }

  generateResumeData(roleData, companies) {
    return {
      civilianRoles: roleData.civilianRoles,
      keywords: roleData.keywords,
      targetCompanies: companies.map(c => c.name),
      industries: roleData.industries
    };
  }
}

export { JobIdentifier };
