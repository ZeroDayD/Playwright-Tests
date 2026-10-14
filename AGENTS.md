# Agent guide

This repository demonstrates an Issue-driven, AI-assisted QA workflow with a deterministic Playwright gate. Read
`README.md` for the architecture and `.github/copilot-instructions.md` for detailed repository rules.

## Validate changes

```bash
npm ci
npm run validate
```

Never report success unless the relevant command completed with exit code `0`.

## Test conventions

- Keep specs scenario-focused and free of raw locators.
- Keep locators as private getters in `tests/page-objects/`.
- Expose intent-based actions, typed data readers, and reusable compound assertions as public Page Object methods.
- Use typed fixtures, accessible locators, web-first assertions, and no hard-coded sleeps.
- Keep Issue artifacts paired as `specs/issues/<number>-<slug>.plan.md` and
  `tests/issues/<number>-<slug>.spec.ts`.

## Safety boundaries

- Classify failures before healing; only test implementation and locator/synchronization issues are healable.
- Never change product behavior, weaken assertions, skip acceptance failures, or add retries merely to make CI green.
- Preserve probable product defects as failing tests with clear evidence.
- Never automatically merge a pull request.
