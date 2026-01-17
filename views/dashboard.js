// Dashboard View - User Progress Overview
const DashboardView = {
    render() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const level = Gamification.getLevel(profile.xp);
        const progress = Gamification.getLevelProgress(profile.xp);
        const unlockedBadges = Gamification.getUnlockedBadges();
        const quizHistory = Storage.getQuizHistory();

        return `
            <div class="dashboard-container">
                <h1 class="page-title">Dashboard 📊</h1>
                
                <div class="grid grid-2">
                    <div class="card">
                        <h2 class="card-title">Level Progress</h2>
                        <div class="level-display">
                            <div class="level-number">Level ${level}</div>
                            <div class="progress">
                                <div class="progress-bar" style="width: ${progress}%"></div>
                            </div>
                            <div class="xp-text">${profile.xp} XP • ${Math.round(progress)}% to next level</div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h2 class="card-title">Achievements 🏆</h2>
                        <div class="badge-container">
                            ${unlockedBadges.slice(0, 6).map(badge => `
                                <div class="badge-item" title="${badge.description}">
                                    <span class="badge-icon">${badge.icon}</span>
                                    <span class="badge-name">${badge.name}</span>
                                </div>
                            `).join('')}
                            ${unlockedBadges.length === 0 ? '<p class="text-center">Complete quizzes and challenges to earn badges!</p>' : ''}
                        </div>
                        <a href="#profile" class="btn btn-outline btn-sm mt-2" data-view="profile">View All Badges</a>
                    </div>
                </div>
                
                <div class="grid grid-3 mt-4">
                    <div class="dashboard-stat-card card">
                        <div class="dashboard-stat-icon">📝</div>
                        <div class="dashboard-stat-value">${quizHistory.length}</div>
                        <div class="dashboard-stat-label">Quizzes Completed</div>
                    </div>
                    <div class="dashboard-stat-card card">
                        <div class="dashboard-stat-icon">🔥</div>
                        <div class="dashboard-stat-value">${profile.streak}</div>
                        <div class="dashboard-stat-label">Day Streak</div>
                    </div>
                    <div class="dashboard-stat-card card">
                        <div class="dashboard-stat-icon">💯</div>
                        <div class="dashboard-stat-value">${quizHistory.filter(q => q.isPerfect).length}</div>
                        <div class="dashboard-stat-label">Perfect Scores</div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <h2 class="card-title">Financial Overview</h2>
                    <div class="financial-stats">
                        <div class="fin-stat">
                            <span class="fin-label">Credit Score</span>
                            <span class="fin-value" style="color: ${this.getCreditColor(profile.creditScore)}">${profile.creditScore}</span>
                        </div>
                        <div class="fin-stat">
                            <span class="fin-label">Portfolio Value</span>
                            <span class="fin-value">$${profile.portfolioValue.toFixed(2)}</span>
                        </div>
                        <div class="fin-stat">
                            <span class="fin-label">Portfolio Change</span>
                            <span class="fin-value ${profile.portfolioValue >= 1000 ? 'positive' : 'negative'}">
                                ${profile.portfolioValue >= 1000 ? '+' : ''}$${(profile.portfolioValue - 1000).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .page-title {
                    font-size: var(--font-size-3xl);
                    margin-bottom: var(--spacing-lg);
                }
                .level-display {
                    text-align: center;
                    padding: var(--spacing-lg);
                }
                .level-number {
                    font-size: var(--font-size-4xl);
                    font-weight: 800;
                    background: var(--gradient-rainbow);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: var(--spacing-md);
                }
                .xp-text {
                    margin-top: var(--spacing-sm);
                    color: var(--color-text-secondary);
                }
                .badge-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--spacing-md);
                }
                .badge-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: var(--spacing-xs);
                    padding: var(--spacing-sm);
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: var(--border-radius-md);
                }
                .badge-icon {
                    font-size: var(--font-size-3xl);
                }
                .badge-name {
                    font-size: var(--font-size-xs);
                    text-align: center;
                }
                .dashboard-stat-card {
                    text-align: center;
                }
                .dashboard-stat-icon {
                    font-size: var(--font-size-4xl);
                    margin-bottom: var(--spacing-sm);
                }
                .dashboard-stat-value {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    color: var(--color-primary-light);
                }
                .dashboard-stat-label {
                    color: var(--color-text-secondary);
                    margin-top: var(--spacing-xs);
                }
                .financial-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: var(--spacing-lg);
                    margin-top: var(--spacing-md);
                }
                .fin-stat {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-xs);
                }
                .fin-label {
                    color: var(--color-text-muted);
                    font-size: var(--font-size-sm);
                }
                .fin-value {
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                }
                .positive { color: var(--color-success); }
                .negative { color: var(--color-danger); }
            </style>
        `;
    },

    getCreditColor(score) {
        if (score >= 740) return '#10b981';
        if (score >= 670) return '#06b6d4';
        if (score >= 580) return '#f59e0b';
        return '#ef4444';
    },

    attachEventListeners() { }
};
