import { useParams, Link, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPostBySlug, blogCategories } from '@/data/blogData';
import { ArrowLeft, Tag, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

// Import blog images
import chatbotSingapore from '@/assets/blog/chatbot-singapore.png';
import documentAutomation from '@/assets/blog/document-automation.png';
import websiteDevelopment from '@/assets/blog/website-development.png';
import appDevelopment from '@/assets/blog/app-development.png';
import semiconductor from '@/assets/blog/semiconductor.png';
import roiAnalytics from '@/assets/blog/roi-analytics.png';
import dataSecurity from '@/assets/blog/data-security.png';
import digitalTransformation from '@/assets/blog/digital-transformation.png';

// Image mapping
const blogImages: Record<string, string> = {
  'chatbot-singapore': chatbotSingapore,
  'document-automation': documentAutomation,
  'website-development': websiteDevelopment,
  'app-development': appDevelopment,
  'semiconductor': semiconductor,
  'roi-analytics': roiAnalytics,
  'data-security': dataSecurity,
  'digital-transformation': digitalTransformation,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  // Find related posts from the same category
  const category = blogCategories.find(cat => cat.slug === post.categorySlug);
  const relatedPosts = category?.posts.filter(p => p.id !== post.id).slice(0, 3) || [];

  // Get the featured image
  const featuredImage = blogImages[post.featuredImage] || chatbotSingapore;

  // Process content to add images after H2 sections
  const processedContent = formatContentWithImages(post.content, post.categorySlug);

  return (
    <>
      <Helmet>
        <title>{post.title} | iSparks Technologies</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <link rel="canonical" href={`https://isparks.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://isparks.com/blog/${post.slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "keywords": post.keywords.join(', '),
            "author": {
              "@type": "Organization",
              "name": "iSparks Technologies"
            },
            "publisher": {
              "@type": "Organization",
              "name": "iSparks Technologies"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* AI Background */}
        <div className="ai-background" />
        
        {/* Navy overlay for content visibility */}
        <div className="fixed inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/90 z-[-1]" />
        
        <Header />
        
        <main className="flex-1 pt-28 pb-16">
          <article className="container mx-auto max-w-4xl px-4 lg:px-8">
            {/* Back Link */}
            <ScrollAnimation animation="fade-in">
              <Link 
                to="/blogs" 
                className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
              </Link>
            </ScrollAnimation>

            {/* Article Header */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-amber-300/20 text-amber-300 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                  {post.title}
                </h1>
                <p className="text-white/70 text-lg">
                  {post.excerpt}
                </p>
              </header>
            </ScrollAnimation>

            {/* Featured Image */}
            <ScrollAnimation animation="scale" delay={200}>
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={featuredImage} 
                  alt={post.title}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </ScrollAnimation>

            {/* Article Content */}
            <ScrollAnimation animation="fade-up" delay={300}>
              <div className="glass-card rounded-2xl p-6 md:p-10 mb-12">
                <div 
                  className="blog-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            </ScrollAnimation>

            {/* Keywords / Tags */}
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="flex flex-wrap items-center gap-2 mb-12">
                <Tag className="w-4 h-4 text-white/60" />
                {post.keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full hover:bg-white/20 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </ScrollAnimation>

            {/* CTA Section */}
            <ScrollAnimation animation="scale" delay={200}>
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center mb-12 border border-amber-300/20">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Talk to Our Singapore Team
                </h3>
                <p className="text-white/70 mb-6 max-w-xl mx-auto">
                  Ready to transform your business? Contact iSparks Technologies for a free consultation on implementing the solutions discussed in this article.
                </p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center btn-primary"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </ScrollAnimation>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <ScrollAnimation animation="fade-up" delay={300}>
                <section>
                  <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPosts.map((relatedPost, index) => (
                      <ScrollAnimation key={relatedPost.id} animation="fade-up" delay={index * 100}>
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                          className="group block p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-300/50 transition-all duration-300 h-full"
                        >
                          <h4 className="text-white font-medium text-sm leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center mt-3 text-amber-300/70 group-hover:text-amber-300 transition-colors">
                            <span className="text-xs font-medium">Read more</span>
                            <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      </ScrollAnimation>
                    ))}
                  </div>
                </section>
              </ScrollAnimation>
            )}
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

// Helper function to convert markdown-like content to HTML with styling and images
const formatContentWithImages = (content: string, categorySlug: string): string => {
  // Determine which image to use based on category
  const categoryImages: Record<string, string[]> = {
    'ai-chatbot': ['chatbot-singapore', 'roi-analytics', 'data-security', 'digital-transformation'],
    'doc-ai': ['document-automation', 'digital-transformation', 'roi-analytics'],
    'website-dev': ['website-development', 'roi-analytics', 'digital-transformation'],
    'app-dev': ['app-development', 'roi-analytics', 'digital-transformation'],
    'semiconductor': ['semiconductor', 'digital-transformation', 'roi-analytics'],
  };

  const images = categoryImages[categorySlug] || ['digital-transformation'];
  let imageIndex = 0;

  // First, process the basic markdown to HTML
  let html = content
    .replace(/^## (.*$)/gim, (match, p1) => {
      const imageName = images[imageIndex % images.length];
      imageIndex++;
      return `<h2 class="blog-h2">${p1}</h2><div class="blog-image-container"><img src="/blog-images/${imageName}.png" alt="${p1}" class="blog-section-image" loading="lazy" /></div>`;
    })
    .replace(/^### (.*$)/gim, '<h3 class="blog-h3">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.*$)/gim, '<li class="blog-li">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="blog-li-ordered">$1</li>')
    .split('\n\n')
    .map(paragraph => {
      // Skip if already a tag
      if (paragraph.trim().startsWith('<')) return paragraph;
      // Wrap plain text in paragraph
      if (paragraph.trim()) {
        return `<p class="blog-p">${paragraph.trim()}</p>`;
      }
      return '';
    })
    .join('\n');

  // Wrap consecutive list items
  html = html.replace(/(<li class="blog-li">.*?<\/li>\n?)+/g, '<ul class="blog-ul">$&</ul>');
  html = html.replace(/(<li class="blog-li-ordered">.*?<\/li>\n?)+/g, '<ol class="blog-ol">$&</ol>');

  return html;
};

export default BlogPost;
