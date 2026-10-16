---
agent: agent
description: Produce test coverage
---

Parameters:
- Source Issue: the GitHub Issue URL and number
- Task: the requirement and acceptance criteria from the Issue
- Seed file (optional): the seed file to use, defaults to `tests/seed.spec.ts`
- Test plan file: `specs/issues/<issue-number>-<slug>.plan.md`
- Test file: `tests/issues/<issue-number>-<slug>.spec.ts`

1. Inspect existing automated coverage before creating anything new. Search current tests, Page Objects, fixtures, and
test data for behavior relevant to every acceptance criterion. Verify coverage from actual assertions, not names alone.

If every in-scope acceptance criterion is already covered, run the relevant existing test or tests when practical,
report **No additional coverage required** with supporting test paths and the validation result, and stop. Do not create
a plan, duplicate test, or pull-request change merely to produce output.

If coverage is partial, record which criteria are already covered and carry only the uncovered criteria forward while
preserving Issue traceability.

2. Call #playwright-test-planner subagent with prompt:

<plan>
  <task-text><!-- the task --></task-text>
  <seed-file><!-- path to seed file --></seed-file>
  <plan-file><!-- path to test plan file to generate --></plan-file>
</plan>

3. For each test case from the test plan file (1.1, 1.2, ...), one after another, not in parallel, call #playwright-test-generator subagent with prompt:

<generate>
  <test-suite><!-- Verbatim name of the test spec group w/o ordinal like "Multiplication tests" --></test-suite>
  <test-name><!-- Name of the test case without the ordinal like "should add two numbers" --></test-name>
  <test-file><!-- Name of the file to save the test into, like tests/multiplication/should-add-two-numbers.spec.ts --></test-file>
  <seed-file><!-- Seed file path from test plan --></seed-file>
  <body><!-- Test case content including steps and expectations --></body>
</generate>

4. Call #playwright-test-healer subagent with prompt:

<heal>Run the generated tests. Classify each failure before changing files. Heal only test implementation or
locator/synchronization failures. Preserve environment failures and probable product defects without weakening,
skipping, or marking tests as fixme.</heal>

5. Run `npm run validate`. Report the exact result and prepare a pull-request summary that links the source Issue, plan,
and test. Never merge the pull request.
