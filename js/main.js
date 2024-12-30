document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle with localStorage persistence
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = localStorage.getItem('darkMode') === 'true' ? '☀️' : '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(darkModeToggle);

    // Set initial dark mode state
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDarkMode);
    });

    // ... existing contact form code ...

    // Blog post loading with error handling
    const postGrid = document.querySelector('.post-grid');
    if (postGrid) {
        loadBlogPosts().catch(error => {
            console.error('Error loading blog posts:', error);
            postGrid.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
        });
    }
});

async function loadBlogPosts(page = 1) {
    const postGrid = document.querySelector('.post-grid');
    postGrid.innerHTML = '<p>Loading posts...</p>';

    try {
        const posts = [
            {
                title: 'First Blog Post',
                date: '2024-01-01',
                excerpt: 'This is my first blog post...',
                tags: ['intro', 'welcome']
            },
            // Add more posts here
        ];

        postGrid.innerHTML = '';
        posts.forEach(post => {
            const postElement = createPostElement(post);
            postGrid.appendChild(postElement);
        });
    } catch (error) {
        throw new Error('Failed to load blog posts');
    }
}

function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    
    // Sanitize content to prevent XSS
    const sanitizeHTML = str => str.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);

    article.innerHTML = `
        <h2>${sanitizeHTML(post.title)}</h2>
        <div class="post-meta">
            <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
        </div>
        <p>${sanitizeHTML(post.excerpt)}</p>
        <div class="tags" aria-label="Post tags">
            ${post.tags.map(tag => `<span class="tag">${sanitizeHTML(tag)}</span>`).join('')}
        </div>
    `;
    return article;
}
