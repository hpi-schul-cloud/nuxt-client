import z from "zod";

export const collaboraMessageSchema = z
	.object({
		MessageId: z.string(),
		Values: z.unknown(),
	})
	.required();
export type CollaboraMessage = z.infer<typeof collaboraMessageSchema>;

export const modifiedStatusValueSchema = z
	.object({
		Modified: z.boolean(),
	})
	.required();
