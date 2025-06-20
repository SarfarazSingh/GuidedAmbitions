// job-identifier.js – v2.0
// ------------------------------------------------------------
// This module powers the **Job Identifier** feature.
// * Pulls in the master company catalog (auto‑generated from the PDF)
// * Converts Indian Armed Forces roles & ranks → civilian language
// * Recommends industries / companies filtered by location, skills, etc.
// ------------------------------------------------------------

/* ------------------------------------------------------------------
   Data imports                                                        
   ------------------------------------------------------------------ */
// 1. `companyData`  – exhaustive list of companies scraped from the PDF
//                    [{ name, sector, country, veteranFriendlinessScore }]
//    ‑> kept in a separate module so this file stays readable.
import { companyData } from "./data/companyData.js";

// 2.  `rankLevels`   – maps every rank across Army / Navy / Air‑Force to
//                      both a numeric seniority level *and* a civilian
//                      seniority label (Associate, Manager, Director …)
import { rankLevels }  from "./data/rankLevels.js";

/* ------------------------------------------------------------------
   Role mappings                                                       
   ------------------------------------------------------------------ */
// A *compact* mapping between common military functional roles and
// (a) equivalent civilian job families  (b) industries  (c) keywords.
// NOTE: If you need to add a new military role just drop a new object
//       in here – the UI will pick it up automatically.
export const roleMappings = {
  /** Logistics & Supply */
  "Logistics Officer": {
    civilianRoles: ["Supply Chain Manager", "Logistics Coordinator", "Operations Manager"],
    industries: ["Logistics", "Manufacturing", "Retail", "E‑Commerce"],
    keywords: ["supply chain", "inventory", "operations", "warehouse"]
  },
  /** Engineering */
  "Naval Engineer": {
    civilianRoles: ["Mechanical Engineer", "Maintenance Manager", "Project Engineer"],
    industries: ["Maritime", "Oil & Gas", "Engineering", "Defense"],
    keywords: ["engineering", "maintenance", "project management"]
  },
  /** Communications & IT */
  "Submarine Radio Operator": {
    civilianRoles: ["Communications Specialist", "Network Technician", "IT Support"],
    industries: ["Telecommunications", "Technology", "Defense"],
    keywords: ["communications", "network", "signal", "technical support"]
  },
  /** Health & Safety */
  "Radiation Safety Officer": {
    civilianRoles: ["EHS Specialist", "Radiation Protection Technician", "HSE Manager"],
    industries: ["Healthcare", "Energy", "Research"],
    keywords: ["safety", "compliance", "radiation"]
  }
  // 👉🏽  add more functional roles here as required.
};

/* ------------------------------------------------------------------
   Helper utilities                                                    
   ------------------------------------------------------------------ */
/**
 * Normalise an armed‑forces rank to an internal seniority object.
 * @param {string} rank  e.g. "Lt Cdr" | "Subedar Major"
 * @returns {{ level:number, label:string }}
 */
function parseRank(rank) {
  const normalised = rank.trim().replace(/\./g, "");
  return rankLevels[normalised] ?? { level: 1, label: "Associate" };
}

/**
 * Upgrade civilian role titles with a seniority prefix derived from rank.
 */
function prefixRoles(civilianRoles, seniorityLabel) {
  return civilianRoles.map(r => `${seniorityLabel} ${r}`);
}

/* ------------------------------------------------------------------
   Main class                                                          
   ------------------------------------------------------------------ */
export default class JobIdentifier {
  constructor(userId, db) {
    this.userId = userId;
    this.db = db; // <-- supply firebase db instance from caller
  }

  /* --------------------------------------------
     1) Map military role -> civilian blueprint
     -------------------------------------------- */
  mapMilitaryRole(militaryRole, rank, specialization = "") {
    const mapping = roleMappings[militaryRole] || {
      civilianRoles: ["General Manager"],
      industries: ["General"],
      keywords: ["management"]
    };

    const { level, label } = parseRank(rank);
    const civilianRoles = prefixRoles(mapping.civilianRoles, label);

    return {
      ...mapping,
      civilianRoles,
      seniorityLevel: level,
      rank,
      specialization
    };
  }

  /* --------------------------------------------
     2) Narrow down industries                    
     -------------------------------------------- */
  alignIndustries(roleData, { location = "", remoteWork, skills = [], experience = 0 } = {}) {
    let industries = [...roleData.industries];

    // 2a) filter by location
    if (location) {
      industries = industries.filter(ind =>
        companyData.some(c => c.sector === ind && c.country.toLowerCase().includes(location.toLowerCase()))
      );
    }

    // 2b) filter by skill keywords
    if (skills.length) {
      industries = industries.filter(ind =>
        roleData.keywords.some(k => skills.map(s => s.toLowerCase()).includes(k))
      );
    }

    // fallback
    return industries.length ? industries : ["General"];
  }

  /* --------------------------------------------
     3) Company recommendation                    
     -------------------------------------------- */
  recommendCompanies(industries, { country = "", max = 5 } = {}) {
    let list = companyData.filter(c => industries.includes(c.sector));

    if (country) {
      list = list.filter(c => c.country.toLowerCase().includes(country.toLowerCase()));
    }

    // sort by veteran score desc then alphabetically
    list.sort((a, b) => {
      if (b.veteranFriendlinessScore !== a.veteranFriendlinessScore) {
        return b.veteranFriendlinessScore - a.veteranFriendlinessScore;
      }
      return a.name.localeCompare(b.name);
    });

    return list.slice(0, max);
  }

  /* --------------------------------------------
     4) Save profile to Firestore                 
     -------------------------------------------- */
  async saveProfile(profile) {
    if (!this.db) throw new Error("Firestore not initialised");
    try {
      await this.db.collection("users").doc(this.userId).collection("jobProfiles").add({
        ...profile,
        createdAt: new Date()
      });
      return true;
    } catch (err) {
      console.error("[JobIdentifier] saveProfile()", err);
      return false;
    }
  }

  /* --------------------------------------------
     5) Generate minimal data for resume builder  
     -------------------------------------------- */
  generateResumeData({ civilianRoles, keywords, industries }, companies) {
    return {
      headlineRoles: civilianRoles,
      focusKeywords: keywords,
      industries,
      targetCompanies: companies.map(c => c.name)
    };
  }
}

// ------------------------------------------------------------
//  END  – add / tweak mappings in `roleMappings` & `rankLevels`
//        – regenerate `data/companyData.js` via scripts/pdf‑to‑json
// ------------------------------------------------------------
