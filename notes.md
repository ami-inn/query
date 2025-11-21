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

