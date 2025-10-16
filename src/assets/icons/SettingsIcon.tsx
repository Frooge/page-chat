interface IconProps {
  className?: string;
  size?: number;
}

export function SettingsIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6m7.07-1.07l-4.24-4.24M9.17 14.83L4.93 19.07M23 12h-6m-6 0H1m18.07-7.07l-4.24 4.24M9.17 9.17L4.93 4.93" />
    </svg>
  );
}
