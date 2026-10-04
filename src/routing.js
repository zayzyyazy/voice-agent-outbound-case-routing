export function classifyReason(reason) {
  const value = String(reason || "").toLowerCase();
  if (["missing_signature", "incorrect_details", "missing_document"].includes(value)) {
    return "repairable";
  }
  if (["other_provider", "not_needed", "clear_refusal"].includes(value)) {
    return "non_repair";
  }
  return "unknown";
}

export function planOutboundCaseAction(input) {
  const outcome = input.conversationOutcome;

  if (outcome === "wrong_person") {
    return { route: "wrong_contact", action: "close_call", requiresHumanReview: false };
  }

  if (outcome === "voicemail") {
    return { route: "voicemail", action: "leave_safe_message", requiresHumanReview: false };
  }

  if (outcome === "callback_requested") {
    return { route: "callback", action: "create_callback_task", requiresHumanReview: true };
  }

  if (outcome === "refused" || input.customerConfirmedAction === false) {
    return { route: "declined", action: "close_without_update", requiresHumanReview: false };
  }

  const reasonClass = classifyReason(input.rejectionReason);
  if (reasonClass === "repairable" && input.customerConfirmedAction === true) {
    return { route: "repair_rejected_case", action: "update_case_state", requiresHumanReview: false };
  }

  return { route: "manual_review", action: "create_review_task", requiresHumanReview: true };
}

export function finalizeAction(plan, actionResult) {
  if (plan.action === "update_case_state" && actionResult?.ok) {
    return {
      status: "ready_for_resubmission",
      usecaseSuccessful: true,
      auditNote: "Action completed after explicit caller confirmation."
    };
  }

  if (plan.requiresHumanReview || actionResult?.ok === false) {
    return {
      status: "needs_review",
      usecaseSuccessful: false,
      reviewTask: {
        type: plan.action === "create_callback_task" ? "callback" : "case_review",
        reason: actionResult?.error || "automation_not_authorized"
      }
    };
  }

  return {
    status: "closed_without_change",
    usecaseSuccessful: false
  };
}
