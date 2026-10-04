# Reunio: project evidence

Checked 4 October 2026. This evidence package has **8 passing tests** for the selected public examples. Full-product tests were not rerun for this publication.

## Output

The query `blue library` returns the reference `FI-0001` from the invented on-shelf records. A real owner, matching score or handover is not part of this output.

[Recorded JSON output](demo-output.json) · [Runnable example](../examples/demo.mjs)

## Methodology

Apply item status first, accept an exact or partial reference query, then require every significant search word to occur within the same item record. Keep the function pure so search does not alter the shelf. Fixtures are invented and contain no owner names or contacts.

[Read the selected code](../examples/filter.ts)

## Testing results

**8 passed, none failed**, on 4 October 2026. Runtime: Node.js v24.19.0.

Status filters, case and dash handling, multiword queries, no cross-record matches, disposed records, null colours and non-mutation. Strict TypeScript checking also passes.

[Test cases](../tests/filter.test.mjs) · [Machine-readable verification](verification.json)

```bash
npm ci
npm test
npm run typecheck
npm run demo
```

The saved output contains synthetic data. Test counts are checks of this package, not user studies, product adoption or a performance benchmark. Timings from the test runner are not presented as product latency.

## Provenance and changes

Adapted from `src/lib/filter.ts` and the `keywords` helper in `src/lib/model.ts`, private revision `c97ece7`. A small `ShelfItem` type replaces the full app model. Returned-owner search is removed. The matching engine, storage, photo processing and desk records are not included.

## Limits

This is shelf search, not the app’s lost-report matching algorithm. It uses English/ASCII keyword splitting and substring matching, so it is not multilingual search or fuzzy matching. It does not verify ownership or test shared-desk deployment. No desk pilot or measured return-rate improvement is claimed.

## AI-assisted workflow

Claude and ChatGPT have been used during later project development. This public package was selected, adapted, documented and tested with Codex. The NumPy companion, synthetic fixtures and public test cases were added for this portfolio. They are separated from the original academic work and full-product release checks. No claim of entirely unaided authorship is made.
