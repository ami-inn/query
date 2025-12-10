# ⚛️ React Notes

## 📋 What is React?

React is a **library** for building user interfaces.

---

## 🎨 React's Strengths

### UI Composition
React excels at **UI composition** and solves **non-visual composition** through React Hooks.

---

## 🪝 React Hooks Overview

### `useState`
- 📦 Creates a value that is preserved across renders
- 🔄 Triggers a re-render when it changes

### `useEffect`
- 🔗 Synchronize a component with some external system

### `useRef`
- 💾 Creates a value that is preserved across renders
- ⚡ Won't trigger a re-render when it changes

### `useContext`
- 🌐 Get access to what was passed to a context's provider

### `useReducer`
- 📦 Creates a value that is preserved across renders
- 🔄 Triggers a re-render when it changes using the reducer pattern

### `useMemo`
- 🧮 Cache the result of a calculation between renders

### `useLayoutEffect`
- 🎨 Synchronize a component with some external system **before** the browser paints the screen

### `useSyncExternalStore`
- 🔌 Subscribe to an external store

### `useEffectEvent`
- 🎯 Encapsulate a side effect that synchronizes your component with some outside system

---

## 🔄 State Management Types

### 💻 Client State (Sync State)

1. **Client Owned** - It's always up to date
2. **Our State Only** - Only we can change it
3. **Usually Ephemeral** - It goes away when the browser is closed
4. **Synchronous** - It's instantly available

### 🌐 Server State (Async State)

1. **Server Owned** - What we see is only a snapshot
2. **Owned by Many Users** - Multiple users could change the data
3. **Persisted Remotely** - It exists across browsing sessions
4. **Asynchronous** - It takes time for data to go from the server to the client

---

## 🛠️ State Management Solutions

### 💻 Client State Management Options

- `useState`
- `useReducer`
- `Redux`
- `Zustand`

### 🌐 Server State Management Options

- `React Query`
- `SWR`
- `Apollo Client`
- `Relay`
- `URQL`

---

## 🚀 React Query

> **Note:** React Query is **not** a data fetching library. It's a **server state management library**.

It's an **async state manager** that is actually aware of the needs of server state.

### ✨ Features React Query Handles

- 🔄 **Polling**
- 💾 **Cache Management**
- ❌ **Request Cancellation**
- 🎯 **Data Selectors**
- 📴 **Offline Support**
- 🔁 **Auto Refetching**
- 📜 **Scroll Restoration**
- ✏️ **Mutation Handling**
- 🔗 **Dependent Queries**
- 🗑️ **Cache Invalidation**
- ♾️ **Infinite Scrolling**
- 📄 **Pagination**
- ⚡ **Optimistic Updates**
- 🔄 **Background Refetching**

---

## 📦 Package Naming

### Why `@tanstack/react-query` not `react-query`?

**TanStack** is the organization that maintains React Query along with other libraries like:
- `react-table`
- `react-virtual`
- etc.

Using the **scoped package name** (`@tanstack/react-query`) helps to:
- ✅ Avoid naming conflicts
- 📌 Indicate that it is part of the TanStack suite of tools

---

## 🎯 Query Client

The **Query Client** provides a set of features to manage server state effectively, including:

- 📍 The location where all the data lives
- 📦 Contains and manages the cache
- 💾 `this.cache = new Map();` - Stores cached query results

### ⚠️ Important Setup Rule

You need to make sure the **Query Client is outside of your React component tree** so that it is **not recreated on every render**.

---

## 🔌 QueryClientProvider

Next is **QueryClientProvider** - wrap your app with it and pass in the query client instance.

### 🔍 How It Works

React Query uses the **context under the hood** to make the query client available to all components in the tree.

> **Note:** Not for state management - used for **dependency injection**.

---

## 🔄 Re-rendering Behavior

It will re-render only when the data changes or the fetching state changes.

### 🤔 Key Questions

- How does it know what data to use?
- How does it know where to get the data from?

---

## 🔑 Query Key

**Query Key** is the unique identifier for each query in React Query. It is used to cache and retrieve data associated with a specific query.

The query key can be:
- 📝 A simple string
- 📋 A more complex array that includes parameters to uniquely identify the query

---

## ⚙️ Query Function

**Query Function** is a function that fetches the data for a specific query. It is responsible for:
- 🌐 Making the actual data request (such as an API call)
- 📥 Returning the fetched data

---

## ✅ Requirements

