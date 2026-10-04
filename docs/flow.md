# Flow

## Public Reconstruction

The public flow is intentionally small enough to inspect:

1. Normalize the call outcome.
2. Classify the rejection reason.
3. Decide whether automation can safely act.
4. Run a deterministic action.
5. Mark success only if the action succeeds.
6. Create review work for unclear or failed paths.

## Representative Branches

| Branch | Public behavior |
|---|---|
| Repairable rejection | Update case state after explicit confirmation |
| Unknown rejection reason | Create review task |
| Clear refusal | Close without further action |
| Wrong person | Close as wrong contact |
| Callback requested | Create callback task |
| Action failure | Create fallback review task |
