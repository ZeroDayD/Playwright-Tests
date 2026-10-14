# Repository instructions

This repository demonstrates a requirement-driven, AI-assisted QA workflow. The demo application is deliberately small;
the portfolio focus is traceable Playwright coverage and an honest human review boundary.

## Commands

- Install exactly locked dependencies with `npm ci`.
- Start the demo application with `npm run dev`.
- Run type checks with `npm run typecheck`.
- Build with `npm run build`.
- Run all Chromium tests with `npm test`.
- Run the complete local gate with `npm run validate`.

## Engineering rules

- Keep all source, tests, documentation, comments, and agent instructions in English.
- Keep the framework lightweight and prefer accessible Playwright locators and web-first assertions.
- Keep locators in `tests/page-objects/` as private getters. Specs use typed fixtures and public intent-based Page Object
  methods, never raw locators.
- Expose data through public typed methods and keep reusable, multi-element expectations in descriptive Page Object
  methods. Add interfaces for structured values; introduce enums only when they clarify a real domain choice.
- Do not use hard-coded sleeps or rely on external production sites in the required CI suite.
- Maintain Issue → plan → test → pull request traceability.
- Store Issue plans in `specs/issues/` and corresponding tests in `tests/issues/`.
- Treat the local demo application as product code. Agents must not edit it to force a failing acceptance test to pass.
- Classify failures before healing. Only test implementation and locator/synchronization failures are healable.
- Preserve probable product defects as failing tests with clear evidence.
- Never weaken assertions, skip failing acceptance tests, or automatically merge pull requests.
