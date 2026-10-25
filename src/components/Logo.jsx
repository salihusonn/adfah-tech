export default function Logo({ onClick, className = '' }) {
  return (
    <a
      href="#home"
      className={`logo ${className}`}
      aria-label="AdFah Tech home"
      onClick={onClick}
    >
      <svg className="logo__icon" viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M24 3.5 42 13.7v20.6L24 44.5 6 34.3V13.7Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m15.5 31.5 8.5-17 8.5 17M19 26h10"
          fill="none"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M34.5 10.5h4M36.5 8.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="38.5" cy="10.5" r="1.6" fill="currentColor" />
      </svg>
      <span className="logo__copy">
        <span className="logo__name">AdFah <strong>Tech</strong></span>
        <span className="logo__tagline">IT &amp; DIGITAL SOLUTIONS</span>
      </span>
    </a>
  );
}
