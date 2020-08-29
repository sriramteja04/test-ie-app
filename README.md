# Admin Portal v2.0

> **Target OS**: Windows, Mac, Linux
>
> **Development platform**: Google Chrome, Safari, Firefox, Internet Explorer

## Application Architecture

### UI

-   **Framework**: React v16.10.2
-   **Component Reuse**: Any components found in the /src/components/common folder must be reused as needed in the app. DO NOT remake existing components
-   **Component Libraries**: Material UI Date picker component library is used to develop date pickers.
-   **Theming**: There is currently no theming requirement, however it would be advisable to integrate theming into the app to allow for consistency in styles, and future theming considerations. Theming can easily be achieved using React’s Context API and would not hinder development speed.
-   **Navigation**: react-router-dom.
-   **Localization**: All strings should be kept in a separate file in each component’s respective folder to allow localization.
-   **Styles**: All styles must be multiples of ”baseUnit” found in the /src/scss/base/base.scss folder, by default every html tags will have margin, padding as 0px and every style file should be imported at index.scss.

### State Management

-   **useState**: with useState() hook, you can pass in the initial state. It returns an array with 2 elements [current state, set state function].
-   **useReducer**: An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns an array with current state paired with a dispatch method.
-   Redux & Redux-Sagas
-   Immutable.js

### Project Structure

-   **Components**: UI components should be grouped by their function, i.e. several components related to a login menu should be located in a folder named ‘login’.

    -   Each component should be a modular self-contained entity that is a pure function of props and state. Stateless components should be used where applicable and preferred way to maintain component level state is by using React Hooks with memo higher order function over React.PureComponent or React.Component wherever possible.
    -   Each component should have its own ‘styles’ file that is created using SCSS. With the exception of withStyle hook in datePicker component, there should be no inline styles in the components.
    -   Inline binding of functions should be avoided, and inline anonymous functions should be used sparingly. The preferred method is to use JavaScript class methods passed to the React element.
    -   As needed, each component should have its own utility class associated with it and located in its respective folder.

-   **Containers**: Containers should be grouped in a folder named ‘containers’. Containers should serve only to connect to the Redux store, implement higher order components, and pass data to Pages.

-   **Pages**: Pages should be grouped in a folder named 'pages'. Pages are responsible to receive data from containers and passes data to respective components.

-   **Common**: UI Custom Components should be developed with React.memo and SCSS without leveraging on any third party libraries except Material UI date pickers.

-   **State Management**: Application state should be broken up into individual modules, with each module handling a specific part of the application state.
    -   Each module folder (named for the piece of state it is handling) should contain files named ‘actions.js’, ‘reducers.js’, and ‘sagas.js’.
    -   Each actions file should contain a named export named ‘actions’ that is an object consisting of all action types for that module
    -   Each actions file should also contain an action creator for each action type - the action creator should be a named export.
    -   Reducers must be pure functions and only use Immutable.js to update the application state. There should be absolutely no mutation of the application state..
    -   All side effects such as API calls and other asynchronous tasks must be implemented using sagas. Every asynchronous task should have at least three Redux actions associated with it: an action to initiate the task, and action for successful completion of the task, and an action for the case that the task is not successfully completed.

*   **Folder Structure:**

    ```
    +---root
    |    +---src
    |        +---assets
    |            +---fonts
    |            +---icons
    |            +---images
    |        +---common
    |            +---CustomComponentA
    |            +---CustomComponentB
    |            /---CustomComponentC.js
    |            /---CustomComponentD.js
    |        +---components
    |            +---Custom Hooks
    |                /---useReducer1.js
    |                /---useReducer2.js
    |                /---useReducer3.js
    |            +---component1
    |                /---ComponentA.js
    |                /---ComponentB.js
    |                /---utils.js
    |            +---component2
    |        +---config
    |            +---redux
    |                /---ManageContent.js
    |            +---sagas
    |                /---ManageContent.js
    |        +---containers
    |            /---Container1.js
    |            /---Container2.js
    |        +---modules
    |            +---module1
    |                /---actions.js
    |                /---reducers.js
    |                /---sagas.js
    |            +---module2
    |        +---pages
    |            /---ComponentA.js
    |            /---ComponentB.js
    |            /---ComponentC.js
    |        +---constants
    |            /---ManageContent.js
    |        +---test
    |            +---component1
    |                /---ComponentA.test.js
    |                /---ComponentB.test.js
    |            +---component2
    |        +---scss
    |            +---abstracts
    |                /---config.scss
    |                /---functions.scss
    |                /---mixins.scss
    |                /---variables.scss
    |            +---base
    |                /---animations.scss
    |                /---base.scss
    |                /---typography.scss
    |            +---components
    |                /---CustomComponentA.scss
    |                /---CustomComponentB.scss
    |            /---index.scss
    |        +---util
    |            /---history.js
    |            /---test.js
    |            /---componentA.js
    |            /---componentB.js
    |        /---App.js
    |        /---ManageContent.js
    |        /---setUpTests.js
    ```

*   **Data Persistence**: Redux persist should be used for storing data to the user’s browser. Reducer whitelists/blacklists should be utilized to minimize the amount of data stored on the user’s browser.

*   **Development Environments**: Development environments for development, QA, and production should be maintained.

*   **Testing**: Testing will be conducted by the QA team, basic unit testing for components, reducers and sagas using Jest and enzyme is recommended. npm test launches the test runner in the interactive watch mode.

*   **Formatting**: Code throughout the application will be formatted using Prettier, with a provided common configuration.

*   **Versioning**: SemVer (semantic versioning) is a scheme for determining how to assign a new version number to application based on the difference between the previous version and the new version.
    -   A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor version, and Z is the patch version. Each element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0
    -   X: MAJOR: Significant change to UI or code and/or structure
    -   Y: MINOR: New features
    -   Z: PATCH: Bug fixes
