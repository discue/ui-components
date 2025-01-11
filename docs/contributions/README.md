## Concepts
**Each component** uses the [Vue.js Composition API](https://vuejs.org/guide/extras/composition-api-faq.html).

* **`template`:** Defines the component's HTML structure.
* **`script`:** Contains the component's JavaScript logic, including data (bindings), methods, computed properties, and lifecycle hooks.
* **`style`:**  (Optional) Contains the component's CSS styles, scoped to the component using the `scoped` attribute.  This library uses Tailwind CSS for styling.

**Each component provides a usage example** in `docs/.vuepress/examples`. This example should be clear and concise. Users must be able to copy the example to their application without any changes.
  @[code](../.vuepress/examples/BannerExample.vue)

**Each component provides a documentation page** in `docs/components`. The documentation must show the usage example, and use the `DynamicComponentDisplay` component to render a live preview of the component. 

## Contribution Guidelines
When contributing new components or making changes to existing ones, please follow these guidelines:

1.  **Clone the repository:** Clone the repository at [github.com/discue/ui-components](https://github.com/discue/ui-components)
2.  **Install dependencies:** Navigate to the project directory and install the required dependencies using npm or yarn.
1. **Create a new component file:**  Create a new file within the `src/components` directory for your component. The filename name should be the kebab-case version of your component's name (e.g., `my-component.vue`).
2. **Write unit tests:** Write comprehensive unit tests for your component using Vue Test Utils. These tests should cover all aspects of the component's functionality.
3. **Create a new documentation file:** Inside the directory `docs/components`, create a new `.md` file named after your component (e.g. `my-component.md`). This file should follow the same structure as the documentation files for other components in the `docs/components` directory. 
4. **Create a usage example:** Inside `docs/.vuepress/examples` create a new `.vue` file named after your component (e.g. `MyComponentExample.vue`). This file should contain a concise usage example.
5. **Read Contribution Guidelines:** Read the (Contribution Guidelines)[https://github.com/discue/.github/blob/main/CONTRIBUTING.md]
6. **Follow coding style:** Ensure your code adheres to the existing coding style and conventions of the project.
6.  **Commit your changes:** Commit your changes with a clear and concise message that follows the guidelines on [writing commit messages](https://github.com/discue/.github/blob/main/CONTRIBUTING.md#memo-writing-commit-messages) and shows you sign-of the [certificate of origin](https://github.com/discue/.github/blob/main/CONTRIBUTING.md#repeat-submitting-pull-requests).
8. **Submit a pull request:** Submit a pull request to the [github.com/discue/ui-components](https://github.com/discue/ui-components) repository. Your pull request will be reviewed by the maintainers before being merged.

## Building the Library
To build the library (and the docs), run the following command in the project's root directory:

```bash
./build.sh
```

This will generate the distributable files in the `dist` directory. These files can then be used to install the library in other projects.

## Testing the Libary
To test individual components, navigate to the project's root directory and run:

```bash
./test.sh
```