# Upwork Portfolio Caption

## Project

Outbound voice-agent case routing and reactivation workflow.

## Short Caption

I built the routing and reliability layer around an outbound Leaping voice agent: branching, rejection-reason handling, follow-up state, ticket fallback, and action-proof gating so the agent could not claim success before the backend action completed.

## What The Real Screenshot Shows

The redacted Leaping Studio screenshot shows the actual workflow shape: an opening interest stage, rejection-reason switch, reason-specific dialogue branches, field setters for follow-up state, deterministic action/function nodes, callback handling, wrong-number handling, and fallback ticket paths. Prompt bodies and identifying product/company details are removed.

## What The Reconstructed Image Shows

The reconstructed workflow image summarizes the same system at a cleaner portfolio level: voice outcome -> normalized state -> route decision -> backend action or human-review fallback.

## Technical Points To Mention

- Designed outbound outcome routing for interest, refusal, callback, wrong number, unclear reason, and action failure.
- Separated historical rejection reason from the customer’s current intent.
- Used structured fields and deterministic stages rather than relying on transcript summaries.
- Added fallback review/ticket behavior when the automated action could not be trusted.
- Kept spoken success gated on backend action proof.

## Privacy Note

The portfolio version removes original prompts, customer data, endpoints, credentials, company/product names, real call IDs, and internal URLs.

