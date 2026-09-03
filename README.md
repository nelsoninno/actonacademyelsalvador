# Acton Academy El Salvador, website

This folder is the whole website. It is plain HTML and CSS, so it loads fast and
nothing can break it. You can open `index.html` by double clicking it to see the
site exactly as visitors will.

## What is where

| I want to change | Open this |
|---|---|
| English homepage text | `index.html` |
| Spanish homepage text | `es/index.html` |
| English questions page | `faq.html` |
| Spanish questions page | `es/faq.html` |
| English testimonials | `testimonials.html` |
| Spanish testimonials | `es/testimonios.html` |
| Colours and fonts | `assets/css/tokens.css` |
| Everything else about the look | `assets/css/styles.css` |
| Photos | `assets/images/` |
| Your logo | `assets/images/logos/` |

**Always change both languages.** If you edit a price in English, edit it in Spanish
too, or the two pages will disagree.

## Where to drop new photos

Save photos into the right folder and use this naming pattern, all lowercase with
hyphens:

```
{what it shows}-acton-academy-actonacademyelsalvador.com.webp
```

For example `hero-studio-acton-academy-actonacademyelsalvador.com.webp`.

- Big header photo: `assets/images/hero/`
- Photos used through the page: `assets/images/gallery/`
- Logos: `assets/images/logos/`
- The image that appears when someone shares the link on WhatsApp or Facebook:
  `assets/images/social-share/`, sized 1200 by 630 pixels

Keep the original full size files in `_source/photos-original/` as a backup. Use
`.webp` for anything shown on the page: it is a much smaller file, so the site stays
fast.

Your photos are already on the site: 43 of them across the homepage, the questions
page and the testimonials page. If you want to swap one, save the new photo into the
right folder with a name in the pattern above, then change the file name in the page.
Or just send it to us and tell us which one to replace.

## The videos

The 26 parent and learner videos are too large to live inside the website itself.
They should go on YouTube or Vimeo (unlisted is fine) and be embedded on the
testimonials page, with a short written quote under each one. The written quote
matters: it is what Google and AI assistants can actually read.

## Changing the price

The price appears in more places than you would expect. If a number changes, it
has to change in all of these:

1. The pricing section on the English homepage and the Spanish homepage
2. The first answer in the homepage questions section, both languages
3. The first answer on the full questions page, both languages
4. `llms.txt` and `llms-full.txt` (these are the files AI assistants read)
5. The structured data block at the top of `index.html`

If you are not sure, ask us and we will do it.

## Two things to never do

1. **Never name another school** in a price comparison. Salvadoran law does not
   allow it. The pricing section deliberately uses anonymous brackets.
2. **Never publish tuition on its own.** The entire pricing argument on this site is
   that the number shown is the complete number. Showing $440 without the food,
   materials and enrollment fee would undo it.

## How to ask for a change

Message us with what you want changed and where. A screenshot with the bit circled
is perfect. Small text and photo changes are usually done the same day.

everybodyknowsyou.com
hey@everybodyknowsyou.com
