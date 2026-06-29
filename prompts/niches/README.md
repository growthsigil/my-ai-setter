# Niche templates

Ready-made "skins" for the AI appointment setter, one per niche. Each is a
generic, client-agnostic default: the right selling brain, voice, funnel, and
guardrails for the niche, with no real prices, treatment lists, or booking
links baked in.

## How to use

1. **Apply the default to your owner setter:** open the niche's `.sql` file,
   set the slug to your `OWNER_CLIENT_SLUG` (default `owner`), paste it into
   Supabase → SQL Editor, and Run. It creates the row if missing or updates the
   six skin fields if it exists.
2. **Test it:** open Jarvis HQ → the live demo panel and chat as a lead.
3. **Tailor per client:** when you bring on a real business, run
   `prompts/ONBOARD_CLIENT_PROMPT.md`. The client inherits this niche skin, then
   you fill in their specifics (treatments offered, locations, hours, real
   booking link, pricing approach).

## Available niches

- **beauty-clinics.sql** — beauty / aesthetics clinics (botox, fillers,
  facials, laser, skin, hair removal). Books a free in-clinic consultation.
  Voice: warm, friendly, professional, no emojis.

## Writing a new niche

Run `prompts/RESKIN_PROMPT.md` and save the result here as
`<niche-slug>.sql` following the same six-field structure
(`system_prompt`, `business_context`, `active_rules`, `voice_samples`,
`stages`, `pain_protocol`).
