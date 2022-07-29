<template>
	<div>
		<!-- Platz für die Notifications für fehlende Geogebras, files o.Ä. --->
		<div v-if="hasFailedGeogebraElement">
			<!-- Geogebra notification component-->
		</div>
		<div v-if="hasFailedEtherpadElement">
			<!-- Etherpad notification component-->
		</div>
		<div v-if="hasFailedFileElement">
			<!-- File notification component-->
		</div>
		<copy-result-modal-list :items="items"></copy-result-modal-list>
	</div>
</template>

<script>
import CopyResultModalList from "@components/copy-result-modal/CopyResultModalList";

/**
 * @type CopyResultItem[]
 */
const mockData = [
	{
		title: "ThemenTitel",
		elementId: "b3551d3d-9a30-4fc0-a4b6-d600f2fc64d5",
		elements: [
			{
				type: "geogebra",
				title: "Geogebra Aufgabentitel",
			},
			{
				type: "file",
				title: "File Aufgabentitel",
			},
			{
				type: "etherpad",
				title: "Etherpad Aufgabentitel",
			},
		],
	},
];

/**
 * Diese component repräsentiert den gesamten inhalt des modals
 */
export default {
	name: "CopyResultModal",
	components: { CopyResultModalList },
	computed: {
		items() {
			// liste der Breadcrumb elements
			return mockData;
		},
		hasFailedGeogebraElement() {
			return this.findElementByType(this.items, "geogebra"); // hasser um notifications oberhalb der liste anzuzeigen -> e.g. "Geogebra Inhalte werden nur als Hülle angelegt"
		},
		hasFailedEtherpadElement() {
			return this.findElementByType(this.items, "etherpad"); // ^ ...
		},
		hasFailedFileElement() {
			return this.findElementByType(this.items, "file"); // ^ ...
		},
	},
	methods: {
		findElementByType(items, type) {
			// returns true if any element in all breadcrumbs contain a failed element of specified type
			let found = false;
			items.forEach((item) => {
				if (found) return;
				item.elements.find((e) => e.type === type) ? (found = true) : null;
			});
			return found;
		},
	},
};
</script>

<!--<style scoped></style>-->
