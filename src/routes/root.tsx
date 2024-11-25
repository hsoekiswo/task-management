import { useState, createContext } from 'react'
import { createPortal } from 'react-dom';
import { TodayButton, CalendarButton } from '../components/Button/index';
import { Outlet, NavLink } from 'react-router-dom';
import Create from './create';

export const UpdateContext = createContext(false);

export default function Root() {
    const [showCreate, setShowCreate] = useState(false);
    const [taskUpdated, setTaskUpdated] = useState(false);

    const informUpdate = () => {
        setTaskUpdated(prev => !prev);
    }

    return (
        <UpdateContext.Provider value={taskUpdated}>
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
                            // className='btn-aside'
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
                    />,
                    document.body
                )}
            </div>
        </UpdateContext.Provider>
    )
}