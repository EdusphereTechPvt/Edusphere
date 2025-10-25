const LoaderConfig = {
  home: [
    {
      type: 'rectangle',
      className: 'h-screen bg-gray-300 rounded',
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
    // Header section
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-1/3 mx-auto mb-2' },
        { type: 'rectangle', className: 'h-4 bg-gray-300 rounded w-full mx-auto' },
      ],
    },
    // Contact cards
    {
      type: 'list',
      className: 'space-y-6',
      items: [
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
          items: [
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
          ],
        },
        {
          type: 'grid',
          className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
          items: [
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
            { type: 'rectangle', className: 'h-40 bg-gray-300 rounded' },
          ],
        },
        {
          type: 'rectangle',
          className: 'h-40 bg-gray-300 rounded max-w-md mx-auto',
        },
      ],
    },
  ],
  demo: [
    // Main title
    {
      type: 'rectangle',
      className: 'h-12 bg-gray-300 rounded w-3/4 mb-4 mx-auto',
    },
    // Subtitle
    {
      type: 'rectangle',
      className: 'h-6 bg-gray-300 rounded w-full mb-8 mx-auto',
    },
    // "What to Expect" section 
    {
      type: 'rectangle',
      className: 'h-8 bg-gray-300 rounded w-1/2 mb-6',
    },
    // Points list
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-full' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-full' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-full' },
      ],
    },
    // Testimonials section
    {
      type: 'rectangle',
      className: 'h-8 bg-gray-300 rounded w-1/3 mb-6',
    },
    {
      type: 'rectangle',
      className: 'h-24 bg-gray-300 rounded w-full mb-8',
    },
    // FAQ section
    {
      type: 'rectangle',
      className: 'h-8 bg-gray-300 rounded w-1/2 mb-6',
    },
    {
      type: 'list',
      className: 'space-y-3 mb-8',
      items: [
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-full' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-full' },
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-full' },
      ],
    },
    // Form section
    {
      type: 'rectangle',
      className: 'h-96 bg-gray-300 rounded w-full lg:w-3/5',
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
    // School
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
    // FAQ
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
    // CTA button
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
    // Header
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
    // Table
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
  ptm: [
    // Title and subtitle
    {
      type: 'list',
      className: 'space-y-4 mb-8',
      items: [
        { type: 'rectangle', className: 'h-12 bg-gray-300 rounded w-3/4 mx-auto mb-2' },
        { type: 'rectangle', className: 'h-6 bg-gray-300 rounded w-full mx-auto' },
      ],
    },
    // Stats cards
    {
      type: 'grid',
      className: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8',
      items: [
        { type: 'rectangle', className: 'h-24 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-24 bg-gray-300 rounded' },
        { type: 'rectangle', className: 'h-24 bg-gray-300 rounded' },
      ],
    },
    // Main content grid
    {
      type: 'grid',
      className: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
      items: [
        // Calendar section
        {
          type: 'list',
          className: 'space-y-4',
          items: [
            { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mb-4' },
            { type: 'rectangle', className: 'h-96 bg-gray-300 rounded' },
          ],
        },
        // Wizard section
        {
          type: 'list',
          className: 'space-y-4',
          items: [
            { type: 'rectangle', className: 'h-8 bg-gray-300 rounded w-1/2 mb-4' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-2' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-2' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-2' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-2' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded mb-2' },
            { type: 'rectangle', className: 'h-12 bg-gray-300 rounded' },
          ],
        },
      ],
    },
  ],
};

export default LoaderConfig;