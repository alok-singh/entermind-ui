import "./styles.css";

const AppIcon = (props) => {
  return <svg className={`app-icon ${props.className || ''}`} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2L4 10V18C4 28 11 36 20 38C29 36 36 28 36 18V10L20 2Z" fill="url(#full-logo-gradient)" />
    <path d="M20 8L10 13V18C10 24 14 30 20 32C26 30 30 24 30 18V13L20 8Z" fill="white" fillOpacity="0.2" />
    <path d="M16 20L18.5 22.5L24 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="48" y="28" className={`fill-foreground ${props.textClassName || ''}`}>INTEGRITY</text>
    <defs>
      <linearGradient id="full-logo-gradient" x1="4" y1="2" x2="36" y2="38">
        <stop offset="0%" stopColor="#0066ff" />
        <stop offset="100%" stopColor="#00d68f" />
      </linearGradient>
    </defs>
  </svg>
};

export default AppIcon;