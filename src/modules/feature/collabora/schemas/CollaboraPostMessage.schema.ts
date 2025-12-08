import z from "zod";

export const collaboraMessageSchema = z
	.object({
		MessageId: z.string(),
		Values: z.unknown(),
	})
	.required();
export type CollaboraMessage = z.infer<typeof collaboraMessageSchema>;

export const appLoadingStatusValueSchema = z
	.object({
		Status: z.string(),
	})
	.required();
