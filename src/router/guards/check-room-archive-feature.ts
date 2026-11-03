import { useEnvConfig } from "@data-env";

export const checkRoomArchiveFeature = () => (useEnvConfig().value.FEATURE_ROOM_ARCHIVE_ENABLED ? true : "/rooms");
