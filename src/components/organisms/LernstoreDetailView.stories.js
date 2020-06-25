import { storiesOf } from "@storybook/vue";

import LernstoreDetailView from "@components/organisms/LernstoreDetailView";

storiesOf("6 Organisms/LernstoreDetailView", module).add(
	"LernstoreDetailView",
	() => ({
		components: { LernstoreDetailView },
		data: () => ({
			resource: {
				content: {
					url:
						"https://mv-repo.schul-cloud.org/edu-sharing/components/render/70eedbd1-a4e9-47ee-ac00-3848863e5295",
				},
                name: "Mathematische Ausdrücke sortieren",
				downloadUrl:
					"https://mv-repo.schul-cloud.org/edu-sharing/eduservlet/download?nodeId=70eedbd1-a4e9-47ee-ac00-3848863e5295",
				preview: {
					isIcon: false,
					isGenerated: true,
					url:
						"https://mv-repo.schul-cloud.org/edu-sharing/preview?nodeId=70eedbd1-a4e9-47ee-ac00-3848863e5295&storeProtocol=workspace&storeId=SpacesStore&dontcache=1593071828302",
				},
				properties: {
					"cm:creator": ["admin"],
					"cm:created": ["1580304014402"],
					"cm:modified": ["1580304014402"],
					"ccm:metadatacontributer_provider": ["Khan Academy"],
                    "cclom:general_description": ["Lass uns etwas das Addieren und Subtrahieren von Variablen üben, die positive und negative Zahlen auf dem Zahlenstrahl darstellen."],
				},
				ref: {
					repo: "mv-repo.schul-cloud.org",
					id: "70eedbd1-a4e9-47ee-ac00-3848863e5295",
					archived: false,
					isHomeRepo: true,
				},
			},
		}),

		template: `<lernstore-detail-view :resource="resource"/>`,
	})
);
