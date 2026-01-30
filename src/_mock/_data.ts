import {
  _id,
  _price,
  _times,
  _company,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  name: _fullName(index),
  company: _company(index),
  isVerified: _boolean(index),
  avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  status: index % 4 ? 'active' : 'banned',
  role:
    [
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer',
    ][index] || 'UI Designer',
}));

// ----------------------------------------------------------------------

export const _posts = [...Array(23)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  // Calculate stock levels
  const stockAmount = setIndex % 4 === 0 ? 0 : setIndex % 3 === 0 ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 100) + 50;
  const stockStatus = stockAmount === 0 ? 'out_of_stock' : stockAmount < 20 ? 'low_stock' : 'in_stock';

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? null : _price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
    // New fields for list and detail views
    createdAt: _times(index),
    stock: stockAmount,
    stockStatus: stockStatus as 'out_of_stock' | 'low_stock' | 'in_stock',
    publish: setIndex % 5 === 0 ? 'draft' as const : 'published' as const,
    images: [
      `/assets/images/product/product-${setIndex}.webp`,
      `/assets/images/product/product-${((setIndex % 24) + 1)}.webp`,
      `/assets/images/product/product-${((setIndex + 1) % 24) + 1}.webp`,
    ],
    description: _description(index),
    category: ['Shoes', 'Apparel', 'Accessories'][index % 3],
    reviews: Math.floor(Math.random() * 2000) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

export const _traffic = [
  {
    value: 'facebook',
    label: 'Facebook',
    total: 19500,
  },
  {
    value: 'google',
    label: 'Google',
    total: 91200,
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: 69800,
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: 84900,
  },
];

