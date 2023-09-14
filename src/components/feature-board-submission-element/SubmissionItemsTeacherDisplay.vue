<template>
	<div class="white rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<VExpansionPanels v-else>
			<VExpansionPanel>
				<VExpansionPanelHeader @dblclick.stop="() => {}" class="pl-4 pr-4">
					<v-chip
						ref="v-chip-open"
						v-if="open"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ open }}
						{{ $t("components.cardElement.submissionElement.open") }}</v-chip
					>
					<v-chip
						ref="v-chip-completed"
						v-if="completed"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ completed }}
						{{
							$t("components.cardElement.submissionElement.completed")
						}}</v-chip
					>
					<v-chip
						ref="v-chip-expired"
						v-if="expired"
						class="grey lighten-3 mr-2"
						disabled
						small
						>{{ expired }}
						{{ $t("components.cardElement.submissionElement.expired") }}</v-chip
					>
				</VExpansionPanelHeader>
				<VExpansionPanelContent>
					<v-data-table
						:headers="headers"
						:items="items"
						:disable-pagination="true"
						:hide-default-footer="true"
						:multi-sort="true"
					>
						<template #[`item.status`]="{ item }">
							<v-chip class="grey lighten-3" disabled small>
								<span v-if="item.status === 'open'"
									>{{ $t("components.cardElement.submissionElement.open") }}
								</span>
								<span v-if="item.status === 'completed'"
									>{{
										$t("components.cardElement.submissionElement.completed")
									}}
								</span>
								<span v-if="item.status === 'expired'"
									>{{ $t("components.cardElement.submissionElement.expired") }}
								</span>
							</v-chip>
						</template>
					</v-data-table>
				</VExpansionPanelContent>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";
import { DataTableHeader } from "vuetify";
import { I18N_KEY, injectStrict } from "@/utils/inject";

type Status = "completed" | "open" | "expired";
type SubmissionInfo = {
	status: Status;
	firstName: string;
	lastName: string;
};

type Student = {
	userId: string;
	firstName: string;
	lastName: string;
};

const mockedAllStudents: Array<Student> = [
	{
		userId: "123",
		firstName: "Hans",
		lastName: "Jürgensen",
	},
	{
		userId: "456",
		firstName: "Ingrid",
		lastName: "van der Fahrt",
	},
	{
		userId: "789",
		firstName: "Horst",
		lastName: "Müller",
	},
	{
		userId: "12348",
		firstName: "Lena-Christiane",
		lastName: "Meyer - Hallervorden",
	},
	{
		userId: "12347",
		firstName: "Christiano",
		lastName: "von Schweinsteiger",
	},
	{
		userId: "12346",
		firstName: "Hannelore",
		lastName: "Meyer",
	},
	{
		userId: "12345",
		firstName: "Max",
		lastName: "Ix",
	},
	{
		userId: "000",
		firstName: "James",
		lastName: "Bond",
	},
];

const mockedSubmissionItems: Array<SubmissionItemResponse> = [
	{
		id: "1",
		completed: true,
		userData: {
			userId: "12348",
			firstName: "Lena-Christiane",
			lastName: "Meyer - Hallervorden",
		},
		timestamps: {
			lastUpdatedAt: "",
			createdAt: "",
		},
	},
	{
		id: "2",
		completed: true,
		userData: {
			userId: "12346",
			firstName: "Hannelore",
			lastName: "Meyer",
		},
		timestamps: {
			lastUpdatedAt: "",
			createdAt: "",
		},
	},
	{
		id: "3",
		completed: false,
		userData: {
			userId: "12345",
			firstName: "Max",
			lastName: "Ix",
		},
		timestamps: {
			lastUpdatedAt: "",
			createdAt: "",
		},
	},
	{
		id: "4",
		completed: true,
		userData: {
			userId: "123",
			firstName: "Hans",
			lastName: "Jürgensen",
		},
		timestamps: {
			lastUpdatedAt: "",
			createdAt: "",
		},
	},
];

export default defineComponent({
	name: "SubmissionItemsTeacherDisplay",
	props: {
		loading: {
			type: Boolean,
			required: true,
		},
		submissionItems: {
			type: Array as PropType<SubmissionItemResponse[]>,
			required: true,
		},
		editable: {
			type: Boolean,
			required: true,
		},
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const headers: DataTableHeader[] = [
			{
				text: i18n.t("common.labels.status").toString(),
				value: "status",
			},
			{
				text: i18n.t("common.labels.lastName").toString(),
				value: "lastName",
			},
			{
				text: i18n.t("common.labels.firstName").toString(),
				value: "firstName",
			},
		];

		const items = computed<Array<SubmissionInfo>>(() => {
			return mockedAllStudents
				.map((student) => {
					const submissionInfo: Partial<SubmissionInfo> = {
						firstName: student.firstName,
						lastName: student.lastName,
					};

					const submissionItem = mockedSubmissionItems.find(
						(submissionItem) =>
							submissionItem.userData.userId === student.userId
					);

					if (submissionItem) {
						if (submissionItem.completed) {
							submissionInfo.status = "completed";
						}
						if (!submissionItem.completed && props.editable) {
							submissionInfo.status = "open";
						}
						if (!submissionItem.completed && !props.editable) {
							submissionInfo.status = "expired";
						}

						return submissionInfo as SubmissionInfo;
					}

					submissionInfo.status = props.editable ? "open" : "expired";
					return submissionInfo as SubmissionInfo;
				})
				.sort((a, b) => {
					const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
					const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

					// names must be equal
					return 0;
				});
		});

		const open = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "open";
			}).length;
		});

		const completed = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "completed";
			}).length;
		});

		const expired = computed<number>(() => {
			return items.value.filter((item) => {
				return item.status === "expired";
			}).length;
		});

		return {
			headers,
			items,
			open,
			completed,
			expired,
		};
	},
});
</script>
<style lang="scss" scoped>
.v-chip {
	opacity: 1;
	flex: none;
}

::v-deep {
	.v-expansion-panel-content__wrap {
		padding: 0;
	}

	.text-start {
		font-size: 0.75rem !important;
		height: 30px;
	}

	.v-data-table__wrapper {
		overflow-x: hidden;
	}

	.v-data-table-header {
		span:first-child {
			display: block;
		}
	}
}
</style>
