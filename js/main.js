// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Here you would typically send this to a server
            console.log('Form submitted:', Object.fromEntries(formData));
            alert('Message sent! (Demo only)');
            contactForm.reset();
        });
    }

    // Blog post loading
    const postGrid = document.querySelector('.post-grid');
    if (postGrid) {
        loadBlogPosts();
    }
});

// Function to load blog posts
async function loadBlogPosts(page = 1) {
    const posts = [
        {
            title: 'First Blog Post',
            date: '2024-01-01',
            excerpt: 'This is my first blog post...',
            tags: ['intro', 'welcome']
        },
        // Add more posts here
    ];

    const postGrid = document.querySelector('.post-grid');
    postGrid.innerHTML = '';

    posts.forEach(post => {
        const postElement = createPostElement(post);
        postGrid.appendChild(postElement);
    });
}

// Function to create post elements
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.innerHTML = `
        <h2>${post.title}</h2>
        <div class="post-meta">
            <time>${new Date(post.date).toLocaleDateString()}</time>
        </div>
        <p>${post.excerpt}</p>
        <div class="tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    return article;
}
