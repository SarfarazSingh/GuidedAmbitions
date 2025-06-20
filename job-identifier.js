// job-identifier.js – v3.1
// ------------------------------------------------------------
// Enhanced module for the **Job Identifier** feature.
// * Pulls in the master company catalog (auto-generated from the PDF)
// * Converts Indian Armed Forces roles & ranks → civilian language
// * Recommends industries/companies with weighted scoring for skills, location, and veteran-friendliness
// * Uses comprehensive role mappings from roleMappings.js
// ------------------------------------------------------------

/* ------------------------------------------------------------------
   Data imports
   ------------------------------------------------------------------ */
import { companyData } from "./data/companyData.js";
import { rankLevels } from "./data/rankLevels.js";
import { roleMappings } from "./data/roleMappings.js";

/* ------------------------------------------------------------------
   Helper utilities
   ------------------------------------------------------------------ */
/**
 * Normalise an armed-forces rank to an internal seniority object.
 * @param {string} rank e.g. "Lt Cdr" | "Subedar Major"
 * @returns {{ level: number, label: string }}
 */
function parseRank(rank) {
  const normalised = rank.trim().replace(/\./g, "");
  return rankLevels[normalised] ? 
    { level: getSeniorityLevel(rankLevels[normalised]), label: rankLevels[normalised] } : 
    { level: 1, label: "Associate" };
}

/**
 * Convert seniority label to numeric level for scoring.
 * @param {string} label
 * @returns {number}
 */
function getSeniorityLevel(label) {
  const levels = {
    "Entry-Level": 1,
    "Junior": 2,
    "Associate": 3,
    "Senior Associate": 4,
    "Assistant Manager": 5,
    "Manager": 6,
    "Senior Manager": 7,
    "Associate Director": 8,
    "Director": 9,
    "Senior Director": 10,
    "Vice President": 11,
    "Senior Vice President": 12,
    "Executive Vice President": 13,
    "Senior Executive": 14,
    "EVP / SVP": 15,
    "C-Level": 16
  };
  return levels[label] || 1;
}

/**
 * Upgrade civilian role titles with a seniority prefix derived from rank.
 */
function prefixRoles(civilianRoles, seniorityLabel) {
  return civilianRoles.map(r => `${seniorityLabel} ${r}`);
}

/**
 * Calculate cosine similarity between two arrays of strings (e.g., skills and keywords).
 * @param {string[]} a
 * @param {string[]} b
 * @returns {number}
 */
function cosineSimilarity(a, b) {
  const aSet = new Set(a.map(s => s.toLowerCase()));
  const bSet = new Set(b.map(s => s.toLowerCase()));
  const intersection = new Set([...aSet].filter(x => bSet.has(x)));
  const union = new Set([...aSet, ...bSet]);
  return intersection.size / Math.sqrt(aSet.size * bSet.size) || 0;
}

/* ------------------------------------------------------------------
   Main class
   ------------------------------------------------------------------ */
export default class JobIdentifier {
  constructor(userId, db) {
    this.userId = userId;
    this.db = db;
  }

  /* --------------------------------------------
     1) Map military role -> civilian blueprint
     -------------------------------------------- */
  mapMilitaryRole(militaryRole, rank, specialization = "") {
    const mapping = roleMappings[militaryRole] || this.getFallbackMapping(militaryRole);
    const { level, label } = parseRank(rank);
    const civilianRoles = prefixRoles(mapping.civilianRoles, label);

    // Score role match based on keywords and specialization
    const roleScore = this.calculateRoleScore(mapping, specialization);

    return {
      ...mapping,
      civilianRoles,
      seniorityLevel: level,
      rank,
      specialization,
      roleScore
    };
  }

  /**
   * Generate fallback mapping for unmapped military roles.
   * @param {string} militaryRole
   * @returns {object}
   */
  getFallbackMapping(militaryRole) {
    const keywords = militaryRole.toLowerCase().split(" ");
    const fallbackRoles = ["General Manager", "Operations Specialist"];
    const fallbackIndustries = ["General", "Business Services"];
    return {
      civilianRoles: fallbackRoles,
      industries: fallbackIndustries,
      keywords: keywords,
      roleScore: 0.5 // Lower score for fallback
    };
  }

  /**
   * Calculate role match score based on keywords and specialization.
   * @param {object} mapping
   * @param {string} specialization
   * @returns {number}
   */
  calculateRoleScore(mapping, specialization) {
    let score = 0;
    // Keyword weight (50%)
    score += 0.5 * (mapping.keywords.length > 0 ? 1 : 0.5);
    // Specialization weight (30%)
    if (specialization && mapping.keywords.some(k => specialization.toLowerCase().includes(k))) {
      score += 0.3;
    }
    // Base mapping existence (20%)
    score += 0.2;
    return score;
  }

  /* --------------------------------------------
     2) Narrow down industries
     -------------------------------------------- */
  alignIndustries(roleData, { location = "", remoteWork = "Any", skills = [], experience = 0 } = {}) {
    let industries = [...roleData.industries];

    // Filter by location
    if (location) {
      industries = industries.filter(ind =>
        companyData.some(c => c.sector === ind && c.country.toLowerCase().includes(location.toLowerCase()))
      );
    }

    // Filter by skill similarity
    if (skills.length) {
      industries = industries
        .map(ind => ({
          industry: ind,
          score: cosineSimilarity(skills, roleData.keywords)
        }))
        .filter(({ score }) => score > 0.3) // Threshold for relevance
        .sort((a, b) => b.score - a.score)
        .map(({ industry }) => industry);
    }

    // Adjust for experience
    if (experience > 10) {
      industries = industries.filter(ind =>
        ["Consulting", "Technology", "Defense", "Financial Services"].includes(ind)
      );
    } else if (experience < 5) {
      industries = industries.concat(["Retail", "Customer Service"]).slice(0, 5);
    }

    // Handle remote work preference
    if (remoteWork === "Yes") {
      industries = industries.concat(["Technology", "Telecommunications"]).filter((v, i, a) => a.indexOf(v) === i);
    }

    return industries.length ? industries : ["General"];
  }

  /* --------------------------------------------
     3) Company recommendation
     -------------------------------------------- */
  recommendCompanies(industries, { country = "", max = 5, remoteWork = "Any" } = {}) {
    let list = companyData.filter(c => industries.includes(c.sector));

    if (country) {
      list = list.filter(c => c.country.toLowerCase().includes(country.toLowerCase()));
    }

    // Score companies
    list = list.map(company => ({
      ...company,
      score: this.calculateCompanyScore(company, industries, remoteWork)
    }));

    // Sort by score and name
    list.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name);
    });

    return list.slice(0, max).map(({ score, ...company }) => company);
  }

  /**
   * Calculate company score based on veteran-friendliness, sector, and remote work.
   * @param {object} company
   * @param {string[]} industries
   * @param {string} remoteWork
   * @returns {number}
   */
  calculateCompanyScore(company, industries, remoteWork) {
    let score = 0;
    // Veteran-friendliness (50%)
    score += 0.5 * (company.veteranFriendlinessScore / 10);
    // Sector match (30%)
    score += 0.3 * (industries.includes(company.sector) ? 1 : 0.5);
    // Remote work compatibility (20%)
    if (remoteWork === "Yes" && ["Technology", "Telecommunications", "Consulting"].includes(company.sector)) {
      score += 0.2;
    }
    return score;
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
// END – add/tweak mappings in `roleMappings.js` & `rankLevels.js`
//       – regenerate `data/companyData.js` via scripts/pdf-to-json
// ------------------------------------------------------------
