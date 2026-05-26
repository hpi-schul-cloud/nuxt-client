import { useEnvConfig } from "@data-env";

export const checkFolderFeature = () => (useEnvConfig().value.FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED ? true : "/");
