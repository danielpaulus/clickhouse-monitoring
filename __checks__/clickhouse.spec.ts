import { test, expect } from "@playwright/test";
import { baseUrl, queryClickhouse } from "./utils";

const clickHouseVersion = "23.9.1.1854";

async function pingClickhouse(request) {
  const response = await request.get(`${baseUrl}/ping`);
  expect(response.ok()).toBeTruthy();
  const msg = await response.text();
  expect(msg.trim()).toBe("Ok.");
}

test("check clickhouse", async ({ request }) => {
  await test.step("ping clickhouse", async () => {
    await pingClickhouse(request);
  });

  await test.step("check clickhouse version", async () => {
    const response = await queryClickhouse("SELECT version()", request);
    expect(response[0]).toBe(clickHouseVersion);
  });
});
