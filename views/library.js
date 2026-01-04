// Library View - Educational Resources
const LibraryView = {
    render() {
        const bookmarks = Storage.getBookmarks();

        return `
            <div class="library-container">
                <div class="flex justify-between align-center mb-4">
                    <h1 class="page-title">Resource Library 📚</h1>
                    <div class="search-box">
                        <input type="text" id="library-search" placeholder="Search topics..." class="search-input">
                    </div>
                </div>
                
                <div class="category-filters mb-4">
                    <button class="filter-btn active" data-filter="all">All</button>
                    ${ResourceLibrary.categories.map(cat => `
                        <button class="filter-btn" data-filter="${cat.id}">${cat.name}</button>
                    `).join('')}
                    <button class="filter-btn" data-filter="bookmarks">Bookmarks (${bookmarks.length})</button>
                </div>
                
                <div id="articles-grid" class="grid grid-3">
                    ${this.renderArticles(ResourceLibrary.articles)}
                </div>
            </div>
            
            <!-- Article Modal -->
            <div id="article-modal" class="modal hidden">
                <div class="modal-content glass-card article-content-wrapper">
                    <span class="close-modal">&times;</span>
                    <div id="article-body"></div>
                </div>
            </div>
            
            <style>
                .search-input {
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--border-radius-full);
                    border: 1px solid var(--color-border);
                    background: rgba(255,255,255,0.1);
                    color: white;
                    width: 250px;
                }
                .category-filters {
                    display: flex;
                    gap: var(--spacing-sm);
                    overflow-x: auto;
                    padding-bottom: var(--spacing-sm);
                }
                .filter-btn {
                    padding: var(--spacing-xs) var(--spacing-md);
                    border-radius: var(--border-radius-full);
                    border: 1px solid var(--color-border);
                    background: transparent;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all var(--transition-base);
                }
                .filter-btn.active, .filter-btn:hover {
                    background: var(--color-primary);
                    color: white;
                    border-color: var(--color-primary);
                }
                .article-card {
                    cursor: pointer;
                    transition: all var(--transition-base);
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .article-card:hover {
                    transform: translateY(-5px);
                    background: rgba(255,255,255,0.08);
                }
                .article-meta {
                    display: flex;
                    justify-content: space-between;
                    margin-top: auto;
                    padding-top: var(--spacing-md);
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                }
                .article-content-wrapper {
                    max-width: 800px;
                    max-height: 85vh;
                    overflow-y: auto;
                    padding: var(--spacing-xl);
                }
                .article-full-content {
                    line-height: 1.8;
                }
                .article-full-content h2 {
                    margin-top: var(--spacing-lg);
                    margin-bottom: var(--spacing-sm);
                    color: var(--color-primary-light);
                }
                .article-full-content ul {
                    margin-left: var(--spacing-lg);
                    margin-bottom: var(--spacing-md);
                }
                .article-full-content li {
                    margin-bottom: var(--spacing-xs);
                }
            </style>
        `;
    },

    renderArticles(articles) {
        if (articles.length === 0) {
            return '<div class="col-span-3 text-center py-5">No articles found matching your criteria.</div>';
        }

        const bookmarks = Storage.getBookmarks();

        return articles.map(article => {
            const category = ResourceLibrary.categories.find(c => c.id === article.category);
            const isBookmarked = bookmarks.includes(article.id);

            return `
                <div class="article-card card" data-id="${article.id}">
                    <div class="flex justify-between mb-2">
                        <span class="badge" style="background: ${category.color}40; border-color: ${category.color}">${category.name}</span>
                        ${isBookmarked ? '<span>🔖</span>' : ''}
                    </div>
                    <h3 class="mb-2">${article.title}</h3>
                    <p class="text-muted mb-3">${article.summary}</p>
                    <div class="article-meta">
                        <span>${article.readTime} min read</span>
                        <span>Read More →</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    attachEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const filter = e.currentTarget.dataset.filter;
                let articles;

                if (filter === 'all') {
                    articles = ResourceLibrary.articles;
                } else if (filter === 'bookmarks') {
                    const bookmarks = Storage.getBookmarks();
                    articles = ResourceLibrary.articles.filter(a => bookmarks.includes(a.id));
                } else {
                    articles = ResourceLibrary.getArticlesByCategory(filter);
                }

                document.getElementById('articles-grid').innerHTML = this.renderArticles(articles);
                this.attachArticleListeners();
            });
        });

        // Search
        document.getElementById('library-search')?.addEventListener('input', (e) => {
            const query = e.target.value;
            const articles = ResourceLibrary.searchArticles(query);
            document.getElementById('articles-grid').innerHTML = this.renderArticles(articles);
            this.attachArticleListeners();
        });

        this.attachArticleListeners();

        // Close modal
        document.querySelector('.close-modal')?.addEventListener('click', () => {
            document.getElementById('article-modal').classList.add('hidden');
        });
    },

    attachArticleListeners() {
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.openArticle(id);
            });
        });
    },

    openArticle(id) {
        const article = ResourceLibrary.getArticle(id);
        const modal = document.getElementById('article-modal');
        const body = document.getElementById('article-body');
        const bookmarks = Storage.getBookmarks();
        const isBookmarked = bookmarks.includes(id);

        // Format content (simple markdown parser)
        let formattedContent = article.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/•/g, '<br>•');

        body.innerHTML = `
            <div class="flex justify-between align-center mb-4">
                <span class="badge badge-primary">${article.readTime} min read</span>
                <button id="toggle-bookmark" class="btn btn-sm btn-outline">
                    ${isBookmarked ? 'Remove Bookmark 🔖' : 'Bookmark This 🏷️'}
                </button>
            </div>
            
            <h1 class="mb-4">${article.title}</h1>
            
            <div class="article-full-content">
                ${formattedContent}
            </div>
            
            <div class="mt-4 pt-4 border-top text-center">
                <p>Did you learn something new?</p>
                <button id="finish-reading" class="btn btn-success mt-2">I finished reading!</button>
            </div>
        `;

        modal.classList.remove('hidden');

        // Bookmark toggle
        document.getElementById('toggle-bookmark').addEventListener('click', () => {
            Storage.toggleBookmark(id);
            this.openArticle(id); // Re-render to update button
            App.render(); // Update grid if showing bookmarks
        });

        // Finish reading
        document.getElementById('finish-reading').addEventListener('click', () => {
            Gamification.checkAndAwardBadge('bookworm');
            modal.classList.add('hidden');
            App.showToast('Article completed! +10 XP', 'success');
            Gamification.awardXP(10);
            App.render();
        });
    }
};
