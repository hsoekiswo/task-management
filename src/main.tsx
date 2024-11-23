import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Index from './routes/index.tsx';
import Root from './routes/root';
import { loader as indexLoader } from './routes/index.tsx';
import Calendar from './routes/calendar';
import Task from './routes/task';
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
                index: true,
                element: <Index />,
                loader: indexLoader,
            },
            {
                path: '/calendar',
                element: <Calendar />,
            },
            {
                path: '/tasks/:taskId',
                element: <Task />
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
