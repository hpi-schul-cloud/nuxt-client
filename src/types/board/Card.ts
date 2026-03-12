import { AnyContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";
import { CardSkeletonResponse } from "@api-server";

export type BoardCardSkeleton = CardSkeletonResponse;

export interface BoardCard {
	id: string;
	height: number;
	elements: AnyContentElement[];
	visibility: VisibilitySettings;
	title: string;
}
