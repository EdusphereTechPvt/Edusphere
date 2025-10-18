import React from 'react';

const Loader = ({ config }) => {
  const defaultConfig = [
    {
      type: 'rectangle',
      className: 'h-16 bg-gray-300 rounded w-full mb-6',
    },
    {
      type: 'grid',
      className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-6',
      items: [
        { type: 'rectangle', className: 'h-64 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-64 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-64 bg-gray-300 rounded' },
      ],
    },
    {
      type: 'list',
      className: 'space-y-4',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-3/4' },
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2' },
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-5/6' },
      ],
    },
  ];

  const LoaderConfig = config || defaultConfig;

  const renderLoader = (item) => {
    switch (item.type) {
      case 'rectangle':
        return <div className={item.className}></div>;
      case 'grid':
        return (
          <div className={item.className}>
            {item.items.map((subItem, idx) => (
              <div key={idx}>{renderLoader(subItem)}</div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className={item.className}>
            {item.items.map((subItem, idx) => (
              <div key={idx}>{renderLoader(subItem)}</div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 animate-pulse p-6">
      <div className="max-w-7xl mx-auto">
        {LoaderConfig.map((item, idx) => (
          <div key={idx}>{renderLoader(item)}</div>
        ))}
      </div>
    </div>
  );
};

export default Loader;