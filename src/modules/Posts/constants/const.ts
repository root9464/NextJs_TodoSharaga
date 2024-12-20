type Post = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  userId: number;
};

export const DATA_POST: { title: string; tasks: Post[] }[] = [
  {
    title: 'Today’s Task',
    tasks: [
      {
        id: 'cm4wxwcyh0003vlbsql4x9302',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
      {
        id: 'cm4wxwcyh0003vlslx32',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
      {
        id: 'cm4wxwcyh000l4x9302',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
    ],
  },
  {
    title: 'Tommorrow Task',
    tasks: [
      {
        id: 'cm4wxwcyh0003vlbsql4',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
      {
        id: 'cm4wxwcyh0003vlbs',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
      {
        id: 'cm4wxw03vlbsql4x9302',
        title: 'title1',
        description: 'description1',
        done: false,
        createdAt: '2024-12-20T18:27:14.786Z',
        priority: 'high',
        userId: 99281932,
      },
    ],
  },
];
