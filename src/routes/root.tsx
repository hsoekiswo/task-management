import { useState, createContext } from 'react'
import { createPortal } from 'react-dom';
import { TodayButton, CalendarButton } from '../components/index';
import { Outlet, Link } from 'react-router-dom';
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
                    <div>
                        <Link className='btn-aside' to={``}>
                            <TodayButton />
                        </Link>
                    </div>
                    <div>
                        <Link className='btn-aside' to={`calendar`}>
                            <CalendarButton />
                        </Link>
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