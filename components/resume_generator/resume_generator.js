// Resume Generator JavaScript
import { resumeTemplates, summaryTemplates, achievementTemplates, phrasingSuggestions } from './resume_data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 'personal';
    let resumeData = {
        personal: {},
        military: {
            achievements: [],
            additionalRoles: []
        },
        education: {
            formal: [],
            military: [],
            certifications: []
        },
        skills: {
            technical: [],
            soft: [],
            achievements: []
        },
        template: {
            design: 'classic',
            color: 'blue'
        }
    };
    
    // Load data from local storage if available
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        try {
            resumeData = JSON.parse(savedData);
            populateFormFields();
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
    
    // Initialize template options
    initializeTemplates();
    
    // Step navigation
    const stepLinks = document.querySelectorAll('#resumeSteps a');
    stepLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetStep = this.getAttribute('data-step');
            if (validateCurrentStep()) {
                navigateToStep(targetStep);
            }
        });
    });
    
    // Next step buttons
    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            if (validateCurrentStep()) {
                navigateToStep(nextStep);
            }
        });
    });
    
    // Previous step buttons
    const prevButtons = document.querySelectorAll('.prev-step');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            saveCurrentStepData();
            navigateToStep(prevStep);
        });
    });
    
    // Function to navigate between steps
    function navigateToStep(step) {
        // Hide all form sections
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.add('d-none');
        });
        
        // Show target form section
        document.getElementById(step + 'Form').classList.remove('d-none');
        document.getElementById(step + 'Form').classList.add('fade-in');
        
        // Update step navigation
        stepLinks.forEach(link => {
            link.classList.remove('active');
            const badge = link.querySelector('.badge');
            badge.classList.remove('bg-primary', 'bg-success', 'bg-secondary');
            badge.classList.add('bg-secondary');
            badge.textContent = 'Pending';
        });
        
        const activeLink = document.querySelector(`#resumeSteps a[data-step="${step}"]`);
        activeLink.classList.add('active');
        const activeBadge = activeLink.querySelector('.badge');
        activeBadge.classList.remove('bg-secondary', 'bg-success');
        activeBadge.classList.add('bg-primary');
        activeBadge.textContent = 'Current';
        
        // Mark previous steps as completed
        stepLinks.forEach(link => {
            const linkStep = link.getAttribute('data-step');
            const stepIndex = getStepIndex(linkStep);
            const currentIndex = getStepIndex(step);
            
            if (stepIndex < currentIndex) {
                const badge = link.querySelector('.badge');
                badge.classList.remove('bg-secondary', 'bg-primary');
                badge.classList.add('bg-success');
                badge.textContent = 'Completed';
            }
        });
        
        // Update current step title
        document.getElementById('currentStepTitle').textContent = activeLink.querySelector('h5').textContent.substring(2);
        
        // Show relevant tips
        document.querySelectorAll('.tips-section').forEach(section => {
            section.classList.add('d-none');
        });
        document.getElementById(step + 'Tips').classList.remove('d-none');
        
        // Update current step
        currentStep = step;
    }
    
    // Function to get step index for ordering
    function getStepIndex(step) {
        const steps = ['personal', 'military', 'education', 'skills', 'template'];
        return steps.indexOf(step);
    }
    
    // Function to validate current step before proceeding
    function validateCurrentStep() {
        saveCurrentStepData();
        
        // Basic validation could be expanded
        switch (currentStep) {
            case 'personal':
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                
                if (!firstName || !lastName || !email) {
                    alert('Please fill in all required fields before proceeding.');
                    return false;
                }
                break;
                
            case 'military':
                const branch = document.getElementById('branchOfService').value;
                const rank = document.getElementById('rank').value;
                
                if (!branch || !rank) {
                    alert('Please fill in all required fields before proceeding.');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    // Function to save current step data
    function saveCurrentStepData() {
        switch (currentStep) {
            case 'personal':
                resumeData.personal = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    jobTitle: document.getElementById('jobTitle').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    linkedin: document.getElementById('linkedin').value,
                    summary: document.getElementById('professionalSummary').value
                };
                break;
                
            case 'military':
                resumeData.military = {
                    branch: document.getElementById('branchOfService').value,
                    rank: document.getElementById('rank').value,
                    startDate: document.getElementById('serviceStart').value,
                    endDate: document.getElementById('serviceEnd').value,
                    primaryRole: document.getElementById('primaryRole').value,
                    responsibilities: document.getElementById('responsibilities').value,
                    achievements: collectAchievements(),
                    additionalRoles: collectAdditionalRoles()
                };
                break;
                
            case 'education':
                resumeData.education = {
                    formal: collectEducation(),
                    military: collectMilitaryTraining(),
                    certifications: collectCertifications()
                };
                break;
                
            case 'skills':
                resumeData.skills = {
                    technical: collectTechnicalSkills(),
                    soft: collectSoftSkills(),
                    achievements: collectAdditionalAchievements()
                };
                break;
                
            case 'template':
                // Template data is saved when selecting templates and colors
                break;
        }
        
        // Save to local storage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
    
    // Helper functions to collect form data
    function collectAchievements() {
        const achievements = [];
        document.querySelectorAll('#achievementsContainer .achievement-input').forEach(input => {
            if (input.value.trim()) {
                achievements.push(input.value.trim());
            }
        });
        return achievements;
    }
    
    function collectAdditionalRoles() {
        const roles = [];
        const roleContainers = document.querySelectorAll('#additionalRolesContainer .additional-role');
        
        roleContainers.forEach(container => {
            const title = container.querySelector('.role-title').value;
            const dates = container.querySelector('.role-dates').value;
            const description = container.querySelector('.role-description').value;
            
            if (title && description) {
                roles.push({
                    title,
                    dates,
                    description
                });
            }
        });
        
        return roles;
    }
    
    function collectEducation() {
        const education = [];
        const educationEntries = document.querySelectorAll('#educationContainer .education-entry');
        
        educationEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input');
            const institution = inputs[0].value;
            const degree = inputs[1].value;
            const field = inputs[2].value;
            const date = inputs[3].value;
            const gpa = inputs[4].value;
            
            if (institution && degree) {
                education.push({
                    institution,
                    degree,
                    field,
                    date,
                    gpa
                });
            }
        });
        
        return education;
    }
    
    function collectMilitaryTraining() {
        const training = [];
        const trainingEntries = document.querySelectorAll('#militaryTrainingContainer .training-entry');
        
        trainingEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input');
            const name = inputs[0].value;
            const institution = inputs[1].value;
            const date = inputs[2].value;
            
            if (name && institution) {
                training.push({
                    name,
                    institution,
                    date
                });
            }
        });
        
        return training;
    }
    
    function collectCertifications() {
        const certifications = [];
        const certEntries = document.querySelectorAll('#certificationContainer .certification-entry');
        
        certEntries.forEach(entry => {
            const inputs = entry.querySelectorAll('input');
            const name = inputs[0].value;
            const organization = inputs[1].value;
            const date = inputs[2].value;
            
            if (name && organization) {
                certifications.push({
                    name,
                    organization,
                    date
                });
            }
        });
        
        return certifications;
    }
    
    function collectTechnicalSkills() {
        const skills = [];
        document.querySelectorAll('#technicalSkillsContainer input').forEach(input => {
            if (input.value.trim()) {
                skills.push(input.value.trim());
            }
        });
        return skills;
    }
    
    function collectSoftSkills() {
        const skills = [];
        document.querySelectorAll('#softSkillsContainer input').forEach(input => {
            if (input.value.trim()) {
                skills.push(input.value.trim());
            }
        });
        return skills;
    }
    
    function collectAdditionalAchievements() {
        const achievements = [];
        document.querySelectorAll('#additionalAchievementsContainer input').forEach(input => {
            if (input.value.trim()) {
                achievements.push(input.value.trim());
            }
        });
        return achievements;
    }
    
    // Function to populate form fields from saved data
    function populateFormFields() {
        // Personal information
        if (resumeData.personal) {
            document.getElementById('firstName').value = resumeData.personal.firstName || '';
            document.getElementById('lastName').value = resumeData.personal.lastName || '';
            document.getElementById('jobTitle').value = resumeData.personal.jobTitle || '';
            document.getElementById('email').value = resumeData.personal.email || '';
            document.getElementById('phone').value = resumeData.personal.phone || '';
            document.getElementById('city').value = resumeData.personal.city || '';
            document.getElementById('state').value = resumeData.personal.state || '';
            document.getElementById('linkedin').value = resumeData.personal.linkedin || '';
            document.getElementById('professionalSummary').value = resumeData.personal.summary || '';
        }
        
        // Military experience
        if (resumeData.military) {
            document.getElementById('branchOfService').value = resumeData.military.branch || '';
            document.getElementById('rank').value = resumeData.military.rank || '';
            document.getElementById('serviceStart').value = resumeData.military.startDate || '';
            document.getElementById('serviceEnd').value = resumeData.military.endDate || '';
            document.getElementById('primaryRole').value = resumeData.military.primaryRole || '';
            document.getElementById('responsibilities').value = resumeData.military.responsibilities || '';
            
            // Populate achievements
            populateAchievements(resumeData.military.achievements || []);
            
            // Populate additional roles
            populateAdditionalRoles(resumeData.military.additionalRoles || []);
        }
        
        // Education and training
        if (resumeData.education) {
            populateEducation(resumeData.education.formal || []);
            populateMilitaryTraining(resumeData.education.military || []);
            populateCertifications(resumeData.education.certifications || []);
        }
        
        // Skills and achievements
        if (resumeData.skills) {
            populateTechnicalSkills(resumeData.skills.technical || []);
            populateSoftSkills(resumeData.skills.soft || []);
            populateAdditionalAchievements(resumeData.skills.achievements || []);
        }
    }
    
    // Helper functions to populate form fields
    function populateAchievements(achievements) {
        const container = document.getElementById('achievementsContainer');
        container.innerHTML = '';
        
        if (achievements.length === 0) {
            // Add default empty achievement
            addAchievement();
            return;
        }
        
        achievements.forEach(achievement => {
            const entry = document.createElement('div');
            entry.className = 'achievement-entry mb-2';
            entry.innerHTML = `
                <div class="input-group">
                    <input type="text" class="form-control achievement-input" value="${achievement}">
                    <button class="btn btn-outline-secondary achievement-suggestion" type="button">
                        <i class="bi bi-magic"></i>
                    </button>
                    <button class="btn btn-outline-danger achievement-remove" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(entry);
            
            // Add event listeners
            entry.querySelector('.achievement-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                } else {
                    entry.querySelector('input').value = '';
                }
            });
            
            entry.querySelector('.achievement-suggestion').addEventListener('click', function() {
                suggestAchievement(entry.querySelector('input'));
            });
        });
    }
    
    function populateAdditionalRoles(roles) {
        const container = document.getElementById('additionalRolesContainer');
        container.innerHTML = '';
        
        roles.forEach(role => {
            const entry = document.createElement('div');
            entry.className = 'additional-role mb-3 p-3 border rounded';
            entry.innerHTML = `
                <div class="row mb-2">
                    <div class="col-md-8">
                        <label class="form-label">Role/Position</label>
                        <input type="text" class="form-control role-title" value="${role.title}">
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Dates</label>
                        <input type="text" class="form-control role-dates" value="${role.dates}">
                    </div>
                </div>
                <div class="mb-2">
                    <label class="form-label">Description</label>
                    <textarea class="form-control role-description" rows="2">${role.description}</textarea>
                </div>
                <button type="button" class="btn btn-outline-danger role-remove">
                    <i class="bi bi-trash"></i> Remove
                </button>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.role-remove').addEventListener('click', function() {
                entry.remove();
            });
        });
    }
    
    function populateEducation(education) {
        const container = document.getElementById('educationContainer');
        container.innerHTML = '';
        
        if (education.length === 0) {
            // Add default empty education entry
            const defaultEntry = createEducationEntry();
            container.appendChild(defaultEntry);
            return;
        }
        
        education.forEach(edu => {
            const entry = document.createElement('div');
            entry.className = 'education-entry mb-3 p-3 border rounded';
            entry.innerHTML = `
                <div class="row mb-2">
                    <div class="col-md-6">
                        <label class="form-label">Institution Name</label>
                        <input type="text" class="form-control" value="${edu.institution}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Degree/Diploma</label>
                        <input type="text" class="form-control" value="${edu.degree}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-md-6">
                        <label class="form-label">Field of Study</label>
                        <input type="text" class="form-control" value="${edu.field || ''}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Graduation Date</label>
                        <input type="month" class="form-control" value="${edu.date || ''}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">GPA (Optional)</label>
                        <input type="text" class="form-control" value="${edu.gpa || ''}">
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <button type="button" class="btn btn-outline-danger education-remove">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.education-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                }
            });
        });
    }
    
    function populateMilitaryTraining(training) {
        const container = document.getElementById('militaryTrainingContainer');
        container.innerHTML = '';
        
        if (training.length === 0) {
            // Add default empty training entry
            const defaultEntry = createTrainingEntry();
            container.appendChild(defaultEntry);
            return;
        }
        
        training.forEach(train => {
            const entry = document.createElement('div');
            entry.className = 'training-entry mb-3 p-3 border rounded';
            entry.innerHTML = `
                <div class="row mb-2">
                    <div class="col-md-6">
                        <label class="form-label">Training Name</label>
                        <input type="text" class="form-control" value="${train.name}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Institution</label>
                        <input type="text" class="form-control" value="${train.institution}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Completion Date</label>
                        <input type="month" class="form-control" value="${train.date || ''}">
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <button type="button" class="btn btn-outline-danger training-remove">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.training-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                }
            });
        });
    }
    
    function populateCertifications(certifications) {
        const container = document.getElementById('certificationContainer');
        container.innerHTML = '';
        
        if (certifications.length === 0) {
            // Add default empty certification entry
            const defaultEntry = createCertificationEntry();
            container.appendChild(defaultEntry);
            return;
        }
        
        certifications.forEach(cert => {
            const entry = document.createElement('div');
            entry.className = 'certification-entry mb-3 p-3 border rounded';
            entry.innerHTML = `
                <div class="row mb-2">
                    <div class="col-md-6">
                        <label class="form-label">Certification Name</label>
                        <input type="text" class="form-control" value="${cert.name}">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Issuing Organization</label>
                        <input type="text" class="form-control" value="${cert.organization}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label">Date Obtained</label>
                        <input type="month" class="form-control" value="${cert.date || ''}">
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <button type="button" class="btn btn-outline-danger certification-remove">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.certification-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                }
            });
        });
    }
    
    function populateTechnicalSkills(skills) {
        const container = document.getElementById('technicalSkillsContainer');
        container.innerHTML = '';
        
        if (skills.length === 0) {
            // Add default empty skills
            addTechnicalSkill();
            addTechnicalSkill();
            return;
        }
        
        skills.forEach(skill => {
            const entry = document.createElement('div');
            entry.className = 'input-group mb-2';
            entry.innerHTML = `
                <input type="text" class="form-control" value="${skill}">
                <button class="btn btn-outline-danger skill-remove" type="button">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.skill-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                } else {
                    entry.querySelector('input').value = '';
                }
            });
        });
    }
    
    function populateSoftSkills(skills) {
        const container = document.getElementById('softSkillsContainer');
        container.innerHTML = '';
        
        if (skills.length === 0) {
            // Add default empty skills
            addSoftSkill();
            addSoftSkill();
            return;
        }
        
        skills.forEach(skill => {
            const entry = document.createElement('div');
            entry.className = 'input-group mb-2';
            entry.innerHTML = `
                <input type="text" class="form-control" value="${skill}">
                <button class="btn btn-outline-danger skill-remove" type="button">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.skill-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                } else {
                    entry.querySelector('input').value = '';
                }
            });
        });
    }
    
    function populateAdditionalAchievements(achievements) {
        const container = document.getElementById('additionalAchievementsContainer');
        container.innerHTML = '';
        
        if (achievements.length === 0) {
            // Add default empty achievement
            addAdditionalAchievement();
            return;
        }
        
        achievements.forEach(achievement => {
            const entry = document.createElement('div');
            entry.className = 'input-group mb-2';
            entry.innerHTML = `
                <input type="text" class="form-control" value="${achievement}">
                <button class="btn btn-outline-danger achievement-remove" type="button">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            container.appendChild(entry);
            
            // Add event listener
            entry.querySelector('.achievement-remove').addEventListener('click', function() {
                if (container.children.length > 1) {
                    entry.remove();
                } else {
                    entry.querySelector('input').value = '';
                }
            });
        });
    }
    
    // Initialize template selection
    function initializeTemplates() {
        const templateContainer = document.getElementById('templateContainer');
        templateContainer.innerHTML = '';
        
        resumeTemplates.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'col-md-6 mb-3';
            templateCard.innerHTML = `
                <div class="card template-card ${resumeData.template.design === template.id ? 'selected' : ''}" data-template="${template.id}">
                    <div class="template-preview" style="background-image: url('${template.previewImage || 'https://via.placeholder.com/300x200?text=Template+Preview'}')"></div>
                    <div class="card-body">
                        <h5 class="card-title">${template.name}</h5>
                        <p class="card-text small">${template.description}</p>
                    </div>
                </div>
            `;
            templateContainer.appendChild(templateCard);
            
            // Add event listener
            templateCard.querySelector('.template-card').addEventListener('click', function() {
                document.querySelectorAll('.template-card').forEach(card => {
                    card.classList.remove('selected');
                });
                this.classList.add('selected');
                resumeData.template.design = this.getAttribute('data-template');
                
                // Update color options
                updateColorOptions(resumeData.template.design);
                
                // Save to local storage
                localStorage.setItem('resumeData', JSON.stringify(resumeData));
            });
        });
        
        // Initialize color options for the selected template
        updateColorOptions(resumeData.template.design);
    }
    
    // Update color options based on selected template
    function updateColorOptions(templateId) {
        const colorContainer = document.getElementById('colorSchemeContainer');
        colorContainer.innerHTML = '';
        
        const template = resumeTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        template.colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${resumeData.template.color === color.id ? 'selected' : ''}`;
            colorOption.style.backgroundColor = color.primary;
            colorOption.setAttribute('data-color', color.id);
            colorOption.setAttribute('title', color.name);
            colorContainer.appendChild(colorOption);
            
            // Add event listener
            colorOption.addEventListener('click', function() {
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                resumeData.template.color = this.getAttribute('data-color');
                
                // Save to local storage
                localStorage.setItem('resumeData', JSON.stringify(resumeData));
            });
        });
    }
    
    // Add event listeners for dynamic form elements
    
    // Add achievement
    document.getElementById('addAchievement').addEventListener('click', addAchievement);
    
    function addAchievement() {
        const container = document.getElementById('achievementsContainer');
        const entry = document.createElement('div');
        entry.className = 'achievement-entry mb-2';
        entry.innerHTML = `
            <div class="input-group">
                <input type="text" class="form-control achievement-input" placeholder="Describe a specific achievement or award">
                <button class="btn btn-outline-secondary achievement-suggestion" type="button">
                    <i class="bi bi-magic"></i>
                </button>
                <button class="btn btn-outline-danger achievement-remove" type="button">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(entry);
        
        // Add event listeners
        entry.querySelector('.achievement-remove').addEventListener('click', function() {
            if (container.children.length > 1) {
                entry.remove();
            } else {
                entry.querySelector('input').value = '';
            }
        });
        
        entry.querySelector('.achievement-suggestion').addEventListener('click', function() {
            suggestAchievement(entry.querySelector('input'));
        });
    }
    
    // Suggest achievement
    function suggestAchievement(inputElement) {
        // Get random achievement template
        const categories = Object.keys(achievementTemplates);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const templates = achievementTemplates[randomCategory];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        // Generate random values for placeholders
        const teamSize = Math.floor(Math.random() * 20) + 3;
        const percentage = Math.floor(Math.random() * 30) + 10;
        const value = `$${(Math.floor(Math.random() * 900) + 100)}K`;
        const number = Math.floor(Math.random() * 50) + 5;
        
        // Replace placeholders
        let achievement = randomTemplate
            .replace('{teamSize}', teamSize)
            .replace('{percentage}', percentage)
            .replace('{value}', value)
            .replace('{number}', number)
            .replace('{achievement}', 'improved operational efficiency')
            .replace('{metric}', '98% compliance rate')
            .replace('{task}', 'critical operations')
            .replace('{project}', 'logistics')
            .replace('{responsibility}', 'security protocols')
            .replace('{equipment}', 'communications')
            .replace('{system}', 'inventory tracking system')
            .replace('{solution}', 'streamlined process')
            .replace('{problem}', 'resource allocation challenges')
            .replace('{process}', 'supply chain')
            .replace('{resource}', 'critical equipment')
            .replace('{scope}', 'multiple locations')
            .replace('{skill}', 'emergency response')
            .replace('{program}', 'leadership development')
            .replace('{topic}', 'security procedures')
            .replace('{result}', '95% certification rate')
            .replace('{protocol}', 'enhanced')
            .replace('{asset}', 'sensitive information')
            .replace('{procedure}', 'incident response protocol');
        
        // Set the suggested achievement
        inputElement.value = achievement;
    }
    
    // Add additional role
    document.getElementById('addRole').addEventListener('click', function() {
        const container = document.getElementById('additionalRolesContainer');
        const entry = document.createElement('div');
        entry.className = 'additional-role mb-3 p-3 border rounded';
        entry.innerHTML = `
            <div class="row mb-2">
                <div class="col-md-8">
                    <label class="form-label">Role/Position</label>
                    <input type="text" class="form-control role-title" placeholder="e.g., Squad Leader">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Dates</label>
                    <input type="text" class="form-control role-dates" placeholder="e.g., 2018-2020">
                </div>
            </div>
            <div class="mb-2">
                <label class="form-label">Description</label>
                <textarea class="form-control role-description" rows="2" placeholder="Describe your responsibilities and achievements in this role"></textarea>
            </div>
            <button type="button" class="btn btn-outline-danger role-remove">
                <i class="bi bi-trash"></i> Remove
            </button>
        `;
        container.appendChild(entry);
        
        // Add event listener
        entry.querySelector('.role-remove').addEventListener('click', function() {
            entry.remove();
        });
    });
    
    // Add education
    document.getElementById('addEducation').addEventListener('click', function() {
        const container = document.getElementById('educationContainer');
        const entry = createEducationEntry();
        container.appendChild(entry);
    });
    
    function createEducationEntry() {
        const entry = document.createElement('div');
        entry.className = 'education-entry mb-3 p-3 border rounded';
        entry.innerHTML = `
            <div class="row mb-2">
                <div class="col-md-6">
                    <label class="form-label">Institution Name</label>
                    <input type="text" class="form-control" placeholder="University or College Name">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Degree/Diploma</label>
                    <input type="text" class="form-control" placeholder="e.g., Bachelor of Science">
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <label class="form-label">Field of Study</label>
                    <input type="text" class="form-control" placeholder="e.g., Computer Science">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Graduation Date</label>
                    <input type="month" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">GPA (Optional)</label>
                    <input type="text" class="form-control" placeholder="e.g., 3.8">
                </div>
                <div class="col-md-6 d-flex align-items-end">
                    <button type="button" class="btn btn-outline-danger education-remove">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener
        entry.querySelector('.education-remove').addEventListener('click', function() {
            const container = document.getElementById('educationContainer');
            if (container.children.length > 1) {
                entry.remove();
            }
        });
        
        return entry;
    }
    
    // Add military training
    document.getElementById('addMilitaryTraining').addEventListener('click', function() {
        const container = document.getElementById('militaryTrainingContainer');
        const entry = createTrainingEntry();
        container.appendChild(entry);
    });
    
    function createTrainingEntry() {
        const entry = document.createElement('div');
        entry.className = 'training-entry mb-3 p-3 border rounded';
        entry.innerHTML = `
            <div class="row mb-2">
                <div class="col-md-6">
                    <label class="form-label">Training Name</label>
                    <input type="text" class="form-control" placeholder="e.g., Advanced Leadership Course">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Institution</label>
                    <input type="text" class="form-control" placeholder="e.g., Army Leadership School">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">Completion Date</label>
                    <input type="month" class="form-control">
                </div>
                <div class="col-md-6 d-flex align-items-end">
                    <button type="button" class="btn btn-outline-danger training-remove">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener
        entry.querySelector('.training-remove').addEventListener('click', function() {
            const container = document.getElementById('militaryTrainingContainer');
            if (container.children.length > 1) {
                entry.remove();
            }
        });
        
        return entry;
    }
    
    // Add certification
    document.getElementById('addCertification').addEventListener('click', function() {
        const container = document.getElementById('certificationContainer');
        const entry = createCertificationEntry();
        container.appendChild(entry);
    });
    
    function createCertificationEntry() {
        const entry = document.createElement('div');
        entry.className = 'certification-entry mb-3 p-3 border rounded';
        entry.innerHTML = `
            <div class="row mb-2">
                <div class="col-md-6">
                    <label class="form-label">Certification Name</label>
                    <input type="text" class="form-control" placeholder="e.g., Project Management Professional (PMP)">
                </div>
                <div class="col-md-6">
                    <label class="form-label">Issuing Organization</label>
                    <input type="text" class="form-control" placeholder="e.g., PMI">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">Date Obtained</label>
                    <input type="month" class="form-control">
                </div>
                <div class="col-md-6 d-flex align-items-end">
                    <button type="button" class="btn btn-outline-danger certification-remove">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener
        entry.querySelector('.certification-remove').addEventListener('click', function() {
            const container = document.getElementById('certificationContainer');
            if (container.children.length > 1) {
                entry.remove();
            }
        });
        
        return entry;
    }
    
    // Add technical skill
    document.getElementById('addTechnicalSkill').addEventListener('click', addTechnicalSkill);
    
    function addTechnicalSkill() {
        const container = document.getElementById('technicalSkillsContainer');
        const entry = document.createElement('div');
        entry.className = 'input-group mb-2';
        entry.innerHTML = `
            <input type="text" class="form-control" placeholder="e.g., Project Management">
            <button class="btn btn-outline-danger skill-remove" type="button">
                <i class="bi bi-trash"></i>
            </button>
        `;
        container.appendChild(entry);
        
        // Add event listener
        entry.querySelector('.skill-remove').addEventListener('click', function() {
            if (container.children.length > 1) {
                entry.remove();
            } else {
                entry.querySelector('input').value = '';
            }
        });
    }
    
    // Add soft skill
    document.getElementById('addSoftSkill').addEventListener('click', addSoftSkill);
    
    function addSoftSkill() {
        const container = document.getElementById('softSkillsContainer');
        const entry = document.createElement('div');
        entry.className = 'input-group mb-2';
        entry.innerHTML = `
            <input type="text" class="form-control" placeholder="e.g., Leadership">
            <button class="btn btn-outline-danger skill-remove" type="button">
                <i class="bi bi-trash"></i>
            </button>
        `;
        container.appendChild(entry);
        
        // Add event listener
        entry.querySelector('.skill-remove').addEventListener('click', function() {
            if (container.children.length > 1) {
                entry.remove();
            } else {
                entry.querySelector('input').value = '';
            }
        });
    }
    
    // Add additional achievement
    document.getElementById('addAdditionalAchievement').addEventListener('click', addAdditionalAchievement);
    
    function addAdditionalAchievement() {
        const container = document.getElementById('additionalAchievementsContainer');
        const entry = document.createElement('div');
        entry.className = 'input-group mb-2';
        entry.innerHTML = `
            <input type="text" class="form-control" placeholder="Describe a specific achievement">
            <button class="btn btn-outline-danger achievement-remove" type="button">
                <i class="bi bi-trash"></i>
            </button>
        `;
        container.appendChild(entry);
        
        // Add event listener
        entry.querySelector('.achievement-remove').addEventListener('click', function() {
            if (container.children.length > 1) {
                entry.remove();
            } else {
                entry.querySelector('input').value = '';
            }
        });
    }
    
    // Military phrasing suggestions
    const responsibilitiesInput = document.getElementById('responsibilities');
    const phrasingSuggestionsDiv = document.getElementById('phrasingSuggestions');
    const suggestionText = document.getElementById('suggestionText');
    
    responsibilitiesInput.addEventListener('input', function() {
        const text = this.value.toLowerCase();
        let hasSuggestion = false;
        
        // Check for military terms that could be replaced
        for (const [military, civilian] of Object.entries(phrasingSuggestions)) {
            if (text.includes(military.toLowerCase())) {
                suggestionText.innerHTML = `Consider replacing "<strong>${military}</strong>" with "<strong>${civilian}</strong>" for civilian audiences.`;
                phrasingSuggestionsDiv.classList.remove('d-none');
                hasSuggestion = true;
                break;
            }
        }
        
        if (!hasSuggestion) {
            phrasingSuggestionsDiv.classList.add('d-none');
        }
    });
    
    // Import from Skill Translator
    document.getElementById('importSummary').addEventListener('click', function() {
        // In a real implementation, this would pull data from the Skill Translator component
        // For demo purposes, we'll use a sample summary
        const militaryRole = 'infantry'; // This would come from the Skill Translator
        const years = '5'; // This would come from the Skill Translator
        
        if (summaryTemplates[militaryRole]) {
            const templates = summaryTemplates[militaryRole];
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            const targetRole = document.getElementById('jobTitle').value || 'Security Manager';
            
            const summary = randomTemplate
                .replace('{years}', years)
                .replace('{targetRole}', targetRole);
                
            document.getElementById('professionalSummary').value = summary;
        } else {
            alert('Please complete the Skill Translator first to import your professional summary.');
        }
    });
    
    document.getElementById('importMilitary').addEventListener('click', function() {
        // In a real implementation, this would pull data from the Skill Translator component
        // For demo purposes, we'll use sample data
        alert('In a real implementation, this would import your military background from the Skill Translator component.');
    });
    
    document.getElementById('importSkills').addEventListener('click', function() {
        // In a real implementation, this would pull data from the Skill Translator component
        // For demo purposes, we'll use sample data
        alert('In a real implementation, this would import your skills from the Skill Translator component.');
    });
    
    // Generate Resume
    document.getElementById('generateResume').addEventListener('click', function() {
        // Save current step data
        saveCurrentStepData();
        
        // Generate resume HTML
        generateResume();
        
        // Show resume preview
        document.getElementById('resumePreview').classList.remove('d-none');
        document.getElementById('resumePreview').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Generate resume HTML based on collected data
    function generateResume() {
        const resumeContainer = document.getElementById('resumeContainer');
        const templateId = resumeData.template.design;
        const colorId = resumeData.template.color;
        
        // Find template and color data
        const template = resumeTemplates.find(t => t.id === templateId);
        const color = template.colors.find(c => c.id === colorId);
        
        // Apply template class
        resumeContainer.className = `p-4 border resume-${templateId}`;
        
        // Generate HTML based on template
        let html = '';
        
        switch (templateId) {
            case 'classic':
                html = generateClassicTemplate(color);
                break;
            case 'modern':
                html = generateModernTemplate(color);
                break;
            case 'executive':
                html = generateExecutiveTemplate(color);
                break;
            case 'technical':
                html = generateTechnicalTemplate(color);
                break;
            default:
                html = generateClassicTemplate(color);
        }
        
        resumeContainer.innerHTML = html;
        
        // Set up download button
        document.getElementById('downloadResumeBtn').addEventListener('click', downloadResume);
        
        // Set up edit button
        document.getElementById('editResumeBtn').addEventListener('click', function() {
            document.getElementById('resumePreview').classList.add('d-none');
            document.getElementById('templateForm').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Template generation functions
    function generateClassicTemplate(color) {
        const { firstName, lastName, jobTitle, email, phone, city, state, linkedin, summary } = resumeData.personal;
        
        let html = `
            <div class="resume-header">
                <div class="resume-name">${firstName} ${lastName}</div>
                <div class="resume-contact">
                    ${email} | ${phone} | ${city}, ${state}
                    ${linkedin ? ` | <a href="${linkedin}">${linkedin}</a>` : ''}
                </div>
            </div>
            
            <div class="resume-section">
                <div class="resume-section-title" style="color: ${color.primary};">Professional Summary</div>
                <p>${summary}</p>
            </div>
        `;
        
        // Military Experience
        if (resumeData.military && resumeData.military.branch) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Military Experience</div>
                    <div class="mb-3">
                        <div><strong>${resumeData.military.rank}, ${resumeData.military.branch}</strong></div>
                        <div>${formatDate(resumeData.military.startDate)} - ${formatDate(resumeData.military.endDate)}</div>
                        <div><em>${resumeData.military.primaryRole}</em></div>
                        <p>${resumeData.military.responsibilities}</p>
                        <ul>
                            ${resumeData.military.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${resumeData.military.additionalRoles.map(role => `
                        <div class="mb-3">
                            <div><strong>${role.title}</strong></div>
                            <div>${role.dates}</div>
                            <p>${role.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Education
        if (resumeData.education) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Education & Training</div>
                    
                    ${resumeData.education.formal.map(edu => `
                        <div class="mb-2">
                            <div><strong>${edu.degree}</strong> in ${edu.field}</div>
                            <div>${edu.institution}, ${formatDate(edu.date)}</div>
                            ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                        </div>
                    `).join('')}
                    
                    ${resumeData.education.military.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Military Training</strong></div>
                        <ul>
                            ${resumeData.education.military.map(train => `
                                <li>${train.name}, ${train.institution}, ${formatDate(train.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                    
                    ${resumeData.education.certifications.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Certifications</strong></div>
                        <ul>
                            ${resumeData.education.certifications.map(cert => `
                                <li>${cert.name}, ${cert.organization}, ${formatDate(cert.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        // Skills
        if (resumeData.skills) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Skills</div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-2"><strong>Technical Skills</strong></div>
                            <ul>
                                ${resumeData.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2"><strong>Soft Skills</strong></div>
                            <ul>
                                ${resumeData.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    ${resumeData.skills.achievements.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Additional Achievements</strong></div>
                        <ul>
                            ${resumeData.skills.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        return html;
    }
    
    function generateModernTemplate(color) {
        const { firstName, lastName, jobTitle, email, phone, city, state, linkedin, summary } = resumeData.personal;
        
        let html = `
            <div class="resume-header">
                <div>
                    <div class="resume-name" style="color: ${color.primary};">${firstName} ${lastName}</div>
                    <div class="resume-title">${jobTitle || 'Professional'}</div>
                </div>
                <div class="resume-contact">
                    <div>${email}</div>
                    <div>${phone}</div>
                    <div>${city}, ${state}</div>
                    ${linkedin ? `<div><a href="${linkedin}">LinkedIn Profile</a></div>` : ''}
                </div>
            </div>
            
            <div class="resume-section">
                <div class="resume-section-title" style="color: ${color.primary};">Professional Summary</div>
                <p>${summary}</p>
            </div>
        `;
        
        // Military Experience
        if (resumeData.military && resumeData.military.branch) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Military Experience</div>
                    <div class="mb-3">
                        <div style="display: flex; justify-content: space-between;">
                            <div><strong>${resumeData.military.rank}, ${resumeData.military.branch}</strong></div>
                            <div>${formatDate(resumeData.military.startDate)} - ${formatDate(resumeData.military.endDate)}</div>
                        </div>
                        <div><em>${resumeData.military.primaryRole}</em></div>
                        <p>${resumeData.military.responsibilities}</p>
                        <ul>
                            ${resumeData.military.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${resumeData.military.additionalRoles.map(role => `
                        <div class="mb-3">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${role.title}</strong></div>
                                <div>${role.dates}</div>
                            </div>
                            <p>${role.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Education
        if (resumeData.education) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Education & Training</div>
                    
                    ${resumeData.education.formal.map(edu => `
                        <div class="mb-2">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${edu.institution}</strong></div>
                                <div>${formatDate(edu.date)}</div>
                            </div>
                            <div>${edu.degree} in ${edu.field}</div>
                            ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                        </div>
                    `).join('')}
                    
                    ${resumeData.education.military.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Military Training</strong></div>
                        <ul>
                            ${resumeData.education.military.map(train => `
                                <li><strong>${train.name}</strong>, ${train.institution}, ${formatDate(train.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                    
                    ${resumeData.education.certifications.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Certifications</strong></div>
                        <ul>
                            ${resumeData.education.certifications.map(cert => `
                                <li><strong>${cert.name}</strong>, ${cert.organization}, ${formatDate(cert.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        // Skills
        if (resumeData.skills) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Skills & Achievements</div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-2"><strong>Technical Skills</strong></div>
                            <ul>
                                ${resumeData.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2"><strong>Soft Skills</strong></div>
                            <ul>
                                ${resumeData.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    ${resumeData.skills.achievements.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Additional Achievements</strong></div>
                        <ul>
                            ${resumeData.skills.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        return html;
    }
    
    function generateExecutiveTemplate(color) {
        const { firstName, lastName, jobTitle, email, phone, city, state, linkedin, summary } = resumeData.personal;
        
        let html = `
            <div class="resume-header">
                <div class="resume-name">${firstName} ${lastName}</div>
                <div class="resume-title">${jobTitle || 'Senior Professional'}</div>
                <div class="resume-contact">
                    ${email} | ${phone} | ${city}, ${state}
                    ${linkedin ? ` | <a href="${linkedin}">LinkedIn Profile</a>` : ''}
                </div>
            </div>
            
            <div class="resume-section">
                <div class="resume-section-title" style="color: ${color.primary};">Executive Summary</div>
                <p>${summary}</p>
            </div>
        `;
        
        // Military Experience
        if (resumeData.military && resumeData.military.branch) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Leadership Experience</div>
                    <div class="mb-3">
                        <div style="display: flex; justify-content: space-between;">
                            <div><strong>${resumeData.military.rank}, ${resumeData.military.branch}</strong></div>
                            <div>${formatDate(resumeData.military.startDate)} - ${formatDate(resumeData.military.endDate)}</div>
                        </div>
                        <div><em>${resumeData.military.primaryRole}</em></div>
                        <p>${resumeData.military.responsibilities}</p>
                        <div><strong>Key Accomplishments:</strong></div>
                        <ul>
                            ${resumeData.military.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${resumeData.military.additionalRoles.map(role => `
                        <div class="mb-3">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${role.title}</strong></div>
                                <div>${role.dates}</div>
                            </div>
                            <p>${role.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Skills - moved up in executive template
        if (resumeData.skills) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Core Competencies</div>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                ${resumeData.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                ${resumeData.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Education
        if (resumeData.education) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Education & Credentials</div>
                    
                    ${resumeData.education.formal.map(edu => `
                        <div class="mb-2">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${edu.degree}</strong> in ${edu.field}</div>
                                <div>${formatDate(edu.date)}</div>
                            </div>
                            <div>${edu.institution}</div>
                        </div>
                    `).join('')}
                    
                    ${resumeData.education.certifications.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Professional Certifications</strong></div>
                        <ul>
                            ${resumeData.education.certifications.map(cert => `
                                <li><strong>${cert.name}</strong>, ${cert.organization}, ${formatDate(cert.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                    
                    ${resumeData.education.military.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Military Training</strong></div>
                        <ul>
                            ${resumeData.education.military.map(train => `
                                <li>${train.name}, ${train.institution}, ${formatDate(train.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        // Additional Achievements
        if (resumeData.skills && resumeData.skills.achievements.length > 0) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="color: ${color.primary};">Additional Achievements</div>
                    <ul>
                        ${resumeData.skills.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        return html;
    }
    
    function generateTechnicalTemplate(color) {
        const { firstName, lastName, jobTitle, email, phone, city, state, linkedin, summary } = resumeData.personal;
        
        let html = `
            <div class="resume-header" style="background-color: ${color.primary}; color: white;">
                <div class="resume-name">${firstName} ${lastName}</div>
                <div class="resume-title">${jobTitle || 'Technical Professional'}</div>
                <div class="resume-contact">
                    ${email} | ${phone} | ${city}, ${state}
                    ${linkedin ? ` | <a href="${linkedin}" style="color: white;">LinkedIn Profile</a>` : ''}
                </div>
            </div>
            
            <div class="resume-section">
                <div class="resume-section-title" style="background-color: ${color.primary}; color: white;">PROFESSIONAL SUMMARY</div>
                <p>${summary}</p>
            </div>
        `;
        
        // Technical Skills - moved up in technical template
        if (resumeData.skills) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="background-color: ${color.primary}; color: white;">TECHNICAL SKILLS</div>
                    <div class="row">
                        <div class="col-md-12">
                            <ul>
                                ${resumeData.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Military Experience
        if (resumeData.military && resumeData.military.branch) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="background-color: ${color.primary}; color: white;">EXPERIENCE</div>
                    <div class="mb-3">
                        <div style="display: flex; justify-content: space-between;">
                            <div><strong>${resumeData.military.rank}, ${resumeData.military.branch}</strong></div>
                            <div>${formatDate(resumeData.military.startDate)} - ${formatDate(resumeData.military.endDate)}</div>
                        </div>
                        <div><em>${resumeData.military.primaryRole}</em></div>
                        <p>${resumeData.military.responsibilities}</p>
                        <ul>
                            ${resumeData.military.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${resumeData.military.additionalRoles.map(role => `
                        <div class="mb-3">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${role.title}</strong></div>
                                <div>${role.dates}</div>
                            </div>
                            <p>${role.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Education and Certifications
        if (resumeData.education) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="background-color: ${color.primary}; color: white;">EDUCATION & CERTIFICATIONS</div>
                    
                    ${resumeData.education.formal.map(edu => `
                        <div class="mb-2">
                            <div style="display: flex; justify-content: space-between;">
                                <div><strong>${edu.degree}</strong> in ${edu.field}</div>
                                <div>${formatDate(edu.date)}</div>
                            </div>
                            <div>${edu.institution}</div>
                        </div>
                    `).join('')}
                    
                    ${resumeData.education.certifications.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Certifications:</strong></div>
                        <ul>
                            ${resumeData.education.certifications.map(cert => `
                                <li><strong>${cert.name}</strong>, ${cert.organization}, ${formatDate(cert.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        // Soft Skills and Additional Achievements
        if (resumeData.skills) {
            html += `
                <div class="resume-section">
                    <div class="resume-section-title" style="background-color: ${color.primary}; color: white;">ADDITIONAL SKILLS & ACHIEVEMENTS</div>
                    
                    ${resumeData.skills.soft.length > 0 ? `
                        <div class="mb-2"><strong>Soft Skills:</strong></div>
                        <ul>
                            ${resumeData.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    ${resumeData.skills.achievements.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Additional Achievements:</strong></div>
                        <ul>
                            ${resumeData.skills.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    ${resumeData.education.military.length > 0 ? `
                        <div class="mt-3 mb-2"><strong>Military Training:</strong></div>
                        <ul>
                            ${resumeData.education.military.map(train => `
                                <li>${train.name}, ${train.institution}, ${formatDate(train.date)}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }
        
        return html;
    }
    
    // Helper function to format dates
    function formatDate(dateString) {
        if (!dateString) return 'Present';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // Download resume as PDF
    function downloadResume() {
        const { jsPDF } = window.jspdf;
        const resumeContainer = document.getElementById('resumeContainer');
        
        // Create new PDF document
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Use html2canvas to capture the resume
        html2canvas(resumeContainer, {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            // Calculate dimensions to fit on A4
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add first page
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Add additional pages if needed
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Save the PDF
            const fullName = `${resumeData.personal.firstName}_${resumeData.personal.lastName}`.replace(/\s+/g, '_');
            doc.save(`${fullName}_Resume.pdf`);
        });
    }
});
