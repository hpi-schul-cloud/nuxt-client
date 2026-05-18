import { dialogRegistry } from "./dialog-registry";
import type { Component } from "vue";

export type AwaitableResult<T> = { completed: true; data: T } | { completed: false; data: undefined };

declare const propsTypeSymbol: unique symbol;
declare const resultTypeSymbol: unique symbol;

export type DialogDefinition<Props, Result> = {
	component: Component;
	readonly [propsTypeSymbol]?: Props;
	readonly [resultTypeSymbol]?: Result;
};

export const defineDialog = <Props, Result>(component: Component): DialogDefinition<Props, Result> => ({ component });

export type DialogRegistry = typeof dialogRegistry;
export type DialogKey = keyof DialogRegistry;

export type PropsOf<T> = T extends DialogDefinition<infer P, unknown> ? P : never;
export type ResultOf<T> = T extends DialogDefinition<unknown, infer R> ? R : never;

export type DialogProps<K extends DialogKey> = PropsOf<DialogRegistry[K]>;
export type DialogResult<K extends DialogKey> = ResultOf<DialogRegistry[K]>;
