// Cloudflare Pages Function to serve blog posts
export async function onRequest(context) {
  try {
    // In a real setup, you'd fetch from GitHub API or database
    // For now, we'll return sample data or read from files
    
    const posts = [
      {
        title: "Breaking Chains of Limitation",
        date: "2024-03-20T10:00:00",
        category: "Transformation",
        image: "/images/blog/breaking-chains.jpg",
        excerpt: "Exploring how we create invisible boundaries that keep us from our true potential...",
        body: "# Full article content..."
      },
      {
        title: "The Wings of Self-Discovery",
        date: "2024-03-15T10:00:00",
        category: "Self-Discovery",
        image: "/images/blog/wings-discovery.jpg",
        excerpt: "How experiential therapy helps uncover the parts of ourselves that have been hidden...",
        body: "# Full article content..."
      }
    ];
    
    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
