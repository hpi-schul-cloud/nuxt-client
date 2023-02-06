# Writing "Unit"-Tests

This doc is meant to help you write valuable, reliable tests, that are easy to maintain.

## Basics

We think the **Vue Test Utils-documentation** is a valuable resource for learning how to test Vue-Components and a very good starting point. Ensure that you worked your way through these.

- https://test-utils.vuejs.org/guide/

### Use TypeScript

Use TypeScript for your components and for your unit-tests. This way many errors can be prevented early on, as you can detect them already in your IDE.

### Name your tests like your components

Tests should be named after their Component - but use .unit.ts as the extension:

```
HelloWorld.vue
HelloWorld.unit.ts
```

### Group your tests using (multiple) "describe"-blocks

Especially in large test-files it is very helpful for the reader to have a tree-like structure grouping the tests. So use describe blocks to group tests that are related to the same aspect of your code/the functionality.

1. describe block that contains the filename in the root-level of the test-file
2. sub-describe-blocks for groups of tests focussing the same aspects of your code

#### example:

...

### Write the test like a sentence "it should..."

There is a reason we use the it-method for writing our code and not the test-method: we want to describe the aspect that is tested in a natural sentence. That's why it is best practice to start your test with: it('should ...');

#### example:

...

### Unit-Tests vs. Component-Tests

#### Unit-Tests

Unit-Tests are WhiteBox-Tests may use knowledge of internals of the code. They are well suited for testing composables and probably stores.

#### Component-Tests

Component-Tests are **BlackBox-Tests**: they are not allowed to use any knowledge of the internals of the component. They ensure that the **public interface** of the component (aka it's methods, parameters, events etc.) is stable, so that other components can interact with it in a reliable way.

##### Benefit

Writing your tests as described, refactoring the internals of a component does not affect it's tests: you can refactor it and still be sure that it works as before.

##### Edge-Case

If your component contains functions that are hard to test by a BlackBox-test, you should probably extract those (e.g. into one or multiple composables) and test them separatly using a Unit-Test.

### Positive & Negative Tests

Often it is very clear how the code should work and easy to write a test for that. This is called a positive test. But you should also test the scenarios in which the code is not able to operate or gets weird input that makes it fail or fallback to some defaults. These tests are negative tests. Be creative to find edge-cases that are very unlikely but possible and ensure to test all the branches in your logic (e.g. check what happens if you want to access the "n+1"th element of list) Also try to find some nearly random test-cases as the edge-cases are probably working well as they got some special treatment (special if-statements).

### Setup-methods

Separate your setup from your actual tests: If you need a more complex setup to test something - write a scope method called "setup" for it. Write it in a reusable and configurable way, in order to reuse most of it in several groups of tests. You will get small and easily readable tests and no redudant setup-code inside your tests that contains small differences that are hard to detect.

## Testing

[Testing Key, Mouse and other DOM events](https://v1.test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events)

### Events

#### Click

Use the trigger()-method to simulate a mouse click:

```
await wrapper.find('button').trigger('click')
```

#### Drag & Drop

1. Find the component via wrapper.findComponent.
2. Use .trigger() to trigger the drag and drop-event (e.g. dragstart, drop, dragleave, ...)
3. Check if the component reacted in the expected way (e.g. emitting another event to it's parent).

#### Keyboard

[Example](https://v1.test-utils.vuejs.org/guides/#keyboard-example)

#### Event from ChildComponent

You can easily emulate some interaction on a Childcomponent using VueTestUtils using this syntax:

```
wrapper.findComponent(ChildComponent).vm.$emit('custom')
```

#### Testing Asynchronous Behavior

You can test asynchronous behavior and the results

```
await Vue.nextTick()
```

[Testing Asynchronous Behavior](https://v1.test-utils.vuejs.org/guides/#testing-asynchronous-behavior)

### Exceptions

{{ UserMigration.page.unit.ts }}

### console.error

{{ tbd }}

## Mocking

### Mocking injections

https://v1.test-utils.vuejs.org/guides/#mocking-injections

### Mocking Vuex-Store

createModuleMock() jest.mocked() {{ tbd }}

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
