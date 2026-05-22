import { useEnvConfig } from "@data-env";

export const checkRegisterExternalPersonsFeature = () =>
	useEnvConfig().value.FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED ? true : "/";
