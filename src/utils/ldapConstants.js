import { helpers } from "vuelidate/lib/validators";

/**
 * The composition of this regex is as follows:
 *
 *  attributeType = [A-Za-z][\w-]*|\d+(?:\.\d+)*
 *  attributeValue = #(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"
 *  nameComponent = (?#attributeType)=(?#attributeValue)(?:\+(?#attributeType)=(?#attributeValue))*
 *  and finally
 *  ldapPathValidationRegex = (?#nameComponent)(?:,(?#nameComponent))*
 *
 *  It matches the following format: nameComponent[, or ;;]nameComponent
 */
export const ldapPathValidationRegex = helpers.regex(
	"alpha",
	/^(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*(?:(,|;;)(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*)*$/
);

export const urlValidationRegex =
	process.env.NODE_ENV === "development"
		? helpers.regex(
				"alpha",
				/ldaps?:\/\/([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3})(:\d+)?$/
		  )
		: helpers.regex(
				"alpha",
				/ldaps:\/\/([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3})(:\d+)?$/
		  );

export const unchangedPassword = "🐱‍👤[unchanged]**";
