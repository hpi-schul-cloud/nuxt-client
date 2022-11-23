export class ApplicationError extends Error {
	name: string;
	constructor(public statusCode: number, public translationKey: string) {
		super(translationKey + " " + statusCode);
		this.name = "ApplicationError";
	}
}
