import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	server: {
		port: 4000,
	},
	build: {
		outDir: "dist",
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@data-board": fileURLToPath(
				new URL("./src/modules/data/board", import.meta.url)
			),
			"@data-external-tool": fileURLToPath(
				new URL("./src/modules/data/external-tool", import.meta.url)
			),
			"@data-group": fileURLToPath(
				new URL("./src/modules/data/group", import.meta.url)
			),
			"@data-system": fileURLToPath(
				new URL("./src/modules/data/system", import.meta.url)
			),
			"@data-provisioning-options": fileURLToPath(
				new URL("./src/modules/data/provisioning-options", import.meta.url)
			),
			"@data-room": fileURLToPath(
				new URL("./src/modules/data/room", import.meta.url)
			),
			"@feature-board-file-element": fileURLToPath(
				new URL("./src/modules/feature/board-file-element", import.meta.url)
			),
			"@feature-board-submission-element": fileURLToPath(
				new URL(
					"./src/modules/feature/board-submission-element",
					import.meta.url
				)
			),
			"@feature-board-text-element": fileURLToPath(
				new URL("./src/modules/feature/board-text-element", import.meta.url)
			),
			"@feature-board-link-element": fileURLToPath(
				new URL("./src/modules/feature/board-link-element", import.meta.url)
			),
			"@feature-board-external-tool-element": fileURLToPath(
				new URL(
					"./src/modules/feature/board-external-tool-element",
					import.meta.url
				)
			),
			"@feature-board-drawing-element": fileURLToPath(
				new URL("./src/modules/feature/board-drawing-element", import.meta.url)
			),
			"@feature-board-collaborative-text-editor-element": fileURLToPath(
				new URL(
					"./src/modules/feature/board-collaborative-text-editor-element",
					import.meta.url
				)
			),
			"@feature-board-video-conference-element": fileURLToPath(
				new URL(
					"./src/modules/feature/board-video-conference-element",
					import.meta.url
				)
			),
			"@feature-board-deleted-element": fileURLToPath(
				new URL("./src/modules/feature/board-deleted-element", import.meta.url)
			),
			"@feature-course-sync": fileURLToPath(
				new URL("./src/modules/feature/course-sync", import.meta.url)
			),
			"@feature-board": fileURLToPath(
				new URL("./src/modules/feature/board", import.meta.url)
			),
			"@feature-editor": fileURLToPath(
				new URL("./src/modules/feature/editor", import.meta.url)
			),
			"@feature-render-html": fileURLToPath(
				new URL("./src/modules/feature/render-html", import.meta.url)
			),
			"@feature-news-form": fileURLToPath(
				new URL("./src/modules/feature/news-form", import.meta.url)
			),
			"@feature-media-shelf": fileURLToPath(
				new URL("./src/modules/feature/media-shelf", import.meta.url)
			),
			"@feature-room": fileURLToPath(
				new URL("./src/modules/feature/room", import.meta.url)
			),
			"@icons": fileURLToPath(
				new URL("./src/components/icons", import.meta.url)
			),
			"@ui-alert": fileURLToPath(
				new URL("./src/modules/ui/alert", import.meta.url)
			),
			"@ui-board": fileURLToPath(
				new URL("./src/modules/ui/board", import.meta.url)
			),
			"@ui-breadcrumbs": fileURLToPath(
				new URL("./src/modules/ui/breadcrumbs", import.meta.url)
			),
			"@ui-chip": fileURLToPath(
				new URL("./src/modules/ui/chip", import.meta.url)
			),
			"@ui-confirmation-dialog": fileURLToPath(
				new URL("./src/modules/ui/confirmation-dialog", import.meta.url)
			),
			"@ui-date-time-picker": fileURLToPath(
				new URL("./src/modules/ui/date-time-picker", import.meta.url)
			),
			"@ui-extended-icon-btn": fileURLToPath(
				new URL("./src/modules/ui/extended-icon-btn", import.meta.url)
			),
			"@ui-kebab-menu": fileURLToPath(
				new URL("./src/modules/ui/kebab-menu", import.meta.url)
			),
			"@ui-layout": fileURLToPath(
				new URL("./src/modules/ui/layout", import.meta.url)
			),
			"@ui-light-box": fileURLToPath(
				new URL("./src/modules/ui/light-box", import.meta.url)
			),
			"@ui-line-clamp": fileURLToPath(
				new URL("./src/modules/ui/line-clamp", import.meta.url)
			),
			"@ui-preview-image": fileURLToPath(
				new URL("./src/modules/ui/preview-image", import.meta.url)
			),
			"@ui-room-details": fileURLToPath(
				new URL("./src/modules/ui/room-details", import.meta.url)
			),
			"@ui-skip-link": fileURLToPath(
				new URL("./src/modules/ui/skip-link", import.meta.url)
			),
			"@ui-speed-dial-menu": fileURLToPath(
				new URL("./src/modules/ui/speed-dial-menu", import.meta.url)
			),
			"@ui-qr-code": fileURLToPath(
				new URL("./src/modules/ui/qr-code", import.meta.url)
			),
			"@util-board": fileURLToPath(
				new URL("./src/modules/util/board", import.meta.url)
			),
			"@util-validators": fileURLToPath(
				new URL("./src/modules/util/validators", import.meta.url)
			),
			"@util-vue": fileURLToPath(
				new URL("./src/modules/util/vue", import.meta.url)
			),
			"@util-input-masks": fileURLToPath(
				new URL("./src/modules/util/input-masks", import.meta.url)
			),
			"@util-device-detection": fileURLToPath(
				new URL("./src/modules/util/device-detection", import.meta.url)
			),
			"@util-error-notification": fileURLToPath(
				new URL("./src/modules/util/error-notification", import.meta.url)
			),
			"@page-board": fileURLToPath(
				new URL("./src/modules/page/board", import.meta.url)
			),
			"@page-class-members": fileURLToPath(
				new URL("./src/modules/page/class-members", import.meta.url)
			),
			"@page-media-shelf": fileURLToPath(
				new URL("./src/modules/page/media-shelf", import.meta.url)
			),
			"@page-room": fileURLToPath(
				new URL("./src/modules/page/room", import.meta.url)
			),
		},
	},
});
