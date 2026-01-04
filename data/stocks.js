// Stock Data for Paper Trading
const StockData = {
    stocks: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            sector: 'Technology',
            description: 'Technology company known for iPhone, Mac, and other consumer electronics',
            basePrice: 175.50,
            volatility: 0.02, // 2% daily volatility
            color: '#A3AAAE',
            about: 'Apple designs, manufactures, and markets smartphones, computers, tablets, and more. It\'s one of the world\'s most valuable companies.'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            sector: 'Technology',
            description: 'Software, cloud computing, and gaming company',
            basePrice: 380.75,
            volatility: 0.018,
            color: '#00A4EF',
            about: 'Microsoft makes Windows, Office, Xbox, and Azure cloud services. It\'s a leader in software and cloud computing.'
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc. (Google)',
            sector: 'Technology',
            description: 'Internet services, advertising, and technology company',
            basePrice: 140.25,
            volatility: 0.022,
            color: '#4285F4',
            about: 'Google\'s parent company, Alphabet, runs the search engine, YouTube, Android, and cloud services. It dominates online advertising.'
        },
        {
            symbol: 'AMZN',
            name: 'Amazon.com Inc.',
            sector: 'E-commerce & Cloud',
            description: 'E-commerce, cloud computing, and digital streaming company',
            basePrice: 155.80,
            volatility: 0.025,
            color: '#FF9900',
            about: 'Amazon is the world\'s largest online retailer and also provides cloud computing services (AWS) used by many businesses.'
        },
        {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            sector: 'Automotive',
            description: 'Electric vehicles, battery energy storage, and solar panels',
            basePrice: 242.50,
            volatility: 0.04, // More volatile
            color: '#E82127',
            about: 'Tesla makes electric cars and renewable energy products. It\'s led innovation in the electric vehicle market.'
        }
    ],

    // Price history management (simulated)
    priceHistory: {},

    // Initialize price history for a stock
    initializePriceHistory(symbol) {
        if (!this.priceHistory[symbol]) {
            const stock = this.stocks.find(s => s.symbol === symbol);
            this.priceHistory[symbol] = [{
                date: new Date().toISOString(),
                price: stock.basePrice,
                change: 0,
                changePercent: 0
            }];
        }
    },

    // Generate new price based on volatility
    generatePrice(symbol) {
        const stock = this.stocks.find(s => s.symbol === symbol);
        if (!stock) return null;

        this.initializePriceHistory(symbol);
        const lastPrice = this.getCurrentPrice(symbol);

        // Random walk: price change based on volatility
        const changePercent = (Math.random() - 0.5) * 2 * stock.volatility;
        const change = lastPrice * changePercent;
        const newPrice = Math.max(lastPrice + change, stock.basePrice * 0.5); // Prevent going too low

        const priceData = {
            date: new Date().toISOString(),
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat((changePercent * 100).toFixed(2))
        };

        this.priceHistory[symbol].push(priceData);

        // Keep only last 100 prices
        if (this.priceHistory[symbol].length > 100) {
            this.priceHistory[symbol].shift();
        }

        return priceData;
    },

    // Get current price
    getCurrentPrice(symbol) {
        this.initializePriceHistory(symbol);
        const history = this.priceHistory[symbol];
        return history[history.length - 1].price;
    },

    // Get stock by symbol
    getStock(symbol) {
        return this.stocks.find(s => s.symbol === symbol);
    },

    // Get all stocks with current prices
    getAllStocksWithPrices() {
        return this.stocks.map(stock => {
            this.initializePriceHistory(stock.symbol);
            const currentPrice = this.getCurrentPrice(stock.symbol);
            const history = this.priceHistory[stock.symbol];
            const lastUpdate = history[history.length - 1];

            return {
                ...stock,
                currentPrice,
                change: lastUpdate.change,
                changePercent: lastUpdate.changePercent
            };
        });
    },

    // Simulate market update (call this periodically)
    updateMarket() {
        this.stocks.forEach(stock => {
            this.generatePrice(stock.symbol);
        });
    },

    // Get price history for a stock
    getPriceHistory(symbol, count = 30) {
        this.initializePriceHistory(symbol);
        const history = this.priceHistory[symbol];
        return history.slice(-count);
    }
};

// Initialize all stocks with base prices
StockData.stocks.forEach(stock => {
    StockData.initializePriceHistory(stock.symbol);
});
