export class ApplicationError extends Error {
	name: string;
	constructor(
		public statusCode: number,
		public translationKey: string,
		public message: string = ""
	) {
		super(message);
		this.name = "ApplicationError";
	}
}