export const _tasks = Array.from({ length: 5 }, (_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];

// ----------------------------------------------------------------------

export const _invoices = [
  {
    id: 'INV-1991',
    category: 'Android',
    price: 523.14,
    status: 'paid' as const,
  },
  {
    id: 'INV-1990',
    category: 'Mac',
    price: 291.14,
    status: 'out_of_date' as const,
  },
  {
    id: 'INV-1992',
    category: 'Windows',
    price: 956.71,
    status: 'progress' as const,
  },
  {
    id: 'INV-1993',
    category: 'Android',
    price: 585.21,
    status: 'paid' as const,
  },
  {
    id: 'INV-1994',
    category: 'Mac',
    price: 523.17,
    status: 'paid' as const,
  },
];

export const _relatedApps = [
  {
    id: 'app-1',
    name: 'Chrome',
    icon: '/assets/icons/app/ic-app-chrome.svg',
    price: 'free' as const,
    totalDownloads: 8938,
    platforms: [
      { platform: 'windows' as const, percentage: 83 },
      { platform: 'mac' as const, percentage: 9 },
      { platform: 'ios' as const, percentage: 8 },
    ],
  },
  {
    id: 'app-2',
    name: 'Drive',
    icon: '/assets/icons/app/ic-app-drive.svg',
    price: 'free' as const,
    totalDownloads: 6940,
    platforms: [
      { platform: 'windows' as const, percentage: 87 },
      { platform: 'mac' as const, percentage: 9 },
      { platform: 'ios' as const, percentage: 4 },
    ],
  },
  {
    id: 'app-3',
    name: 'Adobe acrobat reader DC',
    icon: '/assets/icons/app/ic-app-adobe.svg',
    price: 'free' as const,
    totalDownloads: 8438,
    platforms: [
      { platform: 'windows' as const, percentage: 83 },
      { platform: 'mac' as const, percentage: 12 },
      { platform: 'ios' as const, percentage: 5 },
    ],
  },
  {
    id: 'app-4',
    name: 'Dropbox',
    icon: '/assets/icons/app/ic-app-dropbox.svg',
    price: 'free' as const,
    totalDownloads: 7834,
    platforms: [
      { platform: 'windows' as const, percentage: 76 },
      { platform: 'mac' as const, percentage: 15 },
      { platform: 'android' as const, percentage: 9 },
    ],
  },
  {
    id: 'app-5',
    name: 'Tropa plus',
    icon: '/assets/icons/app/ic-app-tropa.svg',
    price: 38.67,
    totalDownloads: 6940,
    platforms: [
      { platform: 'windows' as const, percentage: 83 },
      { platform: 'mac' as const, percentage: 9 },
      { platform: 'ios' as const, percentage: 8 },
    ],
  },
];

export const _countries = [
  {
    id: 'country-1',
    name: 'Germany',
    flag: '/assets/icons/flags/ic-flag-de.svg',
    percentage: 9.91,
    installs: 1956,
    downloads: 10000,
    trend: 'up' as const,
  },
  {
    id: 'country-2',
    name: 'England',
    flag: '/assets/icons/flags/ic-flag-en.svg',
    percentage: 1.95,
    installs: 9500,
    downloads: 10000,
    trend: 'down' as const,
  },
  {
    id: 'country-3',
    name: 'France',
    flag: '/assets/icons/flags/ic-flag-fr.svg',
    percentage: 8.12,
    installs: 8500,
    downloads: 10000,
    trend: 'up' as const,
  },
  {
    id: 'country-4',
    name: 'Korea',
    flag: '/assets/icons/flags/ic-flag-kr.svg',
    percentage: 6.58,
    installs: 8400,
    downloads: 10000,
    trend: 'down' as const,
  },
  {
    id: 'country-5',
    name: 'USA',
    flag: '/assets/icons/flags/ic-flag-us.svg',
    percentage: 8.44,
    installs: 2200,
    downloads: 10000,
    trend: 'up' as const,
  },
];

export const _topAuthors = [
  {
    id: 'author-1',
    name: 'Jaydon Simonis',
    avatar: '/assets/images/avatar/avatar-3.webp',
    favorites: 1340,
    rank: 1,
  },
  {
    id: 'author-2',
    name: 'Deja Brady',
    avatar: '/assets/images/avatar/avatar-4.webp',
    favorites: 1120,
    rank: 2,
  },
  {
    id: 'author-3',
    name: 'Lucian Obrien',
    avatar: '/assets/images/avatar/avatar-5.webp',
    favorites: 980,
    rank: 3,
  },
  // {
  //   id: 'author-4',
  //   name: 'Harrison Stein',
  //   avatar: '/assets/images/avatar/avatar-6.webp',
  //   favorites: 875,
  //   rank: 4,
  // },
  // {
  //   id: 'author-5',
  //   name: 'Reece Chung',
  //   avatar: '/assets/images/avatar/avatar-7.webp',
  //   favorites: 734,
  //   rank: 5,
  // },
];


// ----------------------------------------------------------------------

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _id(index),
  title: [
    'Harry Potter and the Deathly Hallows - Part 2',
    'Disney Zombies 2',
    'Lightroom mobile - Photo Editor',
  ][index],
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
}));

// ----------------------------------------------------------------------

export const _storageServices = [
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '/assets/icons/files/ic-app-dropbox.svg',
    usedSpace: 2.24,
    totalSpace: 22.35,
    color: '#0061FF',
  },
  {
    id: 'drive',
    name: 'Drive',
    icon: '/assets/icons/files/ic-app-drive.svg',
    usedSpace: 4.47,
    totalSpace: 22.35,
    color: '#00A76F',
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    icon: '/assets/icons/files/ic-app-onedrive.svg',
    usedSpace: 11.18,
    totalSpace: 22.35,
    color: '#0078D4',
  },
];

