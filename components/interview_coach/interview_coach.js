// interview_coach.js - Main functionality for the AI Interview Coach

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const interviewSetup = document.getElementById('interviewSetup');
    const interviewSession = document.getElementById('interviewSession');
    const interviewFeedback = document.getElementById('interviewFeedback');
    const startInterviewBtn = document.getElementById('startInterviewBtn');
    const submitAnswerBtn = document.getElementById('submitAnswerBtn');
    const skipQuestionBtn = document.getElementById('skipQuestionBtn');
    const pauseInterviewBtn = document.getElementById('pauseInterviewBtn');
    const endInterviewBtn = document.getElementById('endInterviewBtn');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const practiceAgainBtn = document.getElementById('practiceAgainBtn');
    const questionText = document.getElementById('questionText');
    const answerInput = document.getElementById('answerInput');
    const questionTimer = document.getElementById('questionTimer');
    const currentQuestionEl = document.getElementById('currentQuestion');
    const totalQuestionsEl = document.getElementById('totalQuestions');
    
    // Interview state
    let interviewState = {
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        timerInterval: null,
        timeRemaining: 120, // 2 minutes per question
        isPaused: false,
        settings: {
            jobTitle: '',
            industry: '',
            experienceLevel: '',
            interviewType: '',
            focusAreas: [],
            interviewLength: 'medium',
            difficultyLevel: 3
        }
    };
    
    // Initialize focus areas checkboxes
    const focusCheckboxes = document.querySelectorAll('.focus-checkbox');
    focusCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('.focus-checkbox:checked');
            if (checkedBoxes.length > 3 && this.checked) {
                this.checked = false;
                alert('You can select up to 3 focus areas');
            }
        });
    });
    
    // Start Interview - Fixed to properly initialize the interview process
    startInterviewBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent form submission/page refresh
        
        // Collect interview settings
        interviewState.settings.jobTitle = document.getElementById('jobTitle').value || 'Project Manager';
        interviewState.settings.industry = document.getElementById('industry').value || 'technology';
        interviewState.settings.experienceLevel = document.getElementById('experienceLevel').value || 'mid';
        interviewState.settings.interviewType = document.getElementById('interviewType').value || 'behavioral';
        
        // Get selected focus areas
        interviewState.settings.focusAreas = [];
        document.querySelectorAll('.focus-checkbox:checked').forEach(checkbox => {
            interviewState.settings.focusAreas.push(checkbox.value);
        });
        
        interviewState.settings.interviewLength = document.getElementById('interviewLength').value;
        interviewState.settings.difficultyLevel = document.getElementById('difficultyLevel').value;
        
        // Generate questions based on settings
        generateQuestions();
        
        // Update UI
        interviewSetup.style.display = 'none';
        interviewSession.style.display = 'block';
        
        // Set first question
        setCurrentQuestion();
        
        // Start timer
        startTimer();
        
        return false; // Prevent default behavior
    });
    
    // Generate interview questions based on settings
    function generateQuestions() {
        // Clear previous questions
        interviewState.questions = [];
        interviewState.answers = [];
        interviewState.currentQuestionIndex = 0;
        
        // Determine number of questions based on interview length
        let questionCount = 10; // Default medium length
        if (interviewState.settings.interviewLength === 'short') {
            questionCount = 5;
        } else if (interviewState.settings.interviewLength === 'long') {
            questionCount = 15;
        }
        
        // Set total questions in UI
        totalQuestionsEl.textContent = questionCount;
        
        // Filter questions based on settings
        let filteredQuestions = interviewQuestions.filter(q => {
            // Filter by interview type
            if (interviewState.settings.interviewType && 
                q.type !== interviewState.settings.interviewType && 
                q.type !== 'general') {
                return false;
            }
            
            // Filter by experience level
            if (interviewState.settings.experienceLevel && 
                q.experienceLevel && 
                !q.experienceLevel.includes(interviewState.settings.experienceLevel)) {
                return false;
            }
            
            // Filter by focus areas if selected
            if (interviewState.settings.focusAreas.length > 0) {
                // If question has categories, check if any match the focus areas
                if (q.categories && q.categories.length > 0) {
                    return q.categories.some(cat => interviewState.settings.focusAreas.includes(cat));
                }
                return false;
            }
            
            return true;
        });
        
        // If not enough questions after filtering, add general questions
        if (filteredQuestions.length < questionCount) {
            const generalQuestions = interviewQuestions.filter(q => q.type === 'general');
            filteredQuestions = [...filteredQuestions, ...generalQuestions];
        }
        
        // Shuffle and select the required number of questions
        filteredQuestions = shuffleArray(filteredQuestions).slice(0, questionCount);
        
        // Add industry-specific questions if available
        if (interviewState.settings.industry) {
            const industryQuestions = interviewQuestions.filter(q => 
                q.industry === interviewState.settings.industry
            );
            
            // Replace some general questions with industry-specific ones
            if (industryQuestions.length > 0) {
                const industryQuestionsToAdd = Math.min(3, industryQuestions.length);
                filteredQuestions = filteredQuestions.slice(0, questionCount - industryQuestionsToAdd)
                    .concat(shuffleArray(industryQuestions).slice(0, industryQuestionsToAdd));
            }
        }
        
        // Add military transition questions if that focus area is selected
        if (interviewState.settings.focusAreas.includes('military-transition')) {
            const militaryQuestions = interviewQuestions.filter(q => 
                q.categories && q.categories.includes('military-transition')
            );
            
            // Ensure at least 2 military transition questions if available
            if (militaryQuestions.length > 0) {
                const militaryQuestionsToAdd = Math.min(2, militaryQuestions.length);
                // Remove some questions to make room for military ones
                filteredQuestions = filteredQuestions.slice(0, questionCount - militaryQuestionsToAdd)
                    .concat(shuffleArray(militaryQuestions).slice(0, militaryQuestionsToAdd));
            }
        }
        
        // Shuffle final question set
        interviewState.questions = shuffleArray(filteredQuestions).slice(0, questionCount);
        
        // Initialize answers array
        interviewState.answers = new Array(interviewState.questions.length).fill('');
    }
    
    // Set current question in the UI
    function setCurrentQuestion() {
        const currentQuestion = interviewState.questions[interviewState.currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        currentQuestionEl.textContent = interviewState.currentQuestionIndex + 1;
        
        // Reset answer input
        answerInput.value = interviewState.answers[interviewState.currentQuestionIndex] || '';
        
        // Reset timer
        interviewState.timeRemaining = 120;
        updateTimerDisplay();
    }
    
    // Start the question timer
    function startTimer() {
        // Clear any existing interval
        if (interviewState.timerInterval) {
            clearInterval(interviewState.timerInterval);
        }
        
        interviewState.timerInterval = setInterval(function() {
            if (!interviewState.isPaused) {
                interviewState.timeRemaining--;
                updateTimerDisplay();
                
                // Auto-submit when time runs out
                if (interviewState.timeRemaining <= 0) {
                    clearInterval(interviewState.timerInterval);
                    submitAnswer();
                }
            }
        }, 1000);
    }
    
    // Update the timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(interviewState.timeRemaining / 60);
        const seconds = interviewState.timeRemaining % 60;
        questionTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Add warning class when time is running low
        if (interviewState.timeRemaining <= 30) {
            questionTimer.classList.add('timer-warning');
        } else {
            questionTimer.classList.remove('timer-warning');
        }
    }
    
    // Submit answer and move to next question
    submitAnswerBtn.addEventListener('click', submitAnswer);
    
    function submitAnswer() {
        // Save current answer
        interviewState.answers[interviewState.currentQuestionIndex] = answerInput.value;
        
        // Move to next question or end interview
        interviewState.currentQuestionIndex++;
        
        if (interviewState.currentQuestionIndex < interviewState.questions.length) {
            // Next question
            setCurrentQuestion();
            startTimer();
        } else {
            // End of interview
            endInterview();
        }
    }
    
    // Skip current question
    skipQuestionBtn.addEventListener('click', function() {
        // Mark as skipped
        interviewState.answers[interviewState.currentQuestionIndex] = "[SKIPPED]";
        
        // Move to next question or end interview
        interviewState.currentQuestionIndex++;
        
        if (interviewState.currentQuestionIndex < interviewState.questions.length) {
            // Next question
            setCurrentQuestion();
            startTimer();
        } else {
            // End of interview
            endInterview();
        }
    });
    
    // Pause interview
    pauseInterviewBtn.addEventListener('click', function() {
        if (interviewState.isPaused) {
            // Resume
            interviewState.isPaused = false;
            pauseInterviewBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Interview';
            answerInput.disabled = false;
        } else {
            // Pause
            interviewState.isPaused = true;
            pauseInterviewBtn.innerHTML = '<i class="fas fa-play"></i> Resume Interview';
            answerInput.disabled = true;
        }
    });
    
    // End interview early
    endInterviewBtn.addEventListener('click', function() {
        if (confirm("Are you sure you want to end the interview? Your progress will be saved.")) {
            endInterview();
        }
    });
    
    // End interview and show feedback
    function endInterview() {
        // Clear timer
        if (interviewState.timerInterval) {
            clearInterval(interviewState.timerInterval);
        }
        
        // Generate feedback
        generateFeedback();
        
        // Update UI
        interviewSession.style.display = 'none';
        interviewFeedback.style.display = 'block';
    }
    
    // Generate feedback based on answers
    function generateFeedback() {
        // This would normally call the AI feedback system
        // For now, we'll use placeholder feedback
        
        // Calculate overall score (placeholder)
        const overallScore = Math.floor(Math.random() * 20) + 70; // Random score between 70-90
        document.getElementById('overallScore').textContent = overallScore;
        
        // Update category scores (placeholder)
        const categoryScores = document.querySelectorAll('.score-fill');
        categoryScores.forEach(score => {
            const randomScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
            score.style.width = `${randomScore}%`;
            score.nextElementSibling.textContent = `${randomScore}%`;
        });
        
        // In a real implementation, this would analyze answers and provide specific feedback
    }
    
    // Download report
    downloadReportBtn.addEventListener('click', function() {
        alert("Report generation feature will be available in the next update.");
    });
    
    // Practice again
    practiceAgainBtn.addEventListener('click', function() {
        // Reset UI
        interviewFeedback.style.display = 'none';
        interviewSetup.style.display = 'block';
        
        // Reset state
        interviewState = {
            questions: [],
            currentQuestionIndex: 0,
            answers: [],
            timerInterval: null,
            timeRemaining: 120,
            isPaused: false,
            settings: {
                jobTitle: '',
                industry: '',
                experienceLevel: '',
                interviewType: '',
                focusAreas: [],
                interviewLength: 'medium',
                difficultyLevel: 3
            }
        };
    });
    
    // Utility function to shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Initialize page animations
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        });
        
        observer.observe(element);
    });
});
