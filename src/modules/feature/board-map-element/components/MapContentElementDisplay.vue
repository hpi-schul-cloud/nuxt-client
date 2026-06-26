<template>
	<div class="map-display-wrapper">
		<div
			ref="mapContainer"
			class="map-display"
			data-testid="map-content-element-display"
			@mousedown.stop
			@touchstart.stop
		/>
		<div class="map-display-menu">
			<slot name="menu" />
		</div>
	</div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { MapElementContent } from "@api-server";
import L from "leaflet";
import { onBeforeUnmount, onMounted, PropType, ref, watch } from "vue";

const props = defineProps({
	content: {
		type: Object as PropType<MapElementContent>,
		required: true,
	},
});

const mapContainer = ref<HTMLElement | null>(null);
let mapInstance: L.Map | null = null;

const initMap = () => {
	if (!mapContainer.value) return;

	mapInstance = L.map(mapContainer.value, {
		zoomControl: true,
		dragging: true,
		scrollWheelZoom: false,
		doubleClickZoom: false,
		touchZoom: false,
		keyboard: false,
		boxZoom: false,
	}).setView([props.content.centerLat, props.content.centerLng], props.content.zoom);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(mapInstance);

	loadFeatures(props.content.features);
};

const loadFeatures = (featuresStr: string) => {
	if (!mapInstance) return;
	try {
		const featureCollection = JSON.parse(featuresStr) as GeoJSON.FeatureCollection;
		L.geoJSON(featureCollection, {
			onEachFeature(feature, layer) {
				if (feature.properties?.label) {
					(layer as L.Marker | L.Path).bindTooltip(feature.properties.label as string, {
						permanent: true,
						direction: "top",
					});
				}
			},
		}).addTo(mapInstance);
	} catch {
		// invalid or empty GeoJSON — nothing to render
	}
};

onMounted(() => {
	initMap();
});

onBeforeUnmount(() => {
	mapInstance?.remove();
	mapInstance = null;
});

watch(
	() => props.content,
	(newContent) => {
		if (!mapInstance) return;
		mapInstance.setView([newContent.centerLat, newContent.centerLng], newContent.zoom);
		mapInstance.eachLayer((layer) => {
			if (!(layer instanceof L.TileLayer)) {
				mapInstance!.removeLayer(layer);
			}
		});
		loadFeatures(newContent.features);
	},
	{ deep: true }
);
</script>

<style scoped>
.map-display-wrapper {
	position: relative;
}

.map-display {
	height: 400px;
	width: 100%;
}

.map-display-menu {
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 1000;
}
</style>