1. 🔑 The **query key** must be **unique**
2. ⚡ The **query function** must **return a promise**


---

## 🔄 Deduplication

### How It Works

If we call the function twice with the same key, we get the same result.

> **Example:** If you guess the UI is two different lucky numbers, you are wrong! They are the same because React Query caches the result based on query key.

### 🌟 Main Feature

**Deduplication** is one of the main features of React Query.

#### Process:
1. 💾 Put the value on the cache if the query key is the same
2. 🔄 Take the value from cache instead of calling the query function again

### 🎯 Benefits

This is useful when you have multiple components that need the same data:
- ✅ Instead of calling the API multiple times, React Query will call it **once**
- 📤 Share the result with all the components
- 🔗 Even if it's different component instances, as long as the query key is the same, React Query will share the result

---

## 👁️ Observer Pattern

The **Observer Pattern** is used in React Query to achieve this functionality.

### How It Works:
- 🔄 When the data is updated, **all the components** that are using the same query key will be updated automatically
- 🏢 This is very useful in **large applications** where multiple components need the same data

---

## 🔄 The Query Life Cycle

### 📊 Query Status

The query can have three states:

- ⏳ **Pending** - The query is currently being fetched
- ✅ **Fulfilled** - The query has been successfully fetched
- ❌ **Rejected** - The query has failed to fetch

### 🎯 Two Ways to Check Status

**Method 1:** Using status string
```javascript
status === 'pending', 'success', 'error'
```

**Method 2:** Using boolean flags
```javascript
isLoading, isError, isSuccess, isFetching
```

---

## 🏗️ Rebuilding React Query from Scratch

### 💾 What is Cache and How Does It Manage It?

A **cache** is a piece of software that stores data so future requests for that data can be served faster.

In JavaScript:
```javascript
this.cache = new Map();
```

---

## 🛡️ Preventing Re-renders

### How do we prevent our component from re-rendering on every update?

This is where **observers** help us!

### 👁️ Observers

**Observers** are the glue between the query cache and any React components, and they **live outside the React component tree**.

#### Structure:
- 📦 It's an object with a `subscribe` method and a `notify` method

#### How It Works:
1. 🔌 When a component wants to use some data from the cache, it creates an observer and subscribes to it
2. 🔔 When the data in the cache changes, the observer notifies all the components that are subscribed to it

---

## 🔌 The QueryClient Provider

The **QueryClientProvider** is a React component that provides the query client to the rest of the app.

- 🌐 It uses **React Context** under the hood to make the query client available to all components in the tree

---

## 🪝 The useQuery Hook

The **useQuery** hook is the main way to fetch data in React Query.

### 📋 Parameters

It takes two arguments:
1. 🔑 **Query Key** - A unique identifier for the query
2. ⚙️ **Query Function** - A function that fetches the data for the query

### 🔄 How It Works

When you call `useQuery`:

1. 👁️ It creates an observer and subscribes to it
2. 🔍 It then checks the cache to see if there is any data for the query key
3. ✅ **If there is** - It returns the data from the cache
4. ❌ **If there isn't** - It calls the query function to fetch the data
5. 💾 Once the data is fetched, it is stored in the cache
6. 🔔 All the components that are subscribed to the observer are notified

---

## ⚠️ Strict Mode

In **development environment**, Strict Mode will aggressively uncover:
- 🔍 Renders that are not pure
- ⚡ Side effects that have been incorrectly managed
- 
---

## 🎯 What is React Query?

React Query is an **async promise-based state manager**.

All it cares about is:
- 📊 Status of data
- 🔄 Its status

---

## 🔧 ESLint Plugin

```bash
npm i @tanstack/eslint-plugin-query
```

This is for **linting React Query hooks**. It's useful to avoid mistakes while using React Query.

---

## ⏰ Stale Time

**Stale Time** = How long data is considered fresh. During this time, React Query will **not** refetch data in background.

- ⚙️ **Default stale time is 0ms** - Meaning data is always stale
- 💡 **Important:** Stale data < No data

---

## 🔄 When React Query Fetches Data

React Query fetches data when:

1. 🔑 The query key changes
2. 👁️ A new observer is mounted with `useQuery`
3. 🪟 The window receives a focus event
4. 🌐 The device goes online

---

## ⚙️ Refetch Configuration

### `refetchOnMount = true`
Every time component mounts, it will refetch data in background

### `refetchOnWindowFocus = true`
Every time window gets focus, it will refetch data in background

