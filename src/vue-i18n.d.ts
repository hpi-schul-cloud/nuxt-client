/**
 * vue-i18n global type definitions
 */

import { MessageSchema } from "./locales/schema";

declare module "vue-i18n" {
	// define the locale messages schema
	export interface DefineLocaleMessage extends MessageSchema {}
}
