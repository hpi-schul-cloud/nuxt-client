import { useEnvConfig } from "@data-env";
import { Breadcrumb } from "@ui-layout";
import { useI18n } from "vue-i18n";

export const useRoomBreadcrumbs = () => {
	const { t } = useI18n();
	const envConfig = useEnvConfig();

	const getRoomsRootBreadcrumbs = (isArchived = false): Breadcrumb[] => {
		const breadcrumbs: Breadcrumb[] = [{ title: t("pages.rooms.title"), to: "/rooms" }];

		if (isArchived && envConfig.value.FEATURE_ROOM_ARCHIVE_ENABLED) {
			breadcrumbs.push({ title: t("pages.rooms.archived.title"), to: "/rooms/archive" });
		}

		return breadcrumbs;
	};

	return { getRoomsRootBreadcrumbs };
};
