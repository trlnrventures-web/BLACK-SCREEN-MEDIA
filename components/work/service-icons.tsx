type IconProps = {
  className?: string;
};

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const serviceIcons = {
  "website-design": function WebsiteIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <rect x="3" y="4.5" width="18" height="15" rx="2" />
        <path d="M3 9.5h18" />
        <path d="M6.5 7.25h.01M9 7.25h.01" />
      </svg>
    );
  },
  "branding-packaging": function PackagingIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <path d="M21 8.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5V8.2" />
        <path d="M3.3 8.2 4.9 4.9A1.5 1.5 0 0 1 6.2 4h11.6a1.5 1.5 0 0 1 1.3.9l1.6 3.3" />
        <path d="M3 8.2h18" />
        <path d="M12 9.5v9" />
      </svg>
    );
  },
  "content-production": function ReelIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <rect x="2.5" y="5" width="19" height="14" rx="3" />
        <path d="M10.5 9.5 15 12l-4.5 2.5z" fill="currentColor" stroke="none" />
        <path d="M6 5.2v1.7M9 5v1.7M15 5v1.7M18 5.2v1.7M6 17.3V19M9 17.3V19M15 17.3V19M18 17.3V19" />
      </svg>
    );
  },
  "social-media-management": function ChatIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.3-3.9-.9L3 20.5l1.4-5.6a8.5 8.5 0 1 1 16.6-3.4z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2" />
      </svg>
    );
  },
  "influencer-marketing": function MegaphoneIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <path d="M3 11l13-5v12l-13-5z" />
        <path d="M16 8.5l5-1v9l-5-1" />
        <path d="M6.5 15.5V18a2 2 0 0 0 2 2h1a1.5 1.5 0 0 0 1.5-1.5L11 18" />
      </svg>
    );
  },
  "performance-marketing": function TargetIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <path d="m15 9 3-3" />
        <path d="M18 6v2.5M18 6h-2.5" />
      </svg>
    );
  },
  "real-estate-lead-generation": function FunnelIcon({ className }: IconProps) {
    return (
      <svg {...base} className={className}>
        <path d="M3.5 5 10 14v6l4-2v-4l6.5-9z" />
        <path d="M3.5 5h17" />
      </svg>
    );
  },
} as const;

export type ServiceSlug = keyof typeof serviceIcons;

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = serviceIcons[slug as ServiceSlug] ?? serviceIcons["website-design"];
  return <Icon className={className} />;
}