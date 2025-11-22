class QueryClient {
  cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  getQuery<T = any>(key: string): T | undefined {
    return this.cache.get(key);
  }

  setQuery<T = any>(key: string, data: T): void {
    this.cache.set(key, data);
  }

  //   data come from async response
  async obtain(key: string, queryFn: () => Promise<any>) {
    const data = await queryFn();
    if (data) {
      this.setQuery(key, data);
    }
  }
}

const queryClient = new QueryClient();
queryClient.getQuery("mediaDevices"); // undefined

// if we add a value to the cache querykey in memory format
queryClient.setQuery("mediaDevices", { devices: [] });
queryClient.getQuery("mediaDevices"); // { devices: [] }


await queryClient.obtain(
    "mediaDevices",
    () => navigator.mediaDevices.enumerateDevices()
)