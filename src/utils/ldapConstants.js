import { helpers } from "vuelidate/lib/validators";

/**
 * The composition of this regex is as follows:
 *
 *  attributeType = [A-Za-z][\w-]*|\d+(?:\.\d+)*
 *  attributeValue = #(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"
 *  nameComponent = (?#attributeType)=(?#attributeValue)(?:\+(?#attributeType)=(?#attributeValue))*
 *  and finally
 *  ldapPathRegexValidatior = (?#nameComponent)(?:,(?#nameComponent))*
 *
 *  It matches the following format: nameComponent[, or ;;]nameComponent
 */
export const ldapPathRegexValidatior = helpers.regex(
	"alpha",
	/^(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*(?:(,|;;)(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})+|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*")(?:\+(?:[A-Za-z][\w-]*|\d+(?:\.\d+)*)=(?:#(?:[\dA-Fa-f]{2})+|(?:[^,=\+<>#;\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*|"(?:[^\\"]|\\[,=\+<>#;\\"]|\\[\dA-Fa-f]{2})*"))*)*$/
);

export const urlRegexDevStage =
	/^ldaps?:\/\/(([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;
export const urlRegex =
	/^ldaps:\/\/(([\w\.-]+\.[a-z]+)|((\d{0,3}\.){3}\d{0,3}))(:\d+)?$/;

export const urlRegexValidator =
	process.env.NODE_ENV === "development"
		? helpers.regex("alpha", urlRegexDevStage)
		: helpers.regex("alpha", urlRegex);

export const unchangedPassword = "🐱‍👤[unchanged]**";
