<template>
	<div>
		<room-wrapper
			:has-rooms="hasCurrentRooms"
			:has-import-token="!!importToken"
		>
			<template #header>
				<h1 class="text-h3 pt-2">
					{{ $t("pages.rooms.index.courses.active") }}
				</h1>
				<div class="mb-5 header-div">
					<div class="btn">
						<v-btn
							variant="outlined"
							size="small"
							to="/rooms-list"
							data-testid="go-to-all-courses"
						>
							{{ $t("pages.rooms.index.courses.all") }}
						</v-btn>
					</div>
					<div class="toggle-div">
						<v-switch
							v-if="isTouchDevice"
							v-model="allowDragging"
							class="enable-disable"
							:label="$t('pages.rooms.index.courses.arrangeCourses')"
							:aria-label="$t('pages.rooms.index.courses.arrangeCourses')"
							:true-icon="mdiCheck"
						/>
					</div>
				</div>
			</template>
			<template #page-content>
				<div class="rooms-container">
					<v-text-field
						ref="search"
						v-model="searchText"
						class="room-search px-1"
						variant="solo"
						rounded
						single-line
						:label="$t('pages.rooms.index.search.label')"
						:append-inner-icon="mdiMagnify"
						:aria-label="$t('pages.rooms.index.search.label')"
						data-testid="search-field"
					/>
					<div
						v-for="(row, rowIndex) in dimensions.rowCount"
						:key="rowIndex"
						class="room-overview-row"
					>
						<div
							v-for="(col, colIndex) in dimensions.colCount"
							:key="colIndex"
							class="room-overview-col"
							:style="{ width: dimensions.cellWidth }"
						>
							<template v-if="getDataObject(rowIndex, colIndex) !== undefined">
								<vRoomEmptyAvatar
									v-if="isEmptyGroup(rowIndex, colIndex)"
									:ref="(el) => setElementRef(rowIndex, colIndex, el)"
									:size="dimensions.cellWidth"
									@dropEmptyAvatar="
										setDropElement({ x: colIndex, y: rowIndex })
									"
									data-avatar-type="vRoomEmptyAvatar"
									:data-test-position="`${rowIndex}-${colIndex}`"
								/>
								<vRoomGroupAvatar
									v-else-if="hasGroup(rowIndex, colIndex)"
									:ref="(el) => setElementRef(rowIndex, colIndex, el)"
									class="room-group-avatar"
									:data="getDataObject(rowIndex, colIndex)"
									:size="dimensions.cellWidth"
									:device="device"
									:draggable="allowDragging"
									@clicked="
										openDialog(getDataObject(rowIndex, colIndex).groupId)
									"
									@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
									@dragendGroupAvatar="onDragend"
									@dropGroupAvatar="
										addGroupElements({ x: colIndex, y: rowIndex })
									"
									data-avatar-type="vRoomGroupAvatar"
									:data-test-position="`${rowIndex}-${colIndex}`"
								/>
								<vRoomAvatar
									v-else
									:ref="(el) => setElementRef(rowIndex, colIndex, el)"
									class="room-avatar"
									:item="getDataObject(rowIndex, colIndex)"
									:size="dimensions.cellWidth"
									:show-badge="true"
									:draggable="allowDragging"
									@startDrag="onStartDrag($event, { x: colIndex, y: rowIndex })"
									@dragendAvatar="onDragend"
									@dropAvatar="setGroupElements({ x: colIndex, y: rowIndex })"
									data-avatar-type="vRoomAvatar"
									:data-test-position="`${rowIndex}-${colIndex}`"
								/>
							</template>
							<template v-else>
								<vRoomEmptyAvatar
									:ref="(el) => setElementRef(rowIndex, colIndex, el)"
									:size="dimensions.cellWidth"
									:show-outline="dragging"
									@dropEmptyAvatar="
										setDropElement({ x: colIndex, y: rowIndex })
									"
									data-avatar-type="vRoomEmptyAvatar"
									:data-test-position="`${rowIndex}-${colIndex}`"
								/>
							</template>
						</div>
					</div>
				</div>
				<import-flow
					:is-active="isImportMode"
					:token="importToken"
					:courses="courses"
					@success="onImportSuccess"
				/>
			</template>
		</room-wrapper>
		<room-modal
			v-model:isOpen="groupDialog.isOpen"
			aria-describedby="folder open"
			:group-data="groupDialog.groupData"
			:avatar-size="dimensions.cellWidth"
			:draggable="allowDragging"
			tabindex="0"
			@drag-from-group="dragFromGroup"
		/>
	</div>
