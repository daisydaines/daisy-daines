# daisydaines.com

Personal site for Daisy Daines — builder, poet, future dunker.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- Deployed on [Vercel](https://vercel.com)

## Structure

```
app/          # Routes (home, writing, building, client-work, activity)
components/   # UI components
lib/          # Data and utilities (data.ts, activity.ts, writing.ts)
content/      # Markdown writing posts
data/         # WorkoutExport.csv (Fitbod export — swap and redeploy to update fitness activity)
public/       # Static assets and images
```

## Dev

```bash
npm run dev
```
