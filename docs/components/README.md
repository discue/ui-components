# UI Components

The [discue.io](https://www.discue.io/) UI components are a collection of [MIT](https://choosealicense.com/licenses/mit/)-licensed Vue.js components designed for a consistent, accessible, and stylish user interface. The were built so they can be easily integrated into your project and offer a range of functionalities to enhance the user experience.

The following categories of components are available:
- **Form Elements:**  Input fields, radio buttons, select menus, and more, designed for creating accessible and user-friendly forms.
- **Navigation:**  Navigation links and buttons for creating intuitive navigation within your application.
- **Informational:**  Banner components for displaying important messages or notifications.
- **Layout:**  Components to help structure and organize your application's layout.
- **Other:**  A collection of miscellaneous components to address various UI needs.

## Technical Details
::: tip
**Each component in this library follows technical guidelines outlined below.**
::: 

* **Vue.js Composition API:**  All components leverage the Composition API for improved code organization and readability.
* **Tailwind CSS:** Styling is done with Tailwind CSS, providing a modern, customizable, and responsive design.  Components are themeable to match your specific branding.
* **Scoped Styles:**  Component-specific CSS styles are scoped using the `scoped` attribute to prevent style conflicts.

## Documentation and Examples

Each component's page in this documentation includes:

- **Detailed Description:** A comprehensive description of the component's purpose, functionality, and usage.
* **Usage Examples:** On each includes a clear and concise usage example in the  `docs/.vuepress/examples` directory. These examples are designed to be copy-paste ready, allowing you to quickly integrate the component into their projects without modification.
  @[code](../.vuepress/examples/BannerExample.vue)
- **Live Preview:** A live preview of the component in action, showcasing its default appearance and behavior.
<DynamicComponentDisplay type="Banner" :show="true" :show-properties="false" :show-events="false">
    Please confirm your email address by clicking 
    the link in the confirmation email.
</DynamicComponentDisplay>

- **Props Table:** A table listing all available props, their data types, default values, and descriptions. All property can be updated directly in the documentation.
- **Events Table:** A table listing all available events emitted by the component.

## Contributions
::: tip
**Please refer to the [Contribution Guidelines](/contributions/) for detailed instructions on how to contribute.**
::: 
We are looking forward to your contributions!

Our [Contribution Guidelines](/contributions/) cover various aspects of the contribution process, including cloning the repository, installing dependencies, creating new component files, writing unit tests, creating documentation, and submitting pull requests. We encourage you to review these guidelines before starting your contribution.
