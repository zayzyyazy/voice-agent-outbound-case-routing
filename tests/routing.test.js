import test from "node:test";
import assert from "node:assert/strict";
import { finalizeAction, planOutboundCaseAction } from "../src/routing.js";

test("routes repairable confirmed case to state update", () => {
  const plan = planOutboundCaseAction({
    rejectionReason: "missing_signature",
    conversationOutcome: "corrected_by_customer",
    customerConfirmedAction: true
  });

  assert.equal(plan.action, "update_case_state");
  assert.equal(plan.requiresHumanReview, false);
});

test("creates review task when action fails", () => {
  const plan = { action: "update_case_state", requiresHumanReview: false };
  const result = finalizeAction(plan, { ok: false, error: "crm_write_failed" });

  assert.equal(result.status, "needs_review");
  assert.equal(result.usecaseSuccessful, false);
});

test("does not update on caller refusal", () => {
  const plan = planOutboundCaseAction({
    rejectionReason: "missing_document",
    conversationOutcome: "refused",
    customerConfirmedAction: false
  });

  assert.equal(plan.action, "close_without_update");
});
