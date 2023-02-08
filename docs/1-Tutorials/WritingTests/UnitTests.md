# Writing "Unit"-Tests (v0.3)

This doc is meant to help you write valuable, reliable tests, that are easy to maintain.

## Basics

For testing our Vue-Components we use the **Vue Test Utils**. Vue Test Utils is a library that provides methods to help you write tests for your Vue components. It provides methods to mount, shallow mount, and render components, as well as methods to simulate events and find elements in the rendered output.

Some functionality it provides:

- **mount()**: create a wrapper around the component and instantiate it
- **shallowMount()**: create a shallow wrapper of the component being tested with childcomponents being mocked
- **setMethods()**: mock function on the component
- **setProps()**: set a specific set of props on the component
- **find()**: search for specific elements in the component (**find() and findAll() -> deprecated**)
    - https://v1.test-utils.vuejs.org/api/wrapper/#find
- **findComponent()**: finds a component by it's class, name or ref
- **setData()**: set specific data on the component
- **trigger()** + **emit()**: test events and the flow of data

We think the **Vue Test Utils-documentation** is a valuable resource for learning how to test Vue-Components and a very good starting point on how to test certain aspects of your component. Please have a look at https://test-utils.vuejs.org/guide

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

*example:* **HelloWorld.unit.ts**
```JavaScript
describe('@components/share/ImportModal', () => {
    describe('when action button is clicked', () => {
        ...
    });

    ...

    describe("when backend returns an error", () => {

    });
});
```

**Hint**: *maybe you should extract functionality from your component if this is needed e.g. to find a certain test in your file*

### Name the test like a sentence "it should..."

There is a reason we use the it-alias for writing our code and not the test-method: we want to describe the aspect that is tested in a natural sentence. That's why it is best practice to start your test with: it('should ...');

*example:*
```TypeScript
Bad:
it('name changes on button click')
...

Good:
it('should display the info text', ... );
it('should not render migration start button', ... );
it('should return the translation', ... );
````

### Setup-methods

Separate your setup from your actual tests: If you need a more complex setup to test something - write a scope method called "setup" for it. Write it in a reusable and configurable way, in order to reuse most of it in several groups of tests. You will get small and easily readable tests and no redudant setup-code inside your tests that contains small differences that are hard to detect.

### Unit-Tests vs. Component-Tests

#### Unit-Tests
- are aiming for **code coverage**
- are **WhiteBox-Tests** and may use knowledge of internals of the code
- are well suited for testing e.g. composables and stores

#### Component-Tests
- are **BlackBox-Tests**: they are not allowed to use any knowledge of the internals of the component
- ensure that the **public interface** of the component (aka it's methods, parameters, events etc.) is stable
- enable you to **refactor** your component in a reliable way

### Positive & negative Tests
- **positive tests** test the default cases of your code = **how it should work**
- **negative tests** test **error-cases** or **exception**-behaviour
- you need to write both to ensure your component works correctly
- think of edge-cases that might break your component e.g. when providing input to the component:
  - **numbers**: high numbers, negative numbers, float<->integer, at the edge of a range that is expected...
  - **dates**: none existing dates e.g. 30th February 2023, far away future,...
  - **strings**: umlauts, url-special-characters (?, &, =, \/\/: ), very long strings for names, long strings without linebreaks
  - **totally incorrect data**: e.g. giving a string instead of a number


## Testing

### Events
Use the trigger()-method to simulate a events
[Testing Key, Mouse and other DOM events](https://v1.test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events)
- **Mouse-Click**: https://v1.test-utils.vuejs.org/guides/#trigger-events
- **Keyboard-Input**: https://v1.test-utils.vuejs.org/guides/#keyboard-example
- **Drag & Drop**: trigger the events (e.g. dragstart, drop) and check for emitted events as reaction to that
- **Event from a child component**: https://v1.test-utils.vuejs.org/guides/#emitting-event-from-child-component

  ```TypeScript
  wrapper.findComponent(ChildComponent).vm.$emit('custom');
  ```

### Testing Asynchronous Behavior

You can test asynchronous behavior by using ***nextTick*** OR by ***trigger***ing an effect and ***await***ing this effect to take place:

```TypeScript
await Vue.nextTick();
...
await button.trigger('click');
```
**more**: https://v1.test-utils.vuejs.org/guides/#testing-asynchronous-behavior

### Exceptions

...

### console.error
Mock the console.error-method like in this test:
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

https://v1.test-utils.vuejs.org/guides/#mocking-injections

### Mocking Vuex-Store

#### Mocking a vuex-store in a component:

Example file: `src/components/administration/AdminMigrationSection.unit.ts`

```
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

```
import YourModule from "./your-module";

const yourModule = new YourModule({});

.
.
.

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

Discuss/have a workshop on "How to write components that are easy to test?" results => BrownBag {{ tbd }}

### Mocking Composables

{{ tbd }}

### data-testids

data-testid vs...ä {{ tbd }}

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
