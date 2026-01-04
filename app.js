// Main Application Controller
const App = {
    currentView: 'home',

    init() {
        // Initialize storage and profile
        Storage.initUserProfile();

        // Setup navigation
        this.setupNavigation();

        // Handle initial route
        this.handleRoute();

        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());

        // Update streak
        Gamification.updateStreak();

        // Start market simulation loop
        setInterval(() => {
            StockData.updateMarket();
            // Only re-render if on investing page to avoid jarring updates
            if (this.currentView === 'investing') {
                this.render();
            }
        }, 5000); // Update every 5 seconds

        // Remove loading screen
        document.querySelector('.loading').classList.add('hidden');
    },

    setupNavigation() {
        // Mobile menu toggle
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        this.navigate(hash, false);
    },

    navigate(view, updateHash = true) {
        if (updateHash) {
            window.location.hash = view;
            return; // hashchange listener will call handleRoute -> navigate(view, false)
        }

        this.currentView = view;

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });

        this.render();
    },

    render() {
        const app = document.getElementById('app');
        const profile = Storage.get(Storage.keys.USER_PROFILE);

        // Update nav stats
        document.querySelector('#nav-level .stat-value').textContent = Gamification.getLevel(profile.xp);
        document.querySelector('#nav-streak .stat-value').textContent = profile.streak;
        document.querySelector('#nav-credit .stat-value').textContent = profile.creditScore;

        // Render view
        let content = '';
        let viewObj = null;

        switch (this.currentView) {
            case 'home':
                content = HomeView.render();
                viewObj = HomeView;
                break;
            case 'dashboard':
                content = DashboardView.render();
                viewObj = DashboardView;
                break;
            case 'quiz':
                content = QuizView.render();
                viewObj = QuizView;
                break;
            case 'investing':
                content = InvestingView.render();
                viewObj = InvestingView;
                break;
            case 'credit':
                content = CreditView.render();
                viewObj = CreditView;
                break;
            case 'library':
                content = LibraryView.render();
                viewObj = LibraryView;
                break;
            case 'profile':
                content = ProfileView.render();
                viewObj = ProfileView;
                break;
            default:
                content = HomeView.render();
                viewObj = HomeView;
        }

        app.innerHTML = content;

        // Attach event listeners for the view
        if (viewObj && viewObj.attachEventListeners) {
            viewObj.attachEventListeners();
        }
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
