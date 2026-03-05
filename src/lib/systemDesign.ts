export interface Topic {
  id: string;
  title: string;
  completed: boolean;
}

export interface SystemDesignCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  topics: Topic[];
  color: string;
}

export interface SystemDesignRoadmap {
  name: string;
  description: string;
  categories: SystemDesignCategory[];
}

const systemDesignData: SystemDesignRoadmap = {
  name: 'System Design Roadmap',
  description:
    'Master system design patterns and concepts for FAANG interviews',
  categories: [
    {
      id: 'fundamentals',
      name: 'System Design Fundamentals',
      emoji: '1️⃣',
      description:
        'The absolute basics every system design question relies on.',
      color: 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700',
      topics: [
        { id: 'csa', title: 'Client–Server Architecture', completed: false },
        {
          id: 'latency-throughput',
          title: 'Latency vs Throughput',
          completed: false,
        },
        {
          id: 'scaling',
          title: 'Horizontal vs Vertical Scaling',
          completed: false,
        },
        { id: 'load-balancing', title: 'Load Balancing', completed: false },
        { id: 'reverse-proxy', title: 'Reverse Proxy', completed: false },
        {
          id: 'stateless-stateful',
          title: 'Stateless vs Stateful Services',
          completed: false,
        },
        { id: 'cap-theorem', title: 'CAP Theorem', completed: false },
        {
          id: 'consistency-models',
          title: 'Consistency Models',
          completed: false,
        },
        { id: 'availability', title: 'Availability', completed: false },
        { id: 'fault-tolerance', title: 'Fault Tolerance', completed: false },
      ],
    },
    {
      id: 'networking',
      name: 'Networking Basics',
      emoji: '2️⃣',
      description: 'Important for understanding how services communicate.',
      color:
        'bg-purple-50 border-purple-200 dark:bg-purple-900 dark:border-purple-700',
      topics: [
        { id: 'dns', title: 'DNS', completed: false },
        { id: 'http-https', title: 'HTTP / HTTPS', completed: false },
        { id: 'rest-apis', title: 'REST APIs', completed: false },
        { id: 'grpc', title: 'gRPC', completed: false },
        { id: 'websockets', title: 'WebSockets', completed: false },
        { id: 'tcp-udp', title: 'TCP vs UDP', completed: false },
        { id: 'tls-ssl', title: 'TLS / SSL', completed: false },
        {
          id: 'cdn',
          title: 'CDN (Content Delivery Network)',
          completed: false,
        },
      ],
    },
    {
      id: 'databases',
      name: 'Databases',
      emoji: '3️⃣',
      description: 'Understanding how data is stored and accessed.',
      color:
        'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700',
      topics: [
        { id: 'sql', title: 'SQL', completed: false },
        {
          id: 'rdb-basics',
          title: 'Relational Database Basics',
          completed: false,
        },
        { id: 'indexing', title: 'Indexing', completed: false },
        {
          id: 'query-optimization',
          title: 'Query Optimization',
          completed: false,
        },
        { id: 'acid', title: 'ACID Transactions', completed: false },
        {
          id: 'normalization',
          title: 'Normalization vs Denormalization',
          completed: false,
        },
        { id: 'nosql', title: 'NoSQL', completed: false },
        { id: 'key-value', title: 'Key-Value Stores', completed: false },
        { id: 'document-db', title: 'Document Databases', completed: false },
        { id: 'column-db', title: 'Column Databases', completed: false },
        { id: 'graph-db', title: 'Graph Databases', completed: false },
      ],
    },
    {
      id: 'partitioning',
      name: 'Data Partitioning',
      emoji: '4️⃣',
      description: 'Used when data becomes too large for one machine.',
      color: 'bg-pink-50 border-pink-200 dark:bg-pink-900 dark:border-pink-700',
      topics: [
        { id: 'sharding', title: 'Sharding', completed: false },
        {
          id: 'consistent-hashing',
          title: 'Consistent Hashing',
          completed: false,
        },
        { id: 'replication', title: 'Data Replication', completed: false },
        {
          id: 'leader-follower',
          title: 'Leader–Follower Replication',
          completed: false,
        },
        {
          id: 'multi-leader',
          title: 'Multi-Leader Replication',
          completed: false,
        },
      ],
    },
    {
      id: 'caching',
      name: 'Caching',
      emoji: '5️⃣',
      description: 'One of the most common design techniques.',
      color:
        'bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700',
      topics: [
        { id: 'cache-aside', title: 'Cache Aside Pattern', completed: false },
        { id: 'write-through', title: 'Write Through Cache', completed: false },
        { id: 'write-back', title: 'Write Back Cache', completed: false },
        {
          id: 'cache-invalidation',
          title: 'Cache Invalidation',
          completed: false,
        },
        {
          id: 'distributed-cache',
          title: 'Distributed Cache',
          completed: false,
        },
        {
          id: 'eviction-policies',
          title: 'Cache Eviction Policies',
          completed: false,
        },
        { id: 'lru', title: 'LRU', completed: false },
        { id: 'lfu', title: 'LFU', completed: false },
        { id: 'fifo', title: 'FIFO', completed: false },
      ],
    },
    {
      id: 'load-balancing-advanced',
      name: 'Load Balancing',
      emoji: '6️⃣',
      description: 'Ensuring traffic is evenly distributed.',
      color:
        'bg-indigo-50 border-indigo-200 dark:bg-indigo-900 dark:border-indigo-700',
      topics: [
        { id: 'round-robin', title: 'Round Robin', completed: false },
        { id: 'weighted-rr', title: 'Weighted Round Robin', completed: false },
        {
          id: 'least-connections',
          title: 'Least Connections',
          completed: false,
        },
        {
          id: 'consistent-hash-lb',
          title: 'Consistent Hashing Load Balancing',
          completed: false,
        },
        { id: 'health-checks', title: 'Health Checks', completed: false },
      ],
    },
    {
      id: 'async-processing',
      name: 'Asynchronous Processing',
      emoji: '7️⃣',
      description: 'Important for high-scale systems.',
      color: 'bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-700',
      topics: [
        { id: 'message-queues', title: 'Message Queues', completed: false },
        {
          id: 'event-driven',
          title: 'Event Driven Architecture',
          completed: false,
        },
        { id: 'pubsub', title: 'Pub/Sub Systems', completed: false },
        { id: 'task-queues', title: 'Task Queues', completed: false },
        {
          id: 'stream-processing',
          title: 'Stream Processing',
          completed: false,
        },
      ],
    },
    {
      id: 'distributed-systems',
      name: 'Distributed Systems Concepts',
      emoji: '8️⃣',
      description: 'Core ideas for large scale systems.',
      color: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-900 dark:border-cyan-700',
      topics: [
        {
          id: 'distributed-locks',
          title: 'Distributed Locks',
          completed: false,
        },
        { id: 'leader-election', title: 'Leader Election', completed: false },
        { id: 'consensus', title: 'Consensus Algorithms', completed: false },
        { id: 'clock-sync', title: 'Clock Synchronization', completed: false },
        { id: 'idempotency', title: 'Idempotency', completed: false },
        {
          id: 'eventual-consistency',
          title: 'Eventual Consistency',
          completed: false,
        },
      ],
    },
    {
      id: 'storage-systems',
      name: 'Storage Systems',
      emoji: '9️⃣',
      description: 'Understanding how large systems store data.',
      color: 'bg-teal-50 border-teal-200 dark:bg-teal-900 dark:border-teal-700',
      topics: [
        { id: 'object-storage', title: 'Object Storage', completed: false },
        { id: 'blob-storage', title: 'Blob Storage', completed: false },
        { id: 'filesystems', title: 'File Systems', completed: false },
        { id: 'dfs', title: 'Distributed File Systems', completed: false },
        { id: 'log-storage', title: 'Log Based Storage', completed: false },
      ],
    },
    {
      id: 'reliability',
      name: 'Reliability & Fault Tolerance',
      emoji: '🔟',
      description: 'Making systems survive failures.',
      color:
        'bg-orange-50 border-orange-200 dark:bg-orange-900 dark:border-orange-700',
      topics: [
        {
          id: 'circuit-breaker',
          title: 'Circuit Breaker Pattern',
          completed: false,
        },
        { id: 'retry', title: 'Retry Mechanisms', completed: false },
        { id: 'rate-limiting', title: 'Rate Limiting', completed: false },
        { id: 'backpressure', title: 'Backpressure', completed: false },
        {
          id: 'graceful-degradation',
          title: 'Graceful Degradation',
          completed: false,
        },
        { id: 'bulkhead', title: 'Bulkhead Pattern', completed: false },
      ],
    },
    {
      id: 'security',
      name: 'Security Basics',
      emoji: '1️⃣1️⃣',
      description: 'Important for production systems.',
      color:
        'bg-violet-50 border-violet-200 dark:bg-violet-900 dark:border-violet-700',
      topics: [
        { id: 'authentication', title: 'Authentication', completed: false },
        { id: 'authorization', title: 'Authorization', completed: false },
        { id: 'oauth', title: 'OAuth', completed: false },
        { id: 'api-keys', title: 'API Keys', completed: false },
        { id: 'jwt', title: 'JWT Tokens', completed: false },
        {
          id: 'encryption-rest',
          title: 'Encryption at Rest',
          completed: false,
        },
        {
          id: 'encryption-transit',
          title: 'Encryption in Transit',
          completed: false,
        },
      ],
    },
    {
      id: 'observability',
      name: 'Observability',
      emoji: '1️⃣2️⃣',
      description: 'Used to monitor and debug systems.',
      color: 'bg-lime-50 border-lime-200 dark:bg-lime-900 dark:border-lime-700',
      topics: [
        { id: 'logging', title: 'Logging', completed: false },
        { id: 'metrics', title: 'Metrics', completed: false },
        { id: 'monitoring', title: 'Monitoring', completed: false },
        { id: 'tracing', title: 'Distributed Tracing', completed: false },
        { id: 'alerting', title: 'Alerting Systems', completed: false },
      ],
    },

    // ============================================
    // 📝 TOP 25 FAANG INTERVIEW PROBLEMS
    // ============================================
    {
      id: 'design-problems-beginner',
      name: '🟢 Beginner Level (Start Here!)',
      emoji: '🟢',
      description:
        'Foundational systems to build core concepts - Start with these 8 problems',
      color:
        'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700',
      topics: [
        {
          id: 'url-shortener',
          title: 'Design a URL Shortener (like Bitly)',
          completed: false,
        },
        {
          id: 'rate-limiter',
          title: 'Design a Rate Limiter',
          completed: false,
        },
        {
          id: 'parking-lot',
          title: 'Design a Parking Lot System',
          completed: false,
        },
        {
          id: 'distributed-cache',
          title: 'Design a Distributed Cache (like Redis)',
          completed: false,
        },
        {
          id: 'key-value-store',
          title: 'Design a Key-Value Store',
          completed: false,
        },
        {
          id: 'notification-system',
          title: 'Design a Notification System',
          completed: false,
        },
        {
          id: 'api-rate-limiting',
          title: 'Design an API Rate Limiting System',
          completed: false,
        },
        {
          id: 'file-storage',
          title: 'Design a File Storage System',
          completed: false,
        },
      ],
    },
    {
      id: 'design-problems-intermediate',
      name: '🟡 Intermediate Level (Real Products)',
      emoji: '🟡',
      description:
        'Real product systems - 8 problems that introduce distributed systems',
      color:
        'bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700',
      topics: [
        {
          id: 'instagram-feed',
          title: 'Design Instagram Feed (like Instagram)',
          completed: false,
        },
        {
          id: 'chat-system',
          title: 'Design a Chat System (like WhatsApp)',
          completed: false,
        },
        {
          id: 'twitter-timeline',
          title: 'Design Twitter / X Timeline (like X (Twitter))',
          completed: false,
        },
        {
          id: 'video-streaming',
          title: 'Design a Video Streaming Platform (like YouTube)',
          completed: false,
        },
        {
          id: 'online-code-editor',
          title: 'Design an Online Code Editor (like LeetCode)',
          completed: false,
        },
        {
          id: 'web-crawler',
          title: 'Design a Web Crawler',
          completed: false,
        },
        {
          id: 'search-autocomplete',
          title: 'Design a Search Autocomplete System',
          completed: false,
        },
        {
          id: 'google-docs',
          title: 'Design Google Docs Collaborative Editing (like Google Docs)',
          completed: false,
        },
      ],
    },
    {
      id: 'design-problems-advanced',
      name: '🔴 Advanced Level (Large Scale Systems)',
      emoji: '🔴',
      description:
        'Distributed systems at massive scale - 9 problems for senior roles',
      color: 'bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-700',
      topics: [
        {
          id: 'uber-matching',
          title: 'Design Uber Ride Matching System (like Uber)',
          completed: false,
        },
        {
          id: 'netflix-streaming',
          title: 'Design Netflix Video Streaming System (like Netflix)',
          completed: false,
        },
        {
          id: 'facebook-newsfeed',
          title: 'Design Facebook News Feed (like Meta)',
          completed: false,
        },
        {
          id: 'google-search',
          title: 'Design Google Search System (like Google)',
          completed: false,
        },
        {
          id: 'global-cdn',
          title: 'Design a Global CDN (like Cloudflare)',
          completed: false,
        },
        {
          id: 'dropbox-sync',
          title: 'Design Dropbox File Sync (like Dropbox)',
          completed: false,
        },
        {
          id: 'distributed-logging',
          title: 'Design a Distributed Logging System',
          completed: false,
        },
        {
          id: 'recommendation-system',
          title: 'Design a Recommendation System (like Netflix)',
          completed: false,
        },
        {
          id: 'google-maps',
          title: 'Design Google Maps / Location Service (like Google Maps)',
          completed: false,
        },
      ],
    },

    // ============================================
    // 📚 CORE CONCEPTS & FUNDAMENTALS
    // ============================================
    {
      id: 'core-concepts-architecture',
      name: 'Architecture Patterns',
      emoji: '🏗️',
      description: 'Essential architectural patterns for system design',
      color: 'bg-sky-50 border-sky-200 dark:bg-sky-900 dark:border-sky-700',
      topics: [
        { id: 'load-balancers', title: 'Load Balancers', completed: false },
        { id: 'api-gateway', title: 'API Gateway', completed: false },
        { id: 'microservices', title: 'Microservices', completed: false },
        {
          id: 'monolith-vs-micro',
          title: 'Monolith vs Microservices',
          completed: false,
        },
      ],
    },
    {
      id: 'core-concepts-data',
      name: 'Data Storage & Processing',
      emoji: '💾',
      description: 'Core data concepts you must know',
      color:
        'bg-amber-50 border-amber-200 dark:bg-amber-900 dark:border-amber-700',
      topics: [
        { id: 'sql-vs-nosql', title: 'SQL vs NoSQL', completed: false },
        { id: 'sharding', title: 'Sharding', completed: false },
        { id: 'replication', title: 'Replication', completed: false },
        { id: 'indexing', title: 'Indexing', completed: false },
      ],
    },
    {
      id: 'core-concepts-performance',
      name: 'Performance & Optimization',
      emoji: '⚡',
      description: 'Making systems fast and efficient',
      color:
        'bg-orange-50 border-orange-200 dark:bg-orange-900 dark:border-orange-700',
      topics: [
        { id: 'caching-patterns', title: 'Caching', completed: false },
        { id: 'cdn-usage', title: 'CDN', completed: false },
        {
          id: 'db-optimization',
          title: 'Database Optimization',
          completed: false,
        },
      ],
    },
    {
      id: 'core-concepts-distributed',
      name: 'Distributed Systems Fundamentals',
      emoji: '🔗',
      description: 'Core distributed systems concepts',
      color: 'bg-rose-50 border-rose-200 dark:bg-rose-900 dark:border-rose-700',
      topics: [
        { id: 'cap-theorem-core', title: 'CAP Theorem', completed: false },
        {
          id: 'consistency-models-core',
          title: 'Consistency Models',
          completed: false,
        },
        {
          id: 'leader-election-core',
          title: 'Leader Election',
          completed: false,
        },
        {
          id: 'distributed-locks-core',
          title: 'Distributed Locks',
          completed: false,
        },
      ],
    },
    {
      id: 'core-concepts-infrastructure',
      name: 'Infrastructure & Messaging',
      emoji: '📦',
      description: 'Supporting infrastructure for distributed systems',
      color:
        'bg-emerald-50 border-emerald-200 dark:bg-emerald-900 dark:border-emerald-700',
      topics: [
        {
          id: 'message-queues-core',
          title: 'Message Queues (Kafka, RabbitMQ)',
          completed: false,
        },
        {
          id: 'stream-processing-core',
          title: 'Stream Processing',
          completed: false,
        },
        { id: 'containerization', title: 'Containerization', completed: false },
        {
          id: 'observability-core',
          title: 'Observability (logs/metrics)',
          completed: false,
        },
      ],
    },
  ],
};

export default systemDesignData;
