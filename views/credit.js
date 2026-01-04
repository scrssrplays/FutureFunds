// Credit View - Credit Score Simulator
const CreditView = {
    render() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const history = Storage.getCreditHistory();

        return `
            <div class="credit-container">
                <h1 class="page-title">Credit Builder 💳</h1>
                
                <div class="credit-dashboard grid grid-2">
                    <div class="card text-center">
                        <h2 class="card-title">Your Credit Score</h2>
                        <div class="credit-score-circle" style="border-color: ${DashboardView.getCreditColor(profile.creditScore)}">
                            <div class="score-value">${profile.creditScore}</div>
                            <div class="score-rating" style="color: ${DashboardView.getCreditColor(profile.creditScore)}">
                                ${this.getRating(profile.creditScore)}
                            </div>
                        </div>
                        <p class="text-muted mt-2">Range: 300 - 850</p>
                    </div>
                    
                    <div class="card">
                        <h2 class="card-title">Credit Simulator</h2>
                        <p class="mb-3">Face real-life financial decisions and see how they impact your credit score!</p>
                        
                        <div class="scenario-box">
                            <button id="start-scenario" class="btn btn-primary btn-lg w-100">
                                Start New Scenario 🎲
                            </button>
                        </div>
                        
                        <div class="mt-4">
                            <h3>Tips for your score:</h3>
                            <ul class="tip-list">
                                ${this.getTips(profile.creditScore).map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <h2 class="card-title">Credit History</h2>
                    <div class="credit-timeline">
                        ${history.length === 0 ?
                '<p class="text-muted">No credit history yet. Start a scenario!</p>' :
                history.slice().reverse().map(event => `
                                <div class="timeline-item">
                                    <div class="timeline-marker ${event.change >= 0 ? 'positive' : 'negative'}"></div>
                                    <div class="timeline-content">
                                        <div class="timeline-header">
                                            <span class="timeline-title">${event.scenario}</span>
                                            <span class="timeline-change ${event.change >= 0 ? 'positive' : 'negative'}">
                                                ${event.change >= 0 ? '+' : ''}${event.change}
                                            </span>
                                        </div>
                                        <p class="timeline-desc">${event.choice}</p>
                                        <span class="timeline-date">${new Date(event.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            `).join('')
            }
                    </div>
                </div>
            </div>
            
            <!-- Scenario Modal -->
            <div id="scenario-modal" class="modal hidden">
                <div class="modal-content glass-card">
                    <div id="scenario-content"></div>
                </div>
            </div>
            
            <style>
                .credit-score-circle {
                    width: 200px;
                    height: 200px;
                    border: 8px solid;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    box-shadow: 0 0 30px rgba(0,0,0,0.2);
                }
                .score-value {
                    font-size: 4rem;
                    font-weight: 800;
                }
                .score-rating {
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                .w-100 { width: 100%; }
                .tip-list {
                    list-style: none;
                    margin-top: var(--spacing-sm);
                }
                .tip-list li {
                    margin-bottom: var(--spacing-xs);
                    padding-left: var(--spacing-md);
                    position: relative;
                }
                .tip-list li::before {
                    content: '💡';
                    position: absolute;
                    left: 0;
                }
                .credit-timeline {
                    margin-top: var(--spacing-md);
                    position: relative;
                    padding-left: var(--spacing-lg);
                }
                .credit-timeline::before {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--color-border);
                }
                .timeline-item {
                    position: relative;
                    margin-bottom: var(--spacing-lg);
                }
                .timeline-marker {
                    position: absolute;
                    left: -29px;
                    top: 5px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid var(--color-bg-dark);
                }
                .timeline-marker.positive { background: var(--color-success); }
                .timeline-marker.negative { background: var(--color-danger); }
                
                .timeline-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .timeline-title { font-weight: 600; }
                .timeline-date { font-size: var(--font-size-xs); color: var(--color-text-muted); }
                
                .scenario-choice {
                    display: block;
                    width: 100%;
                    text-align: left;
                    padding: var(--spacing-md);
                    margin-bottom: var(--spacing-sm);
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--color-border);
                    border-radius: var(--border-radius-md);
                    cursor: pointer;
                    transition: all var(--transition-base);
                    color: var(--color-text-primary);
                }
                .scenario-choice:hover {
                    background: rgba(255,255,255,0.1);
                    transform: translateX(5px);
                }
            </style>
        `;
    },

    getRating(score) {
        if (score >= 800) return 'Excellent';
        if (score >= 740) return 'Very Good';
        if (score >= 670) return 'Good';
        if (score >= 580) return 'Fair';
        return 'Poor';
    },

    getTips(score) {
        if (score < 580) return [
            'Pay every bill on time, every time',
            'Keep credit card balances very low',
            'Don\'t apply for new credit cards'
        ];
        if (score < 670) return [
            'Pay down existing debt to lower utilization',
            'Check your credit report for errors',
            'Avoid closing old credit accounts'
        ];
        return [
            'Maintain your good habits!',
            'Keep utilization under 30%',
            'Monitor your credit report regularly'
        ];
    },

    attachEventListeners() {
        document.getElementById('start-scenario')?.addEventListener('click', () => {
            this.startScenario();
        });
    },

    startScenario() {
        const scenario = CreditScenarios.getRandomScenario();
        const modal = document.getElementById('scenario-modal');
        const content = document.getElementById('scenario-content');

        content.innerHTML = `
            <h2 class="mb-3">${scenario.title}</h2>
            <p class="mb-4" style="font-size: 1.1rem;">${scenario.situation}</p>
            
            <div class="choices-list">
                ${scenario.choices.map((choice, index) => `
                    <button class="scenario-choice" data-index="${index}">
                        ${choice.text}
                    </button>
                `).join('')}
            </div>
        `;

        modal.classList.remove('hidden');

        // Attach choice listeners
        content.querySelectorAll('.scenario-choice').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.resolveScenario(scenario, scenario.choices[index]);
            });
        });
    },

    resolveScenario(scenario, choice) {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const newScore = Math.max(300, Math.min(850, profile.creditScore + choice.impact));

        // Update profile
        Storage.updateProfile({ creditScore: newScore });

        // Add to history
        Storage.addCreditEvent({
            scenario: scenario.title,
            choice: choice.text,
            change: choice.impact,
            newScore
        });

        // Check achievements
        if (newScore >= 700) Gamification.checkAndAwardBadge('credit_builder');
        if (newScore >= 800) Gamification.checkAndAwardBadge('credit_excellent');

        // Show result
        const content = document.getElementById('scenario-content');
        content.innerHTML = `
            <div class="text-center">
                <div style="font-size: 4rem; margin-bottom: 1rem;">
                    ${choice.impact >= 0 ? '👍' : '👎'}
                </div>
                <h2 class="mb-2">
                    Score Change: <span class="${choice.impact >= 0 ? 'positive' : 'negative'}">
                        ${choice.impact >= 0 ? '+' : ''}${choice.impact}
                    </span>
                </h2>
                <h3 class="mb-3">New Score: ${newScore}</h3>
                
                <div class="card mb-4 text-left" style="background: rgba(0,0,0,0.3);">
                    <p>${choice.explanation}</p>
                </div>
                
                <button id="close-scenario" class="btn btn-primary">Continue</button>
            </div>
        `;

        document.getElementById('close-scenario').addEventListener('click', () => {
            document.getElementById('scenario-modal').classList.add('hidden');
            App.render(); // Refresh view
        });
    }
};
