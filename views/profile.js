// Profile View - User Settings and Stats
const ProfileView = {
    render() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const unlockedBadges = Gamification.getUnlockedBadges();
        const lockedBadges = Gamification.getLockedBadges();

        return `
            <div class="profile-container">
                <div class="profile-header card text-center mb-4">
                    <div class="profile-avatar">👤</div>
                    <h1>Student Profile</h1>
                    <p class="text-muted">Member since ${new Date(profile.createdAt).toLocaleDateString()}</p>
                    
                    <div class="level-badge mt-2">Level ${profile.level}</div>
                </div>
                
                <div class="grid grid-2 mb-4">
                    <div class="card">
                        <h2 class="card-title">Statistics</h2>
                        <div class="stats-list">
                            <div class="flex justify-between py-2 border-bottom">
                                <span>Total XP</span>
                                <span class="font-bold">${profile.xp}</span>
                            </div>
                            <div class="flex justify-between py-2 border-bottom">
                                <span>Current Streak</span>
                                <span class="font-bold">${profile.streak} days</span>
                            </div>
                            <div class="flex justify-between py-2 border-bottom">
                                <span>Credit Score</span>
                                <span class="font-bold" style="color: ${DashboardView.getCreditColor(profile.creditScore)}">${profile.creditScore}</span>
                            </div>
                            <div class="flex justify-between py-2 border-bottom">
                                <span>Portfolio Value</span>
                                <span class="font-bold">$${profile.portfolioValue.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between py-2">
                                <span>Grade Level</span>
                                <span class="font-bold capitalize">${profile.gradeLevel || 'Not set'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h2 class="card-title">Settings</h2>
                        <div class="settings-form">
                            <div class="form-group mb-3">
                                <label class="block mb-1">Change Grade Level</label>
                                <select id="grade-select" class="form-select w-100">
                                    <option value="elementary" ${profile.gradeLevel === 'elementary' ? 'selected' : ''}>Elementary (Grades 4-5)</option>
                                    <option value="middle" ${profile.gradeLevel === 'middle' ? 'selected' : ''}>Middle School (Grades 6-8)</option>
                                    <option value="high" ${profile.gradeLevel === 'high' ? 'selected' : ''}>High School (Grades 9-12)</option>
                                </select>
                            </div>
                            
                            <button id="reset-data" class="btn btn-danger btn-outline w-100 mt-4">
                                Reset All Progress
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h2 class="card-title">Achievements (${unlockedBadges.length}/${unlockedBadges.length + lockedBadges.length})</h2>
                    
                    <div class="badges-grid mt-3">
                        ${unlockedBadges.map(badge => `
                            <div class="badge-card unlocked">
                                <div class="badge-icon">${badge.icon}</div>
                                <div class="badge-info">
                                    <h4>${badge.name}</h4>
                                    <p>${badge.description}</p>
                                </div>
                            </div>
                        `).join('')}
                        
                        ${lockedBadges.map(badge => `
                            <div class="badge-card locked">
                                <div class="badge-icon">🔒</div>
                                <div class="badge-info">
                                    <h4>${badge.name}</h4>
                                    <p>${badge.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                .profile-avatar {
                    font-size: 4rem;
                    margin-bottom: var(--spacing-sm);
                    background: rgba(255,255,255,0.1);
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto var(--spacing-sm);
                }
                .level-badge {
                    background: var(--gradient-primary);
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: var(--border-radius-full);
                    font-weight: 700;
                }
                .border-bottom {
                    border-bottom: 1px solid var(--color-border);
                }
                .capitalize { text-transform: capitalize; }
                .form-select {
                    padding: var(--spacing-sm);
                    background: rgba(255,255,255,0.1);
                    border: 1px solid var(--color-border);
                    border-radius: var(--border-radius-md);
                    color: white;
                    width: 100%;
                }
                .form-select option {
                    background: var(--color-bg-dark);
                }
                .badges-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: var(--spacing-md);
                }
                .badge-card {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md);
                    border-radius: var(--border-radius-md);
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--color-border);
                }
                .badge-card.unlocked {
                    background: rgba(16, 185, 129, 0.1);
                    border-color: rgba(16, 185, 129, 0.3);
                }
                .badge-card.locked {
                    opacity: 0.6;
                }
                .badge-icon {
                    font-size: 2rem;
                }
                .badge-info h4 { margin-bottom: 4px; }
                .badge-info p { font-size: var(--font-size-xs); color: var(--color-text-muted); }
            </style>
        `;
    },

    attachEventListeners() {
        // Grade change
        document.getElementById('grade-select')?.addEventListener('change', (e) => {
            Storage.updateProfile({ gradeLevel: e.target.value });
            App.showToast('Grade level updated!', 'success');
        });

        // Reset data
        document.getElementById('reset-data')?.addEventListener('click', () => {
            if (confirm('Are you sure? This will delete ALL progress, badges, and history. This cannot be undone.')) {
                Storage.clearAll();
                location.reload();
            }
        });
    }
};
