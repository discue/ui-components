# GitHub Copilot Custom Instructions

This file contains custom instructions for GitHub Copilot to enhance its behavior in this repository.

## General Guidelines
- Each component must have an example in the `docs/.vuepress/examples/` folder.
- Each component must have a documentation file with a preview in the `docs/components/` folder.

## Testing Guidelines
- Provide test suggestions for files in the `tests/unit/` directory.
- Use Jest and Chai for test-related completions.

## Exclusions
- Do not suggest completions for files in the `node_modules/` directory.
- Avoid generating code for `LICENSE`, `README.md`, and `CHANGELOG.md` files.

## Style Guidelines
- Follow the existing SCSS conventions in the `styles/` directory.
- Use Tailwind CSS classes where applicable in Vue components.

## JavaScript Guidelines
- Prefer plain JavaScript functions over arrow functions.
- If possible, omit semicolons at the end of JavaScript statements.

## Additional Notes
- Ensure compatibility with the `vite.config.ts` setup.
- Suggest using `@vue/test-utils` for component testing.