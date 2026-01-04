// Home View - Welcome screen and onboarding
const HomeView = {
    render() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);

        if (!profile.onboardingComplete) {
            return this.renderOnboarding();
        }

        return this.renderWelcome(profile);
    },

    renderOnboarding() {
        return `
            <div class="onboarding-container">
                <div class="onboarding-card glass-card">
                    <div class="onboarding-header">
                        <h1 class="onboarding-title">Welcome to FutureFunds! 💰</h1>
                        <p class="onboarding-subtitle">Your journey to financial literacy starts here</p>
                    </div>

                    <div class="onboarding-content">
                        <h2>What You'll Learn:</h2>
                        <div class="grid grid-3 mt-3">
                            <div class="feature-card card">
                                <div class="feature-icon">📝</div>
                                <h3>Interactive Quizzes</h3>
                                <p>Test your knowledge and earn XP</p>
                            </div>
                            <div class="feature-card card">
                                <div class="feature-icon">📈</div>
                                <h3>Paper Trading</h3>
                                <p>Practice investing with virtual money</p>
                            </div>
                            <div class="feature-card card">
                                <div class="feature-icon">💳</div>
                                <h3>Credit Scenarios</h3>
                                <p>Learn to build credit through real-life situations</p>
                            </div>
                        </div>

                        <div class="grade-selection mt-4">
                            <h3>Select Your Grade Level:</h3>
                            <div class="grade-buttons">
                                <button class="btn btn-outline" data-grade="elementary">
                                    Elementary (Grades 4-5)
                                </button>
                                <button class="btn btn-outline" data-grade="middle">
                                    Middle School (Grades 6-8)
                                </button>
                                <button class="btn btn-outline" data-grade="high">
                                    High School (Grades 9-12)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .onboarding-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 70vh;
                }
                .onboarding-card {
                    max-width: 900px;
                    text-align: center;
                }
                .onboarding-title {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-sm);
                }
                .onboarding-subtitle {
                    font-size: var(--font-size-xl);
                    color: var(--color-text-secondary);
                }
                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: var(--spacing-sm);
                }
                .feature-card h3 {
                    margin-bottom: var(--spacing-xs);
                }
                .grade-selection {
                    text-align: center;
                }
                .grade-buttons {
                    display: flex;
                    gap: var(--spacing-md);
                    justify-content: center;
                    margin-top: var(--spacing-md);
                    flex-wrap: wrap;
                }
                .grade-buttons .btn {
                    flex: 1;
                    min-width: 150px;
                }
            </style>
        `;
    },

    renderWelcome(profile) {
        const level = Gamification.getLevel(profile.xp);
        const progress = Gamification.getLevelProgress(profile.xp);

        return `
            <div class="welcome-container">
                <div class="welcome-header glass-card">
                    <h1>Welcome back! 👋</h1>
                    <p>You're Level ${level} • ${profile.streak} day streak 🔥</p>
                </div>

                <div class="grid grid-2 mt-4">
                    <div class="quick-action-card card">
                        <div class="card-header">
                            <h2 class="card-title">Quick Actions</h2>
                        </div>
                        <div class="action-buttons">
                            <a href="#quiz" class="btn btn-primary btn-lg" data-view="quiz">
                                <span>📝</span> Take a Quiz
                            </a>
                            <a href="#investing" class="btn btn-secondary btn-lg" data-view="investing">
                                <span>📈</span> View Portfolio
                            </a>
                            <a href="#credit" class="btn btn-success btn-lg" data-view="credit">
                                <span>💳</span> Credit Challenge
                            </a>
                            <a href="#library" class="btn btn-outline btn-lg" data-view="library">
                                <span>📚</span> Read Articles
                            </a>
                        </div>
                    </div>

                    <div class="stats-card card">
                        <div class="card-header">
                            <h2 class="card-title">Your Progress</h2>
                        </div>
                        <div class="stat-item-large">
                            <div class="stat-label">Level ${level}</div>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${progress}%"></div>
                            </div>
                            <div class="stat-sublabel">${Math.round(progress)}% to Level ${level + 1}</div>
                        </div>
                        <div class="stats-grid">
                            <div class="stat-box">
                                <div class="stat-value">${profile.xp.toLocaleString()}</div>
                                <div class="stat-label-sm">Total XP</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-value">${profile.creditScore}</div>
                                <div class="stat-label-sm">Credit Score</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-value">$${profile.portfolioValue.toFixed(0)}</div>
                                <div class="stat-label-sm">Portfolio</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="learning-path mt-4 card">
                    <div class="card-header">
                        <h2 class="card-title">Recommended for You</h2>
                    </div>
                    <div class="grid grid-3">
                        ${this.renderRecommendations()}
                    </div>
                </div>
            </div>

            <style>
                .welcome-header {
                    text-align: center;
                    padding: var(--spacing-xl);
                }
                .welcome-header h1 {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-xs);
                }
                .action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                }
                .stat-item-large {
                    margin-bottom: var(--spacing-lg);
                }
                .stat-item-large .stat-label {
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                    margin-bottom: var(--spacing-sm);
                }
                .stat-sublabel {
                    margin-top: var(--spacing-xs);
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--spacing-md);
                }
                .stat-box {
                    text-align: center;
                    padding: var(--spacing-md);
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: var(--border-radius-md);
                }
                .stat-value {
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                    color: var(--color-primary-light);
                }
                .stat-label-sm {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-muted);
                    margin-top: var(--spacing-xs);
                }
                .recommendation-card {
                    cursor: pointer;
                    transition: all var(--transition-base);
                }
                .recommendation-card:hover {
                    transform: translateY(-4px);
                }
                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
    },

    renderRecommendations() {
        const categories = ['budgeting', 'saving', 'credit'];
        return categories.map(cat => {
            const article = ResourceLibrary.getArticlesByCategory(cat)[0];
            const categoryInfo = ResourceLibrary.categories.find(c => c.id === cat);
            return `
                <div class="recommendation-card card" data-article="${article.id}">
                    <div class="feature-icon" style="color: ${categoryInfo.color}">${categoryInfo.icon}</div>
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <span class="badge badge-primary">${article.readTime} min read</span>
                </div>
            `;
        }).join('');
    },

    attachEventListeners() {
        // Grade selection
        document.querySelectorAll('[data-grade]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grade = e.currentTarget.dataset.grade;
                Storage.updateProfile({
                    gradeLevel: grade,
                    onboardingComplete: true
                });
                // Update streak on first visit
                Gamification.updateStreak();
                App.navigate('home');
            });
        });

        // Navigation from recommendations
        document.querySelectorAll('[data-article]').forEach(card => {
            card.addEventListener('click', () => {
                App.navigate('library');
            });
        });
    }
};
