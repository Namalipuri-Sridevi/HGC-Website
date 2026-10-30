import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogs.ts';

interface BlogViewProps {
  onNavigateToProducts: () => void;
  onNavigateToContact: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigateToProducts,
  onNavigateToContact,
}) => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <div className="bg-[#fafbf9] min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="mb-12">
          <div className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#10873a] mb-2">
            TECHNICAL KNOWLEDGE &bull; CHEMICAL CONSULTING
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
            Dyeing Chemistry &amp; <span className="text-[#10873a]">Technical Guides</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            In-depth industrial articles on dyestuff synthesis, covalent bonding kinetics, auxiliary mechanisms, and factory troubleshooting from the technical desk of H. Gokaldas &amp; Co.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group bg-white rounded-2xl border border-stone-200/90 hover:border-[#10873a] p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Badge and read time */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#10873a] rounded-md">
                    {post.coverBadge}
                  </span>
                  <span className="text-[11px] font-medium text-stone-400">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug mb-3 line-clamp-2">
                  {post.title}
                </h2>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-800 block">
                    {post.author}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {post.date}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#10873a] group-hover:text-[#135d26] transition-colors">
                  Read Article
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Inquiry Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-2">
              Have a custom factory dyeing or shade matching query?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our technical chemists assist with batch recipe calculation, fastness compliance, and bulk sample trials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToContact}
              className="px-6 py-2.5 bg-[#1b7a33] hover:bg-[#135d26] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-xs cursor-pointer transition-colors"
            >
              Contact Technical Desk
            </button>
            <button
              onClick={onNavigateToProducts}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-colors"
            >
              Explore Catalog
            </button>
          </div>
        </div>

      </div>

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-10 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              aria-label="Close article"
            >
              &times;
            </button>

            {/* Header info */}
            <div className="mb-6 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#10873a] rounded">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-stone-400">&bull;</span>
                <span className="text-xs text-stone-500 font-medium">
                  {activeArticle.readTime}
                </span>
                <span className="text-xs text-stone-400">&bull;</span>
                <span className="text-xs text-stone-500">
                  {activeArticle.date}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                {activeArticle.title}
              </h1>

              <div className="mt-3 text-xs text-stone-500">
                By <strong className="text-stone-800">{activeArticle.author}</strong> ({activeArticle.role})
              </div>
            </div>

            {/* Technical Parameters Table if available */}
            {activeArticle.technicalParameters && activeArticle.technicalParameters.length > 0 && (
              <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/90 mb-8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-800 mb-3">
                  Industrial Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeArticle.technicalParameters.map((param, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-stone-200/60 pr-2">
                      <span className="text-stone-500 font-medium">{param.label}</span>
                      <span className="text-stone-900 font-bold">{param.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/70 mb-8">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 mb-2">
                Key Processing Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                {activeArticle.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#10873a] font-bold mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed mb-8">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer action buttons */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Close Reader
              </button>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  onNavigateToContact();
                }}
                className="px-6 py-2.5 rounded-full bg-[#1b7a33] hover:bg-[#135d26] text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Inquire on this Formulation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
