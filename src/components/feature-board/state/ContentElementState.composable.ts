import { AnyContentElement, ContentElementType } from "../types/ContentElement";
import {
	ImageContentElementPayload,
	TextContentElementPayload,
} from "../types/ContentElementPayload";

declare type InferAnyContentElementPayload<T extends ContentElementType> =
	T extends "text"
		? TextContentElementPayload
		: T extends "image"
		? ImageContentElementPayload
		: never;

export const useContentElementState = <T extends ContentElementType>(
	id: AnyContentElement["id"]
) => {
	const updateElement = (
		payload: Omit<InferAnyContentElementPayload<T>, "type">
	) => {
		console.log(id, payload);
	};

	return { updateElement };
};
