import { expect } from "@playwright/test";
export const baseUrl = process.env.ch_url;

export async function queryClickhouse(query, request) {
  const buff = Buffer.from(query, "utf-8");
  const response = await request.post(`${baseUrl}`, {
    headers: {
      "X-ClickHouse-User": process.env.ch_user,
      "X-ClickHouse-Key": process.env.ch_pass,
    },
    data: buff,
  });

  const buf = await response.body();
  expect(response.ok()).toBeTruthy();
  const res = new String(buf).toString();
  const resArray = res.split("\n");
  resArray.pop();
  return resArray;
}