</template>

<script>
import vRoomAvatar from "@/components/atoms/vRoomAvatar";
import vRoomEmptyAvatar from "@/components/atoms/vRoomEmptyAvatar";
import RoomModal from "@/components/molecules/RoomModal";
import vRoomGroupAvatar from "@/components/molecules/vRoomGroupAvatar";
import ImportFlow from "@/components/share/ImportFlow.vue";
import RoomWrapper from "@/components/templates/RoomWrapper.vue";
import { roomsModule } from "@/store";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiCheck, mdiMagnify } from "@mdi/js";
import { defineComponent, reactive } from "vue";

export default defineComponent({
	setup() {
		const refs = reactive({});

		const setElementRef = (rowIndex, colIndex, el) => {
			refs[`${rowIndex}-${colIndex}`] = el;
		};

		const getElementNameByRef = (pos) => {
			return refs[`${pos.y}-${pos.x}`].$attrs["data-avatar-type"];
		};

		return { setElementRef, getElementNameByRef };
	},
	components: {
		RoomWrapper,
		vRoomAvatar,
		vRoomGroupAvatar,
		vRoomEmptyAvatar,
		RoomModal,
		ImportFlow,
	},
	inject: {
		notifierModule: { from: NOTIFIER_MODULE_KEY },
		mq: "mq",
	},
	layout: "defaultVuetify",
	data() {
		return {
			device: "mobile",
			dimensions: {
				colCount: 2,
				cellWidth: "3em",
				rowCount: 6,
				defaultRowCount: 6,
			},
			groupDialog: {
				isOpen: false,
				groupData: {},
			},
			draggedElement: {
				from: null,
				item: {},
				to: null,
			},
			showDeleteSection: false,
			roomNameEditMode: false,
			draggedElementName: "",
			mdiMagnify,
			searchText: "",
			dragging: false,
			allowDragging: false,
			mdiCheck,
		};
	},
	computed: {
		hasCurrentRooms() {
			return roomsModule.hasCurrentRooms;
		},
		rooms() {
			return JSON.parse(JSON.stringify(roomsModule.getRoomsData)).filter(
				(item) => {
					if (item.groupElements) {
						const groupElements = item.groupElements.filter((groupItem) => {
							return groupItem.title
								.toLowerCase()
								.includes(this.searchText.toLowerCase());
						});
						item.groupElements = groupElements;
						return groupElements;
					}
					return item.title
						.toLowerCase()
						.includes(this.searchText.toLowerCase());
				}
			);
		},
		courses() {
			return roomsModule.getAllElements;
		},
		hasRoomsBeingCopied() {
			return this.rooms.some((item) => item.copyingSince !== undefined);
		},
		isTouchDevice() {
			return window.ontouchstart !== undefined;
		},
		isImportMode() {
			return this.$route.query.import !== undefined;
		},
		importToken() {
			return this.$route.query.import;
		},
	},
	async created() {
		await roomsModule.fetch(); // TODO: this method will receive a string parameter (Eg, mobile | tablet | desktop)
		await roomsModule.fetchAllElements();
		this.getDeviceDims();
		if (this.hasRoomsBeingCopied) {
			this.initCoursePolling(0, new Date());
		}
	},
	methods: {
		getDeviceDims() {
			this.device = this.mq.current;
			switch (this.device) {
				case "tablet":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "4em";
					break;
				case "tabletPortrait":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "4em";
					break;
				case "desktop":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "5em";
					this.allowDragging = true;
					break;
				case "large":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "5em";
					this.allowDragging = true;
					break;
				case "mobile":
					this.dimensions.colCount = 4;
					this.dimensions.cellWidth = "3.7em";
					break;
				default:
					this.dimensions.colCount = 6;
					break;
			}
			const lastItem = roomsModule.getRoomsData.reduce((prev, current) => {
				return prev.yPosition > current.yPosition ? prev : current;
			}, {});

			this.dimensions.rowCount =
				lastItem.yPosition &&
				lastItem.yPosition + 2 > this.dimensions.defaultRowCount
					? lastItem.yPosition + 2
					: this.dimensions.defaultRowCount;
		},
		getDataObject(row, col) {
			return this.findDataByPos(row, col);
		},
		hasGroup(row, col) {
			const roomObject = this.findDataByPos(row, col);
			return roomObject.groupElements !== undefined;
		},
		isEmptyGroup(row, col) {
			return this.findDataByPos(row, col).groupElements?.length == 0;
		},
		openDialog(groupId) {
			this.groupDialog.groupData = this.rooms.find(
				(item) => item.groupId == groupId
			);
			this.groupDialog.isOpen = true;
		},
		findDataByPos(row, col) {
			return this.rooms.find(
				(item) => item.xPosition == col && item.yPosition == row
			);
		},
		onStartDrag(element, pos) {
			this.draggedElement.from = pos;
			this.draggedElement.to = null;
			this.draggedElement.item = element;
			this.showDeleteSection = true;
			this.draggedElementName = this.getElementNameByRef(pos);
			this.searchText = "";
			this.dragging = true;
		},
		setDropElement(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (toElementName == "vRoomEmptyAvatar") {
				this.savePosition();
			}
			this.showDeleteSection = false;
			this.dragging = false;
		},
		onDragend() {
			this.dragging = false;
		},
		async setGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					this.draggedElementName == "groupItem") &&
				toElementName == "vRoomAvatar"
			) {
				await this.savePosition();
				this.defaultNaming(pos);
			}
		},
		addGroupElements(pos) {
			this.draggedElement.to = pos;
			const toElementName = this.getElementNameByRef(pos);

			if (JSON.stringify(this.draggedElement.from) == JSON.stringify(pos))
				return;

			if (
				(this.draggedElementName == "vRoomAvatar" ||
					this.draggedElementName == "groupItem") &&
				toElementName == "vRoomGroupAvatar"
			) {
				this.savePosition();
			}
			this.dragging = false;
		},
		dragFromGroup(element) {
			this.draggedElement.from = {
				x: this.groupDialog.groupData.xPosition,
				y: this.groupDialog.groupData.yPosition,
				groupIndex: roomsModule.roomsData
					.find((item) => item.groupId == this.groupDialog.groupData.groupId)
					.groupElements.findIndex((groupItem) => groupItem.id == element.id),
			};
			this.draggedElement.item = element;
			this.draggedElementName = "groupItem";
			// This setTimeout is used for preventing being closed modal immediately while ungrouping the items.
			setTimeout(() => {
				this.groupDialog.isOpen = false;
			}, 0);
			this.searchText = "";
			this.dragging = true;
		},
		async savePosition() {
			await roomsModule.align(this.draggedElement);
			this.groupDialog.groupData = {};
		},
		defaultNaming(pos) {
			const title = this.$t("pages.rooms.groupName");
			const payload = {
				title,
				xPosition: pos.x,
				yPosition: pos.y,
			};
			roomsModule.update(payload);
		},
		onImportSuccess(name, id) {
			this.showImportSuccess(name);
			if (id) {
				this.$router.replace({ name: "rooms-id", params: { id } });
			} else {
				this.$router.replace({ name: "rooms-overview" });
				roomsModule.fetch();
			}
		},
		showImportSuccess(name) {
			this.notifierModule?.show({
				text: this.$t("components.molecules.import.options.success", {
					name,
				}),
				status: "success",
				timeout: 10000,
			});
		},
		initCoursePolling(count = 0, started) {
			const nextTimeout = count * count * 1000 + 5000;
			setTimeout(
				async () => {
					await roomsModule.fetch({ indicateLoading: false });
					if (this.hasRoomsBeingCopied) {
						this.initCoursePolling(count + 1, started ?? new Date());
					} else {
						this.notifierModule?.show({
							text: this.$t("components.molecules.copyResult.timeoutSuccess"),
							status: "success",
							autoClose: true,
							timeout: 10000,
						});
					}
				},
				Math.min(nextTimeout, 30000)
			);
		},
	},
	mounted() {
		document.title = buildPageTitle(
			this.$t("pages.rooms.index.courses.active")
		);
	},
});
</script>

<style lang="scss" scoped>
.rooms-container {
	max-width: 600px;
	margin: 0 auto;
}

.room-overview-row {
	display: flex;
	justify-content: space-between;
}

.header-div {
	display: flex;
	align-items: center;
	width: 100%;

	.btn {
		display: inline-block;
		flex: 1;
	}

	.toggle-div {
		display: inline-block;
	}
}

:deep(.v-messages) {
	display: none;
}

:deep(.v-input) {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-top: 0 !important;
}
</style>
