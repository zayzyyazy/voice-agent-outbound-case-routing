# Voice Agent Outbound Case Routing

An outbound voice-agent case study showing how a declined-case call is routed into reliable state updates, follow-up tasks, or safe closure.

## The Problem

The hard part of this system was not making an LLM speak. The hard part was making sure a conversational outcome mapped to a real operational action: update a customer/case state only after the caller confirmed the right path, create a human-review task when automation could not safely finish, and stop cleanly when the call reached a wrong person, voicemail, or a clear refusal.

## What I Worked On

I worked on the workflow logic around an outbound agent for rejected or declined cases: fields, branch routing, reason capture, deterministic function stages, follow-up flags, status updates, ticket/email fallback behavior, and edge cases such as wrong number, later callback, unknown rejection reason, and technical action failure.

The public repository is a reconstruction. It does not contain the original workflow export, prompts, endpoints, credentials, customer records, transcripts, or company identifiers.

## How The System Works

![Architecture diagram](docs/images/outbound-case-routing.svg)

1. A prepared outbound lead provides safe call context such as a fictional case ID, caller name, phone number, and rejection category.
2. The agent opens the conversation and determines whether the caller is eligible, interested, wrong person, unavailable, or refusing contact.
3. A switch routes by rejection reason and conversation outcome.
4. A deterministic action layer performs the state update or creates a review task.
5. The call is only marked successful after the action result is known.

## Key Engineering Problems

- Separating caller intent from system action so the agent cannot promise completion before a function succeeds.
- Preserving structured state across a natural conversation.
- Routing similar-sounding rejection reasons into different operational paths.
- Creating fallback review tasks when automated updates fail or the reason is unclear.
- Handling non-conversation outcomes such as voicemail and wrong-number calls.

## Example

Input:

```json
{
  "caseId": "CASE-EXAMPLE-1042",
  "callerName": "Alex Example",
  "rejectionReason": "missing_signature",
  "conversationOutcome": "corrected_by_customer",
  "customerConfirmedAction": true
}
```

Decision:

```json
{
  "route": "repair_rejected_case",
  "action": "update_case_state",
  "requiresHumanReview": false
}
```

Output:

```json
{
  "caseId": "CASE-EXAMPLE-1042",
  "status": "ready_for_resubmission",
  "usecaseSuccessful": true,
  "auditNote": "Action completed after explicit caller confirmation."
}
```

## Failure Handling

The reconstructed test cases cover successful repair, unclear reason, caller refusal, wrong person, callback request, and action failure. In failure paths the system avoids marking the call successful and creates a fictional review task instead.

## Stack

- Voice-agent workflow with staged dialogue, switch routing, field setters, and deterministic function nodes
- JSON state and structured outputs
- CRM/action integration represented with sanitized placeholders
- Node.js tests for the public routing reconstruction

## What This Demonstrates

This project demonstrates outbound decision and routing work around a voice model: state, branching, tool/action gating, and reliability checks that make a conversational promise correspond to a real system action.
