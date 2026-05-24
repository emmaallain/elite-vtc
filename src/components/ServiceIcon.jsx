import { MdEvent, MdFlightTakeoff, MdSchedule, MdWidgets } from 'react-icons/md'

export function ServiceIcon({ type }) {
  switch (type) {
    case 'airport':
      return <MdFlightTakeoff aria-hidden="true" className="service-icon" focusable="false" />
    case 'hourly':
      return <MdSchedule aria-hidden="true" className="service-icon" focusable="false" />
    case 'event':
      return <MdEvent aria-hidden="true" className="service-icon" focusable="false" />
    default:
      return <MdWidgets aria-hidden="true" className="service-icon" focusable="false" />
  }
}
