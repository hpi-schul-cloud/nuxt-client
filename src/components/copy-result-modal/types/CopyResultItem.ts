import { CopyResultItemElement } from "@/components/copy-result-modal/types/CopyResultItemElement";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";

export interface CopyResultItem {
	elementId: string; // the element id this item refers to -> we need this to create the edit URL
	title: string;
	elements: CopyResultItemElement[]; // the list of actually failed entries for this item
	type: CopyApiResponseTypeEnum;
	url: string;
}
