import type { Component } from "vue";

export type AwaitableResult<T> = { completed: true; data: T } | { completed: false; data: undefined };

declare const propsTypeSymbol: unique symbol;
declare const resultTypeSymbol: unique symbol;

export type DialogDefinition<Props, Result> = {
	component: Component;
	readonly [propsTypeSymbol]?: Props;
	readonly [resultTypeSymbol]?: Result;
};

export function defineDialog<Props, Result>(component: Component): DialogDefinition<Props, Result> {
	return { component };
}

export type PropsOf<T> = T extends DialogDefinition<infer P, any> ? P : never;
export type ResultOf<T> = T extends DialogDefinition<any, infer R> ? R : never;
