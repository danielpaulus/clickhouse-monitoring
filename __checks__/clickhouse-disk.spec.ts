import { test, expect } from "@playwright/test";
import { queryClickhouse } from "./utils";

const diskSpaceQuery = `
SELECT 
    name, 
    free_space / 1024 / 1024 / 1024 AS free_space_gb
FROM system.disks;

`;

test("check clickhouse", async ({ request }) => {
  await test.step("check clickhouse diskspace", async () => {
    const response = await queryClickhouse(diskSpaceQuery, request);
    const row = response[0].split("\t");
    console.log(`Disk ${row[0]} has ${row[1]}GB free`);
    //make sure we got more than 5GB left
    expect(parseFloat(row[1])).toBeGreaterThan(5);
  });
});
