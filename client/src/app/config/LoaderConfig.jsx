const LoaderConfig = {
  home: [
    {
      type: 'rectangle',
      className: 'h-screen bg-gray-300 rounded',
    },
  ],
  auth: [
    // Title
    {
      type: 'rectangle',
      className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4',
    },
    // Role selector
    {
      type: 'grid',
      className: 'grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6',
      items: [
        { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
      ],
    },
    // Form fields
    {
      type: 'list',
      className: 'space-y-4 mb-6',
      items: [
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
      ],
    },
    // Checkboxes
    {
      type: 'list',
      className: 'space-y-2 mb-6',
      items: [
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-3/4' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-2/3' },
      ],
    },
    // Button 
    {
      type: 'rectangle',
      className: 'h-10 bg-gray-300 rounded w-full',
    },
  ],
  about: [
    // Hero section
    {
      type: 'rectangle',
      className: 'h-screen bg-gray-300 rounded mb-16',
    },
    // Story section 
    {
      type: 'rectangle',
      className: 'h-32 bg-gray-300 rounded mb-16',
    },
    // Mission & Values section
    {
      type: 'list',
      className: 'space-y-8 mb-16',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-8' },
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
          items: [
            { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
          ],
        },
      ],
    },
    // Meet Our Team section
    {
      type: 'list',
      className: 'space-y-8 mb-16',
      items: [
        { type: 'rect', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4' },
        { type: 'rect', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-8' },
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
          items: [
            { type: 'rect', className: 'h-48 bg-gray-300 rounded' },
            { type: 'rect', className: 'h-48 bg-gray-300 rounded' },
            { type: 'rect', className: 'h-48 bg-gray-300 rounded' },
          ],
        },
      ],
    },
    // Impact & Statistics section 
    {
      type: 'list',
      className: 'space-y-8 mb-16',
      items: [
        { type: 'rect', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8' },
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-16',
          items: [
            { type: 'rect', className: 'h-32 bg-gray-300 rounded' },
            { type: 'rect', className: 'h-32 bg-gray-300 rounded' },
            { type: 'rect', className: 'h-32 bg-gray-300 rounded' },
          ],
        },
        { type: 'rect', className: 'h-64 bg-gray-300 rounded mb-16' },
        { type: 'rect', className: 'h-8 bg-gray-300 rounded w-1/3 mx-auto mb-8' },
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
          items: [
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
          ],
        },
      ],
    },
    // Request Demo section
    {
      type: 'rectangle',
      className: 'h-32 bg-gray-300 rounded',
    },
  ],
  contact: [
    // Header
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-2' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto' },
      ],
    },
    // Contact cards
    {
      type: 'grid',
      className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
      items: [
        { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-48 bg-gray-300 rounded' },
      ],
    },
  ],
  demo: [
    // Content section 
    {
      type: 'list',
      className: 'space-y-6 mb-8',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mb-4' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mb-6' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-full mb-4' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-5/6' },
      ],
    },
    // Form section
    {
      type: 'rectangle',
      className: 'h-96 bg-gray-300 rounded',
    },
  ],
  pricing: [
    // Header
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-1/2 mx-auto mb-2' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-8' },
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/3 mx-auto' },
      ],
    },
    // Pricing cards
    {
      type: 'grid',
      className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-16',
      items: [
        { type: 'rectangle', className: 'h-80 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-80 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-80 bg-gray-300 rounded' },
      ],
    },
    // Table
    {
      type: 'list',
      className: 'space-y-4 mb-16',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8' },
        { type: 'rectangle', className: 'h-64 bg-gray-300 rounded' },
      ],
    },
    // School logos
    {
      type: 'list',
      className: 'space-y-4 mb-16',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-8' },
        {
          type: 'grid',
          className: 'grid grid-cols-2 md:grid-cols-4 gap-4',
          items: [
            { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-16 bg-gray-300 rounded' },
          ],
        },
      ],
    },
    // Feedback
    {
      type: 'list',
      className: 'space-y-4 mb-16',
      items: [
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4' },
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/4 mx-auto mb-2' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-1/2 mx-auto' },
      ],
    },
    // FAQ skeleton
    {
      type: 'list',
      className: 'space-y-4 mb-16',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-8' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-4' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-4' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
      ],
    },
    // CTA button skeleton
    {
      type: 'list',
      className: 'space-y-4',
      items: [
        { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-3/4 mx-auto mb-8' },
        { type: 'rectangle', className: 'h-10 bg-gray-300 rounded w-1/4 mx-auto' },
      ],
    },
  ],
  list: [
    // Header skeleton
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', 
          className: 'h-8 bg-gray-300 rounded w-1/2 mb-2' },
        { type: 'rectangle', 
          className: 'h-4 bg-gray-300 rounded w-3/4' },
      ],
    },
    // Table skeleton
    {
      type: 'rectangle',
      className: 'h-96 bg-gray-300 rounded mb-8',
    },
    // Profile card
    {
      type: 'rectangle',
      className: 'h-80 bg-gray-300 rounded',
    },
  ],
};

export default LoaderConfig;