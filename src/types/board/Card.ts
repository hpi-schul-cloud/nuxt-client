import { AnyContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";
import { CardSkeletonResponse } from "@/generated/serverApi/v3";

export type BoardCardSkeleton = CardSkeletonResponse;

export interface BoardCard {
	id: string;
	height: number;
	elements: AnyContentElement[];
	visibility: VisibilitySettings;
	title: string;
}
