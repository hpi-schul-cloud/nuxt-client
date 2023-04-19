import { CardSkeletonResponse } from "@/serverApi/v3";
import { AnyContentElement } from "./ContentElement";
import { VisibilitySettings } from "./VisibilitySettings";

export type BoardCardSkeleton = CardSkeletonResponse;
export interface BoardCard {
	cardId: string;
	height: number;
	elements: AnyContentElement[];
	visibility: VisibilitySettings;
	title: string;
}
