import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllPostSlugs, getPostBySlug, getAllPosts, BlogPost } from '../../lib/blog';
import SEOHead from '../../components/SEOHead';

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostPage({ post, relatedPosts }: BlogPostProps) {
  // Table of Contents generation
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (contentRef.current) {
      const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      setToc(
        headings.map((el) => ({
          id: el.id,
          text: el.textContent || '',
          level: el.tagName === 'H2' ? 2 : 3,
        }))
      );
    }
  }, [post.content]);

  const words = post.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt || ''}
        url={`https://zaptools.tech/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        author={post.author}
        tags={post.tags}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt || '',
          "author": { "@type": "Person", "name": post.author },
          "datePublished": post.date,
          "image": post.image || "https://zaptools.tech/og-image.png",
          "mainEntityOfPage": `https://zaptools.tech/blog/${post.slug}`
        }}
      />

      <Header />

      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Table of Contents (sticky on desktop) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-32 self-start bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit">
              <h2 className="text-lg font-bold mb-4 text-blue-700">On this page</h2>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={
                      item.level === 2
                        ? 'font-semibold text-gray-800'
                        : 'ml-4 text-gray-700'
                    }
                  >
                    <a
                      href={`#${item.id}`}
                      className="hover:text-blue-700 transition-colors duration-200"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <main className="flex-1">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600 transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-900 font-medium truncate">{post.title}</li>
              </ol>
            </nav>

            {/* Article */}
            <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
              {/* Sticky Share Buttons */}
              <div className="hidden lg:flex flex-col gap-3 absolute left-[-60px] top-16 z-10">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://zaptools.tech/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 shadow-lg transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 7.477l-4.79 6.37-4.79-6.37H2.5l6.5 8.5-6.5 8.5h5.45l4.8-6.37 4.8 6.37h5.45l-6.5-8.5 6.5-8.5z" /></svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://zaptools.tech/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 shadow-lg transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
              {/* Header */}
              <div className="p-8 border-b border-gray-100">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full hover:bg-blue-200 transition-colors duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
                )}

                {/* Meta */}
                <section className="mb-8 text-gray-600 text-sm flex gap-4 items-center">
                  <span>By <strong>{post.author}</strong></span>
                  <span>•</span>
                  <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                  <span>•</span>
                  <span>{readTime} min read</span>
                </section>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden" style={{ maxHeight: '400px' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="max-h-96 w-auto object-contain"
                    style={{ margin: '0 auto', background: '#f8fafc' }}
                  />
                </div>
              )}

              {/* Content with enhanced prose and callouts */}
              <div className="p-8">
                <div
                  ref={contentRef}
                  className="blog-content prose prose-lg max-w-none 
                    prose-headings:scroll-mt-20 prose-headings:text-gray-900 prose-headings:font-bold 
                    prose-h1:text-4xl prose-h1:font-black prose-h1:mb-8 prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-r prose-h1:from-blue-600 prose-h1:to-purple-600
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-700
                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-800
                    prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                    prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-blue-800 prose-a:border-b-2 prose-a:border-blue-200 hover:prose-a:border-blue-600 prose-a:transition-all prose-a:duration-300
                    prose-strong:text-gray-900 prose-strong:font-bold prose-strong:text-lg
                    prose-em:text-gray-800 prose-em:italic
                    prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-3 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-gray-200
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-6
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-6
                    prose-li:text-gray-700 prose-li:leading-relaxed
                    prose-hr:border-gray-300 prose-hr:my-12
                    prose-table:border-collapse prose-table:w-full prose-table:my-8
                    prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-900
                    prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-figure:my-8
                    prose-figcaption:text-center prose-figcaption:text-gray-500 prose-figcaption:text-sm prose-figcaption:mt-2
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                    [&_blockquote]:not-italic
                    [&_blockquote_p]:text-gray-800 [&_blockquote_p]:font-medium [&_blockquote_p]:text-lg
                    [&_blockquote_strong]:text-blue-700 [&_blockquote_strong]:font-bold
                    [&_ul_li]:marker:text-blue-500 [&_ul_li]:marker:font-bold
                    [&_ol_li]:marker:text-blue-500 [&_ol_li]:marker:font-bold
                    [&_table]:shadow-md [&_table]:rounded-lg [&_table]:overflow-hidden
                    [&_thead]:bg-gradient-to-r [&_thead]:from-blue-50 [&_thead]:to-purple-50
                    [&_tbody_tr:nth-child(even)]:bg-gray-50
                    [&_tbody_tr:hover]:bg-blue-50 [&_tbody_tr:hover]:transition-colors [&_tbody_tr:hover]:duration-200
                    [&_code]:before:content-[''] [&_code]:after:content-['']
                    [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0
                    [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-20
                    [&_p:has(>_strong:first-child)]:text-lg [&_p:has(>_strong:first-child)]:font-medium
                    [&_p:has(>_em:first-child)]:text-lg [&_p:has(>_em:first-child)]:font-medium"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {/* Author Box */}
                <div className="mt-12 flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 shadow">
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-700">{post.author}</div>
                    <div className="text-gray-500 text-sm">Author</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Share this post:</span>
                    <div className="flex gap-2">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://zaptools.tech/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.53 7.477l-4.79 6.37-4.79-6.37H2.5l6.5 8.5-6.5 8.5h5.45l4.8-6.37 4.8 6.37h5.45l-6.5-8.5 6.5-8.5z" />
                        </svg>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://zaptools.tech/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
                  >
                    ← Back to Blog
                  </Link>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.slice(0, 3).map((relatedPost) => (
                      <article
                        key={relatedPost.slug}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                      >
                        <div className="p-6">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {relatedPost.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            <Link href={`/blog/${relatedPost.slug}`}>
                              {relatedPost.title}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                            {relatedPost.description}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{relatedPost.author}</span>
                            <time dateTime={relatedPost.date}>
                              {format(new Date(relatedPost.date), 'MMM dd, yyyy')}
                            </time>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Internal Links Section */}
              <section className="mt-12 border-t pt-8">
                <h3 className="text-lg font-bold mb-2">Related Tools</h3>
                <ul className="list-disc list-inside">
                  <li><a href="/tools/word-counter" className="text-blue-600 hover:underline">Word Counter</a></li>
                  <li><a href="/tools/color-palette-generator" className="text-blue-600 hover:underline">Color Palette Generator</a></li>
                  <li><a href="/tools/pdf-merger-splitter" className="text-blue-600 hover:underline">PDF Merger & Splitter</a></li>
                </ul>
              </section>
            </article>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs();
  
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  
  // Get related posts (same tags, excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}; 