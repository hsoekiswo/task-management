import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Today from './pages/Today.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <App /> */}
        <RouterProvider router={ router } />
    </StrictMode>
)
