# Writing Tests

How to write valuable, reliable tests, that are easy to maintain.

## Basics

Writing good tests that cover all aspects of your code, leads to:

- **confidence**: to refactor your code
- **higher code quality**: as you review your code and identify problems when writing tests
- **well documented code**: as your tests describe how your code works

and by that to:

- **developer happiness** :-)

### Unit-Tests vs. Component-Tests

#### Unit-Tests

Unit-Tests are **WhiteBox-Tests**. So they may use knowledge of internals of the code. They are well suited for testing e.g. **composables** and **stores**.

#### Component-Tests

Component-Tests are **BlackBox-Tests**. So they are not allowed to use any knowledge of the internals of the component.
They ensure the stability of the **public interface** of the component (aka its methods, props, events etc.).
The enable us to **refactor** the internals of our components later on.

### Positive & negative Tests

- **positive tests** test the default cases of your code = **how it should work**
- **negative tests** test **error-cases** or **exception**-behaviour
- you need to write both to ensure your component works correctly
- think of edge-cases that might break your component e.g. when providing input to the component:
  - **numbers**: high numbers, negative numbers, float<->integer, at the edge of a range that is expected...
  - **dates**: none existing dates e.g. 30th February 2023, far away future,...
  - **strings**: umlauts, url-special-characters (?, &, =, \/\/: ), very long strings for names, long strings without linebreaks
  - **totally incorrect data**: e.g. giving a string instead of a number

### Use Vue-Test-Utils

For testing our Vue-Components we use the **Vue Test Utils**. Vue Test Utils is a library that provides methods to help you write tests for your Vue components. It provides methods to mount, shallow mount, and render components, as well as methods to simulate events and find elements in the rendered output.

Some functionality it provides:

