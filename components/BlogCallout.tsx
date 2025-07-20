import React from 'react';

interface BlogCalloutProps {
  type: 'tip' | 'warning' | 'success' | 'info';
  title?: string;
  children: React.ReactNode;
}

const BlogCallout: React.FC<BlogCalloutProps> = ({ type, title, children }) => {
  const getIcon = () => {
    switch (type) {
      case 'tip':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'success':
        return '🏆';
      case 'info':
        return 'ℹ️';
      default:
        return '💡';
    }
  };

  const getTitle = () => {
    if (title) return title;
    switch (type) {
      case 'tip':
        return 'Pro Tip';
      case 'warning':
        return 'Warning';
      case 'success':
        return 'Success Story';
      case 'info':
        return 'Did You Know?';
      default:
        return 'Tip';
    }
  };

  return (
    <div className={`callout callout-${type} my-8`}>
      <div className="callout-title">
        <span className="text-2xl">{getIcon()}</span>
        <span>{getTitle()}</span>
      </div>
      <div className="text-gray-800 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default BlogCallout; 