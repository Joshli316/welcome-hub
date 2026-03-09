// Feature flags for progressive rollout across phases
export const features = {
  // Phase 1 (current)
  resourceHub: true,
  checklist: true,
  communityEvents: true,
  volunteerHosts: true,
  wechatGroups: true,

  // Phase 2 (current)
  peerMatching: true,
  smallGroups: true,
  userAccounts: false,

  // Phase 3 (current)
  reentryPlanning: true,
  returneeMatching: true,

  // Phase 4 (current)
  faithAndWork: true,

  // Phase 5 (current)
  ministryDashboard: true,
} as const;
