import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllPosts, getAllTags, BlogPost } from '../../lib/blog';
import SEOHead from '../../components/SEOHead';
import { GetStaticProps } from 'next';

interface BlogIndexProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogIndex({ posts, tags }: BlogIndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTag, posts]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
  };

  return (
    <>
      <SEOHead
        title="Blog – Productivity Tips & Tool Guides | Zaptools"
        description="Read the latest productivity tips, tool guides, and updates from Zaptools. Discover how to get the most out of our free online tools."
        url="https://zaptools.tech/blog"
        type="blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Zaptools Blog",
          "description": "Productivity tips, tool guides, and updates from Zaptools.",
          "url": "https://zaptools.tech/blog"
        }}
      />

      <Header />

      <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">📝</span>
            </div>
            <h1 className="text-5xl font-black mb-4 text-gray-900">
              ZapTools <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Tutorials, tips, and insights to help you make the most of our free online tools.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Posts
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by title, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Tag Filter */}
              <div className="lg:w-64">
                <label htmlFor="tag-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Tag
                </label>
                <select
                  id="tag-filter"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedTag) && (
                <div className="lg:w-auto">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 opacity-0">
                    Clear
                  </label>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {/* Featured Image */}
                  {post.image && (
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-none"
                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>👤 {post.author}</span>
                      </div>
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'MMMM dd, yyyy')}
                      </time>
                    </div>

                    {/* Read More */}
                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No posts found</h2>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = getAllPosts();
  const tags = getAllTags();

  return {
    props: {
      posts,
      tags,
    },
  };
}; 