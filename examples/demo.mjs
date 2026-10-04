import { filterItems } from "./filter.ts";
import { items } from "./fixtures.mjs";
console.log(
  JSON.stringify(
    {
      fixture: "invented shelf, no owner data",
      query: "blue library",
      refs: filterItems(items, "shelf", "blue library").map((i) => i.ref),
    },
    null,
    2,
  ),
);
