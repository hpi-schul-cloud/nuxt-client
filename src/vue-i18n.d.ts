/**
 * vue-i18n global type definitions
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefineLocaleMessage } from "vue-i18n";

type MessageSchema = typeof import("@/locales/de");

declare module "vue-i18n" {
	// define the locale messages schema
	export interface DefineLocaleMessage extends MessageSchema {}
}
