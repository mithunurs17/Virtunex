export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  type: 'learn' | 'challenge' | 'project';
  xp: number;
  duration: string;
  summary: string;
  content: string[];
  quiz?: QuizQuestion[];
};

export type Course = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  level: string;
  duration: string;
  color: string;
  icon: string;
  outcomes: string[];
  modules: { id: string; title: string; description: string; lessons: Lesson[] }[];
};

export const courses: Course[] = [
  {
    id: 'foundations', shortTitle: 'Tech Foundations', icon: '⚡', color: 'from-blue-600 to-cyan-500',
    title: 'Tech Foundations: Programming, DSA & CS Core', level: 'Beginner → Intermediate', duration: '8–10 weeks',
    description: 'Build the fundamentals every engineering student needs before moving into full-stack or AI/ML development.',
    outcomes: ['Java, Python & C++ fundamentals', 'Problem solving with DSA', 'OOP, DBMS & SQL', 'Computer Networks and core CS concepts'],
    modules: [
      { id: 'programming', title: 'Programming Launchpad', description: 'Learn syntax, logic and clean coding habits.', lessons: [
        { id: 'java', title: 'Java Quest: Your First Program', type: 'learn', xp: 80, duration: '20 min', summary: 'Variables, data types, conditions and loops in Java.', content: ['Start with variables and primitive data types.', 'Use if/else and switch to make decisions.', 'Use for and while loops to automate repeated work.'], quiz: [{ question: 'Which keyword declares a constant in Java?', options: ['constant', 'final', 'static', 'fixed'], answer: 1, explanation: 'final prevents a variable from being reassigned.' }] },
        { id: 'python', title: 'Python Power-Up', type: 'learn', xp: 80, duration: '20 min', summary: 'Write expressive Python programs using core collections and functions.', content: ['Use lists, tuples, sets and dictionaries.', 'Create reusable functions with parameters and return values.', 'Prefer readable, small functions over repeated code.'], quiz: [{ question: 'Which Python type stores key-value pairs?', options: ['list', 'tuple', 'dict', 'set'], answer: 2, explanation: 'A dict maps keys to values.' }] },
        { id: 'cpp', title: 'C++ Arena', type: 'challenge', xp: 100, duration: '25 min', summary: 'Understand C++ syntax, references and STL foundations.', content: ['Practice vectors, strings and functions.', 'Use references when you need to avoid unnecessary copies.', 'Explore STL algorithms for common operations.'], quiz: [{ question: 'Which STL container is a dynamic array?', options: ['vector', 'stack', 'queue', 'map'], answer: 0, explanation: 'std::vector provides a resizable contiguous array.' }] },
      ] },
      { id: 'dsa', title: 'DSA Dungeon', description: 'Turn problems into patterns you can solve.', lessons: [
        { id: 'arrays', title: 'Arrays & Two Pointers', type: 'challenge', xp: 120, duration: '30 min', summary: 'Master traversal, two pointers and prefix-style thinking.', content: ['Start with O(n) scans.', 'Use two pointers when the input structure allows you to shrink a search space.', 'Always state time and space complexity.'], quiz: [{ question: 'A single pass through n array elements is usually:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explanation: 'Each element is processed once, so the work grows linearly.' }] },
        { id: 'trees', title: 'Trees & Graphs', type: 'challenge', xp: 140, duration: '35 min', summary: 'Traverse trees and graphs with BFS and DFS.', content: ['DFS explores deeply before backtracking.', 'BFS explores level by level using a queue.', 'Visited tracking prevents repeated graph exploration.'], quiz: [{ question: 'Which data structure naturally powers BFS?', options: ['Stack', 'Queue', 'Heap', 'Set'], answer: 1, explanation: 'BFS processes nodes in first-in-first-out order.' }] },
      ] },
      { id: 'core-cs', title: 'Core CS Boss Fight', description: 'Connect the concepts used in technical interviews and real systems.', lessons: [
        { id: 'oops', title: 'OOP Mission', type: 'learn', xp: 100, duration: '25 min', summary: 'Classes, objects, inheritance, polymorphism and encapsulation.', content: ['Encapsulation keeps data and behavior together.', 'Inheritance models an is-a relationship.', 'Polymorphism lets the same interface support different implementations.'], quiz: [{ question: 'Which OOP concept hides internal implementation details?', options: ['Encapsulation', 'Inheritance', 'Recursion', 'Compilation'], answer: 0, explanation: 'Encapsulation controls how internal state is accessed.' }] },
        { id: 'dbms', title: 'DBMS & SQL Lab', type: 'challenge', xp: 120, duration: '30 min', summary: 'Relational data, keys, joins and SQL queries.', content: ['Use primary keys to identify rows.', 'Use foreign keys to model relationships.', 'Use JOIN to combine related records across tables.'], quiz: [{ question: 'Which SQL clause filters rows?', options: ['ORDER BY', 'WHERE', 'GROUP BY', 'JOIN'], answer: 1, explanation: 'WHERE filters rows before grouping or ordering.' }] },
        { id: 'cn', title: 'Computer Networks Run', type: 'project', xp: 160, duration: '40 min', summary: 'Understand IP, TCP/UDP, HTTP and the request journey.', content: ['An IP address identifies a host/interface on a network.', 'TCP provides reliable, ordered delivery.', 'HTTP sits above TCP in the classic web stack.'], quiz: [{ question: 'Which protocol is connection-oriented?', options: ['UDP', 'TCP', 'IP', 'DNS'], answer: 1, explanation: 'TCP establishes a connection and provides reliable ordered delivery.' }] },
      ] },
    ],
  },
  {
    id: 'full-stack', shortTitle: 'Full Stack', icon: '🚀', color: 'from-violet-600 to-fuchsia-500',
    title: 'Full Stack Development: MERN + Java Stack', level: 'Intermediate', duration: '10–12 weeks',
    description: 'Build production-style web applications from UI to APIs, databases, authentication and deployment.',
    outcomes: ['React + Next.js frontend', 'Node.js/Express REST APIs', 'MongoDB + SQL', 'Java Spring Boot backend', 'Authentication and deployment'],
    modules: [
      { id: 'frontend', title: 'Frontend City', description: 'Build interfaces users want to use.', lessons: [
        { id: 'html-css', title: 'HTML & CSS Base Camp', type: 'learn', xp: 80, duration: '25 min', summary: 'Semantic markup, responsive layouts and modern CSS.', content: ['Use semantic elements for accessible structure.', 'Use flexbox and grid for responsive layouts.', 'Build mobile-first and progressively enhance.'], quiz: [{ question: 'Which CSS layout is best suited for two-dimensional page layouts?', options: ['Grid', 'Float', 'Inline', 'Position'], answer: 0, explanation: 'CSS Grid is designed for rows and columns.' }] },
        { id: 'react', title: 'React Component Forge', type: 'challenge', xp: 120, duration: '35 min', summary: 'Components, props, state, effects and reusable UI.', content: ['Props pass data into components.', 'State stores data that changes over time.', 'Keep components focused and compose them together.'], quiz: [{ question: 'Which hook is commonly used for local component state?', options: ['useMemo', 'useState', 'useRef', 'useId'], answer: 1, explanation: 'useState creates local state and a setter.' }] },
      ] },
      { id: 'mern', title: 'MERN API Lab', description: 'Connect the frontend to real backend services.', lessons: [
        { id: 'node', title: 'Node.js & Express Mission', type: 'challenge', xp: 120, duration: '35 min', summary: 'Routes, middleware, controllers and REST APIs.', content: ['Routes map HTTP requests to handlers.', 'Middleware can authenticate, validate and transform requests.', 'Keep controllers small and move business logic into services.'], quiz: [{ question: 'Which HTTP method is normally used to create a resource?', options: ['GET', 'POST', 'DELETE', 'HEAD'], answer: 1, explanation: 'POST is commonly used to create resources.' }] },
        { id: 'mongo', title: 'MongoDB Data Vault', type: 'learn', xp: 100, duration: '30 min', summary: 'Documents, collections, indexes and CRUD.', content: ['MongoDB stores flexible JSON-like documents.', 'Indexes speed up common queries at a storage cost.', 'Model data around access patterns.'], quiz: [{ question: 'MongoDB primarily stores data as:', options: ['Rows', 'Documents', 'Sheets', 'Graphs'], answer: 1, explanation: 'MongoDB is a document-oriented database.' }] },
      ] },
      { id: 'java-stack', title: 'Java Backend Boss', description: 'Build APIs with Spring Boot and connect relational data.', lessons: [
        { id: 'spring', title: 'Spring Boot Launch', type: 'learn', xp: 130, duration: '35 min', summary: 'Controllers, services, dependency injection and REST.', content: ['Controllers expose API endpoints.', 'Services contain business logic.', 'Dependency injection keeps components loosely coupled.'], quiz: [{ question: 'Spring Boot is primarily used to build:', options: ['Databases', 'Java applications/services', 'Operating systems', 'Browsers'], answer: 1, explanation: 'Spring Boot simplifies building production-ready Java applications.' }] },
        { id: 'sql-api', title: 'SQL + Spring Integration', type: 'project', xp: 180, duration: '45 min', summary: 'Build a CRUD API backed by a relational database.', content: ['Design entities and relationships.', 'Use repositories for persistence.', 'Validate request data and return useful HTTP status codes.'], quiz: [{ question: 'Which HTTP status means a resource was successfully created?', options: ['200', '201', '204', '404'], answer: 1, explanation: '201 Created is the standard response for successful resource creation.' }] },
      ] },
      { id: 'deploy', title: 'Ship It!', description: 'Make your project production-ready.', lessons: [
        { id: 'auth', title: 'Authentication Shield', type: 'challenge', xp: 140, duration: '35 min', summary: 'Sessions, JWTs, password hashing and authorization.', content: ['Authentication verifies identity.', 'Authorization decides what an authenticated user can do.', 'Never store plain-text passwords.'], quiz: [{ question: 'Authorization answers which question?', options: ['Who are you?', 'What are you allowed to do?', 'Where are you?', 'What is your password?'], answer: 1, explanation: 'Authorization controls permissions after identity is established.' }] },
        { id: 'deploy', title: 'Deployment Rocket', type: 'project', xp: 180, duration: '45 min', summary: 'Environment variables, builds, hosting and monitoring.', content: ['Separate configuration from source code.', 'Run production builds before deployment.', 'Add logging and basic monitoring to catch failures.'], quiz: [{ question: 'Where should production secrets normally live?', options: ['Source code', 'Environment/secret manager', 'README', 'CSS'], answer: 1, explanation: 'Secrets belong in environment variables or a dedicated secret manager.' }] },
      ] },
    ],
  },
  {
    id: 'ai-ml', shortTitle: 'AI + ML', icon: '🤖', color: 'from-emerald-600 to-teal-500',
    title: 'AI + ML: From Python to Intelligent Apps', level: 'Intermediate → Advanced', duration: '10–12 weeks',
    description: 'Learn the ML lifecycle, build models, understand deep learning and ship practical AI applications.',
    outcomes: ['Python for data work', 'ML algorithms and evaluation', 'Deep learning foundations', 'NLP/LLM concepts', 'AI application projects'],
    modules: [
      { id: 'data', title: 'Data Science Outpost', description: 'Prepare and understand data before modeling.', lessons: [
        { id: 'numpy', title: 'NumPy & Pandas Lab', type: 'learn', xp: 90, duration: '30 min', summary: 'Arrays, DataFrames, filtering and transformations.', content: ['Use NumPy for numerical arrays.', 'Use Pandas DataFrames for tabular analysis.', 'Inspect missing values and data distributions before modeling.'], quiz: [{ question: 'A Pandas DataFrame is best described as:', options: ['A 2D labeled table', 'A neural network', 'A compiler', 'A web server'], answer: 0, explanation: 'A DataFrame is a two-dimensional labeled data structure.' }] },
        { id: 'stats', title: 'Statistics Checkpoint', type: 'challenge', xp: 110, duration: '30 min', summary: 'Mean, variance, distributions and correlation.', content: ['Mean summarizes central tendency.', 'Variance measures spread.', 'Correlation describes association, not causation.'], quiz: [{ question: 'Correlation alone proves causation.', options: ['True', 'False'], answer: 1, explanation: 'Correlation can exist without a causal relationship.' }] },
      ] },
      { id: 'ml', title: 'Machine Learning Arena', description: 'Train and evaluate classical ML models.', lessons: [
        { id: 'supervised', title: 'Supervised Learning Quest', type: 'learn', xp: 120, duration: '35 min', summary: 'Regression, classification and train/test splits.', content: ['Regression predicts continuous values.', 'Classification predicts categories.', 'Keep a test set isolated until final evaluation.'], quiz: [{ question: 'Predicting house price is usually:', options: ['Classification', 'Regression', 'Clustering', 'Ranking'], answer: 1, explanation: 'House price is a continuous target, so regression is typical.' }] },
        { id: 'unsupervised', title: 'Clustering Cave', type: 'challenge', xp: 120, duration: '35 min', summary: 'Discover structure with clustering and dimensionality reduction.', content: ['Clustering groups similar observations.', 'K-means requires choosing k.', 'Scale features when distance-based methods need comparable ranges.'], quiz: [{ question: 'K-means is primarily a:', options: ['Classification algorithm', 'Clustering algorithm', 'Database', 'Loss function'], answer: 1, explanation: 'K-means is an unsupervised clustering algorithm.' }] },
        { id: 'ml-project', title: 'ML Model Mission', type: 'project', xp: 180, duration: '50 min', summary: 'Build, evaluate and explain a complete ML pipeline.', content: ['Define the problem and metric first.', 'Create a reproducible preprocessing pipeline.', 'Compare a baseline with stronger models and explain errors.'], quiz: [{ question: 'Why do we use a baseline model?', options: ['To avoid evaluation', 'To create a simple reference point', 'To increase data leakage', 'To skip preprocessing'], answer: 1, explanation: 'A baseline gives you a simple reference against which improvements can be measured.' }] },
      ] },
      { id: 'deep-ai', title: 'Deep Learning & GenAI Lab', description: 'Understand neural networks and modern AI application patterns.', lessons: [
        { id: 'neural', title: 'Neural Network Forge', type: 'learn', xp: 140, duration: '40 min', summary: 'Layers, activations, loss, backpropagation and training.', content: ['A neural network learns parameters from data.', 'Activation functions add non-linearity.', 'Backpropagation computes gradients used to update weights.'], quiz: [{ question: 'What does backpropagation primarily compute?', options: ['Gradients', 'Web routes', 'SQL joins', 'IP addresses'], answer: 0, explanation: 'Backpropagation efficiently computes gradients of the loss with respect to model parameters.' }] },
        { id: 'llm', title: 'LLM Application Quest', type: 'challenge', xp: 160, duration: '40 min', summary: 'Prompts, embeddings, RAG and evaluation.', content: ['Embeddings represent text as vectors for semantic comparison.', 'RAG retrieves relevant context before generation.', 'Evaluate factuality and usefulness instead of trusting outputs blindly.'], quiz: [{ question: 'What is the main purpose of RAG?', options: ['Replace databases', 'Retrieve relevant context for generation', 'Compress images', 'Train an operating system'], answer: 1, explanation: 'Retrieval-Augmented Generation supplies relevant external context to the model.' }] },
        { id: 'ai-project', title: 'AI Product Boss Fight', type: 'project', xp: 220, duration: '60 min', summary: 'Design an AI feature with data, retrieval, model calls and evaluation.', content: ['Define a user problem and success metric.', 'Build the simplest reliable pipeline first.', 'Add guardrails, evaluation and observability before scaling.'], quiz: [{ question: 'A strong AI product should be evaluated primarily by:', options: ['Model hype', 'User/business outcome and quality metrics', 'Number of prompts', 'GPU brand'], answer: 1, explanation: 'Real product value comes from measurable outcomes and quality.' }] },
      ] },
    ],
  },
];

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return undefined;
  for (const module of course.modules) {
    const lesson = module.lessons.find((item) => item.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return undefined;
}

export function getAllLessons(course: Course) {
  return course.modules.flatMap((module) => module.lessons);
}
