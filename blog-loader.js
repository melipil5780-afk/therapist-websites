// Blog Loader for Cloudflare Pages
document.addEventListener('DOMContentLoaded', function() {
  const blogContainer = document.getElementById('blog-posts-container');
  
  if (!blogContainer) return;
  
  // Fetch blog posts
  fetchBlogPosts();
  
  async function fetchBlogPosts() {
    try {
      // First, try to get from API
      const response = await fetch('/api/blog-posts');
      
      if (response.ok) {
        const posts = await response.json();
        renderBlogPosts(posts);
      } else {
        // Fallback: Use local posts
        loadLocalPosts();
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      loadLocalPosts();
    }
  }
  
  function loadLocalPosts() {
    // This would be your backup if API fails
    // For now, we'll show a message
    blogContainer.innerHTML = `
      <div class="no-posts" style="grid-column: 1 / -1; text-align: center; padding: 60px;">
        <p>Blog posts coming soon. Check back later!</p>
      </div>
    `;
  }
  
  function renderBlogPosts(posts) {
    if (!posts || posts.length === 0) {
      loadLocalPosts();
      return;
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Take only first 3 for homepage
    const recentPosts = posts.slice(0, 3);
    
    let html = '';
    
    recentPosts.forEach(post => {
      // Format date
      const postDate = new Date(post.date);
      const formattedDate = postDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Create slug from title
      const slug = post.title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      html += `
        <div class="blog-card">
          <div class="blog-image">
            <img src="${post.image || '/images/blog/default.jpg'}" alt="${post.title}">
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span>${post.category || 'Insights'}</span>
              <span>•</span>
              <span>${formattedDate}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.excerpt || ''}</p>
            <a href="/blog/${slug}" class="read-more">
              Read Article <span class="arrow">→</span>
            </a>
          </div>
        </div>
      `;
    });
    
    blogContainer.innerHTML = html;
    
    // Re-initialize animations for new content
    if (typeof gsap !== 'undefined') {
      gsap.utils.toArray(".blog-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out"
        });
      });
    }
  }
});
