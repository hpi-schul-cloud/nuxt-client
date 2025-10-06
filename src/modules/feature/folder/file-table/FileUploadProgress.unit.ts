import FileUploadProgress from "./FileUploadProgress.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";

describe("FileUploadProgress", () => {
	const buildUploadStatsTranslation = (uploaded: string, total: string) =>
		`${uploaded} von ${total} Dateien hochgeladen`;

	const setupWrapper = (props: {
		uploadProgress: {
			uploaded: number;
			total: number;
		};
		areUploadStatsVisible?: boolean;
	}) => {
		const wrapper = mount(FileUploadProgress, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n({
						messages: {
							en: {
								"pages.folder.uploadstats": buildUploadStatsTranslation("{uploaded}", "{total}"),
							},
						},
					}),
				],
			},
			props: {
				...props,
				areUploadStatsVisible: props.areUploadStatsVisible ?? true,
			},
		});

		return { wrapper };
	};

	describe("when areUploadStatsVisible is false", () => {
		it("should not show any upload UI", () => {
			const { wrapper } = setupWrapper({
				uploadProgress: { uploaded: 1, total: 2 },
				areUploadStatsVisible: false,
			});
			expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(false);
			const uploadProgressText = wrapper.find("[data-testid='upload-progress']");
			expect(uploadProgressText.exists()).toBe(false);
		});

		describe("when areUploadStatsVisible changes to true", () => {
			it("should show component", async () => {
				vi.useFakeTimers();
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 1 },
					areUploadStatsVisible: false,
				});

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
				const uploadProgressTextTimeA = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeA.exists()).toBe(false);

				await wrapper.setProps({ areUploadStatsVisible: true });
				vi.advanceTimersByTime(5000);
				await wrapper.vm.$nextTick();

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
				const uploadProgressTextTimeB = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeB.exists()).toBe(true);
			});
		});
	});
	describe("when areUploadStatsVisible is true", () => {
		describe("when areUploadStatsVisible changes to true", () => {
			it("should make the component disappear after 5 seconds", async () => {
				vi.useFakeTimers();
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 1 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
				const uploadProgressTextTimeA = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeA.exists()).toBe(true);

				await wrapper.setProps({ areUploadStatsVisible: false });
				vi.advanceTimersByTime(5000);
				await wrapper.vm.$nextTick();

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
				const uploadProgressTextTimeB = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeB.exists()).toBe(false);
			});

			it("should still be visible after 1 second", async () => {
				vi.useFakeTimers();
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 1 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
				const uploadProgressTextTimeA = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeA.exists()).toBe(true);

				await wrapper.setProps({ areUploadStatsVisible: false });
				vi.advanceTimersByTime(1);
				await wrapper.vm.$nextTick();

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
				const uploadProgressTextTimeB = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressTextTimeB.exists()).toBe(true);
			});
		});

		describe("when uploaded < total", () => {
			it("should show v-progress-circular", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 2 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(true);
			});

			it("should not show v-icon", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 2 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
			});

			it("should show upload stats text", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 1, total: 2 },
					areUploadStatsVisible: true,
				});

				const uploadProgressText = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressText.exists()).toBe(true);
				expect(uploadProgressText.text()).toBe(buildUploadStatsTranslation("1", "2"));
			});
		});

		describe("when uploaded = total", () => {
			it("should not show v-progress-circular", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 2, total: 2 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(false);
			});

			it("should show v-icon", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 2, total: 2 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
			});

			it("should show upload stats text", () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 2, total: 2 },
					areUploadStatsVisible: true,
				});

				const uploadProgressText = wrapper.find("[data-testid='upload-progress']");
				expect(uploadProgressText.exists()).toBe(true);
				expect(uploadProgressText.text()).toBe(buildUploadStatsTranslation("2", "2"));
			});
		});

		describe("when upload progress total and uploaded are initially 0, 0 and then change to 0, 1", () => {
			it("should show v-progress-circular", async () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 0, total: 0 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(false);

				await wrapper.setProps({ uploadProgress: { uploaded: 0, total: 1 } });

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(true);
			});
		});

		describe("when upload progress total and uploaded are initially 0, 1 and then change to 0, 0", () => {
			it("should show v-progress-circular", async () => {
				const { wrapper } = setupWrapper({
					uploadProgress: { uploaded: 0, total: 1 },
					areUploadStatsVisible: true,
				});

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(true);

				await wrapper.setProps({ uploadProgress: { uploaded: 0, total: 0 } });

				expect(wrapper.findComponent({ name: "v-progress-circular" }).exists()).toBe(false);
			});
		});
	});
});
