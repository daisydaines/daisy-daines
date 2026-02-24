# ideas + todo

## next up

- **fitbod csv** — export from fitbod and drop into the repo as `public/fitbod.csv`. then swap `getFitnessActivity()` in `lib/activity.ts` for `parseFitbodCSV(csv)`. the parser is already written, just needs the file wired in.

- **poem subpages** — `/writing/wounded-healer` etc. create `app/writing/[slug]/page.tsx` with MDX or hardcoded content. full poem displayed in large serif, dark and quiet. could include a date, a short note, and a back link. the reading experience should feel completely different from the rest of the site — like opening a book.

---

## pages

- **`/uses`** — tools, stack, gear. apps you swear by, your dev setup, phone apps, gym equipment. very popular in the dev/maker community and easy to maintain. matches the builder identity perfectly.

- **`/now`** — a [now page](https://nownow.is). what you're focused on this month. different from the goals section — more life context. what you're reading, building, thinking about. update it whenever life changes.

- **`/log`** — a lightweight build log or changelog. short updates: "shipped countitprints update", "started hyrox block 2", "wrote two new poems this week". no pressure to be a blog, just a running record. shows you're active without needing full posts.

---

## features

- **light mode toggle** — already supported in the css, just needs a button. could be a subtle sun/moon icon in the nav.

- **command palette** — `cmd+k` to navigate the site. jump to sections, open projects, go to activity. extremely dev-culture, would feel right at home here.

- **keyboard shortcuts** — press `g` + `h` for github, `g` + `t` for twitter, `1-4` to jump to sections. add a `?` hint somewhere. bekfast.lol energy.

- **custom 404** — something with personality. could be a terminal-style "page not found" or a poem fragment. too good an opportunity to waste on a default.

- **scroll progress bar** — thin line at the very top of the viewport filling as you scroll. subtle, satisfying.

---

## content

- **project detail pages** — `/building/relationshipos`, `/building/countitprints` etc. deeper dive: the problem, what you built, what you learned. especially useful as relationshipOS gets further along.

- **more writing** — the activity grid will look better the more you write. even short entries count. consider writing directly in the repo as MDX files under `content/writing/` so you own the content fully and don't depend on wordpress.

- **reading list** — books that shaped how you think. short and curated. fits the intellectual side of the site without needing to be a full blog. one line per book, maybe a favorite quote.

---

## technical

- **custom domain** — `daisydaines.com` or similar. vercel makes this one step.

- **og image** — custom social share image so links to the site look good when shared on twitter/slack. next.js has a built-in `opengraph-image` file convention.

- **rss feed** — auto-generated from the writing section. low effort, high value for anyone who wants to follow the writing.

- **writing activity → real data** — replace the placeholder writing grid with actual dates. either pull from wordpress api (it has one) or just maintain a `content/writing-log.json` file with dates when you write anything, published or not.
