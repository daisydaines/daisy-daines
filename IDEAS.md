# ideas + todo

## next up

- **fitbod csv** — `data/WorkoutExport.csv` exists and the `parseFitbodCSV()` parser is written. just needs wiring: swap the hardcoded fitness data in `lib/activity.ts` for `parseFitbodCSV(csv)` reading from that file.

- **project detail pages** — `/building/relationshipos`, `/building/countitprints` etc. `app/building/` only has the grid right now. deeper dive per project: the problem, what you built, what you learned. especially useful as relationshipOS gets further along.

- **og image** — custom social share image so links to the site look good when shared on x/slack. next.js has a built-in `opengraph-image` file convention. `layout.tsx` already references `daisydaines.com` in metadata so this is the missing piece.

---

## pages

- **`/uses`** — tools, stack, gear. apps you swear by, your dev setup, phone apps, gym equipment. very popular in the dev/maker community and easy to maintain. matches the builder identity perfectly.

- **`/now`** — a [now page](https://nownow.is). what you're focused on this month. different from the goals section — more life context. what you're reading, building, thinking about. update it whenever life changes.

- **`/log`** — a lightweight build log or changelog. short updates: "shipped countitprints update", "started hyrox block 2", "wrote two new poems this week". no pressure to be a blog, just a running record. shows you're active without needing full posts.

---

## features

- **twitter → x** — update the label in `lib/data.ts` from `"twitter"` to `"x"`, the url from `twitter.com` to `x.com`, and swap the lucide `Twitter` icon for `X` in `Nav.tsx` and `Hero.tsx`.

- **light mode toggle** — already supported in the css, just needs a button. could be a subtle sun/moon icon in the nav.

- **command palette** — `cmd+k` to navigate the site. jump to sections, open projects, go to activity. extremely dev-culture, would feel right at home here.

- **keyboard shortcuts** — press `g` + `h` for github, `g` + `t` for twitter, `1-4` to jump to sections. add a `?` hint somewhere. bekfast.lol energy.

- **custom 404** — something with personality. could be a terminal-style "page not found" or a poem fragment. too good an opportunity to waste on a default.

- **scroll progress bar** — thin line at the very top of the viewport filling as you scroll. subtle, satisfying.

---

## content

- **more writing** — only one poem (`still-learning.md`) in `content/writing/` so far. the activity grid will look better the more you write. even short entries count.

- **reading list** — books that shaped how you think. short and curated. fits the intellectual side of the site without needing to be a full blog. one line per book, maybe a favorite quote.

---

## technical

- **rss feed** — auto-generated from the writing section. low effort, high value for anyone who wants to follow the writing.
