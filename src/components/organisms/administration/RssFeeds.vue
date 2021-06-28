<template>
	<v-container>
		<h2 class="text-h4 mt-13">RSS-Feeds</h2>
		<template v-if="loading">
			<v-skeleton-loader :key="rssFeed" :type="'list-item-avatar-three-line'" />
		</template>
		<v-list v-else-if="rssFeeds && rssFeeds.length">
			<template v-for="(rssFeed, index) of rssFeeds">
				<v-list-item :key="rssFeed.id" two-line>
					<v-list-item-icon>
						<v-icon>{{ iconMdiRss }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title
							class="text-wrap mb-1"
							v-text="rssFeed.url"
						></v-list-item-title>
						<v-list-item-subtitle class="text-wrap">
							{{ rssFeed.description }}
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action class="d-flex flex-row align-start">
						<rss-feed-status
							:rss-feed-status="rssFeed.status"
						></rss-feed-status>
						<v-btn icon @click="openConfirmRssDelete(rssFeed.id)">
							<v-icon>{{ iconMdiTrashCanOutline }}</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
				<v-divider v-if="index < rssFeeds.length - 1" :key="index"></v-divider>
			</template>
		</v-list>
		<p v-else>
			{{ $t("pages.administration.school.index.rssFeeds.noRssFeedsYet") }}
		</p>
		<v-btn
			class="mt-2"
			color="primary"
			depressed
			@click.stop="addRssDialogIsOpen = true"
			>{{ $t("pages.administration.school.index.rssFeeds.addRssFeed") }}</v-btn
		>
		<rss-form-dialog
			:is-open="addRssDialogIsOpen"
			@dialog-closed="addRssDialogIsOpen = false"
		></rss-form-dialog>
		<vuetify-dialog
			:is-open="rssConfirmDeleteDialog.isOpen"
			:size="350"
			:submit="() => removeRssFeed(rssConfirmDeleteDialog.rssFeedId)"
			@dialog-closed="rssConfirmDeleteDialog.isOpen = false"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("pages.administration.school.index.rssFeeds.deleteRssFeed") }}
			</h2>
			<template slot="dialogContent">
				<p class="body-1 mt-2">
					{{
						$t("pages.administration.school.index.rssFeeds.confirmDeleteText")
					}}
				</p>
			</template>
		</vuetify-dialog>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mdiRss, mdiTrashCanOutline } from "@mdi/js";
import RssFormDialog from "@components/organisms/administration/RssFormDialog";
import VuetifyDialog from "@components/vuetify/organisms/VuetifyDialog";
import RssFeedStatus from "@components/molecules/administration/RssFeedStatus";

export default {
	components: {
		RssFormDialog,
		VuetifyDialog,
		RssFeedStatus,
	},
	data() {
		return {
			rssConfirmDeleteDialog: {
				isOpen: false,
				rssFeedId: undefined,
			},
			addRssDialogIsOpen: false,
			iconMdiRss: mdiRss,
			iconMdiTrashCanOutline: mdiTrashCanOutline,
		};
	},
	computed: {
		...mapGetters("schools", {
			school: "getSchool",
			loading: "getLoading",
		}),
		rssFeeds() {
			return this.school.rssFeeds;
		},
	},
	methods: {
		...mapActions("schools", ["update"]),
		openConfirmRssDelete(rssFeedId) {
			this.rssConfirmDeleteDialog = {
				isOpen: true,
				rssFeedId,
			};
		},
		removeRssFeed(rssFeedId) {
			const updatedRssFeedList = this.rssFeeds.filter(
				(rssFeed) => rssFeed.id !== rssFeedId
			);
			this.update({
				id: this.school.id,
				rssFeeds: updatedRssFeedList,
			})
				.then(() => (this.rssConfirmDeleteDialog.isOpen = false))
				.catch((err) => console.log(err)); // TODO - handle error
		},
	},
};
</script>
