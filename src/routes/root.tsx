import { TodayButton, CalendarButton } from '../components/Button/Button';
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <nav>
            <aside>
                <div>
                    <Link to={`today`}>
                        <TodayButton />
                    </Link>
                </div>
                <div>
                    <Link to={`calendar`}>
                        <CalendarButton />
                    </Link>
                </div>
                </aside>
            </nav>
        </>
    )
}