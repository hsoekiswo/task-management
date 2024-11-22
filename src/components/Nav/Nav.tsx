import { TodayButton, CalendarButton } from '../Button/Button'
import '../../index.css'

type NavProps = {
    onData: (data: string) => void;
}

function Nav({ onData }: NavProps) {
    const switchToday = () => {
        const data: string = 'today'
        onData(data)
    }

    const switchCalendar = () => {
        const data: string = 'calendar'
        onData(data)
    }

    return (
        <aside>
            <div>
                <TodayButton onClick={switchToday} />
            </div>
            <div>
                <CalendarButton onClick={switchCalendar} />
            </div>
        </aside>
    )
}

export default Nav;