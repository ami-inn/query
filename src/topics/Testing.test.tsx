import {render} from '@testing-library/react'
import Blog from '../components/Blog'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// retry logic better with use mocks for api calls
// npm install msw@latest --save-dev // mock service worker

function renderWithClient(ui: React.ReactElement) {
    const queryClient = new QueryClient({
        defaultOptions:{
            queries:{
                retry: false
            }
        }
    });
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    )
}
// you cAn call this function in before each test to wrap your component with queryclientprovider

describe('blog',()=>{
    test("success blog fetch", async()=>{
        const queryClient = new QueryClient();
        const rendered = render((
            <QueryClientProvider client={queryClient}>
                <Blog blogId={'1'}/>
            </QueryClientProvider>
        )
        )
    })
})

// you get error no queryclient set use queryclientprovider to wrap your component