### `refetchOnReconnect = true`
Every time device goes online, it will refetch data in background

---

## 📝 Key Principles

1. 💾 Queries will **always** return data from the cache
2. ⚡ Queries are **instantly considered stale** by default
3. 🔄 Triggers will cause stale queries to be refetched
4. 🤔 Think about the **stale time** for each resource

---

## 🗑️ Automatic Garbage Collection of Unused Queries

### What is Garbage Collection?

**Garbage Collection** is a form of memory management where memory that has been allocated by a program will be automatically released when no longer needed.

### 🎯 React Query Does It Well

React Query uses **gcTime** (garbage collection timeout) to remove unused queries from cache.

#### Example:
- 🔍 On search, if you use the same search term again, it will use the cached data if it's still in cache
- ⏱️ If you enable gcTime, it will remove unused queries from cache after the specified time


---

## 📊 Polling Data

### 🔄 Key Concepts

- 💾 Query will always return data from the cache
- ⚡ Queries are instantly considered stale by default
- 🔄 Triggers will cause stale queries to be refetched

### What is Polling?

**Polling** means refetching data at regular intervals.

### ⏱️ refetchInterval

Set a time, then query will refetch the data automatically.

#### 💡 Best Use Case:
`refetchInterval` is best suited for scenarios where:
- 📈 You have data that changes often
- 🔄 You always want the cache to be as up to date as possible

---

## 🌐 Fetching Data

### Types of Fetching:
- 📌 **Static endpoints**
- 🔀 **Dynamic parameters**
- 🎯 **On-demand refetching**

---

## 🔀 Multiple Requests in One Query Function

### ✅ Pros
- 🎯 Single error and loading state

### ❌ Cons
- 💾 Data is cached in a single entry
- 🔄 Both fetch and refetch together
- ⚠️ They will error together
- 🚫 There's no deduplication for either request

### 💡 Better Approach:
If we cache them **separately**, we will have more flexibility.

---

## 🦥 Lazy Queries

**Lazy Queries** = Waiting for user input, then query will run.

---

## 🔗 Dependent Queries

**Dependent Queries** = One query depends on the result of another query.


---

## ⚡ Parallel Queries

### What Are Parallel Queries?

In real life, you will not always fetch from one resource. Sometimes you need to fetch from **multiple resources at the same time** - these are called **parallel queries**.

> 💡 **Rule of thumb:** The more you can do in parallel, the better.

### 🔧 Using `useQueries` Hook

In this case, the best way to use is the **`useQueries`** hook from React Query.

#### 🎯 Features:
- ✨ Enables the ability to create an arbitrary number of queries based on some input
- 🔄 Gives you the flexibility to create an arbitrary number of queries all in parallel
- 📊 Derive any value you need from all the queries as a whole

---

## 🚀 Prefetching

To avoid loading indicators, we use **prefetching on mouse enter event**.

⚠️ **Note:** It's entirely likely that even with prefetching, the user will still see a loading indicator if the response is slow.

---

## 📄 Pagination

### What is Pagination?

**Pagination** is a technique to split large data sets into smaller chunks or pages.

### 🎯 Benefits:
- ⚡ Improves performance
- 👤 Enhances user experience
- 📉 Reduces the amount of data that needs to be loaded and displayed

### 📊 Metadata

Along with data, the response contains **metadata** about the pagination state, such as:
- 📍 Current page
- 📚 Total pages
- 🔢 Items per page

---

## ♾️ Infinite Scroll

### What is Infinite Scrolling?

**Infinite scrolling** is a technique where more data is loaded as the user scrolls down the page.

### 🎯 Benefits:
- 🌊 Creates a seamless browsing experience
- 🔄 Users can continuously scroll through content
- 🚫 No need to click on pagination buttons

### 💾 Cache Strategy

We need a **single cache entry** that we can append to every time we get new data.

---

## 🪝 useInfiniteQuery Hook

Instead of managing the page state in React, the **`useInfiniteQuery`** hook from React Query will manage it for you.

### 🔄 How It Works:

1. 📝 You provide a **query function** that fetches a page of data
2. ➡️ You provide a **`getNextPageParam`** function that tells React Query how to get the next page parameter from the last page of data
3. 🤖 React Query will automatically call the query function with the correct page parameter when you call `fetchNextPage`
4. 💾 It will also manage the cache for you, appending new pages of data to the existing cache entry

### 🧩 Combining Dependent and Lazy Queries

