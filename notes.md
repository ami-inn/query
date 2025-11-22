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

<!-- 5 -->

the query life cycle

query status 
pendin = the query is currently being fetched
fulfilled = the query has been successfully fetched
rejected = the query has failed to fetch
two ways
one is status === 'pending','success','error'
the other is isLoading, isError, isSuccess, isFetching

rebuilding react query from scratch
what is cache and how it manage it?
a cache is a piece of software that stores data so future requests for that data can be served faster
in js this.cache = new Map();

how do we prevent our component form re renderign on every update?
these wher observers help us
observers are the glue between the query cache and any react components and they live outside the react component tree
its an object with a subscribe method and a notify method
when a component wants to use some data from the cache it creates an observer and subscribes to it
when the data in the cache changes the observer notifies all the components that are subscribed to it

the queryclient provider
the queryclient provider is a react component that provides the query client to the rest of the app
it uses react context under the hood to make the query client available to all components in the tree

the usequery hook
the usequery hook is the main way to fetch data in react query
it takes two arguments a query key and a query function
the query key is a unique identifier for the query and the query function is a function that fetch
the data for the query 
when you call usequery it creates an observer and subscribes to it
it then checks the cache to see if there is any data for the query key
if there is it returns the data from the cache
if there isn't it calls the query function to fetch the data
once the data is fetched it is stored in the cache and all the components that are subscribed to the observer are notified


strictmode
in development environment strict mode will aggressively uncover renders that are not pure or that have incorrectly managed side effects