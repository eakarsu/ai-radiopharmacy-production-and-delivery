export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  "slug": "ai-radiopharmacy-production-and-delivery",
  "title": "Radiopharmacy Production and Delivery",
  "tagline": "Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements.",
  "accent": "rose"
};
export const pages: PageConfig[] = [
  {
    "label": "Intake & registers",
    "href": "/registers",
    "description": "Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements.",
    "entities": [
      "ProductionDay",
      "RadiopharmacyOrder",
      "ProductionLot"
    ],
    "workflows": [
      "order-scheduling-brief",
      "batch-document-completeness"
    ]
  },
  {
    "label": "Operational records",
    "href": "/workflow",
    "description": "Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements.",
    "entities": [
      "OrderLotAssignment",
      "AssayRecord",
      "BatchCheck"
    ],
    "workflows": [
      "assay-record-reconciliation",
      "expiry-conflict-summary"
    ]
  },
  {
    "label": "Review & delivery",
    "href": "/delivery",
    "description": "Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements.",
    "entities": [
      "DeliveryDispatch",
      "DeliveryReceipt",
      "ProductionException"
    ],
    "workflows": [
      "courier-handoff-draft",
      "production-exception-narrative"
    ]
  },
  {
    "label": "Tasks & requirements",
    "href": "/operations",
    "description": "Assignments, versioned rules and document requirements.",
    "entities": [
      "OperationalTask",
      "RuleVersion",
      "DocumentRequirement"
    ],
    "workflows": [
      "evidence-completeness-review",
      "operations-handoff-draft"
    ]
  }
];
export const entities: Record<string, EntityConfig> = {
  "ProductionDay": {
    "name": "ProductionDay",
    "label": "Production Day",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "facility",
        "kind": "string"
      },
      {
        "name": "licenseNumber",
        "kind": "string"
      },
      {
        "name": "pharmacist",
        "kind": "string"
      },
      {
        "name": "productionDate",
        "kind": "date"
      },
      {
        "name": "cutoffAt",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      }
    ]
  },
  "RadiopharmacyOrder": {
    "name": "RadiopharmacyOrder",
    "label": "Radiopharmacy Order",
    "fields": [
      {
        "name": "name",
        "kind": "string"
      },
      {
        "name": "orderNumber",
        "kind": "string"
      },
      {
        "name": "customer",
        "kind": "string"
      },
      {
        "name": "product",
        "kind": "string"
      },
      {
        "name": "requestedAt",
        "kind": "date"
      },
      {
        "name": "deliveryBy",
        "kind": "date"
      },
      {
        "name": "quantity",
        "kind": "number"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "ProductionLot": {
    "name": "ProductionLot",
    "label": "Production Lot",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "lotNumber",
        "kind": "string"
      },
      {
        "name": "product",
        "kind": "string"
      },
      {
        "name": "producedAt",
        "kind": "date"
      },
      {
        "name": "expiresAt",
        "kind": "date"
      },
      {
        "name": "batchReference",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "OrderLotAssignment": {
    "name": "OrderLotAssignment",
    "label": "Order Lot Assignment",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "radiopharmacyOrderId",
        "kind": "string"
      },
      {
        "name": "productionLotId",
        "kind": "string"
      },
      {
        "name": "units",
        "kind": "number"
      },
      {
        "name": "assignedAt",
        "kind": "date"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "AssayRecord": {
    "name": "AssayRecord",
    "label": "Assay Record",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "productionLotId",
        "kind": "string"
      },
      {
        "name": "assayedAt",
        "kind": "date"
      },
      {
        "name": "activityBq",
        "kind": "number"
      },
      {
        "name": "instrument",
        "kind": "string"
      },
      {
        "name": "technician",
        "kind": "string"
      },
      {
        "name": "evidence",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "BatchCheck": {
    "name": "BatchCheck",
    "label": "Batch Check",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "productionLotId",
        "kind": "string"
      },
      {
        "name": "checkName",
        "kind": "string"
      },
      {
        "name": "resultText",
        "kind": "string"
      },
      {
        "name": "checkedAt",
        "kind": "date"
      },
      {
        "name": "reviewer",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "DeliveryDispatch": {
    "name": "DeliveryDispatch",
    "label": "Delivery Dispatch",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "radiopharmacyOrderId",
        "kind": "string"
      },
      {
        "name": "courier",
        "kind": "string"
      },
      {
        "name": "dispatchedAt",
        "kind": "date"
      },
      {
        "name": "etaAt",
        "kind": "date"
      },
      {
        "name": "containerNumber",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "DeliveryReceipt": {
    "name": "DeliveryReceipt",
    "label": "Delivery Receipt",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "radiopharmacyOrderId",
        "kind": "string"
      },
      {
        "name": "receivedAt",
        "kind": "date"
      },
      {
        "name": "receiver",
        "kind": "string"
      },
      {
        "name": "conditionNotes",
        "kind": "string"
      },
      {
        "name": "receipt",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "ProductionException": {
    "name": "ProductionException",
    "label": "Production Exception",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "productionLotId",
        "kind": "string"
      },
      {
        "name": "occurredAt",
        "kind": "date"
      },
      {
        "name": "issue",
        "kind": "string"
      },
      {
        "name": "action",
        "kind": "string"
      },
      {
        "name": "owner",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "OperationalTask": {
    "name": "OperationalTask",
    "label": "Operational Task",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "owner",
        "kind": "string"
      },
      {
        "name": "priority",
        "kind": "string"
      },
      {
        "name": "startAt",
        "kind": "date"
      },
      {
        "name": "dueAt",
        "kind": "date"
      },
      {
        "name": "done",
        "kind": "boolean"
      },
      {
        "name": "notes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "RuleVersion": {
    "name": "RuleVersion",
    "label": "Rule Version",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "jurisdiction",
        "kind": "string"
      },
      {
        "name": "version",
        "kind": "string"
      },
      {
        "name": "effectiveAt",
        "kind": "date"
      },
      {
        "name": "expiresAt",
        "kind": "date"
      },
      {
        "name": "sourceUrl",
        "kind": "string"
      },
      {
        "name": "requirementText",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  },
  "DocumentRequirement": {
    "name": "DocumentRequirement",
    "label": "Document Requirement",
    "fields": [
      {
        "name": "title",
        "kind": "string"
      },
      {
        "name": "category",
        "kind": "string"
      },
      {
        "name": "requiredBy",
        "kind": "date"
      },
      {
        "name": "sourceReference",
        "kind": "string"
      },
      {
        "name": "evidenceReference",
        "kind": "string"
      },
      {
        "name": "reviewNotes",
        "kind": "string"
      },
      {
        "name": "status",
        "kind": "string"
      },
      {
        "name": "productionDayId",
        "kind": "string"
      }
    ]
  }
};
export const workflows: WorkflowConfig[] = [
  {
    "slug": "order-scheduling-brief",
    "title": "Order scheduling brief",
    "description": "Order scheduling brief using selected production day records and supplied evidence.",
    "prompt": "Order scheduling brief for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "batch-document-completeness",
    "title": "Batch document completeness",
    "description": "Batch document completeness using selected production day records and supplied evidence.",
    "prompt": "Batch document completeness for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "assay-record-reconciliation",
    "title": "Assay record reconciliation",
    "description": "Assay record reconciliation using selected production day records and supplied evidence.",
    "prompt": "Assay record reconciliation for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "expiry-conflict-summary",
    "title": "Expiry conflict summary",
    "description": "Expiry conflict summary using selected production day records and supplied evidence.",
    "prompt": "Expiry conflict summary for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "courier-handoff-draft",
    "title": "Courier handoff draft",
    "description": "Courier handoff draft using selected production day records and supplied evidence.",
    "prompt": "Courier handoff draft for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "production-exception-narrative",
    "title": "Production exception narrative",
    "description": "Production exception narrative using selected production day records and supplied evidence.",
    "prompt": "Production exception narrative for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "evidence-completeness-review",
    "title": "Evidence completeness review",
    "description": "Evidence completeness review using selected production day records and supplied evidence.",
    "prompt": "Evidence completeness review for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  },
  {
    "slug": "operations-handoff-draft",
    "title": "Operations handoff draft",
    "description": "Operations handoff draft using selected production day records and supplied evidence.",
    "prompt": "Operations handoff draft for Radiopharmacy Production and Delivery. Operational scope: Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements. Specific AI scope: Flag schedule conflicts and missing batch documents; validated calculations and licensed release remain deterministic/human. Produce an editable, source-linked draft for the responsible professional. Distinguish observations, missing evidence and proposed next actions. Do not invent facts, decide legal eligibility, authorize clinical release, profile individuals, submit externally or invent calibrated probabilities. Use supplied rule versions only. For translation preserve identifiers, dates, names and numbers and mark uncertain terms.",
    "fields": [
      "objective",
      "sourceContext",
      "applicableRules",
      "knownDiscrepancies",
      "constraints",
      "requestedOutput",
      "optionalReviewerNotes",
      "optionalAdditionalEvidence"
    ]
  }
];
export function findPage(href:string){return pages.find(p=>p.href===href);}
