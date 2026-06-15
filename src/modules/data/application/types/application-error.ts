import { HttpStatusCode } from "@/types/enum/http-status-code.enum";

export class ApplicationError extends Error {
	public readonly name = "ApplicationError";
	constructor(
		public statusCode: HttpStatusCode,
		public translationKey: string,
		public message = ""
	) {
		super(message);
	}
}