export const _folders = [
  {
    id: 'folder-1',
    name: 'Docs',
    totalFiles: 749,
    size: 2.24,
    sharedWith: [
      '/assets/images/avatar/avatar-1.webp',
      '/assets/images/avatar/avatar-2.webp',
      '/assets/images/avatar/avatar-3.webp',
    ],
    isFavorited: true,
  },
  {
    id: 'folder-2',
    name: 'Foods',
    totalFiles: 382,
    size: 3.47,
    sharedWith: [],
    isFavorited: false,
  },
  {
    id: 'folder-3',
    name: 'Projects',
    totalFiles: 456,
    size: 1.18,
    sharedWith: [
      '/assets/images/avatar/avatar-4.webp',
      '/assets/images/avatar/avatar-5.webp',
    ],
    isFavorited: true,
  },
  {
    id: 'folder-4',
    name: 'Sport',
    totalFiles: 523,
    size: 4.52,
    sharedWith: [],
    isFavorited: false,
  },
  {
    id: 'folder-5',
    name: 'Training',
    totalFiles: 172,
    size: 1.92,
    sharedWith: ['/assets/images/avatar/avatar-6.webp'],
    isFavorited: false,
  },
  {
    id: 'folder-6',
    name: 'Work',
    totalFiles: 956,
    size: 6.42,
    sharedWith: [
      '/assets/images/avatar/avatar-7.webp',
      '/assets/images/avatar/avatar-8.webp',
    ],
    isFavorited: false,
  },
];

export const _fileCategories = [
  {
    id: 'images',
    name: 'Images',
    size: 11.18,
    icon: '/assets/icons/files/ic-img.svg',
    color: '#00A76F',
  },
  {
    id: 'media',
    name: 'Media',
    size: 4.47,
    icon: '/assets/icons/files/ic-video.svg',
    color: '#FF5630',
  },
  {
    id: 'documents',
    name: 'Documents',
    size: 4.47,
    icon: '/assets/icons/files/ic-document.svg',
    color: '#FFAB00',
  },
  {
    id: 'other',
    name: 'Other',
    size: 2.23,
    icon: '/assets/icons/files/ic-file.svg',
    color: '#919EAB',
  },
];

export const _recentFiles = [
  {
    id: 'file-1',
    name: 'Design_Mockups_2024.jpg',
    type: 'image',
    size: 4.2,
    modifiedAt: _times(1),
    sharedWith: [
      '/assets/images/avatar/avatar-1.webp',
      '/assets/images/avatar/avatar-2.webp',
    ],
    isFavorited: true,
    icon: '/assets/icons/files/ic-img.svg',
    color: '#00A76F',
  },
  {
    id: 'file-2',
    name: 'Product_Video.mp4',
    type: 'video',
    size: 24.5,
    modifiedAt: _times(2),
    sharedWith: ['/assets/images/avatar/avatar-3.webp'],
    isFavorited: false,
    icon: '/assets/icons/files/ic-video.svg',
    color: '#7635DC',
  },
  {
    id: 'file-3',
    name: 'Presentation_Q1.pdf',
    type: 'pdf',
    size: 1.8,
    modifiedAt: _times(3),
    sharedWith: [],
    isFavorited: true,
    icon: '/assets/icons/files/ic-pdf.svg',
    color: '#FF5630',
  },
  {
    id: 'file-4',
    name: 'Team_Photo.docx',
    type: 'document',
    size: 3.1,
    modifiedAt: _times(4),
    sharedWith: [
      '/assets/images/avatar/avatar-4.webp',
      '/assets/images/avatar/avatar-5.webp',
      '/assets/images/avatar/avatar-6.webp',
    ],
    isFavorited: false,
    icon: '/assets/icons/files/ic-document.svg',
    color: '#00A76F',
  },
  {
    id: 'file-5',
    name: 'Budget_Report.mp3',
    type: 'audio',
    size: 0.9,
    modifiedAt: _times(5),
    sharedWith: ['/assets/images/avatar/avatar-7.webp'],
    isFavorited: false,
    icon: '/assets/icons/files/ic-audio.svg',
    color: '#FFAB00',
  },
];

// ----------------------------------------------------------------------

export const _courseSummary = {
  inProgress: 6,
  completed: 12,
  totalHours: 48,
  certificates: 18,
};

