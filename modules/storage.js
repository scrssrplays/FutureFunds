// Storage Module - LocalStorage wrapper with error handling
const Storage = {
    // Keys for localStorage
    keys: {
        USER_PROFILE: 'futurefunds_user_profile',
        QUIZ_HISTORY: 'futurefunds_quiz_history',
        CREDIT_HISTORY: 'futurefunds_credit_history',
        PORTFOLIO: 'futurefunds_portfolio',
        ACHIEVEMENTS: 'futurefunds_achievements',
        BOOKMARKS: 'futurefunds_bookmarks'
    },

    // Get item from localStorage
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    // Set item in localStorage
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    // Remove item from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    // Clear all FutureFunds data
    clearAll() {
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    // Initialize default user profile
    initUserProfile() {
        let profile = this.get(this.keys.USER_PROFILE);
        
        if (!profile) {
            profile = {
                gradeLevel: null,
                onboardingComplete: false,
                xp: 0,
                level: 1,
                streak: 0,
                lastVisit: new Date().toISOString(),
                creditScore: 650,
                portfolioBalance: 1000,
                portfolioValue: 1000,
                createdAt: new Date().toISOString()
            };
            this.set(this.keys.USER_PROFILE, profile);
        }
        
        return profile;
    },

    // Update user profile
    updateProfile(updates) {
        const profile = this.get(this.keys.USER_PROFILE);
        const updatedProfile = { ...profile, ...updates };
        this.set(this.keys.USER_PROFILE, updatedProfile);
        return updatedProfile;
    },

    // Get quiz history
    getQuizHistory() {
        return this.get(this.keys.QUIZ_HISTORY, []);
    },

    // Add quiz result
    addQuizResult(result) {
        const history = this.getQuizHistory();
        history.push({
            ...result,
            timestamp: new Date().toISOString()
        });
        this.set(this.keys.QUIZ_HISTORY, history);
    },

    // Get credit history
    getCreditHistory() {
        return this.get(this.keys.CREDIT_HISTORY, []);
    },

    // Add credit event
    addCreditEvent(event) {
        const history = this.getCreditHistory();
        history.push({
            ...event,
            timestamp: new Date().toISOString()
        });
        this.set(this.keys.CREDIT_HISTORY, history);
    },

    // Get portfolio
    getPortfolio() {
        return this.get(this.keys.PORTFOLIO, {
            cash: 1000,
            stocks: {},
            transactions: []
        });
    },

    // Update portfolio
    updatePortfolio(portfolio) {
        this.set(this.keys.PORTFOLIO, portfolio);
    },

    // Get achievements
    getAchievements() {
        return this.get(this.keys.ACHIEVEMENTS, {
            badges: [],
            unlockedAt: {}
        });
    },

    // Unlock achievement
    unlockAchievement(badgeId) {
        const achievements = this.getAchievements();
        if (!achievements.badges.includes(badgeId)) {
            achievements.badges.push(badgeId);
            achievements.unlockedAt[badgeId] = new Date().toISOString();
            this.set(this.keys.ACHIEVEMENTS, achievements);
            return true;
        }
        return false;
    },

    // Get bookmarks
    getBookmarks() {
        return this.get(this.keys.BOOKMARKS, []);
    },

    // Toggle bookmark
    toggleBookmark(resourceId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(resourceId);
        
        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(resourceId);
        }
        
        this.set(this.keys.BOOKMARKS, bookmarks);
        return bookmarks;
    }
};
