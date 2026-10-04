// Adapted from Reunio shelf search. The app model is replaced by a minimal type;
// returned-owner search is omitted. No storage or matching rules are included.
export type ShelfItem = {
  ref: string;
  category: string;
  colour: string | null;
  place: string;
  notes: string;
  status: "found" | "returned" | "disposed";
};
const STOP = new Set([
  "the",
  "and",
  "with",
  "a",
  "an",
  "of",
  "in",
  "on",
  "my",
  "it",
  "is",
  "was",
  "has",
  "had",
  "for",
  "to",
  "at",
]);
export function keywords(text: string): string[] {
  return [
    ...new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length > 2 && !STOP.has(w)),
    ),
  ];
}

export type Filter = "shelf" | "returned" | "all";

/** Shelf search: matches a reference (with or without the dash) or every keyword typed. */
export function filterItems(
  items: ShelfItem[],
  filter: Filter,
  query: string,
): ShelfItem[] {
  const words = keywords(query);
  const q = query.trim().toUpperCase();
  return items.filter((i) => {
    if (filter === "shelf" && i.status !== "found") return false;
    if (filter === "returned" && i.status !== "returned") return false;
    if (!query.trim()) return true;
    if (
      i.ref.includes(q) ||
      i.ref.replace("-", "").includes(q.replace("-", ""))
    )
      return true;
    const hay =
      `${i.category} ${i.colour ?? ""} ${i.place} ${i.notes}`.toLowerCase();
    return words.length
      ? words.every((w) => hay.includes(w))
      : hay.includes(query.trim().toLowerCase());
  });
}
