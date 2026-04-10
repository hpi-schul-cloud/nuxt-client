import { AnyFn, createGlobalState } from "@vueuse/core";

// This is a wrapper around the createGlobalState function
// from "@vueuse/core" that can be mocked to allow independent tests
export const createTestableGlobaleState = <Fn extends AnyFn>(composable: Fn): Fn => createGlobalState(composable);
