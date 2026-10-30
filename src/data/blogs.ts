export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Textile Dyeing' | 'Technical Guides';
  author: string;
  role: string;
  date: string;
  readTime: string;
  summary: string;
  coverBadge: string;
  content: string[];
  keyTakeaways: string[];
  technicalParameters?: {
    label: string;
    value: string;
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'reactive-dyes-chemistry',
    slug: 'reactive-dyes-vinyl-sulfone-vs-triazine',
    title: 'The Chemistry of Reactive Dyes: Vinyl Sulfone vs. Bis-Monochlorotriazine on Cellulosic Fibres',
    category: 'Textile Dyeing',
    author: 'Technical Application Desk',
    role: 'Chief Dye Chemist, H. Gokaldas & Co.',
    date: 'February 12, 2025',
    readTime: '6 min read',
    coverBadge: 'Reactive Chemistry',
    summary: 'A deep dive into covalent fixation mechanisms of Reactive ME and HE dyes on cotton yarns, comparing alkali exhaustion kinetics, temperature windows, and washing-off efficiency.',
    keyTakeaways: [
      'Reactive dyes form true covalent ether (-C-O-C-) or ester bonds with cellulose hydroxyl groups, ensuring wash fastness rating 4-5.',
      'Vinyl Sulfone (VS) groups exhibit high reactivity at 60°C under moderate alkaline pH (10.8–11.2).',
      'Bis-Monochlorotriazine (HE) dyes feature double reactive centers offering fixation yields exceeding 82%.',
      'Controlling salt addition in partitioned stages prevents unlevel exhaustion and precipitation of dense shades.',
    ],
    technicalParameters: [
      { label: 'Fixation Temperature (ME)', value: '60°C' },
      { label: 'Fixation Temperature (HE)', value: '80°C - 85°C' },
      { label: 'Optimum Dyebath pH', value: '10.8 - 11.2 (Soda Ash)' },
      { label: 'Electrolyte (Glauber’s Salt)', value: '40 - 80 g/L (Depth-dependent)' },
      { label: 'Liquor Ratio (Exhaust)', value: '1:6 to 1:10' },
      { label: 'Washing Off Sequence', value: 'Cold rinse -> Warm rinse -> Soap at 95°C' },
    ],
    content: [
      'Reactive dyes represent the pinnacle of cotton, linen, and viscose coloration because they do not rely on mechanical entrapment; rather, they react chemically with the secondary hydroxyl groups of the anhydroglucose ring to become an integral component of the polymer chain.',
      'In cold and warm brand reactive dyes, two dominant reactive anchors dictate dyeing kinetics: the beta-sulphatoethylsulphone (precursor to vinyl sulfone, -SO2-CH=CH2) and monochlorotriazine (MCT). Under alkaline conditions provided by sodium carbonate or dilute caustic, elimination of the sulphate group occurs rapidly, generating the electrophilic vinyl sulfone moiety that participates in nucleophilic addition.',
      'For heavy depths such as Reactive Navy Blue ME2RL or Reactive Black B, the dual-anchor hetero-bifunctional chemistry provides resilience. If one bond hydrolyzes due to bath alkalinity, the secondary anchor secures covalent fixation, minimizing unfixed dye loss and drastically shortening the subsequent boiling-soap reduction sequence.',
      'Precision temperature ramping (1.5°C per minute) during the exhaustion phase prior to alkali addition is essential to achieve level penetration in dense warp beams and knitted cones. Pre-treating water to eliminate calcium and magnesium hardness below 5 ppm prevents sodium carbonate precipitation.',
    ],
  },
  {
    id: 'vat-dye-reduction-equilibrium',
    slug: 'vat-dye-reduction-kinetics-sodium-hydrosulfite',
    title: 'VAT Dye Reduction Kinetics: Controlling Sodium Hydrosulfite & Caustic Equilibrium',
    category: 'Technical Guides',
    author: 'Industrial Applications Lab',
    role: 'Senior Process Specialist',
    date: 'January 28, 2025',
    readTime: '7 min read',
    coverBadge: 'VAT Chemistry',
    summary: 'How to manage the leuco compound transformation, redox potential (mV), and post-oxidation state for maximum fastness in yarn and woven industrial workwear.',
    keyTakeaways: [
      'VAT dyes are water-insoluble keto compounds reduced to water-soluble enolate (leuco) salts by sodium dithionite in sodium hydroxide.',
      'A redox potential between -800 mV and -950 mV must be maintained to prevent premature leuco oxidation.',
      'Re-oxidation with hydrogen peroxide or atmospheric oxygen restores insoluble microcrystals locked inside the fibre core.',
      'Provides the absolute highest light fastness (7-8/8) and chlorine fastness for defense and hospital linens.',
    ],
    technicalParameters: [
      { label: 'Reduction Temperature', value: '50°C - 60°C' },
      { label: 'Redox Potential Target', value: '-850 mV to -920 mV' },
      { label: 'Caustic Soda Flakes (38°Bé)', value: '15 - 25 mL/L' },
      { label: 'Sodium Hydrosulphite', value: '12 - 20 g/L' },
      { label: 'Oxidation Bath', value: '1.5 - 2.5 mL/L H2O2 (35%) at 45°C' },
    ],
    content: [
      'VAT dyes, such as Indanthrene Blue BC and VAT Green FFB, have long been the gold standard for high-specification uniforms, hotel linens, and outdoor textiles where repeated industrial laundering with sodium hypochlorite is mandatory.',
      'Because the commercial dyestuff is completely insoluble in aqueous neutral water, it must undergo vating (reduction). The two carbonyl groups (>C=O) are reduced to phenolic >C-OH groups, which then react with sodium hydroxide to produce the sodium salt of leuco-vat acid, conferring substantive affinity toward cotton.',
      'The critical vulnerability in commercial vat dyeing is oxidation before exhaustion is complete. Yellow vat testing paper and redox titration probes ensure that sodium hydrosulphite concentrations do not dip below critical threshold during circulating package dyeing.',
      'Subsequent hot boiling soaping with CHT dispersing agents re-aggregates the microcrystals into optimal crystalline polymorphic forms, yielding brilliant optical purity and zero surface rubbing rub-off.',
    ],
  },
];
