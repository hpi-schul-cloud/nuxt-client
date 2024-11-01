import deDE from "./de";
import { de } from "vuetify/locale";

export type MessageSchemaCustom = typeof deDE;
export type MessageSchemaVuetify = {
	$vuetify: typeof de;
};

export type MessageSchema = MessageSchemaCustom | MessageSchemaVuetify;
