# Radiopharmacy Production and Delivery

Coordinate orders, production lots, assay timestamps, expiry windows, dispatch and delivery acknowledgements.

## Implemented records

- **Production Day**: name, facility, license Number, pharmacist, production Date, cutoff At, status.
- **Radiopharmacy Order**: name, order Number, customer, product, requested At, delivery By, quantity, status.
- **Production Lot**: title, lot Number, product, produced At, expires At, batch Reference, status.
- **Order Lot Assignment**: title, units, assigned At, status.
- **Assay Record**: title, assayed At, activity Bq, instrument, technician, evidence, status.
- **Batch Check**: title, check Name, result Text, checked At, reviewer, status.
- **Delivery Dispatch**: title, courier, dispatched At, eta At, container Number, status.
- **Delivery Receipt**: title, received At, receiver, condition Notes, receipt, status.
- **Production Exception**: title, occurred At, issue, action, owner, status.
- **Operational Task**: title, owner, priority, start At, due At, done, notes, status.
- **Rule Version**: title, jurisdiction, version, effective At, expires At, source Url, requirement Text, status.
- **Document Requirement**: title, category, required By, source Reference, evidence Reference, review Notes, status.

## AI workflows

- Order scheduling brief: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Batch document completeness: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Assay record reconciliation: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Expiry conflict summary: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Courier handoff draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Production exception narrative: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Evidence completeness review: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.
- Operations handoff draft: source-linked draft, saved history, three real AI input suggestion styles and three complete fictional examples.

## Calculations

- Radiopharmacy delivery expiry windows: Compare planned delivery with recorded lot validity; no dose calculation or product release.
- Production Day evidence checklist: Check source presence against an explicitly supplied document list; reviewer assesses adequacy.
- Operational deadline queue: Compute overdue items from entered dates and completed flags; no external notifications.

## Workspace features

Role-based login and account management; validated create/edit/delete; required parent and sibling relationships; search and pagination; atomic JSON imports; CSV/JSON exports; optimistic concurrency; two independent human reviews; immutable source-text uploads with independent review; dated task calendar; aggregate reports; searchable audit trail; model catalog and administrator AI settings; configured HTTPS connectors with approval, idempotency and receipt checks.

## Integration boundaries

A finite working scope, not every conceivable feature. No production regulator, insurer, carrier, court, university or clinical integration is preconfigured. Source uploads support text/CSV/JSON/Markdown, not OCR/PDF parsing. AI produces drafts and cannot authorize clinical handling, adjudicate rights, select recipients or jurors, establish eligibility, certify regulatory compliance or send submissions. Live external execution requires a configured adapter and independent human approval of the current record. Calculations use supplied rules and units; example rules are fictional.
