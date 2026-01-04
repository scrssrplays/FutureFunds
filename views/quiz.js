// Quiz View - Interactive quiz system
const QuizView = {
    currentState: 'selection', // selection, active, results

    render() {
        if (this.currentState === 'selection') {
            return this.renderCategorySelection();
        } else if (this.currentState === 'active') {
            return this.renderActiveQuiz();
        } else if (this.currentState === 'results') {
            return this.renderResults();
        }
    },

    renderCategorySelection() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const difficulty = profile.gradeLevel || 'middle';

        return `
            <div class="quiz-selection">
                <h1 class="page-title">Choose Your Quiz 📝</h1>
                
                <div class="grid grid-3 mt-4">
                    ${QuizData.categories.map(cat => {
            const stats = QuizEngine.getCategoryStats(cat.id);
            return `
                            <div class="quiz-category-card card" data-category="${cat.id}" style="border-top: 4px solid ${cat.color}">
                                <div class="category-icon" style="color: ${cat.color}">${cat.icon}</div>
                                <h3>${cat.name}</h3>
                                <div class="category-stats">
                                    <div class="stat-small">
                                        <span class="stat-value">${stats.totalQuizzes}</span>
                                        <span class="stat-label">Quizzes</span>
                                    </div>
                                    <div class="stat-small">
                                        <span class="stat-value">${stats.averageScore}%</span>
                                        <span class="stat-label">Avg Score</span>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-2" data-start-quiz="${cat.id}">Start Quiz</button>
                            </div>
                        `;
        }).join('')}
                </div>
                
                <div class="card mt-4">
                    <h3>Or try all categories:</h3>
                    <button class="btn btn-secondary btn-lg mt-2" data-start-quiz="all">Mixed Quiz (All Topics)</button>
                </div>
            </div>
            
            <style>
                .quiz-category-card {
                    text-align: center;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }
                .quiz-category-card:hover {
                    transform: translateY(-8px);
                }
                .category-icon {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-sm);
                }
                .category-stats {
                    display: flex;
                    justify-content: space-around;
                    margin: var(--spacing-md) 0;
                }
                .stat-small {
                    display: flex;
                    flex-direction: column;
                }
                .stat-small .stat-value {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                }
                .stat-small .stat-label {
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                }
            </style>
        `;
    },

    renderActiveQuiz() {
        const question = QuizEngine.getCurrentQuestion();
        if (!question) return '';

        const progress = QuizEngine.getProgress();
        const currentIndex = QuizEngine.currentQuestionIndex + 1;
        const total = QuizEngine.currentQuiz.totalQuestions;

        return `
            <div class="quiz-active">
                <div class="quiz-progress-container">
                    <div class="quiz-progress-info">
                        <span>Question ${currentIndex} of ${total}</span>
                        <span>${Math.round(progress)}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="quiz-question-card card">
                    <div class="question-header">
                        <span class="badge badge-primary">${QuizData.categories.find(c => c.id === question.category).name}</span>
                        <span class="badge">${question.difficulty}</span>
                    </div>
                    
                    <h2 class="question-text">${question.question}</h2>
                    
                    <div class="answer-options">
                        ${question.options.map((option, index) => `
                            <button class="answer-btn" data-answer="${index}">
                                <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                                <span class="answer-text">${option}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                .quiz-progress-container {
                    margin-bottom: var(--spacing-xl);
                }
                .quiz-progress-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-sm);
                    font-weight: 600;
                }
                .quiz-question-card {
                    max-width: 800px;
                    margin: 0 auto;
                }
                .question-header {
                    display: flex;
                    gap: var(--spacing-sm);
                    margin-bottom: var(--spacing-lg);
                }
                .question-text {
                    font-size: var(--font-size-2xl);
                    margin-bottom: var(--spacing-xl);
                    line-height: 1.4;
                }
                .answer-options {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                .answer-btn {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md) var(--spacing-lg);
                    background: rgba(255, 255, 255, 0.05);
                    border: 2px solid var(--color-border);
                    border-radius: var(--border-radius-lg);
                    color: var(--color-text-primary);
                    font-size: var(--font-size-base);
                    text-align: left;
                    cursor: pointer;
                    transition: all var(--transition-base);
                }
                .answer-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--color-primary);
                    transform: translateX(8px);
                }
                .answer-letter {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    background: var(--gradient-primary);
                    border-radius: 50%;
                    font-weight: 700;
                    flex-shrink: 0;
                }
                .answer-text {
                    flex: 1;
                }
                .answer-btn.correct {
                    background: var(--gradient-success);
                    border-color: var(--color-success);
                }
                .answer-btn.incorrect {
                    background: var(--gradient-danger);
                    border-color: var(--color-danger);
                }
            </style>
        `;
    },

    renderResults() {
        const results = QuizEngine.getResults();
        if (!results) return '';

        return `
            <div class="quiz-results">
                <div class="results-card card text-center">
                    <div class="results-icon">${results.isPerfect ? '🎉' : results.score >= 70 ? '👏' : '💪'}</div>
                    <h1 class="results-title">Quiz Complete!</h1>
                    
                    <div class="score-display">
                        <div class="score-circle">
                            <div class="score-value">${results.score}%</div>
                            <div class="score-label">${results.correctCount}/${results.totalQuestions} Correct</div>
                        </div>
                    </div>
                    
                    <div class="results-stats">
                        <div class="result-stat">
                            <span class="result-icon">⚡</span>
                            <span class="result-label">XP Earned</span>
                            <span class="result-value">+${results.xpEarned}</span>
                        </div>
                        <div class="result-stat">
                            <span class="result-icon">⏱️</span>
                            <span class="result-label">Time</span>
                            <span class="result-value">${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}</span>
                        </div>
                        ${results.levelUp ? `
                            <div class="result-stat level-up">
                                <span class="result-icon">🎊</span>
                                <span class="result-label">Level Up!</span>
                                <span class="result-value">Level ${results.newLevel}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="results-actions">
                        <button class="btn btn-primary btn-lg" id="retake-quiz">Try Again</button>
                        <button class="btn btn-secondary btn-lg" id="new-quiz">Different Quiz</button>
                        <a href="#dashboard" class="btn btn-outline btn-lg" data-view="dashboard">Back to Dashboard</a>
                    </div>
                </div>
            </div>
            
            <style>
                .results-card {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: var(--spacing-2xl);
                }
                .results-icon {
                    font-size: 5rem;
                    margin-bottom: var(--spacing-md);
                }
                .results-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-xl);
                }
                .score-circle {
                    display: inline-block;
                    padding: var(--spacing-2xl);
                    background: var(--gradient-primary);
                    border-radius: 50%;
                    margin: var(--spacing-xl) 0;
                }
                .score-value {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                }
                .score-label {
                    margin-top: var(--spacing-sm);
                    opacity: 0.9;
                }
                .results-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: var(--spacing-lg);
                    margin: var(--spacing-xl) 0;
                }
                .result-stat {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
                .result-icon {
                    font-size: var(--font-size-2xl);
                }
                .result-label {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-muted);
                }
                .result-value {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                }
                .level-up {
                    animation: pulse 1s infinite;
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                .results-actions {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-xl);
                }
            </style>
        `;
    },

    attachEventListeners() {
        // Start quiz
        document.querySelectorAll('[data-start-quiz]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.startQuiz;
                const profile = Storage.get(Storage.keys.USER_PROFILE);
                QuizEngine.startQuiz(category, profile.gradeLevel || 'all');
                this.currentState = 'active';
                App.render();
            });
        });

        // Answer selection
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const answer = parseInt(e.currentTarget.dataset.answer);
                const result = QuizEngine.submitAnswer(answer);

                // Show feedback
                this.showFeedback(result, e.currentTarget);

                // Disable all buttons
                document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);

                // Move to next or finish
                setTimeout(() => {
                    if (result.isLastQuestion) {
                        this.currentState = 'results';
                    } else {
                        QuizEngine.nextQuestion();
                    }
                    App.render();
                }, 2000);
            });
        });

        // Results actions
        document.getElementById('retake-quiz')?.addEventListener('click', () => {
            const lastCategory = QuizEngine.currentQuiz?.category;
            const profile = Storage.get(Storage.keys.USER_PROFILE);
            QuizEngine.startQuiz(lastCategory, profile.gradeLevel || 'all');
            this.currentState = 'active';
            App.render();
        });

        document.getElementById('new-quiz')?.addEventListener('click', () => {
            this.currentState = 'selection';
            App.render();
        });
    },

    showFeedback(result, button) {
        // Mark correct/incorrect
        if (result.isCorrect) {
            button.classList.add('correct');
            App.showToast('Correct! 🎉', 'success');
        } else {
            button.classList.add('incorrect');
            const correctBtn = document.querySelectorAll('.answer-btn')[result.correctAnswer];
            correctBtn.classList.add('correct');
            App.showToast(result.explanation, 'info');
        }
    }
};
