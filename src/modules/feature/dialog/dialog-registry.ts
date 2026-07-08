import type {
	ConfirmationDialogProps,
	CopyDialogProps,
	ImportCardDialogProps,
	ImportCardDialogResult,
	ImportColumnDialogProps,
	ImportColumnDialogResult,
	ImportDialogProps,
	ImportDialogResult,
	LoadingStateDialogProps,
	ShareDialogProps,
} from "./dialog-contracts";
import { ConfirmationDialog, LoadingStateDialog } from "./dialogs";
import { CopyDialog } from "@feature-copy";
import { ImportCardDialog, ImportColumnDialog, ImportDialog } from "@feature-import";
import { ShareDialog } from "@feature-share";
import type { Component } from "vue";

export type AwaitableResult<T> = { completed: true; data: T } | { completed: false; data: undefined };

declare const propsTypeSymbol: unique symbol;
declare const resultTypeSymbol: unique symbol;

export type DialogDefinition<Props, Result> = {
	component: Component;
	readonly [propsTypeSymbol]?: Props;
	readonly [resultTypeSymbol]?: Result;
};

const defineDialog = <Props, Result>(component: Component): DialogDefinition<Props, Result> => ({ component });

export const dialogRegistry = {
	confirmation: defineDialog<ConfirmationDialogProps, boolean>(ConfirmationDialog),
	copy: defineDialog<CopyDialogProps, boolean>(CopyDialog),
	import: defineDialog<ImportDialogProps, ImportDialogResult>(ImportDialog),
	importCard: defineDialog<ImportCardDialogProps, ImportCardDialogResult>(ImportCardDialog),
	importColumn: defineDialog<ImportColumnDialogProps, ImportColumnDialogResult>(ImportColumnDialog),
	share: defineDialog<ShareDialogProps, void>(ShareDialog),
	loadingState: defineDialog<LoadingStateDialogProps, void>(LoadingStateDialog),
};

export type DialogRegistry = typeof dialogRegistry;
export type DialogKey = keyof DialogRegistry;

export type DialogProps<K extends DialogKey> = DialogRegistry[K] extends DialogDefinition<infer P, unknown> ? P : never;
export type DialogResult<K extends DialogKey> =
	DialogRegistry[K] extends DialogDefinition<unknown, infer R> ? R : never;
