---
applyTo: 'tests/unit/**/*.spec.js'
---
Vue Test Guidelines
===================

This project uses Vue 3, `<script setup>`, Jest and Vue Test Utils. Follow these guidelines to write stable, portable unit tests.

Principles
- Test the public behaviour (DOM + emitted events) rather than internal implementation details.
- Simulate user interactions (clicks, typing, selection) — avoid peeking into private `setup` bindings.
- Prefer the Vue Test Utils helpers which normalize browser/jsdom differences.

Recommended patterns
- Use `setValue()` for inputs and selects instead of manually setting `element.value` + `trigger('input')`:

	- `await input.setValue('hello')`

- Use `trigger('click')`, `setValue()`, `trigger('change')` and `trigger('input')` to simulate user actions.
- For focus-related assertions attach the wrapper to the document and use element.focus()/blur():

	- `const w = mount(MyComp, { attachTo: document.body })`
	- `el.element.focus()` / `el.element.blur()`

- When testing `<select>` prefer `await select.setValue('value')` which triggers the correct events.
- Avoid relying on `wrapper.vm` to access local bindings inside `<script setup>`; those are not part of the public instance unless explicitly exposed with `defineExpose()`.

Timing and reactivity
- Use `await nextTick()` or `await flushPromises()` after actions that cause asynchronous updates.
- Prefer asserting on DOM or emitted events after `nextTick()` rather than testing internal state directly.

Stubbing platform/DOM features
- Teleport moves DOM nodes outside the component tree; stub it in tests to keep markup inside the wrapper for assertions. Example (global stub):

	- Add a Jest setup file and register the stub with Vue Test Utils, e.g. `tests/jest.setup.js`:

		```js
		import { config } from '@vue/test-utils'
		config.global = config.global || {}
		config.global.stubs = config.global.stubs || {}
		config.global.stubs.Teleport = { template: '<div><slot/></div>' }
		```

- This repository already adds `tests/jest.setup.js` via `package.json` so Teleport is stubbed globally in CI.

Assertions and spies
- Use `wrapper.emitted()` to inspect component emitted events.
- If spying on native element methods (e.g., `focus`, `dispatchEvent`), assert via the spy's mock calls when using Jest: `expect(spy.mock.calls[0][0]).to.equal(ev)` (Chai) or `expect(spy).toHaveBeenCalledWith(ev)` (Jest matcher).

Commands
- Run tests locally:

	- `npm run test:unit`
	- or `./test.sh` (project script wrapper)

Troubleshooting
- If tests behave differently on CI vs locally, check Node/npm versions and installed package versions (especially `jsdom`, `@vue/test-utils`, `jest`). Pinning dev deps or using the same Node version in CI reduces flakiness.

Further reading
- Vue Test Utils: https://test-utils.vuejs.org/guide/essentials/easy-to-test.html

