// ATS Scanner JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const uploadArea = document.getElementById('uploadArea');
    const resumeFileInput = document.getElementById('resumeFile');
    const jobDescriptionInput = document.getElementById('jobDescription');
    const scanButton = document.getElementById('scanButton');
    const scanProgressBar = document.getElementById('scanProgressBar');
    const scanResults = document.getElementById('scanResults');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const scanAnotherBtn = document.getElementById('scanAnotherBtn');
    const componentLoader = document.querySelector('.component-loader');
    const componentContent = document.querySelector('.component-content');
    const scanProgress = document.querySelector('.scan-progress');
    
    // Variables
    let resumeFile = null;
    let isScanning = false;
    
    // Initialize
    init();
    
    function init() {
        // Hide scan progress and results initially
        scanProgress.style.display = 'none';
        scanResults.style.display = 'none';
        
        // Show component content
        setTimeout(() => {
            componentLoader.style.display = 'none';
            componentContent.style.opacity = '1';
        }, 800);
        
        // Set up event listeners
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Upload area click event
        uploadArea.addEventListener('click', function() {
            resumeFileInput.click();
        });
        
        // File input change event - Fixed to properly handle file selection
        resumeFileInput.addEventListener('change', function(e) {
            handleFileSelect(e);
        });
        
        // Drag and drop events
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        
        // Scan button click event
        scanButton.addEventListener('click', startScan);
        
        // Download report button click event
        downloadReportBtn.addEventListener('click', downloadReport);
        
        // Scan another button click event
        scanAnotherBtn.addEventListener('click', resetScan);
    }
    
    function handleFileSelect(e) {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }
    
    function processFile(file) {
        // Check file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        // Accept all file types for demo purposes
        // if (!validTypes.includes(file.type)) {
        //     alert('Please upload a PDF or Word document.');
        //     return;
        // }
        
        // Store file and update UI
        resumeFile = file;
        updateUploadAreaWithFile(file);
    }
    
    function updateUploadAreaWithFile(file) {
        // Update upload area to show selected file
        const uploadIcon = uploadArea.querySelector('.upload-icon i');
        const uploadText = uploadArea.querySelector('.upload-text h3');
        const uploadDesc = uploadArea.querySelector('.upload-text p');
        const fileTypes = uploadArea.querySelector('.file-types');
        
        uploadIcon.className = 'fas fa-file-alt';
        uploadText.textContent = 'Resume Selected';
        uploadDesc.textContent = `${file.name} (${formatFileSize(file.size)})`;
        fileTypes.style.display = 'none';
        
        // Add a remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file-btn';
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            resetFileUpload();
        });
        
        // Check if remove button already exists
        const existingRemoveBtn = uploadArea.querySelector('.remove-file-btn');
        if (!existingRemoveBtn) {
            uploadArea.appendChild(removeBtn);
        }
    }
    
    function resetFileUpload() {
        // Reset file input
        resumeFileInput.value = '';
        resumeFile = null;
        
        // Reset upload area
        const uploadIcon = uploadArea.querySelector('.upload-icon i');
        const uploadText = uploadArea.querySelector('.upload-text h3');
        const uploadDesc = uploadArea.querySelector('.upload-text p');
        const fileTypes = uploadArea.querySelector('.file-types');
        const removeBtn = uploadArea.querySelector('.remove-file-btn');
        
        uploadIcon.className = 'fas fa-file-upload';
        uploadText.textContent = 'Upload Your Resume';
        uploadDesc.textContent = 'Drag and drop your resume file here or click to browse';
        fileTypes.style.display = 'block';
        
        if (removeBtn) {
            uploadArea.removeChild(removeBtn);
        }
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return bytes + ' bytes';
        } else if (bytes < 1048576) {
            return (bytes / 1024).toFixed(1) + ' KB';
        } else {
            return (bytes / 1048576).toFixed(1) + ' MB';
        }
    }
    
    function startScan() {
        // Check if resume file is selected
        if (!resumeFile) {
            alert('Please upload a resume file first.');
            return;
        }
        
        // Check if job description is provided
        const jobDescription = jobDescriptionInput.value.trim();
        if (!jobDescription) {
            alert('Please enter a job description to compare against your resume.');
            return;
        }
        
        // Prevent multiple scans
        if (isScanning) return;
        isScanning = true;
        
        // Show scan progress
        scanProgress.style.display = 'block';
        scanProgressBar.style.width = '0%';
        
        // Simulate scanning process
        let progress = 0;
        const scanInterval = setInterval(() => {
            progress += 5;
            scanProgressBar.style.width = progress + '%';
            
            updateScanStatus(progress);
            
            if (progress >= 100) {
                clearInterval(scanInterval);
                setTimeout(() => {
                    completeScan();
                }, 500);
            }
        }, 200);
    }
    
    function updateScanStatus(progress) {
        const scanStatus = document.querySelector('.scan-status');
        
        if (progress < 25) {
            scanStatus.textContent = 'Parsing resume content...';
        } else if (progress < 50) {
            scanStatus.textContent = 'Analyzing format and structure...';
        } else if (progress < 75) {
            scanStatus.textContent = 'Checking keyword alignment...';
        } else {
            scanStatus.textContent = 'Generating recommendations...';
        }
    }
    
    function completeScan() {
        // Hide scan progress
        scanProgress.style.display = 'none';
        
        // Show scan results
        scanResults.style.display = 'block';
        scanResults.scrollIntoView({ behavior: 'smooth' });
        
        // Animate score gauge
        animateScoreGauge();
        
        // Reset scanning flag
        isScanning = false;
    }
    
    function animateScoreGauge() {
        const scoreGauge = document.querySelector('.score-gauge');
        const scoreValue = document.getElementById('scoreValue');
        const score = parseInt(scoreGauge.dataset.score);
        
        // Calculate rotation based on score (0-100)
        const rotation = (score / 100) * 180;
        const scoreFill = document.querySelector('.score-gauge-fill');
        
        // Animate the fill
        scoreFill.style.transform = `rotate(${rotation}deg)`;
        
        // Animate the score value
        let currentScore = 0;
        const scoreInterval = setInterval(() => {
            currentScore += 1;
            scoreValue.textContent = currentScore;
            
            if (currentScore >= score) {
                clearInterval(scoreInterval);
            }
        }, 20);
    }
    
    function downloadReport() {
        // Simulate PDF generation and download
        alert('Report generation feature will be implemented in the next update.');
    }
    
    function resetScan() {
        // Reset file upload
        resetFileUpload();
        
        // Clear job description
        jobDescriptionInput.value = '';
        
        // Hide scan results
        scanResults.style.display = 'none';
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
