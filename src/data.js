const courses = [
    {
        id: 1,
        name: 'Introduction to React Native',
        instructor: 'John Doe',
        description: 'Learn the basics of React Native development and build your first mobile app.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to React Native',
                content: 'Overview of React Native, setting up your development environment.'
            },
            {
                week: 2,
                topic: 'Building Your First App',
                content: 'Creating a simple mobile app using React Native components.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 101,
                name: 'Alice Johnson',
                email: 'alice@example.com',
            },
            {
                id: 102,
                name: 'Bob Smith',
                email: 'bob@example.com',
            }
            // Additional enrolled students...
        ]
    },
    // Additional course objects...
    {
        id: 2,
        name: 'Advanced JavaScript',
        instructor: 'Jane Smith',
        description: 'Dive deep into JavaScript concepts such as closures, promises, and async/await.',
        enrollmentStatus: 'Closed',
        thumbnail: 'your.image.here',
        duration: '6 weeks',
        schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Intermediate JavaScript knowledge'],
        syllabus: [
            {
                week: 1,
                topic: 'Closures',
                content: 'Understanding closures and their practical applications.'
            },
            {
                week: 2,
                topic: 'Promises',
                content: 'Introduction to promises and asynchronous programming.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 201,
                name: 'Charlie Brown',
                email: 'charlie@example.com',
            },
            {
                id: 202,
                name: 'Daisy Johnson',
                email: 'daisy@example.com',
            }
            // Additional enrolled students...
        ]
    },
     {
        id: 3,
        name: 'Advanced Data Structures and Algorithms',
        instructor: 'Dr. Alan Turing',
        description: 'Explore advanced data structures and algorithms for solving complex problems efficiently.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '10 weeks',
        schedule: 'Mondays and Thursdays, 5:00 PM - 7:00 PM',
        location: 'Online',
        prerequisites: ['Intermediate knowledge of data structures and algorithms'],
        syllabus: [
            {
                week: 1,
                topic: 'Graph Theory Basics',
                content: 'Introduction to graph theory and basic graph algorithms.'
            },
            {
                week: 2,
                topic: 'Dynamic Programming',
                content: 'Understanding dynamic programming techniques for optimization problems.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 301,
                name: 'Eva Watson',
                email: 'eva@example.com',
            },
            {
                id: 302,
                name: 'Franklin Adams',
                email: 'frank@example.com',
            }
            // Additional enrolled students...
        ]
    },
     {
        id: 4,
        name: 'Machine Learning Fundamentals',
        instructor: 'Dr. Ada Lovelace',
        description: 'Gain a solid foundation in machine learning algorithms and techniques.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '12 weeks',
        schedule: 'Tuesdays and Fridays, 4:00 PM - 6:00 PM',
        location: 'Online',
        prerequisites: ['Basic understanding of linear algebra and calculus', 'Programming experience in Python'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Machine Learning',
                content: 'Overview of machine learning concepts and types of learning algorithms.'
            },
            {
                week: 2,
                topic: 'Supervised Learning',
                content: 'Understanding supervised learning algorithms such as linear regression and logistic regression.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 401,
                name: 'Grace Allen',
                email: 'grace@example.com',
            },
            {
                id: 402,
                name: 'Henry Ford',
                email: 'henry@example.com',
            }
            // Additional enrolled students...
        ]
    },
    
    {
        id: 5,
        name: 'Web Development with Django',
        instructor: 'Dr. Grace Hopper',
        description: 'Learn how to build web applications using Django framework.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '10 weeks',
        schedule: 'Wednesdays and Saturdays, 3:00 PM - 5:00 PM',
        location: 'Online',
        prerequisites: ['Basic knowledge of Python programming'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Django',
                content: 'Setting up Django environment and understanding MVC architecture.'
            },
            {
                week: 2,
                topic: 'Models and Databases',
                content: 'Working with models, database migrations, and ORM in Django.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 501,
                name: 'Isaac Newton',
                email: 'isaac@example.com',
            },
            {
                id: 502,
                name: 'Jane Austen',
                email: 'jane@example.com',
            }
            // Additional enrolled students...
        ]
    },
    
     {
        id: 6,
        name: 'Digital Marketing Fundamentals',
        instructor: 'Emily Dickinson',
        description: 'Explore the basics of digital marketing strategies and tools.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '6 weeks',
        schedule: 'Mondays and Thursdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['None'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Digital Marketing',
                content: 'Overview of digital marketing channels and strategies.'
            },
            {
                week: 2,
                topic: 'Search Engine Optimization (SEO)',
                content: 'Understanding SEO techniques to improve website visibility.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 601,
                name: 'Katherine Johnson',
                email: 'katherine@example.com',
            },
            {
                id: 602,
                name: 'Leonardo da Vinci',
                email: 'leo@example.com',
            }
            // Additional enrolled students...
        ]
    },

     {
        id: 7,
        name: 'Artificial Intelligence Ethics',
        instructor: 'Dr. Alan Turing',
        description: 'Explore the ethical implications of artificial intelligence.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '8 weeks',
        schedule: 'Tuesdays and Fridays, 10:00 AM - 12:00 PM',
        location: 'Online',
        prerequisites: ['Basic understanding of artificial intelligence concepts'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to AI Ethics',
                content: 'Overview of ethical considerations in artificial intelligence.'
            },
            {
                week: 2,
                topic: 'Bias and Fairness',
                content: 'Examining issues of bias and fairness in AI algorithms.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 701,
                name: 'Marie Curie',
                email: 'marie@example.com',
            },
            {
                id: 702,
                name: 'Nikola Tesla',
                email: 'nikola@example.com',
            }
            // Additional enrolled students...
        ]
    },
     {
        id: 8,
        name: 'Financial Markets and Investments',
        instructor: 'Warren Buffett',
        description: 'Learn about financial markets, investment strategies, and portfolio management.',
        enrollmentStatus: 'Open',
        thumbnail: 'your.image.here',
        duration: '12 weeks',
        schedule: 'Mondays and Wednesdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic understanding of economics and finance'],
        syllabus: [
            {
                week: 1,
                topic: 'Introduction to Financial Markets',
                content: 'Overview of different types of financial markets.'
            },
            {
                week: 2,
                topic: 'Stock Market Analysis',
                content: 'Analyzing stocks and understanding stock market trends.'
            }
            // Additional weeks and topics...
        ],
        students: [
            {
                id: 801,
                name: 'Oprah Winfrey',
                email: 'oprah@example.com',
            },
            {
                id: 802,
                name: 'Peter Drucker',
                email: 'peter@example.com',
            }
            // Additional enrolled students...
        ]
    },
];


export default courses;