export const _courses = [
  {
    id: 'course-1',
    title: 'Introduction to Python Programming',
    thumbnail: '/assets/images/course/course-1.webp',
    progress: 65,
    totalLessons: 24,
    completedLessons: 12,
    category: 'Programming',
  },
  {
    id: 'course-2',
    title: 'Digital Marketing Masterclass',
    thumbnail: '/assets/images/course/course-2.webp',
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    category: 'Marketing',
  },
  {
    id: 'course-3',
    title: 'Data Science Fundamentals',
    thumbnail: '/assets/images/course/course-3.webp',
    progress: 80,
    totalLessons: 30,
    completedLessons: 24,
    category: 'Data Science',
  },
  {
    id: 'course-4',
    title: 'Web Development Bootcamp',
    thumbnail: '/assets/images/course/course-4.webp',
    progress: 30,
    totalLessons: 36,
    completedLessons: 11,
    category: 'Programming',
  },
];

export const _hoursData = {
  week: [2, 3, 4, 2, 5, 6, 4],
  month: [12, 15, 18, 14, 20, 24, 22, 18, 25, 28, 26, 30],
  year: [48, 55, 62, 58, 72, 85, 92, 88, 95, 102, 98, 110],
};

export const _featuredCourses = [
  {
    id: 'featured-1',
    title: 'Introduction to Python Programming',
    thumbnail: '/assets/images/course/course-1.webp',
    duration: '1h 40m',
    students: 497,
    price: 83.74,
    category: 'Programming',
  },
  {
    id: 'featured-2',
    title: 'Digital Marketing Fundamentals',
    thumbnail: '/assets/images/course/course-2.webp',
    duration: '2h 30m',
    students: 385,
    price: 67.24,
    category: 'Marketing',
  },
  {
    id: 'featured-3',
    title: 'Data Science with R',
    thumbnail: '/assets/images/course/course-3.webp',
    duration: '3h 15m',
    students: 612,
    price: 95.21,
    category: 'Data Science',
  },
  {
    id: 'featured-4',
    title: 'Graphic Design Essentials',
    thumbnail: '/assets/images/course/course-4.webp',
    duration: '1h 50m',
    students: 428,
    price: 72.99,
    category: 'Design',
  },
];

export const _courseReminders = [
  {
    id: 'reminder-1',
    title: 'Introduction to Python Programming',
    dueDate: '01 Jan 2025 09:30 am',
    progress: 85,
  },
  {
    id: 'reminder-2',
    title: 'Digital Marketing Fundamentals',
    dueDate: '05 Jan 2025 02:00 pm',
    progress: 60,
  },
  {
    id: 'reminder-3',
    title: 'Data Science with R',
    dueDate: '10 Jan 2025 11:00 am',
    progress: 75,
  },
];

export const _strengthData = {
  categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
  series: [
    {
      name: 'Score',
      data: [80, 65, 90, 70, 75, 85],
    },
  ],
};

// ----------------------------------------------------------------------

