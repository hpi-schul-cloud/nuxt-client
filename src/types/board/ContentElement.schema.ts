import { ContentElementType } from "./ContentElement";
import { z } from "zod";

const ExternalToolElementContentSchema = z.object({
	contextExternalToolId: z.string().nullable(),
});

export const FileElementContentSchema = z.object({
	caption: z.string(),
	alternativeText: z.string(),
});

const FileFolderElementContentSchema = z.object({
	title: z.string(),
});

const H5pElementContentSchema = z.object({
	contentId: z.string().nullable(),
});

const LinkElementContentSchema = z.object({
	url: z.string(),
	title: z.string(),
	description: z.string().optional(),
	originalImageUrl: z.string().optional(),
	imageUrl: z.string().optional(),
});

const RichTextElementContentSchema = z.object({
	text: z.string(),
	inputFormat: z.string(),
});

const SubmissionContainerElementContentSchema = z.object({
	dueDate: z.string().nullable(),
});

const DrawingElementContentSchema = z.object({
	description: z.string(),
});

const DeletedElementContentSchema = z.object({
	title: z.string(),
	deletedElementType: z.enum(ContentElementType),
	description: z.string().optional(),
});

const VideoConferenceElementContentSchema = z.object({
	title: z.string(),
});

const CollaborativeTextEditorElementContentSchema = z.object({});

export const AnyContentElementSchema = z.object({
	id: z.string(),
	type: z.enum(ContentElementType),
	timestamps: z.object({
		createdAt: z.string(),
		lastUpdatedAt: z.string(),
	}),
	content: z.union([
		ExternalToolElementContentSchema,
		FileElementContentSchema,
		FileFolderElementContentSchema,
		H5pElementContentSchema,
		LinkElementContentSchema,
		RichTextElementContentSchema,
		SubmissionContainerElementContentSchema,
		DrawingElementContentSchema,
		DeletedElementContentSchema,
		VideoConferenceElementContentSchema,
		CollaborativeTextEditorElementContentSchema,
	]),
});