You can combine dependent and lazy queries by using the **`enabled`** option in `useQuery`.

This allows you to wait for certain conditions to be met before executing a query.

---

## 🔑 Important Notes on useInfiniteQuery Hook

### Single Cache Entry:
- 📦 An infinite query is only **one cache entry**
- 🔄 While each page is a separate fetch, they eventually form one long list in our UI

### 🔄 Consistency

With infinite queries, React Query ensures that **all pages of data are consistent** with each other.

> ⚠️ **Rule:** If one page becomes stale, **all pages become stale**.
>

---

## 🔄 Mutation

This is important to maintain **data integrity** across the entire dataset.

---

## 📊 Using Query vs Mutation

### 🔍 Using Query for Updating the Dataset on the Database

- ⚡ Queries run **immediately** when the component mounts
- 🔄 Queries are meant to run **multiple times**
- 🔁 Queries should be **idempotent**

### ✏️ Using Mutation for Updating the Dataset on the Database

- 🎯 Mutations run **only when we call them**

---

## 🪝 useMutation Hook

Manages the **lifecycle of a mutation** rather than directly performing the mutation itself.

### 📊 What You Get:

You will get **status flags** and **lifecycle callbacks** to track the progress of a mutation:

- ✅ **onSuccess** - Called when mutation succeeds
- ❌ **onError** - Called when mutation fails
- 🏁 **onSettled** - Called when mutation completes (success or error)

---

## 🔄 Cache Validation

After server state has changed, it's usually a good idea to verify you have the **latest data in the cache**.

---

## 🔍 Fuzzy Query Key Matching

React Query provides utilities to help with this, such as:
- 🗑️ **`invalidateQueries`** - Invalidate queries based on partial key matches
- 🔄 **`refetchQueries`** - Refetch queries based on partial key matches

These allow you to refresh data in the cache based on **partial matches** of query keys.

### 💡 Important Note:

If you structure your query keys appropriately, relying on **fuzzy matching**, you can invalidate a whole subset of queries with a single call to `invalidateQueries`.

---

## ⚡ Optimistic Updates for Mutations

### 🎯 Principle:

If you already know what the final UI should look like after the mutation:
1. 👁️ Show the user the result of their action **immediately**
2. 📡 Then send the mutation to the server in the background

### 💡 When to Use:

Anytime the user needs **instant feedback** of an async operation, optimistic updates are usually the way to go.

---

## ⚙️ Customizing Defaults

React Query gives you a lot of **flexibility** when it comes to customizing default behaviors.

### 📋 Query Defaults

**`queryDefaults`** will allow you to set default options for all queries.

---

## 🔑 Managing Query Keys

### 📈 As Applications Grow

If your application grows, it's complex to manage query keys manually.

### 🏭 Best Practice - Query Key Factory:

1. 🏗️ Create **one factory per feature**
2. 🏷️ Have all query keys in that factory start with the **same prefix**
3. 📝 Usually the name of the feature


---

## ⚡ Performance Optimization

When it comes to rendering, it's usually a good idea to find ways to make the component **renders faster** rather than **render less often**.

---

## 🔗 Referential Equality

### How React.memo Works

The way React.memo works is it only changes if the **reference of the props changes**. But that brings up the question: **How does React determine if the reference has changed?**

### What is Referential Equality?

**Referential equality** means that two objects are considered equal if they point to the **same location in memory**.

### 📊 How It Works:

- ✅ For **primitive values** (like numbers and strings), referential equality works as expected
- ⚠️ For **objects and arrays**, it's a bit trickier because even if two objects have the same properties and values, they are **not considered equal** unless they point to the same location in memory

---

## 🧠 Memoization Hooks

### `useMemo`
Lets you **cache the result of a calculation** between renders

### `useCallback`
Lets you **cache a function itself** between renders

---

## 🔍 What's It Doing with React Query?

React Query uses `useMemo` and `useCallback` internally to optimize the performance of its hooks and components.

---

## 🔧 How Do We Solve This?

### 🌲 Structural Sharing

**Structural sharing** is a technique where we reuse parts of an object or array that have **not changed**.

#### How It Works:

1. 🔄 Instead of creating a new object or array every time we make a change
2. ♻️ We create a new object or array that **shares the unchanged parts** with the previous version
3. ✅ This way we can ensure that the references of the unchanged parts remain the same
4. 🎯 React can correctly determine if the props have changed or not

---

