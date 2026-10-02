-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "active" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowAnalysis" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "workflow" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "evidence" JSONB NOT NULL,
    "evidenceHash" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "model" TEXT NOT NULL,
    "receipt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordReview" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageBucket" (
    "id" TEXT NOT NULL,
    "calls" INTEGER NOT NULL,

    CONSTRAINT "UsageBucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuedCredential" (
    "token" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "assertion" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "IssuedCredential_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "DomainArtifact" (
    "id" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordApproval" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "RecordApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainExecution" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "result" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DomainExecution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSession" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "subjectEntity" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "currentQuestion" TEXT,
    "status" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionMedia" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "bytes" BYTEA NOT NULL,
    "contentHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSetting" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionDay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "facility" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "pharmacist" TEXT NOT NULL,
    "productionDate" TIMESTAMP(3) NOT NULL,
    "cutoffAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadiopharmacyOrder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL,
    "deliveryBy" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RadiopharmacyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionLot" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "producedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "batchReference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLotAssignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "radiopharmacyOrderId" TEXT NOT NULL,
    "productionLotId" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderLotAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssayRecord" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productionLotId" TEXT NOT NULL,
    "assayedAt" TIMESTAMP(3) NOT NULL,
    "activityBq" DOUBLE PRECISION NOT NULL,
    "instrument" TEXT NOT NULL,
    "technician" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssayRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchCheck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productionLotId" TEXT NOT NULL,
    "checkName" TEXT NOT NULL,
    "resultText" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,
    "reviewer" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BatchCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryDispatch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "radiopharmacyOrderId" TEXT NOT NULL,
    "courier" TEXT NOT NULL,
    "dispatchedAt" TIMESTAMP(3) NOT NULL,
    "etaAt" TIMESTAMP(3) NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryDispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryReceipt" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "radiopharmacyOrderId" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "receiver" TEXT NOT NULL,
    "conditionNotes" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionException" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "productionLotId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "issue" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionException_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationalTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationalTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleVersion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "jurisdiction" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "sourceUrl" TEXT NOT NULL,
    "requirementText" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuleVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentRequirement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requiredBy" TIMESTAMP(3) NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "evidenceReference" TEXT,
    "reviewNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "productionDayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "WorkflowAnalysis_workflow_createdAt_idx" ON "WorkflowAnalysis"("workflow", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "RecordReview_entity_entityId_version_actorId_key" ON "RecordReview"("entity", "entityId", "version", "actorId");

-- CreateIndex
CREATE INDEX "IssuedCredential_entity_entityId_createdAt_idx" ON "IssuedCredential"("entity", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "DomainArtifact_subjectEntity_subjectId_idx" ON "DomainArtifact"("subjectEntity", "subjectId");

-- CreateIndex
CREATE INDEX "WorkSession_respondentId_createdAt_idx" ON "WorkSession"("respondentId", "createdAt");

-- CreateIndex
CREATE INDEX "SessionMedia_sessionId_idx" ON "SessionMedia"("sessionId");

-- CreateIndex
CREATE INDEX "ProductionDay_createdAt_idx" ON "ProductionDay"("createdAt");

-- CreateIndex
CREATE INDEX "RadiopharmacyOrder_createdAt_idx" ON "RadiopharmacyOrder"("createdAt");

-- CreateIndex
CREATE INDEX "RadiopharmacyOrder_productionDayId_idx" ON "RadiopharmacyOrder"("productionDayId");

-- CreateIndex
CREATE INDEX "ProductionLot_createdAt_idx" ON "ProductionLot"("createdAt");

-- CreateIndex
CREATE INDEX "ProductionLot_productionDayId_idx" ON "ProductionLot"("productionDayId");

-- CreateIndex
CREATE INDEX "OrderLotAssignment_createdAt_idx" ON "OrderLotAssignment"("createdAt");

-- CreateIndex
CREATE INDEX "OrderLotAssignment_productionDayId_idx" ON "OrderLotAssignment"("productionDayId");

-- CreateIndex
CREATE INDEX "AssayRecord_createdAt_idx" ON "AssayRecord"("createdAt");

-- CreateIndex
CREATE INDEX "AssayRecord_productionDayId_idx" ON "AssayRecord"("productionDayId");

-- CreateIndex
CREATE INDEX "BatchCheck_createdAt_idx" ON "BatchCheck"("createdAt");

-- CreateIndex
CREATE INDEX "BatchCheck_productionDayId_idx" ON "BatchCheck"("productionDayId");

-- CreateIndex
CREATE INDEX "DeliveryDispatch_createdAt_idx" ON "DeliveryDispatch"("createdAt");

-- CreateIndex
CREATE INDEX "DeliveryDispatch_productionDayId_idx" ON "DeliveryDispatch"("productionDayId");

-- CreateIndex
CREATE INDEX "DeliveryReceipt_createdAt_idx" ON "DeliveryReceipt"("createdAt");

-- CreateIndex
CREATE INDEX "DeliveryReceipt_productionDayId_idx" ON "DeliveryReceipt"("productionDayId");

-- CreateIndex
CREATE INDEX "ProductionException_createdAt_idx" ON "ProductionException"("createdAt");

-- CreateIndex
CREATE INDEX "ProductionException_productionDayId_idx" ON "ProductionException"("productionDayId");

-- CreateIndex
CREATE INDEX "OperationalTask_createdAt_idx" ON "OperationalTask"("createdAt");

-- CreateIndex
CREATE INDEX "OperationalTask_productionDayId_idx" ON "OperationalTask"("productionDayId");

-- CreateIndex
CREATE INDEX "RuleVersion_createdAt_idx" ON "RuleVersion"("createdAt");

-- CreateIndex
CREATE INDEX "RuleVersion_productionDayId_idx" ON "RuleVersion"("productionDayId");

-- CreateIndex
CREATE INDEX "DocumentRequirement_createdAt_idx" ON "DocumentRequirement"("createdAt");

-- CreateIndex
CREATE INDEX "DocumentRequirement_productionDayId_idx" ON "DocumentRequirement"("productionDayId");

-- AddForeignKey
ALTER TABLE "RadiopharmacyOrder" ADD CONSTRAINT "RadiopharmacyOrder_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionLot" ADD CONSTRAINT "ProductionLot_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLotAssignment" ADD CONSTRAINT "OrderLotAssignment_radiopharmacyOrderId_fkey" FOREIGN KEY ("radiopharmacyOrderId") REFERENCES "RadiopharmacyOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLotAssignment" ADD CONSTRAINT "OrderLotAssignment_productionLotId_fkey" FOREIGN KEY ("productionLotId") REFERENCES "ProductionLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLotAssignment" ADD CONSTRAINT "OrderLotAssignment_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssayRecord" ADD CONSTRAINT "AssayRecord_productionLotId_fkey" FOREIGN KEY ("productionLotId") REFERENCES "ProductionLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssayRecord" ADD CONSTRAINT "AssayRecord_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCheck" ADD CONSTRAINT "BatchCheck_productionLotId_fkey" FOREIGN KEY ("productionLotId") REFERENCES "ProductionLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchCheck" ADD CONSTRAINT "BatchCheck_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryDispatch" ADD CONSTRAINT "DeliveryDispatch_radiopharmacyOrderId_fkey" FOREIGN KEY ("radiopharmacyOrderId") REFERENCES "RadiopharmacyOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryDispatch" ADD CONSTRAINT "DeliveryDispatch_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryReceipt" ADD CONSTRAINT "DeliveryReceipt_radiopharmacyOrderId_fkey" FOREIGN KEY ("radiopharmacyOrderId") REFERENCES "RadiopharmacyOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryReceipt" ADD CONSTRAINT "DeliveryReceipt_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionException" ADD CONSTRAINT "ProductionException_productionLotId_fkey" FOREIGN KEY ("productionLotId") REFERENCES "ProductionLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionException" ADD CONSTRAINT "ProductionException_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationalTask" ADD CONSTRAINT "OperationalTask_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleVersion" ADD CONSTRAINT "RuleVersion_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentRequirement" ADD CONSTRAINT "DocumentRequirement_productionDayId_fkey" FOREIGN KEY ("productionDayId") REFERENCES "ProductionDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