export const _kanbanTasks = [
  {
    id: 'task-1',
    title: 'Design New Marketing Campaign',
    cover: '/assets/images/course/course-1.webp',
    priority: 'high',
    status: 'to-do',
    assignees: [
      { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar/avatar-1.webp' },
      { id: 'user-2', name: 'Jane Smith', avatar: '/assets/images/avatar/avatar-2.webp' },
    ],
    commentsCount: 3,
    attachmentsCount: 2,
    labels: ['Marketing'],
    dueDate: '2025-02-15',
    description: 'Create a comprehensive marketing campaign for Q1 2025 product launch.',
    subtasks: [
      { id: 'sub-1', title: 'Research target audience', completed: true },
      { id: 'sub-2', title: 'Design campaign materials', completed: false },
      { id: 'sub-3', title: 'Submit for approval', completed: false },
    ],
  },
  {
    id: 'task-2',
    title: 'Analyze Customer Feedback',
    cover: null,
    priority: 'medium',
    status: 'to-do',
    assignees: [
      { id: 'user-3', name: 'Bob Johnson', avatar: '/assets/images/avatar/avatar-3.webp' },
    ],
    commentsCount: 1,
    attachmentsCount: 0,
    labels: ['Research'],
    dueDate: '2025-02-10',
    description: 'Review and analyze customer feedback from December surveys.',
    subtasks: [],
  },
  {
    id: 'task-3',
    title: 'Update Website Content',
    cover: null,
    priority: 'low',
    status: 'to-do',
    assignees: [
      { id: 'user-4', name: 'Alice Brown', avatar: '/assets/images/avatar/avatar-4.webp' },
      { id: 'user-5', name: 'Charlie Davis', avatar: '/assets/images/avatar/avatar-5.webp' },
    ],
    commentsCount: 0,
    attachmentsCount: 1,
    labels: ['Content'],
    dueDate: '2025-02-20',
    description: 'Update homepage content to reflect new product features.',
    subtasks: [],
  },
  {
    id: 'task-4',
    title: 'Conduct Market Research',
    cover: '/assets/images/course/course-2.webp',
    priority: 'medium',
    status: 'in-progress',
    assignees: [
      { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar/avatar-1.webp' },
      { id: 'user-3', name: 'Bob Johnson', avatar: '/assets/images/avatar/avatar-3.webp' },
    ],
    commentsCount: 5,
    attachmentsCount: 3,
    labels: ['Research', 'Marketing'],
    dueDate: '2025-02-12',
    description: 'Comprehensive market research for competitor analysis.',
    subtasks: [
      { id: 'sub-4', title: 'Identify key competitors', completed: true },
      { id: 'sub-5', title: 'Analyze pricing strategies', completed: true },
      { id: 'sub-6', title: 'Compile final report', completed: false },
    ],
  },
  {
    id: 'task-5',
    title: 'Develop Software Application',
    cover: '/assets/images/course/course-3.webp',
    priority: 'high',
    status: 'in-progress',
    assignees: [
      { id: 'user-2', name: 'Jane Smith', avatar: '/assets/images/avatar/avatar-2.webp' },
    ],
    commentsCount: 8,
    attachmentsCount: 5,
    labels: ['Development'],
    dueDate: '2025-02-25',
    description: 'Build the core features of the new mobile application.',
    subtasks: [
      { id: 'sub-7', title: 'Set up project structure', completed: true },
      { id: 'sub-8', title: 'Implement authentication', completed: true },
      { id: 'sub-9', title: 'Build dashboard UI', completed: false },
      { id: 'sub-10', title: 'Add payment integration', completed: false },
    ],
  },
  {
    id: 'task-6',
    title: 'Ready to test',
    cover: null,
    priority: 'medium',
    status: 'ready-to-test',
    assignees: [
      { id: 'user-4', name: 'Alice Brown', avatar: '/assets/images/avatar/avatar-4.webp' },
    ],
    commentsCount: 2,
    attachmentsCount: 1,
    labels: ['Testing'],
    dueDate: '2025-02-08',
    description: 'Feature ready for QA testing.',
    subtasks: [],
  },
  {
    id: 'task-7',
    title: 'Organize Team Meeting',
    cover: null,
    priority: 'low',
    status: 'done',
    assignees: [
      { id: 'user-5', name: 'Charlie Davis', avatar: '/assets/images/avatar/avatar-5.webp' },
      { id: 'user-1', name: 'John Doe', avatar: '/assets/images/avatar/avatar-1.webp' },
    ],
    commentsCount: 1,
    attachmentsCount: 0,
    labels: ['Meeting'],
    dueDate: '2025-01-30',
    description: 'Monthly team sync-up meeting.',
    subtasks: [
      { id: 'sub-11', title: 'Book meeting room', completed: true },
      { id: 'sub-12', title: 'Send calendar invites', completed: true },
    ],
  },
];

export const _kanbanColumns = [
  {
    id: 'to-do',
    name: 'To do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  {
    id: 'in-progress',
    name: 'In progress',
    taskIds: ['task-4', 'task-5'],
  },
  {
    id: 'ready-to-test',
    name: 'Ready to test',
    taskIds: ['task-6'],
  },
  {
    id: 'done',
    name: 'Done',
    taskIds: ['task-7'],
  },
];
