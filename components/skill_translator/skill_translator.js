// Skill Translator JavaScript
import { militaryBranches, militaryRanks, militaryRoles } from './military_data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const branchSelect = document.getElementById('militaryBranch');
    const rankSelect = document.getElementById('militaryRank');
    const roleSelect = document.getElementById('militaryRole');
    const form = document.getElementById('skillTranslatorForm');
    const resultsSection = document.getElementById('resultsSection');
    const initialMessage = document.getElementById('initialMessage');
    const downloadBtn = document.getElementById('downloadPDF');
    const feedbackPositive = document.getElementById('feedbackPositive');
    const feedbackNegative = document.getElementById('feedbackNegative');
    const feedbackForm = document.getElementById('feedbackForm');
    
    // Populate military branches dropdown
    militaryBranches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch.id;
        option.textContent = branch.name;
        branchSelect.appendChild(option);
    });
    
    // Update ranks when branch changes
    branchSelect.addEventListener('change', function() {
        const selectedBranch = this.value;
        
        // Clear previous options
        rankSelect.innerHTML = '<option value="" selected disabled>Select your rank</option>';
        
        // Add new options based on selected branch
        if (selectedBranch && militaryRanks[selectedBranch]) {
            militaryRanks[selectedBranch].forEach(rank => {
                const option = document.createElement('option');
                option.value = rank.id;
                option.textContent = rank.name;
                rankSelect.appendChild(option);
            });
        }
        
        // Also update roles based on branch
        updateRoles(selectedBranch);
    });
    
    // Function to update roles dropdown based on selected branch
    function updateRoles(branch) {
        // Clear previous options
        roleSelect.innerHTML = '<option value="" selected disabled>Select your role</option>';
        
        // Filter roles by branch and add to dropdown
        const filteredRoles = militaryRoles.filter(role => role.branch.includes(branch));
        
        filteredRoles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.id;
            option.textContent = role.name;
            roleSelect.appendChild(option);
        });
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const branch = branchSelect.value;
        const rank = rankSelect.value;
        const role = roleSelect.value;
        const years = document.getElementById('yearsExperience').value;
        const certs = document.getElementById('additionalCerts').value;
        
        // Find the selected role data
        const roleData = militaryRoles.find(r => r.id === role);
        
        if (roleData) {
            // Display results
            displayResults(roleData, years, certs);
            
            // Hide initial message and show results
            initialMessage.classList.add('d-none');
            resultsSection.classList.remove('d-none');
            resultsSection.classList.add('fade-in');
        }
    });
    
    // Function to display results
    function displayResults(roleData, years, certs) {
        // Job Titles
        const jobTitlesContainer = document.getElementById('jobTitles');
        jobTitlesContainer.innerHTML = '';
        
        roleData.civilianTitles.forEach((job, index) => {
            const jobElement = document.createElement('div');
            jobElement.className = 'list-group-item job-title-item';
            
            // Adjust match percentage based on years of experience
            let adjustedMatch = job.match;
            if (years > 5) adjustedMatch = Math.min(adjustedMatch + 5, 100);
            if (years > 10) adjustedMatch = Math.min(adjustedMatch + 3, 100);
            
            // Create badge color based on match percentage
            let badgeColor = 'bg-success';
            if (adjustedMatch < 80) badgeColor = 'bg-warning text-dark';
            if (adjustedMatch < 70) badgeColor = 'bg-danger';
            
            jobElement.innerHTML = `
                <div>
                    <strong>${job.title}</strong>
                    <div class="progress">
                        <div class="progress-bar ${badgeColor}" role="progressbar" style="width: ${adjustedMatch}%" 
                            aria-valuenow="${adjustedMatch}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <span class="badge ${badgeColor} match-badge">${adjustedMatch}% Match</span>
            `;
            
            // Add feedback buttons for each job title
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'mt-2 d-flex gap-2';
            feedbackDiv.innerHTML = `
                <button class="btn btn-sm btn-outline-success job-feedback" data-feedback="positive" data-job="${job.title}">
                    <i class="bi bi-hand-thumbs-up"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger job-feedback" data-feedback="negative" data-job="${job.title}">
                    <i class="bi bi-hand-thumbs-down"></i>
                </button>
            `;
            
            jobElement.appendChild(feedbackDiv);
            jobTitlesContainer.appendChild(jobElement);
        });
        
        // Hard Skills
        const hardSkillsContainer = document.getElementById('hardSkills');
        hardSkillsContainer.innerHTML = '';
        
        roleData.hardSkills.forEach(skill => {
            const skillElement = document.createElement('li');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            hardSkillsContainer.appendChild(skillElement);
        });
        
        // Soft Skills
        const softSkillsContainer = document.getElementById('softSkills');
        softSkillsContainer.innerHTML = '';
        
        roleData.softSkills.forEach(skill => {
            const skillElement = document.createElement('li');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            softSkillsContainer.appendChild(skillElement);
        });
        
        // Industries
        const industriesContainer = document.getElementById('industries');
        industriesContainer.innerHTML = '';
        
        roleData.industries.forEach((industry, index) => {
            const industryElement = document.createElement('div');
            industryElement.className = 'accordion-item industry-card';
            
            industryElement.innerHTML = `
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#collapse${index}" 
                            aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                        ${industry.name}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                     aria-labelledby="heading${index}" data-bs-parent="#industries">
                    <div class="accordion-body">
                        <p class="industry-reason">${industry.reason}</p>
                    </div>
                </div>
            `;
            
            industriesContainer.appendChild(industryElement);
        });
        
        // Add certifications if provided
        if (certs.trim()) {
            // Add to hard skills
            const certElement = document.createElement('li');
            certElement.className = 'skill-item';
            certElement.innerHTML = `<strong>Certification:</strong> ${certs}`;
            hardSkillsContainer.appendChild(certElement);
        }
    }
    
    // Download PDF functionality
    downloadBtn.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        
        // Create new PDF document
        const doc = new jsPDF();
        const translationResults = document.getElementById('translationResults');
        
        // Get form values for header
        const branch = document.getElementById('militaryBranch').options[document.getElementById('militaryBranch').selectedIndex].text;
        const role = document.getElementById('militaryRole').options[document.getElementById('militaryRole').selectedIndex].text;
        const years = document.getElementById('yearsExperience').value;
        
        // Use html2canvas to capture the results section
        html2canvas(translationResults).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            // Add title
            doc.setFontSize(18);
            doc.text('Military to Civilian Skill Translation', 105, 15, { align: 'center' });
            
            // Add military background info
            doc.setFontSize(12);
            doc.text(`Branch: ${branch}`, 20, 30);
            doc.text(`Role: ${role}`, 20, 40);
            doc.text(`Years of Experience: ${years}`, 20, 50);
            
            // Add the captured image
            const imgWidth = doc.internal.pageSize.getWidth() - 40;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            doc.addImage(imgData, 'PNG', 20, 60, imgWidth, imgHeight);
            
            // Add footer
            doc.setFontSize(10);
            doc.text('Generated by Veteran Transition Platform', 105, 285, { align: 'center' });
            
            // Save the PDF
            doc.save('Skill_Translation.pdf');
        });
    });
    
    // Feedback functionality
    feedbackPositive.addEventListener('click', function() {
        showFeedbackForm('positive');
    });
    
    feedbackNegative.addEventListener('click', function() {
        showFeedbackForm('negative');
    });
    
    function showFeedbackForm(type) {
        feedbackForm.classList.remove('d-none');
        document.getElementById('feedbackText').setAttribute('data-type', type);
        
        // Scroll to feedback form
        feedbackForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    document.getElementById('submitFeedback').addEventListener('click', function() {
        const feedbackText = document.getElementById('feedbackText');
        const feedbackType = feedbackText.getAttribute('data-type');
        const feedbackContent = feedbackText.value;
        
        // In a real application, this would send the feedback to a server
        console.log('Feedback submitted:', { type: feedbackType, content: feedbackContent });
        
        // Show thank you message
        feedbackForm.innerHTML = '<div class="alert alert-success">Thank you for your feedback!</div>';
        
        // Hide after 3 seconds
        setTimeout(() => {
            feedbackForm.classList.add('d-none');
        }, 3000);
    });
    
    // Job-specific feedback
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('job-feedback') || e.target.parentElement.classList.contains('job-feedback')) {
            const button = e.target.classList.contains('job-feedback') ? e.target : e.target.parentElement;
            const feedback = button.getAttribute('data-feedback');
            const job = button.getAttribute('data-job');
            
            // In a real application, this would send the feedback to a server
            console.log('Job feedback:', { job, feedback });
            
            // Visual feedback
            const parent = button.parentElement;
            parent.innerHTML = '<span class="text-success">Thank you for your feedback!</span>';
        }
    });
});
