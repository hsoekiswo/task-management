import { useState } from 'react'
import { createPortal } from 'react-dom';
import { TodayButton, CalendarButton } from '../components/Button/Button';
import { Outlet, Link } from 'react-router-dom';
import Create from './create';

export default function Root() {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <>
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
                    />,
                    document.body
                )}
            </div>
        </>
    )
}