- **mount()**: create a wrapper around the component and instantiate it
- **shallowMount()**: create a shallow wrapper of the component being tested with childcomponents being mocked
- **setMethods()**: mock function on the component
- **setProps()**: set a specific set of props on the component
- **findComponent()**: finds a component by it's class, name or ref
- **findAllComponents()**: finds all components by it's class, name or ref
- **[find() / findAll()](https://v1.test-utils.vuejs.org/api/wrapper/#find)**: search for html elements using html-selectors
  - **deprecated for finding Components**
  - use findComponent() or findAllComponents() instead
- **setData()**: set specific data on the component
- **trigger()** + **emit()**: test events and the flow of data

We think the **Vue Test Utils-documentation** is a valuable resource for learning how to test Vue-Components and a very good starting point on how to test certain aspects of your component. Please have a look at [https://test-utils.vuejs.org/guide](https://test-utils.vuejs.org/guide)

### Use TypeScript

Use TypeScript for your components and for your unit-tests. This way many errors can be prevented early on, as you can detect them already in your IDE.

### Name your tests like your components

Tests should be named after their Component using **.unit.ts** as the extension:

```JavaScript
HelloWorld.vue
HelloWorld.unit.ts
```

### Structure your tests using (multiple) "describe"-blocks

Especially in large test-files it is very helpful for the reader to have a tree-like structure grouping the tests. So use describe blocks to group tests that are related to the same aspect of your code/the functionality.

1. describe block that contains the filename in the root-level of the test-file
2. sub-describe-blocks for groups of tests focussing the same aspects of your code

*Example:*

```TypeScript
describe('@components/share/ImportModal', () => {
    describe('when action button is clicked', () => {
        ...
    });

    ...

    describe("when backend returns an error", () => {

    });
});
```

Example taken from here [Vue NYC - Component Tests with Vue.js - Matt O'Connell](https://www.youtube.com/watch?v=OIpfWTThrK8)
```TypeScript
describe('@components/something/AddButton', () => {
    describe(':props', () => {
        it(':label - should render a button with the passed-in label text', () => { ... })
    });

    ...

    describe("@events", () => {
        it('@add - should emit an "add" event when the button is clicked', () => { ... })
    });
});
```

**Hint**: *maybe you should extract functionality from your component if this is needed e.g. to find a certain test in your file*

### Name the test like a sentence "it should..."

There is a reason we use the it-alias for writing our code and not the test-method: we want to describe the aspect that is tested in a natural sentence. That's why it is best practice to start your test with: it('should ...');

*Example:*

```TypeScript
Bad:
it('name changes on button click')
...

Good:
it('should display the info text', ... );
it('should not render migration start button', ... );
it('should return the translation', ... );
```

### data-testids

Data-testids are attributes to HTML-elements that are solely used to enable tests to find and check a certain aspect of that tag (often to check the contained text against some expected value).

We decided to unify the way data-testid's should be named in Frontend Arch Group: [Meeting 2022-11-04](https://docs.dbildungscloud.de/x/mYHADQ)

Please use ``<div ... data-testid="some-example" ...>`` in your HTML-code if you want to define a data-testid.

- do not use uppercase-characters
- only use one dash - right after data

You can later on check this using:

```TypeScript
// CopyResultModal.unit.ts
expect(
  wrapper.find('[data-testid="copy-result-notifications"]').text()
).toContain(
  wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
);
```

We also recommend to use refs instead of data-testids. But if you do that you ensure not to remove them once they are in the code... as they can be used in the component-code and for testing:

- [VueJs - template refs](https://vuejs.org/guide/essentials/template-refs.html)
- [VueTestUtils - ref](https://v1.test-utils.vuejs.org/api/#ref)

### Setup-methods

Separate your setup from your actual tests: If you need a more complex setup to test something - write a scope method called "setup" for it. Write it in a reusable and configurable way, in order to reuse most of it in several groups of tests. You will get small and easily readable tests and no redudant setup-code inside your tests that contains small differences that are hard to detect.

## Testing

### Events

Use the trigger()-method to simulate a events
[Testing Key, Mouse and other DOM events](https://v1.test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events)

- **Mouse-Click**: [VueTestUtils - trigger events](https://v1.test-utils.vuejs.org/guides/#trigger-events)
- **Keyboard-Input**: [VueTestUtils - keyboard example](https://v1.test-utils.vuejs.org/guides/#keyboard-example)
- **Drag & Drop**: trigger the events (e.g. dragstart, drop) and check for emitted events as reaction to that
- **Event from a child component**: [VueTestUtils - emitting from child component](https://v1.test-utils.vuejs.org/guides/#emitting-event-from-child-component)

### Testing Asynchronous Behavior

You can test asynchronous behavior by using ***Vue.nextTick()***:

```TypeScript
await Vue.nextTick();
...
```

OR by ***trigger***ing an effect and ***await***ing this effect to take place:

```TypeScript
const btnNext = wrapper.find(`[data-testid="dialog-next"]`);
await btnNext.trigger("click");
...
```

**see also**: [VueTestUtils - Testing Asynchronous Behavior](https://v1.test-utils.vuejs.org/guides/#testing-asynchronous-behavior)

### Exceptions

```TypeScript
await expect(() => copyModule.copy(payload)).rejects.toThrow(
    `CopyProcess unknown type: ${payload.type}`
);
```

### console.error

```TypeScript
// UserMigration.page.unit.ts
const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation();

...

expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.any(ApplicationError)
);
consoleErrorSpy.mockRestore();
```

### Testing Composables

- [VueTestUtils - Testing composables](https://test-utils.vuejs.org/guide/advanced/reusability-composition.html#testing-composables)

## Mocking

Replaces methods, instances of classes (e.g. stores) with some functionality, that e.g. simply returns a value you want to use in your test. By mocking you can easily simulate certain scenarios like failing requests or certain return values from any "external" (as in "not part of the code i am currently testing") functionality.
Jest provides very helpful methods for that.
Examples from our codebase:

```TypeScript
const mock = jest.fn().mockReturnValue(expectedTranslation);
```

```TypeScript
copyModuleMock.copyByShareToken = jest.fn()
    .mockResolvedValue(copyResults);
```

They can easily be tested like this:

```TypeScript
expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
```

Or more specific like this:

```TypeScript
expect(addFileMetaDataSpy).toHaveBeenCalledWith(
    expect.objectContaining<FileMetaListResponse>({	size: 2 } as FileMetaListResponse)
);
```

See also here: [VueTestUtils mount - mocks and stubs are now in global](https://test-utils.vuejs.org/migration/)


### Mocking injections

- [Vue.js - Mocking injections](https://v1.test-utils.vuejs.org/guides/#mocking-injections)
- [VueTestUtils - provide / inject](https://test-utils.vuejs.org/guide/advanced/reusability-composition.html#provide-inject)

### Mocking Vuex-Store

#### Mocking a vuex-store in a component:

Example file: `src/components/administration/AdminMigrationSection.unit.ts`

```TypeScript
import { createModuleMocks } from "@/utils/mock-store-module";
import YourModule from "@/store/YourModule";

let yourModule: jest.Mocked<YourModule>;

schoolsModule = createModuleMocks(YourModule, {
    yourMethodName: {
        ...
    },
    ...yourGetters,
}) as jest.Mocked<YourModule>;


mount(YourComponentToBeTested, {
    ...createComponentMocks({
        ...
    }),
    provide: {
        yourModule,
    },
});

expect(yourModule.<yourMethodName>).toHaveBeenCalledWith(...);
```

#### Testing a store:

```TypeScript
import YourModule from "./your-module";

const yourModule = new YourModule({});

...

// using `jest.spyOn()`
it("should call something", () => {
    const yourActionNameMock = jest.spyOn(yourModule, "yourActionName");
    yourModule.yourActionName();
    expect(yourActionNameMock).toHaveBeenCalled();
});

// or using a method directly
it("should set something", () => {
    yourModule.setLoading(true);
    expect(yourModule.getLoading).toBe(true);
});
```

### Mocking Pinia-Stores

***{{ tbd }}** (when Pinia-Stores are enabled for the project)*

### Mocking Composables

Sometimes - if a composable is simple and does not create sideeffects - it is okay to use it in the tests and avoid mocking it.

That's beneficial as it let's us stick to the BlackBox-Idea: we should not know what the component is using internally.

If you need to mock a composable, you can simple do this like in the following example. You only have to ensure to return everything the composable returns... but mocked versions of it.

```TypeScript
...
jest.spyOn(ourExampleComposable, "useExample").mockReturnValue({
  // return mocks of what the composable would have returned
});
...
```


## Components that are hard to test

If you ever get into trouble to write good tests for your compents or code in general - this might be an indicator, that **maybe your code is not structured good enough**.

Consider:

- spliting your component into smaller sub-components with a small API
- extracting functionality into one or mutliple composables
- using an existing composable (from VueUse or an existing one in the project)
- using an existing vuetify-component instead of writing it all yourself
- reshaping the communication workflow (parameters, events, inject/provide, stores, composables)
- (replacing a Vuex-store with a Pinia-store)

For more details on how to write good components and how to split your components: have a look at this great article of Olli: (tbd)


## End-To-End-Tests

(aka Integration/Acceptance/System-Tests)

End-to-End-Tests are developed in a seperate repository [end-to-end-tests](https://github.com/hpi-schul-cloud/end-to-end-tests)

[Documentation of e2e tests](https://docs.dbildungscloud.de/x/tAgrCg)
