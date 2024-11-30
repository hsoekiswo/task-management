import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './routes/root';
import Index, { loader as indexLoader } from './routes/index.tsx';
import Calendar, { loader as calendarLoader } from './routes/calendar';
import Task from './routes/task';
import ErrorPage from './routes/error-page.tsx';
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
                loader: calendarLoader,
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
        <RouterProvider router={ router } />
    </StrictMode>
)