## 👁️ Observers and Referential Equality

### What Are Observers?

React Query uses **observers** to manage the state of its queries and mutations.

**Observers** are objects that:
- 📡 Subscribe to changes in the query or mutation state
- 🔔 Notify the components when there are changes

### 🎯 Performance Optimization

To optimize the performance of observers, React Query uses **structural sharing** to ensure that the references of the unchanged parts of the query or mutation state remain the same.

This way:
- ✅ React can correctly determine if the props have changed or not
- 🚫 Avoid unnecessary re-renders

---

## 📊 Tracked Properties

React Query uses a technique called **tracked properties** to optimize the performance of its hooks and components.

### What Are Tracked Properties?

**Tracked properties** are properties of an object that are **monitored for changes**.

### 🔄 How It Works:

1. 👀 When a tracked property changes, React Query notifies the components that are subscribed to the observer
2. 🎯 This way React Query can ensure that **only the components that are affected by the change** are re-rendered
3. ⚡ This way we can avoid unnecessary re-renders and improve the performance of our application

---

## ⚠️ Important Warning

When using `useQuery`, **do not** use it with rest operators like:
- 🚫 Spread operator (`...`)
- 🚫 `Object.assign`

---

## 🔄 Refetch Signals

React Query will refetch when:

1. 🔑 The query key changes
2. 👁️ A new observer is mounted with `useQuery`
3. 🪟 The window receives a focus event
4. 🌐 The device goes online


---

## ❌ Error Handling

### What happens when things fail?

---

## ⚠️ Common Mistake with Try-Catch

If using `try-catch` and catch only logging (not returning), there are issues:

- 🚫 React Query doesn't know the status of the query unless we tell it
- 🔄 React Query won't be able to refetch or retry if it doesn't know the query failed

---

## ✅ Proper Error Handling

### Throwing Errors

We can **throw errors inside the query function**.

Then:
1. ✅ React Query will be able to catch it
2. 🔴 Set the status to error
3. 📊 Status we can use to identify the error state in the UI

---

## 🐛 Debugging Errors from Async Data Can Be Difficult

---

## ✔️ Validation

We can use **Zod** or **Yup** to validate the data we get from the server.

**Zod** lets you:
- 📋 Define the expected shape of a response
- ✅ Validate the response against schema

---

## 🎯 Zod Benefits

- 💾 Saves memory in the cache by stripping unused data
- ⚠️ Throws error when data is not in expected format

---

## ⚖️ Zod Tradeoffs

- ⏱️ Runtime type checking adds overhead
- 📦 Additional dependency
- 💰 Expensive for large data structures

---

## 📴 Offline Support

React Query will **pause queries when offline**.

---

## 💾 Persisting Queries and Mutations

### When React Query Loses Its Cache:

React Query loses its cache when:

1. 🚪 A user closes the browser tab
2. 🌐 Navigates to another site
3. 🔄 Reloads the page

---

## 🗄️ React Query Have Persisters

**Persisters** take whatever is in the query cache and persist it to a more permanent location.

---

## 🎯 When to Use Persister

1. 🔄 When you want to maintain cache **across sessions**
2. ⚡ When you want to improve load times by **hydrating cache from local storage or indexed DB**

---

## 📦 Persister Packages

### Synchronous Data
```bash
@tanstack/query-sync-storage-persister
```

### Asynchronous Data
```bash
@tanstack/query-async-storage-persister
```

---

## ⚠️ Important Note

Get **gcTime as equal or greater than maxAge** to avoid your queries being garbage collected and removed from the storage too early.

---

## 🔄 What Do We Do When There Is No Data in the Cache?

### During Restoration:

When we're waiting for restoration to occur:

1. 📊 React Query will render the data as usual
2. ⏳ But it will not have any queries until the restoration is complete
3. ✅ After the data is restored, React Query will re-render the components with the restored data

---

## 💾 Persisting Mutations Too

Not only queries - we can persist **mutations too**!

### 📝 Note:
It's pretty rare.

---

## 🎯 Use Case for Persisting Mutations

### Offline Support

We can use it for **offline support**:

1. 📴 User performs mutations while offline
2. 🌐 When back online, the mutations are re-executed

### 📝 Example:

Suppose someone is writing a blog post while offline:

1. 💾 We can persist the mutation to local storage
2. 🌐 When back online, the mutation is re-executed to save the blog post to the server

testing queries and mutations

the more you tests behave like your actual usrs the more confidence they can give you