# Architecture

This repository reconstructs the outbound declined-case system as a neutral case study.

```mermaid
flowchart TD
  A[Outbound lead] --> B[Opening and eligibility check]
  B --> C{Conversation outcome}
  C -->|Correct person| D[Reason capture]
  C -->|Wrong person| E[Safe close]
  C -->|Voicemail| F[Voicemail close]
  C -->|Callback| G[Create callback task]
  D --> H{Reason route}
  H -->|Repairable issue| I[Update case state]
  H -->|Needs review| J[Create review task]
  H -->|Clear refusal| K[Do not contact / close]
  I --> L{Action result}
  L -->|Success| M[Mark use case successful]
  L -->|Failure| J
```

## Private Evidence Used

- Local voice-agent workflow exports showing dialogue, switch, field-setter, function, scripted, and terminal stages.
- Local notes describing outbound reactivation/rejection handling and strict success-after-function behavior.
- Function inventory showing state update and fallback ticket/email actions.

## Sanitization

Excluded from this public reconstruction:

- Original workflow JSON exports
- Production endpoints and authorization headers
- Company names, customer data, call IDs, phone numbers, and transcripts
- Original prompts and internal business wording
