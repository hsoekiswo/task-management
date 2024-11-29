import { useState, createContext } from 'react'
import { createPortal } from 'react-dom';
import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Create from './create';
import { TodayButton, CalendarButton } from '../components/Button/index';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateContext = createContext({
    taskUpdated: false,
    notify: () => {}
});

export default function Root() {
    const [showCreate, setShowCreate] = useState(false);
    const [taskUpdated, setTaskUpdated] = useState(false);

    const informUpdate = () => {
        setTaskUpdated(prev => !prev);
    }

    const notifySubmit = () => toast("Task submitted!");
    const notifyUpdate = () => toast("Task updated!")

    return (
        <UpdateContext.Provider value={{ taskUpdated, notify: notifyUpdate }}>
            <main onClick={() => setShowCreate(false)}>
                <Outlet />
                <div className="new-task-container">
                    <button
                        onClick={(e) => {e.stopPropagation(); setShowCreate(true);}}
                        className='btn-new-task'
                    >
                        +
                    </button>
                </div>
            </main>
            <nav>
                <aside>
                    <div className='nav-btn-container'>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                            }
                            to={``}>
                            <TodayButton />
                        </NavLink>
                    </div>
                    <div className='nav-btn-container'>
                        <NavLink
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                    ? "pending"
                                    : ""
                            }
                            to={`calendar`}>
                            <CalendarButton />
                        </NavLink>
                    </div>
                </aside>
            </nav>
            <div>
                {showCreate && createPortal(
                    <Create
                        setShowCreate={setShowCreate}
                        informUpdate={informUpdate}
                        onNotify={notifySubmit}
                    />,
                    document.body
                )}
            </div>
            <ToastContainer
                    autoClose={2000}
                    position="top-right"
                    theme="dark"
                    toastClassName={() =>
                    "bg-gray-600 relative flex m-1 p-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                    }
                    bodyClassName={() => "text-sm font-white font-med block p-3"}
            />
        </UpdateContext.Provider>
    )
}