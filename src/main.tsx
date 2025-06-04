import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import { AdvancedSearch } from './AdvancedSearch.tsx'
import { ItemDetails } from './ItemDetails.tsx'
import { Navigation } from './Navigation.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <main>
          <Outlet />
        </main>
      </>
      // add navbar & quick search
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/adv_search",
        element: <AdvancedSearch />
      },
      {
        path: "/item/:item_id",
        element: <ItemDetails />
      }
    ]
  }
]);

const query_client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={query_client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
