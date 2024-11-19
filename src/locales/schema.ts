import deDE from "./de";
import { de as deVuetify } from "vuetify/locale";

export type MessageSchema = typeof deDE & { $vuetify: typeof deVuetify };
