import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './routes/root';
import Today from './pages/Today';
import Calendar from './pages/Calendar';
import ErrorPage from './error-page.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/today',
                element: <Today />,
            },
            {
                path: '/calendar',
                element: <Calendar />,
            }
        ]
    },
    
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <App /> */}
        <RouterProvider router={ router } />
    </StrictMode>
)
