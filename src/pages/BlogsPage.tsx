import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { blogCategories } from '@/data/blogData';
import { ArrowRight } from 'lucide-react';

const BlogsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* AI Background */}
      <div className="ai-background" />
      
      {/* Navy overlay for content visibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/90 z-[-1]" />
      
      <Header />
      
      <main className="flex-1 pt-28 pb-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Insights & <span className="text-amber-300">Resources</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Expert insights on AI, technology, and digital transformation for Singapore businesses
            </p>
          </div>

          {/* Blog Categories Grid */}
          <div className="grid gap-8">
            {blogCategories.map((category) => (
              <div key={category.id} className="glass-card rounded-2xl p-6 md:p-8">
                {/* Category Header */}
                <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-6 pb-3 border-b border-white/20">
                  {category.name}
                </h2>
                
                {/* Blog Posts Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.posts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block p-4 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-300/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                    >
                      <h3 className="text-white font-medium text-sm md:text-base leading-snug group-hover:text-amber-300 transition-colors duration-300 line-clamp-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center mt-3 text-amber-300/70 group-hover:text-amber-300 transition-colors">
                        <span className="text-xs font-medium">Read more</span>
                        <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center text-white/60 text-sm">
        <p>&copy; {new Date().getFullYear()} iSparks Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogsPage;
