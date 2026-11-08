export type NavLink = { href: string; label: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/donate/individual",
    label: "Donate",
    children: [
      { href: "/donate/sponsorships", label: "Sponsorships" },
      { href: "/donate/corporate", label: "Corporate" },
      { href: "/donate/individual", label: "Individual" },
      { href: "/donate/personalized", label: "Personalized Donation Page" },
      { href: "/donate/wishlist", label: "Wishlist" },
    ],
  },
  {
    href: "/volunteer/openings",
    label: "Volunteer",
    children: [
      { href: "/volunteer/current", label: "Current Volunteers" },
      { href: "/volunteer/openings", label: "Current Openings" },
    ],
  },
  { href: "/careers", label: "Careers" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
];
