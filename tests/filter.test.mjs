import test from "node:test";
import assert from "node:assert/strict";
import { filterItems } from "../examples/filter.ts";
import { items } from "../examples/fixtures.mjs";
const refs = (xs) => xs.map((x) => x.ref);
test("blank query returns only found items on shelf", () =>
  assert.deepEqual(refs(filterItems(items, "shelf", "")), [
    "FI-0001",
    "FI-0002",
  ]));
test("reference search ignores case and optional dash", () => {
  assert.deepEqual(refs(filterItems(items, "all", "fi0001")), ["FI-0001"]);
  assert.deepEqual(refs(filterItems(items, "all", "fi-0001")), ["FI-0001"]);
});
test("all significant words must match", () =>
  assert.deepEqual(refs(filterItems(items, "shelf", "blue library")), [
    "FI-0001",
  ]));
test("words from different records cannot combine", () =>
  assert.deepEqual(filterItems(items, "all", "blue reception"), []));
test("returned filter stays separate from shelf", () =>
  assert.deepEqual(refs(filterItems(items, "returned", "")), ["FI-0003"]));
test("all filter includes disposed records", () =>
  assert.equal(filterItems(items, "all", "").length, 4));
test("null colour does not break search", () =>
  assert.deepEqual(refs(filterItems(items, "all", "keyring")), ["FI-0004"]));
test("search does not mutate the supplied records", () => {
  const before = JSON.stringify(items);
  filterItems(items, "shelf", "bag");
  assert.equal(JSON.stringify(items), before);
});
