export type ClientLogo = {
  src: string;
  label: string;
};

// PLACEHOLDER LABELS. The 26 logo files in /public/clients are real client
// wordmarks but are stored as client-01..client-26 with no name mapping yet.
// Replace `label` with the actual client/brand name before public launch.
// The known real clients (Stallions, Mansarovar Group, Akmas Perfumes) are
// called out below so a visual match can be confirmed.
export const clientLogos: ClientLogo[] = Array.from({ length: 26 }, (_, index) => ({
  src: `/clients/client-${String(index + 1).padStart(2, "0")}.png`,
  label: `Client ${String(index + 1).padStart(2, "0")}`,
}));