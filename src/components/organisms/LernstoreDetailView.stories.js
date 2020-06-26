import { storiesOf } from "@storybook/vue";
import { Resource } from "../../../stories/mockData/Resource";

import LernstoreDetailView from "@components/organisms/LernstoreDetailView";

storiesOf("6 Organisms/LernstoreDetailView", module).add(
	"LernstoreDetailView",
	() => ({
		components: { LernstoreDetailView },
		data: () => ({
			resource: {
				...Resource
			}
		}),

		template: `<lernstore-detail-view :resource="resource"/>`,
	})
);
