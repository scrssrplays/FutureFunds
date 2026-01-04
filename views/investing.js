// Investing View - Paper Trading System
const InvestingView = {
    render() {
        const profile = Storage.get(Storage.keys.USER_PROFILE);
        const portfolio = Storage.getPortfolio();
        const stocks = StockData.getAllStocksWithPrices();

        // Calculate total portfolio value
        let stockValue = 0;
        Object.entries(portfolio.stocks).forEach(([symbol, quantity]) => {
            const stock = stocks.find(s => s.symbol === symbol);
            if (stock) {
                stockValue += stock.currentPrice * quantity;
            }
        });

        const totalValue = portfolio.cash + stockValue;
        const totalReturn = totalValue - 1000;
        const returnPercent = (totalReturn / 1000) * 100;

        // Update profile with new value
        if (Math.abs(profile.portfolioValue - totalValue) > 0.01) {
            Storage.updateProfile({ portfolioValue: totalValue });
        }

        return `
            <div class="investing-container">
                <h1 class="page-title">Paper Trading 📈</h1>
                
                <div class="grid grid-3">
                    <div class="card">
                        <div class="stat-label">Total Portfolio Value</div>
                        <div class="stat-value-lg">$${totalValue.toFixed(2)}</div>
                        <div class="stat-change ${totalReturn >= 0 ? 'positive' : 'negative'}">
                            ${totalReturn >= 0 ? '▲' : '▼'} $${Math.abs(totalReturn).toFixed(2)} (${returnPercent.toFixed(2)}%)
                        </div>
                    </div>
                    <div class="card">
                        <div class="stat-label">Cash Available</div>
                        <div class="stat-value-lg">$${portfolio.cash.toFixed(2)}</div>
                        <div class="stat-sublabel">Buying Power</div>
                    </div>
                    <div class="card">
                        <div class="stat-label">Stock Holdings</div>
                        <div class="stat-value-lg">$${stockValue.toFixed(2)}</div>
                        <div class="stat-sublabel">${Object.keys(portfolio.stocks).length} Companies</div>
                    </div>
                </div>
                
                <div class="grid grid-2 mt-4" style="grid-template-columns: 2fr 1fr;">
                    <div class="card">
                        <h2 class="card-title">Market</h2>
                        <div class="stock-list">
                            ${stocks.map(stock => this.renderStockRow(stock, portfolio.stocks[stock.symbol] || 0)).join('')}
                        </div>
                    </div>
                    
                    <div class="card">
                        <h2 class="card-title">Transaction History</h2>
                        <div class="transaction-list">
                            ${portfolio.transactions.length === 0 ?
                '<p class="text-muted text-center mt-2">No transactions yet</p>' :
                portfolio.transactions.slice().reverse().slice(0, 5).map(t => `
                                    <div class="transaction-item">
                                        <div class="trans-info">
                                            <span class="trans-type ${t.type}">${t.type.toUpperCase()}</span>
                                            <span class="trans-symbol">${t.symbol}</span>
                                        </div>
                                        <div class="trans-details">
                                            <span class="trans-amount">${t.quantity} @ $${t.price.toFixed(2)}</span>
                                            <span class="trans-date">${new Date(t.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                `).join('')
            }
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Buy/Sell Modal -->
            <div id="trade-modal" class="modal hidden">
                <div class="modal-content glass-card">
                    <span class="close-modal">&times;</span>
                    <h2 id="modal-title">Trade Stock</h2>
                    <div id="modal-body"></div>
                </div>
            </div>
            
            <style>
                .stat-value-lg {
                    font-size: var(--font-size-3xl);
                    font-weight: 700;
                    margin: var(--spacing-xs) 0;
                }
                .stat-change {
                    font-weight: 600;
                }
                .stock-list {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-sm);
                }
                .stock-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-md);
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: var(--border-radius-md);
                    transition: all var(--transition-base);
                }
                .stock-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                }
                .stock-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }
                .stock-symbol {
                    font-weight: 700;
                    font-size: var(--font-size-lg);
                    width: 60px;
                }
                .stock-name {
                    color: var(--color-text-secondary);
                    font-size: var(--font-size-sm);
                }
                .stock-price-info {
                    text-align: right;
                    margin-right: var(--spacing-lg);
                }
                .stock-price {
                    font-weight: 700;
                }
                .stock-actions {
                    display: flex;
                    gap: var(--spacing-xs);
                }
                .transaction-item {
                    padding: var(--spacing-sm) 0;
                    border-bottom: 1px solid var(--color-border);
                }
                .trans-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .trans-type {
                    font-weight: 700;
                    font-size: var(--font-size-xs);
                }
                .trans-type.buy { color: var(--color-success); }
                .trans-type.sell { color: var(--color-danger); }
                .trans-details {
                    display: flex;
                    justify-content: space-between;
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                }
                
                /* Modal Styles */
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: var(--z-modal);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    width: 90%;
                    max-width: 500px;
                    position: relative;
                }
                .close-modal {
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    font-size: var(--font-size-xl);
                    cursor: pointer;
                }
                .trade-form {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    margin-top: var(--spacing-md);
                }
                .trade-summary {
                    background: rgba(0, 0, 0, 0.2);
                    padding: var(--spacing-md);
                    border-radius: var(--border-radius-md);
                }
            </style>
        `;
    },

    renderStockRow(stock, quantity) {
        return `
            <div class="stock-item">
                <div class="stock-info">
                    <div class="stock-symbol" style="color: ${stock.color}">${stock.symbol}</div>
                    <div>
                        <div>${stock.name}</div>
                        <div class="stock-name">${quantity > 0 ? `${quantity} shares owned` : 'No position'}</div>
                    </div>
                </div>
                <div class="stock-price-info">
                    <div class="stock-price">$${stock.currentPrice.toFixed(2)}</div>
                    <div class="stat-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                        ${stock.change >= 0 ? '+' : ''}${stock.changePercent}%
                    </div>
                </div>
                <div class="stock-actions">
                    <button class="btn btn-sm btn-success trade-btn" data-action="buy" data-symbol="${stock.symbol}">Buy</button>
                    <button class="btn btn-sm btn-danger trade-btn" data-action="sell" data-symbol="${stock.symbol}" ${quantity === 0 ? 'disabled' : ''}>Sell</button>
                </div>
            </div>
        `;
    },

    renderTradeModal(symbol, action) {
        const stock = StockData.getStock(symbol);
        stock.currentPrice = StockData.getCurrentPrice(symbol); // Ensure fresh price
        const portfolio = Storage.getPortfolio();
        const owned = portfolio.stocks[symbol] || 0;
        const maxBuy = Math.floor(portfolio.cash / stock.currentPrice);

        return `
            <div class="trade-header">
                <h3 style="color: ${stock.color}">${stock.symbol} - ${stock.name}</h3>
                <div class="mt-1">$${stock.currentPrice.toFixed(2)}</div>
            </div>
            
            <div class="trade-form">
                <div class="form-group">
                    <label>Action: <strong>${action.toUpperCase()}</strong></label>
                </div>
                
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" id="trade-quantity" min="1" max="${action === 'buy' ? maxBuy : owned}" value="1" class="form-input">
                    <div class="text-muted text-sm mt-1">
                        ${action === 'buy' ? `Max buy: ${maxBuy} shares` : `Owned: ${owned} shares`}
                    </div>
                </div>
                
                <div class="trade-summary">
                    <div class="flex justify-between">
                        <span>Total Cost:</span>
                        <span id="trade-total">$${stock.currentPrice.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between mt-1">
                        <span>New Cash Balance:</span>
                        <span id="trade-new-balance">
                            $${(action === 'buy' ? portfolio.cash - stock.currentPrice : portfolio.cash + stock.currentPrice).toFixed(2)}
                        </span>
                    </div>
                </div>
                
                <button id="confirm-trade" class="btn btn-${action === 'buy' ? 'success' : 'danger'} btn-lg">
                    Confirm ${action.toUpperCase()}
                </button>
            </div>
            
            <style>
                .form-input {
                    width: 100%;
                    padding: var(--spacing-sm);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid var(--color-border);
                    border-radius: var(--border-radius-md);
                    color: white;
                    font-size: var(--font-size-lg);
                }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
            </style>
        `;
    },

    attachEventListeners() {
        // Open Trade Modal
        document.querySelectorAll('.trade-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const symbol = e.currentTarget.dataset.symbol;
                const action = e.currentTarget.dataset.action;
                this.openTradeModal(symbol, action);
            });
        });

        // Close Modal
        document.querySelector('.close-modal')?.addEventListener('click', () => {
            document.getElementById('trade-modal').classList.add('hidden');
        });

        // Close on outside click
        window.onclick = (event) => {
            const modal = document.getElementById('trade-modal');
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        };
    },

    openTradeModal(symbol, action) {
        const modal = document.getElementById('trade-modal');
        const body = document.getElementById('modal-body');
        const title = document.getElementById('modal-title');

        title.textContent = `${action === 'buy' ? 'Buy' : 'Sell'} Stock`;
        body.innerHTML = this.renderTradeModal(symbol, action);
        modal.classList.remove('hidden');

        // Input listeners
        const input = document.getElementById('trade-quantity');
        const totalDisplay = document.getElementById('trade-total');
        const balanceDisplay = document.getElementById('trade-new-balance');
        const confirmBtn = document.getElementById('confirm-trade');
        const stock = StockData.getStock(symbol);
        const portfolio = Storage.getPortfolio();

        input.addEventListener('input', () => {
            const qty = parseInt(input.value) || 0;
            const total = qty * stock.currentPrice;
            totalDisplay.textContent = `$${total.toFixed(2)}`;

            const newBalance = action === 'buy' ? portfolio.cash - total : portfolio.cash + total;
            balanceDisplay.textContent = `$${newBalance.toFixed(2)}`;

            // Validation
            if (qty <= 0) confirmBtn.disabled = true;
            else if (action === 'buy' && total > portfolio.cash) confirmBtn.disabled = true;
            else if (action === 'sell' && qty > (portfolio.stocks[symbol] || 0)) confirmBtn.disabled = true;
            else confirmBtn.disabled = false;
        });

        // Confirm Trade
        confirmBtn.addEventListener('click', () => {
            const qty = parseInt(input.value);
            this.executeTrade(symbol, action, qty, stock.currentPrice);
            modal.classList.add('hidden');
            App.render(); // Refresh view
            App.showToast(`Successfully ${action === 'buy' ? 'bought' : 'sold'} ${qty} shares of ${symbol}`, 'success');
        });
    },

    executeTrade(symbol, action, quantity, price) {
        const portfolio = Storage.getPortfolio();
        const total = quantity * price;

        if (action === 'buy') {
            portfolio.cash -= total;
            portfolio.stocks[symbol] = (portfolio.stocks[symbol] || 0) + quantity;
        } else {
            portfolio.cash += total;
            portfolio.stocks[symbol] = (portfolio.stocks[symbol] || 0) - quantity;
            // Remove if 0
            if (portfolio.stocks[symbol] <= 0) delete portfolio.stocks[symbol];
        }

        // Add transaction record
        portfolio.transactions.push({
            type: action,
            symbol,
            quantity,
            price,
            date: new Date().toISOString()
        });

        Storage.updatePortfolio(portfolio);

        // Check achievements
        if (action === 'buy') {
            Gamification.checkAndAwardBadge('investor');
            if (Object.keys(portfolio.stocks).length >= 5) {
                Gamification.checkAndAwardBadge('diversified');
            }
        }
    }
};
