import { MultiStepCheck, Frequency } from "checkly/constructs";
import path from "node:path";

new MultiStepCheck("clickhouse-check-1", {
  name: "Clickhouse Version Check",
  runtimeId: "2023.09",
  frequency: Frequency.EVERY_10M,
  locations: ["us-east-1", "eu-west-1"],
  code: {
    entrypoint: path.join(__dirname, "clickhouse.spec.ts"),
  },
});

new MultiStepCheck("clickhouse-check-2", {
  name: "Clickhouse Free Diskspace",
  runtimeId: "2023.09",
  frequency: Frequency.EVERY_12H,
  locations: ["us-east-1", "eu-west-1"],
  code: {
    entrypoint: path.join(__dirname, "clickhouse-disk.spec.ts"),
  },
});
