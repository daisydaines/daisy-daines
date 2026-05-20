export type ProjectTag = "shipped" | "building" | "client" | "writing";

export interface Project {
  name: string;
  description: string;
  url: string;
  tag: ProjectTag;
  isLive: boolean;
}

export interface Poem {
  title: string;
  url: string;
  date?: string;
}

export interface Lift {
  label: string;
  value: number | null;
  previous: number | null;
  unit: string;
}

export const personalProjects: Project[] = [
  {
    name: "relationshipOS",
    description:
      "be there for the people that matter in genuine and intentional ways.",
    url: "https://mobile-rolodex.vercel.app/",
    tag: "building",
    isLive: true,
  },
  {
    name: "countitprints",
    description: "shot chart posters. where basketball meets data.",
    url: "https://countitprints.com/",
    tag: "shipped",
    isLive: true,
  },
  {
    name: "dirtybirdcrew",
    description:
      "march madness bracket group. tracking history, growth and glory since day one.",
    url: "https://dbc-kappa.vercel.app/",
    tag: "shipped",
    isLive: true,
  },
  {
    name: "missionapp",
    description:
      "lds mission boundaries and info for prospective missionaries & their families.",
    url: "https://mission-app.onrender.com/",
    tag: "shipped",
    isLive: true,
  },
];

export const clientProjects: Project[] = [
  {
    name: "huxtablehomes",
    description: "real estate.",
    url: "https://huxtablehomes.com/",
    tag: "client",
    isLive: true,
  },
  {
    name: "graciesfootzoning",
    description: "wellness services.",
    url: "https://gracies-footzoning.vercel.app/",
    tag: "client",
    isLive: true,
  },
  {
    name: "simplythrivenow",
    description: "wellness coaching.",
    url: "https://simplythrivenow.com/",
    tag: "client",
    isLive: true,
  },
  {
    name: "thegatheringoffriends",
    description: "community hub.",
    url: "https://thegatheringoffriends.com/",
    tag: "client",
    isLive: false,
  },
];

export const poems: Poem[] = [
  {
    title: "wounded healer",
    url: "https://daisydaines.wordpress.com/2024/05/07/wounded-healer/",
    date: "may 2024",
  },
  {
    title: "this banker's heart",
    url: "https://daisydaines.wordpress.com/2020/06/28/the-bankers-heart/",
    date: "jun 2020",
  },
  {
    title: "his name is",
    url: "https://daisydaines.wordpress.com/2019/12/20/his-name-is/",
    date: "dec 2019",
  },
  {
    title: "my ambition",
    url: "https://daisydaines.wordpress.com/2019/11/19/my-ambition/",
    date: "nov 2019",
  },
  {
    title: "convicted",
    url: "https://daisydaines.wordpress.com/2019/11/04/convicted/",
    date: "nov 2019",
  },
  {
    title: "a different kind of wrestle",
    url: "https://daisydaines.wordpress.com/2019/10/29/a-different-kind-of-wrestle/",
    date: "oct 2019",
  },
  {
    title: "with a hobble",
    url: "https://daisydaines.wordpress.com/2019/10/22/with-a-hobble/",
    date: "oct 2019",
  },
  {
    title: "but which name",
    url: "https://daisydaines.wordpress.com/2019/10/14/but-which-name/",
    date: "oct 2019",
  },
  {
    title: "off the path",
    url: "https://daisydaines.wordpress.com/2019/10/07/off-the-path/",
    date: "oct 2019",
  },
  {
    title: "the prince",
    url: "https://daisydaines.wordpress.com/2019/09/30/the-prince/",
    date: "sep 2019",
  },
];

export const goals = {
  hyrox: {
    label: "hyrox",
    description: "complete a hyrox race",
    raceDate: "2026-09-18",
    raceDateDisplay: "sep 18, 2026",
    raceLocation: "salt lake city, ut",
    trainingStart: "2026-03-23",
  },
  bodyFat: {
    label: "body fat",
    description: "stay under 16%",
    current: 18.3,
    target: 16,
    lastMeasured: "mar 13, 2026",
    nextScan: "jun 27",
    unit: "%",
  },
  dunk: {
    label: "dunk",
    description: "dunk a basketball",
    current: 28,
    target: 34,
    unit: '"',
    note: "need +6 inches",
  },
};

export const liftsMetadata = {
  currentDate: "apr 2026",
  previousDate: "mar 2026",
};

export const lifts: Lift[] = [
  { label: "bench", value: 255, previous: 245, unit: "lbs" },
  { label: "squat", value: 345, previous: 340, unit: "lbs" },
  { label: "deadlift", value: 365, previous: 360, unit: "lbs" },
  { label: "pullups", value: 13, previous: 11, unit: "reps" },
];

export const social = [
  { label: "github", url: "https://github.com/daisydaines" },
  { label: "x.com", url: "https://x.com/daisydaines" },
  { label: "linkedin", url: "https://www.linkedin.com/in/daisy-daines-2766a4217" },
];
