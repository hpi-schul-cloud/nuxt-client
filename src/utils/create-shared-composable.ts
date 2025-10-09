import { AnyFn, createSharedComposable } from "@vueuse/core";

// This is a wrapper around the createSharedComposable function
// from "@vueuse/core" that can be mocked to allow independent tests
export const createTestableSharedComposable = <Fn extends AnyFn>(composable: Fn): Fn =>
	createSharedComposable(composable);
