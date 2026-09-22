export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  intro: string;
  included: string[];
  process: ServiceProcessStep[];
  tags: string[];
};

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design",
    tagline: "Sites that load fast and sell harder.",
    description:
      "Fast, conversion-focused websites that make developers and D2C brands look inevitable.",
    intro:
      "Your website is the one asset every lead sees before they talk to you. We design and build sites that load fast, tell the story clearly, and turn interest into enquiries. Structured for the way buyers actually browse.",
    included: [
      "Discovery, sitemap & conversion planning",
      "UI design aligned to your brand system",
      "Responsive front-end development",
      "CMS setup so your team can publish",
      "Performance, SEO basics & launch support",
    ],
    process: [
      {
        title: "Discover",
        description:
          "We map your audience, offers, and the decisions a visitor has to make. Before any pixels.",
      },
      {
        title: "Design",
        description:
          "Page-by-page UI design in your brand's voice, reviewed with you before a line of code.",
      },
      {
        title: "Build",
        description:
          "Fast, accessible front-end development with a CMS your team can actually use.",
      },
      {
        title: "Launch",
        description:
          "Testing, performance passes, and post-launch tuning against real visitor behavior.",
      },
    ],
    tags: ["Web", "UX/UI"],
  },
  {
    slug: "branding-packaging",
    title: "Branding & Packaging",
    tagline: "Identity that owns the shelf.",
    description:
      "Identity and packaging systems built to stand out on shelf, screen, and site.",
    intro:
      "From naming to the box in the customer's hand, we build brand systems that hold together everywhere they show up. Consistent on Instagram, unmistakable on a shelf, and easy for your team to keep using.",
    included: [
      "Positioning & brand messaging",
      "Logo, visual identity & brand guidelines",
      "Packaging design & label systems",
      "Launch collaterals & templates",
      "Asset handover for internal teams",
    ],
    process: [
      {
        title: "Understand",
        description:
          "Category audit and founder sessions to find what your brand can own.",
      },
      {
        title: "Define",
        description:
          "Positioning, personality, and visual direction agreed before design scales.",
      },
      {
        title: "Design",
        description:
          "Identity and packaging built as one system, tested at real sizes and channels.",
      },
      {
        title: "Roll out",
        description:
          "Guidelines, print-ready files, and launch assets so execution stays on-brand.",
      },
    ],
    tags: ["Identity", "Packaging"],
  },
  {
    slug: "content-production",
    title: "Content Production",
    tagline: "Reels built to stop the scroll.",
    description:
      "Reels, shoots, and social-first video produced on a cadence your feed can keep up with.",
    intro:
      "Content is how brands stay present between campaigns. We plan, shoot, and edit short-form video and creative assets built for the platforms your audience actually scrolls. Ready to post, not ready to re-edit.",
    included: [
      "Content calendars & shoot planning",
      "On-location and studio shoots",
      "Reels, shorts & social-first edits",
      "Product & property films",
      "Design assets for feed and stories",
    ],
    process: [
      {
        title: "Plan",
        description:
          "A monthly content plan tied to launches, seasons, and what performed last month.",
      },
      {
        title: "Shoot",
        description:
          "Efficient shoot days: property walkthroughs, product sets, founder clips, UGC.",
      },
      {
        title: "Edit",
        description:
          "Platform-native cuts with hooks, captions, and sound designed to stop the scroll.",
      },
      {
        title: "Publish",
        description:
          "Delivered ready to post, with performance notes feeding the next cycle.",
      },
    ],
    tags: ["Video", "Social"],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    tagline: "Your feed, handled like an in-house team.",
    description:
      "End-to-end social: strategy, posting, community, and reporting, handled.",
    intro:
      "We run your social channels like an in-house team: a clear voice, a consistent posting rhythm, timely replies, and monthly reporting that ties activity to pipeline. Not vanity metrics.",
    included: [
      "Channel strategy & tone of voice",
      "Monthly content calendars",
      "Scheduling & publishing",
      "Community management & replies",
      "Monthly performance reporting",
    ],
    process: [
      {
        title: "Set up",
        description:
          "Audit of current channels, voice guide, and a 90-day content direction.",
      },
      {
        title: "Run",
        description:
          "Daily publishing, community replies, and stories handled by our team.",
      },
      {
        title: "Measure",
        description:
          "Monthly reports on reach, engagement, saves, and enquiries generated.",
      },
      {
        title: "Refine",
        description:
          "What works gets repeated; what doesn't gets cut. Every month.",
      },
    ],
    tags: ["Social", "Community"],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    tagline: "Creators that arrive pre-trusted.",
    description:
      "Creator partnerships sourced, briefed, and managed for reach you can trust.",
    intro:
      "The right creators do what ads can't. They arrive pre-trusted. We source, negotiate, and manage influencer partnerships end to end, from nano-creators who drive saves and DMs to campaign-scale collaborations.",
    included: [
      "Creator sourcing & vetting",
      "Outreach, negotiation & contracts",
      "Briefs, seeding & campaign coordination",
      "Content review & usage rights",
      "Performance tracking & reporting",
    ],
    process: [
      {
        title: "Match",
        description:
          "We shortlist creators whose audience actually overlaps your buyer.",
      },
      {
        title: "Brief",
        description:
          "Clear briefs with room for the creator's voice. Scripted content reads as ads.",
      },
      {
        title: "Run",
        description:
          "Coordination, approvals, and posting windows managed by our team.",
      },
      {
        title: "Report",
        description:
          "Reach, engagement, code redemptions, and DM volume in one report.",
      },
    ],
    tags: ["Creators", "Reach"],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Leads and ROAS, not impressions.",
    description:
      "Meta and paid social campaigns managed for leads and ROAS. Not impressions.",
    intro:
      "We build and manage paid campaigns with one job: qualified leads at a cost that makes sense. Creative testing, funnel structure, and weekly optimisation. Reported in the numbers your accountant cares about.",
    included: [
      "Meta & paid social campaign setup",
      "Funnel and landing page strategy",
      "Creative testing & iteration",
      "Retargeting & audience build-out",
      "Weekly optimisation & ROAS reporting",
    ],
    process: [
      {
        title: "Instrument",
        description:
          "Tracking, pixels, and conversion events verified before spend begins.",
      },
      {
        title: "Launch",
        description:
          "Structured campaigns with creative variants built to be tested, not admired.",
      },
      {
        title: "Optimise",
        description:
          "Weekly budget shifts toward winners; losers cut without sentiment.",
      },
      {
        title: "Scale",
        description:
          "Proven angles expanded into new audiences and formats while CPA holds.",
      },
    ],
    tags: ["Meta Ads", "Paid"],
  },
  {
    slug: "real-estate-lead-generation",
    title: "Real Estate Lead Generation",
    tagline: "From first enquiry to signed deal.",
    description:
      "Campaigns, landing pages, CRM follow-up, and sales support for developers.",
    intro:
      "Real estate deals don't close from a form fill. They close from follow-up. We run the full loop: campaign creative, landing pages, lead capture into your CRM, and the WhatsApp and call workflows that keep sales talking to warm buyers.",
    included: [
      "Project positioning & campaign creative",
      "Landing pages & enquiry forms",
      "Meta campaigns targeted to buyers",
      "CRM setup, tagging & lead routing",
      "Follow-up workflows & sales enablement",
    ],
    process: [
      {
        title: "Position",
        description:
          "Project, price band, and buyer profile defined before a rupee is spent.",
      },
      {
        title: "Capture",
        description:
          "Landing pages and campaigns built to convert enquiries. Not collect clicks.",
      },
      {
        title: "Route",
        description:
          "Leads land in your CRM with source tags and instant WhatsApp follow-up.",
      },
      {
        title: "Close",
        description:
          "We sit with your sales team on scripts, cadence, and what the data says.",
      },
    ],
    tags: ["Real Estate", "Leads"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
