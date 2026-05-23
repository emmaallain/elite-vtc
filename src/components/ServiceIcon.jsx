export function ServiceIcon({ type }) {
  switch (type) {
    case 'airport':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="service-icon" fill="none">
          <path
            d="M3 16.2h18M7.2 16.2l1.4-5.1 2.2-.8 2.2 1.4 1.4 4.5M8.8 10.3l.9-4.6m5.5 3.5 1.4-5.5M5.2 19.2h13.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'hourly':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="service-icon" fill="none">
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 7.7v4.6l3.2 2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'event':
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="service-icon" fill="none">
          <path
            d="M5.5 7.4h13M7.2 4.8v3.2M16.8 4.8v3.2M6.3 7.4v10.4h11.4V7.4M9 11h6M9 14h4.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="service-icon" fill="none">
          <path
            d="M12 4.8 4.9 9v6l7.1 4.2 7.1-4.2V9L12 4.8Z M12 9v10.2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
