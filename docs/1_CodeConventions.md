# Code Conventions

<!-- vscode-markdown-toc -->
* [filenames](#filenames)
* [directory structure](#directorystructure)
* [data-testid(s)](#data-testids)
* [ts-ignore comments](#ts-ignorecomments)
* [Composables](#Composables)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='filenames'></a>filenames

Files should be consistently named like this:
| file content   |   filename                    |
|----------------|------------------------------:|
| Components     | `YourComponent.vue`           |
| Pages          | `YourPageName.page.vue`       |
| Layouts        | `yourLayoutName.layout.vue`   |
| Composables    | `yourComponent.composable.ts` |
| Tests          | `yourTestFile.unit.ts`        |
| Utils          | `yourUtil.ts`                 |
| Pinia stores   | `yourFilename.ts`             |
| Vuex stores    | `your-filename.ts`            |

## <a name='directorystructure'></a>directory structure

**Near future**: The structure of this project will move from the old *Atomic Design* (= using molecules- and atoms- folders) to a more use-case-centeric approach.
Details are documented here: [Vue 3 project structure](https://docs.dbildungscloud.de/x/oYAgDQ)

**Far future**: Linter Rules to enforce the project structure as decided in Frontend Arc Group Meeting 2022-08-26.

**Current status**: For the moment we started to break up the *Atomic Design* by introducing feature-centric folders. (e.g. ``src / components /share-course / ...``).


## <a name='data-testids'></a>data-testid(s)

Please use ``<div ... data-testid="some-example" ...>`` in your HTML-code if you want to define a data-testid.

* do not use uppercase-characters
* only use one dash - right after data

We also recommend to use **ref**s instead of data-testids. But if you do that, you need to be careful when removing them... as they could be used in the component-code AND in tests:

- [VueJs - template refs](https://vuejs.org/guide/essentials/template-refs.html)
- [VueTestUtils - ref](https://v1.test-utils.vuejs.org/api/#ref)

Also look here: *Frontend Arc Group: Meeting Notes 2022-11-04*


## <a name='ts-ignorecomments'></a>ts-ignore comments

Everybody should try to avoid ``// @ts-ignore`` and try his/her best to define the types of variables in TypeScript files.

Also look here: *Frontend Arc Group: Meeting Notes 2022-10-28*


## <a name='Composables'></a>Composables

Composables are a great way to make our code more reusable and to extract code from components. If you want to write a composable, consider using one of these well documented and well tested ones:
[VueUse - Collection of Vue Composition Utilities](https://vueuse.org/)

If you write a composable:

* it should have the extension ``.composable.ts``
* should be placed in your feature folder (see section "directory structure" above), if it is only used inside of your feature
* should be placed in the global folder ``/ src / composables``, if it is used in multiple features
