# Implementation Notes

This repository is a public-safe reconstruction of outbound Leaping work. The original workflow was not a generic chatbot; it was a decision and action system around a voice conversation.

## What I Actually Worked On

- Designed the branch structure for interest, refusal, callback, wrong-number, unclear-reason, and technical-failure outcomes.
- Split conversation outcomes from operational outcomes so a call was not marked successful until the action layer completed.
- Worked with Leaping fields that carried caller context, case context, rejection reason, follow-up requirement, follow-up type, and action/ticket result state.
- Connected deterministic function stages for status updates and fallback review/ticket creation.
- Added safer exits for voicemail, wrong person, hard refusal, and callback cases.
- Tested edge cases where a caller says something conversationally valid but the system should not write a final status.

## How The Leaping Flow Works

1. **Prepared call context enters Leaping**

   The outbound call starts with structured fields such as a case identifier, caller name, rejection/category context, current time, and call/session metadata. In the public repo those values are fictional.

2. **Opening dialogue classifies the call**

   The opening stage routes the caller into paths like interested, not interested, later callback, wrong number, or no reliable outcome. This prevents one broad "follow up" bucket from swallowing operationally different cases.

3. **Reason-specific routing decides the next action**

   A switch/branch layer separates rejection reasons and customer responses. This is the core system problem: similar natural-language answers can require different back-office actions.

4. **Fields are set before functions run**

   The workflow records normalized follow-up state before calling the action layer. That makes downstream functions depend on structured values rather than a transcript summary.

5. **Function result gates success**

   A status update or fallback review action runs through a deterministic stage. The voice agent may only close as successful after that result is available. If the action fails, the public reconstruction creates a human-review task.

## What Was Connected

- Leaping dialogue stages for natural conversation.
- Leaping switch/junction stages for deterministic routing.
- Leaping field setters for normalized follow-up and success state.
- Function/API stages for status update and notification/review actions.
- Time helper logic for current-time aware follow-up language.
- Fallback ticket/email path for action failures or unclear outcomes.

All real endpoints, headers, tokens, customer identifiers, and original field names that could identify a private system are removed or generalized.

## Reliability Problems I Handled

- Caller wants a callback, but the agent should not mark the case repaired.
- Caller refuses, but the refusal reason is ambiguous.
- Caller is the wrong person or says the number is wrong.
- Agent reaches a conversational resolution, but the status update fails.
- Rejection reason requires a different branch than the caller's first sentence suggests.
- Follow-up should be created when the action cannot be trusted.

## Public Reconstruction Mapping

| Real engineering concern | Public representation |
| --- | --- |
| Leaping workflow export | Sanitized topology and function inventory images |
| Case/customer fields | Fictional `caseId`, `callerName`, `rejectionReason` examples |
| Status update integration | Placeholder `update_case_state` action |
| Ticket/email fallback | Placeholder `create_review_task` behavior |
| Call outcomes | Unit tests for refusal, callback, wrong person, unclear reason, and action failure |

