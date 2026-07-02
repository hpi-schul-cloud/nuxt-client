import { AnyContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";
import { CardSkeletonResponse } from "@api-server";
import type { InjectionKey, Ref } from "vue";

export type BoardCardSkeleton = CardSkeletonResponse;

export interface BoardCard {
	id: string;
	height: number;
	elements: AnyContentElement[];
	visibility: VisibilitySettings;
	title: string;
}

export interface CardEditModeInjection {
	startEditMode: () => void;
	isEditMode: Ref<boolean>;
}

export const CardEditModeKey: InjectionKey<CardEditModeInjection> = Symbol("CardEditMode");
