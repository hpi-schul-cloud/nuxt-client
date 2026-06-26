<template>
	<div ref="mapContainer" class="map-edit" data-testid="map-content-element-edit" @mousedown.stop @touchstart.stop />
</template>

<script setup lang="ts">
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet/dist/leaflet.css";
import { MapElementContent } from "@api-server";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
// Fix default marker icon path broken by bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { onBeforeUnmount, onMounted, PropType, ref } from "vue";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
});

const props = defineProps({
	modelValue: {
		type: Object as PropType<MapElementContent>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "update:modelValue", value: MapElementContent): void;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let mapInstance: L.Map | null = null;

const serializeFeatures = (): string => {
	if (!mapInstance) return '{"type":"FeatureCollection","features":[]}';
	const features: GeoJSON.Feature[] = [];
	mapInstance.eachLayer((layer) => {
		if (layer instanceof L.Path || layer instanceof L.Marker) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			features.push((layer as any).toGeoJSON() as GeoJSON.Feature);
		}
	});
	const featureCollection: GeoJSON.FeatureCollection = { type: "FeatureCollection", features };
	return JSON.stringify(featureCollection);
};

const onMapChange = () => {
	if (!mapInstance) return;
	const center = mapInstance.getCenter();
	emit("update:modelValue", {
		...props.modelValue,
		centerLat: center.lat,
		centerLng: center.lng,
		zoom: mapInstance.getZoom(),
		features: serializeFeatures(),
	});
};

type LabeledLayer = (L.Marker | L.Path) & { feature?: GeoJSON.Feature };

const setLayerLabel = (layer: LabeledLayer, text: string) => {
	layer.feature = layer.feature ?? { type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [] } };
	layer.feature.properties = layer.feature.properties ?? {};
	if (text) {
		layer.feature.properties.label = text;
		layer.unbindTooltip();
		layer.bindTooltip(text, { permanent: true, direction: "top" });
	} else {
		delete layer.feature.properties.label;
		layer.unbindTooltip();
	}
};

const openLabelPopup = (layer: LabeledLayer) => {
	const currentLabel = (layer.feature?.properties?.label as string) ?? "";

	const container = L.DomUtil.create("div");
	container.style.display = "flex";
	container.style.flexDirection = "column";
	container.style.gap = "6px";
	container.style.minWidth = "180px";

	const input = L.DomUtil.create("input", "", container) as HTMLInputElement;
	input.type = "text";
	input.value = currentLabel;
	input.placeholder = "Enter label…";
	input.style.width = "100%";
	input.style.boxSizing = "border-box";

	const saveBtn = L.DomUtil.create("button", "", container) as HTMLButtonElement;
	saveBtn.textContent = "Save";

	const save = () => {
		setLayerLabel(layer, input.value.trim());
		layer.closePopup();
		onMapChange();
	};

	L.DomEvent.on(saveBtn, "click", save);
	L.DomEvent.on(input, "keydown", (e: Event) => {
		if ((e as KeyboardEvent).key === "Enter") save();
		if ((e as KeyboardEvent).key === "Escape") layer.closePopup();
	});

	layer.bindPopup(container).openPopup();
	setTimeout(() => input.focus(), 50);
};

const attachClickHandler = (layer: LabeledLayer) => {
	layer.on("click", () => {
		if (mapInstance?.pm.globalEditModeEnabled()) return;
		openLabelPopup(layer);
	});
};

const loadFeatures = (featuresStr: string) => {
	if (!mapInstance) return;
	try {
		const featureCollection = JSON.parse(featuresStr) as GeoJSON.FeatureCollection;
		L.geoJSON(featureCollection, {
			onEachFeature(feature, layer) {
				const labeledLayer = layer as LabeledLayer;
				if (feature.properties?.label) {
					labeledLayer.bindTooltip(feature.properties.label as string, {
						permanent: true,
						direction: "top",
					});
				}
				attachClickHandler(labeledLayer);
			},
		}).addTo(mapInstance);
	} catch {
		// invalid or empty — nothing to load
	}
};

onMounted(async () => {
	if (!mapContainer.value) return;

	// Dynamically import Geoman to avoid SSR issues
	const { default: leafletGeoman } = await import("@geoman-io/leaflet-geoman-free");
	leafletGeoman;

	mapInstance = L.map(mapContainer.value).setView(
		[props.modelValue.centerLat, props.modelValue.centerLng],
		props.modelValue.zoom
	);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(mapInstance);

	loadFeatures(props.modelValue.features);

	mapInstance.pm.addControls({
		position: "topleft",
		drawCircle: false,
		drawCircleMarker: false,
		drawText: false,
		cutPolygon: false,
		rotateMode: false,
	});

	mapInstance.on("pm:create", ({ layer }) => {
		const labeledLayer = layer as LabeledLayer;
		attachClickHandler(labeledLayer);
		openLabelPopup(labeledLayer);
		onMapChange();
	});
	mapInstance.on("pm:remove", onMapChange);
	mapInstance.on("pm:edit", onMapChange);
	mapInstance.on("moveend", onMapChange);
	mapInstance.on("zoomend", onMapChange);
});

onBeforeUnmount(() => {
	mapInstance?.remove();
	mapInstance = null;
});
</script>

<style scoped>
.map-edit {
	height: 400px;
	width: 100%;
}
</style>
