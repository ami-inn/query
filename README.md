# ⚛️ TanStack React Query - Advanced Implementation Guide

> A comprehensive guide and implementation of **TanStack Query (React Query v5)** with modern, advanced features and best practices.

---

## 📋 Table of Contents

- [About](#-about)
- [Technologies](#-technologies)
- [Features & Topics Covered](#-features--topics-covered)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Core Concepts](#-core-concepts)
- [Advanced Topics](#-advanced-topics)
- [Key Learnings](#-key-learnings)
- [Resources](#-resources)

---

## 🎯 About

This repository is **not a traditional project** - it's a **comprehensive learning resource** and **implementation reference** for TanStack Query (React Query). It contains:

- 📝 **Detailed notes** covering all React Query concepts
- 💻 **Code examples** for each topic
- 🔧 **Real-world implementations** of advanced features
- 📚 **Best practices** and optimization techniques

> **Note:** The topics inside the `src/topics/` folder are code snippets for reference purposes. Please refer to `notes.md` for detailed explanations of each topic.

---

## 📦 Technologies

- **React 19** - Latest React version
- **TypeScript** - Type-safe implementation
- **TanStack Query v5** (`@tanstack/react-query`) - Async state management
- **Vite** - Fast development build tool
- **Zod** - Schema validation
- **TanStack Query Devtools** - Development debugging
- **Query Persist Client** - Cache persistence
- **ESLint Plugin Query** - Linting for React Query best practices

---

## 🦄 Features & Topics Covered

### 🔵 Core Concepts

- ✅ **Query Client Setup** - Configuration and provider setup
- ✅ **useQuery Hook** - Basic data fetching
- ✅ **Query Keys** - Unique identifiers and management
- ✅ **Query Functions** - Data fetching logic
- ✅ **Query Status** - Pending, success, error states
- ✅ **Stale Time & Cache Time** - Data freshness management
- ✅ **Refetch Configuration** - OnMount, OnWindowFocus, OnReconnect

### 🟢 Data Management

- ✅ **Deduplication** - Automatic request deduplication
- ✅ **Caching Strategy** - Efficient cache management
- ✅ **Garbage Collection** - Automatic cleanup with gcTime
- ✅ **Cache Invalidation** - Fuzzy query key matching
- ✅ **Data Synchronization** - Server state sync
- ✅ **Structural Sharing** - Memory optimization

### 🟡 Advanced Querying

- ✅ **Polling** - Auto-refetch at intervals with `refetchInterval`
- ✅ **Parallel Queries** - Multiple simultaneous queries with `useQueries`
- ✅ **Dependent Queries** - Sequential query execution
- ✅ **Lazy Queries** - User-triggered queries with `enabled` option
- ✅ **Pagination** - Page-based data loading
- ✅ **Infinite Scroll** - Continuous data loading with `useInfiniteQuery`
- ✅ **Prefetching** - Preload data on hover/interaction

### 🟠 Mutations

- ✅ **useMutation Hook** - Server state updates
- ✅ **Mutation Lifecycle** - onSuccess, onError, onSettled callbacks
- ✅ **Optimistic Updates** - Instant UI feedback
- ✅ **Mutation Persistence** - Offline mutation support
- ✅ **Cache Updates** - Manual cache manipulation with `setQueryData`

### 🔴 Performance & Optimization

- ✅ **Performance Optimization** - Render optimization techniques
- ✅ **Referential Equality** - Object reference handling
- ✅ **Tracked Properties** - Selective re-rendering
- ✅ **Observer Pattern** - Efficient state subscriptions
- ✅ **useMemo & useCallback** - Memoization strategies
- ✅ **Structural Sharing** - Prevent unnecessary re-renders

### 🟣 Error Handling & Validation

- ✅ **Error Handling** - Proper error management
- ✅ **Error Boundaries** - Component-level error handling
- ✅ **Zod Validation** - Runtime type checking and validation
- ✅ **Error Retry** - Automatic retry on failure

### 🟤 Advanced Features

- ✅ **Query Defaults** - Global default configurations
- ✅ **Query Key Factory** - Scalable key management
- ✅ **WebSockets Integration** - Real-time data updates
- ✅ **Persister** - Cache persistence to localStorage/IndexedDB
- ✅ **React Suspense** - useSuspenseQuery hook
- ✅ **Server-Side Rendering (SSR)** - SSR compatibility
- ✅ **Testing** - Query and mutation testing strategies

---

## 📁 Project Structure

```
query/
├── src/
│   ├── topics/              # Code examples for each topic
│   │   ├── useQueryHook.tsx
│   │   ├── Mutation.tsx
│   │   ├── InfiniteQuery.tsx
│   │   ├── Pagination.tsx
│   │   ├── ParellelQuery.tsx
│   │   ├── DependentQuery.tsx
│   │   ├── OptimisiticUpdate.tsx
│   │   ├── PerformanceOptimization.tsx
│   │   ├── validation.tsx
│   │   ├── ErrorHandling.tsx
│   │   ├── Persister.tsx
│   │   ├── WebSocket.tsx
│   │   ├── Suspense.tsx
│   │   ├── SSR.tsx
│   │   ├── Testing.test.tsx
│   │   └── ... (25 total topic files)
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point with QueryClient setup
├── notes.md                 # Comprehensive documentation
├── package.json
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ami-inn/query.git

# Navigate to the project
cd query

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🔄 Core Concepts

### What is TanStack Query?

> **TanStack Query is NOT a data fetching library** - it's an **async state management library** that handles server state synchronization.

#### Server State vs Client State

**🌐 Server State (Async)**
- Server owned - what we see is a snapshot
- Owned by many users
- Persisted remotely across sessions
- Asynchronous - takes time to fetch

**💻 Client State (Sync)**
- Client owned - always up to date
- Only we can change it
- Usually ephemeral (gone when browser closes)
- Synchronous - instantly available

### Key Features React Query Handles

- 🔄 Polling
- 💾 Cache Management
- ❌ Request Cancellation
- 🎯 Data Selectors
- 📴 Offline Support
- 🔁 Auto Refetching
- 📜 Scroll Restoration
- ✏️ Mutation Handling
- 🔗 Dependent Queries
- 🗑️ Cache Invalidation
- ♾️ Infinite Scrolling
- 📄 Pagination
- ⚡ Optimistic Updates
- 🔄 Background Refetching

---

## 🎓 Advanced Topics

### Observer Pattern

React Query uses observers to manage query state:
- Observers live outside the React component tree
- Components subscribe to observers for data
- When cache updates, all subscribed components are notified
- Enables efficient re-rendering

### Query Lifecycle

1. **Pending** - Query is being fetched
2. **Fulfilled** - Query succeeded
3. **Rejected** - Query failed

### Refetch Triggers

Queries refetch when:
1. Query key changes
2. New observer mounts with `useQuery`
3. Window receives focus
4. Device goes online

### Cache Management

- **Stale Time** - How long data is considered fresh (default: 0ms)
- **GC Time** - How long unused queries stay in cache (default: 5min)
- **Deduplication** - Same query key = same cached result
- **Structural Sharing** - Reuse unchanged object parts for referential equality

---

## 📚 Key Learnings

### 🎯 Best Practices

1. ✅ Structure query keys with prefixes per feature
2. ✅ Use query key factories for scalability
3. ✅ Set appropriate stale times per resource
4. ✅ Leverage structural sharing for performance
5. ✅ Use tracked properties to minimize re-renders
6. ✅ Implement error boundaries for graceful error handling
7. ✅ Validate API responses with Zod
8. ✅ Use optimistic updates for instant feedback
9. ✅ Persist cache for offline support when needed
10. ✅ Avoid spread operators with `useQuery` results

### ⚡ Performance Tips

- Cache queries return instantly
- Queries are stale by default (refetch in background)
- Think about stale time for each resource
- Use `useMemo`/`useCallback` for derived data
- Leverage query prefetching on hover

### 🚫 Common Pitfalls to Avoid

- Don't use spread operator with `useQuery`
- Don't manage page state manually with `useInfiniteQuery`
- Don't log errors in try-catch without throwing
- Don't set gcTime lower than maxAge for persisters
- Don't use `enabled` with `useSuspenseQuery`

---

## 📖 Resources

- 📝 **notes.md** - Comprehensive guide with all concepts explained
- 💻 **src/topics/** - Working code examples for each feature
- 🌐 [TanStack Query Docs](https://tanstack.com/query/latest)
- 🎓 [Official Tutorial](https://tanstack.com/query/latest/docs/react/guides/important-defaults)

---

## 🤝 Contributing

This is a learning resource. Feel free to:
- Add more examples
- Improve documentation
- Fix bugs in code snippets
- Share additional use cases

---

## 📄 License

This project is open source and available for learning purposes.

---

## 🙏 Acknowledgments

- TanStack team for the amazing library
- React community for best practices
- All contributors to React Query ecosystem

---

**Happy Learning! 🚀**

> The code may not be complete or fully functional as it focuses on concepts. The API used is dummy - learn the concepts and implement in your own way!