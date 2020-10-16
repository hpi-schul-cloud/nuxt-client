<!-- eslint-disable max-lines -->

<template>
	<div class="route-calendar">
		<div>
			<appointment-modal
				:input-text.sync="inputText"
				:modal-active.sync="modalActive"
				:confirm-active="confirmActive"
				:date-editable="dateEditable"
				:is-teams-d-d-visible="isTeamsDDVisible"
				:is-courses-d-d-visible="isCoursesDDVisible"
				:is-submit="isSubmit"
				:is-save="isSave"
				:is-remove="isRemove"
				:radio-value="radioValue"
				:start-day.sync="startDayInput"
				:start-time.sync="startTimeInput"
				:end-day.sync="endDayInput"
				:end-time.sync="endTimeInput"
				:users-teams="usersTeams"
				:users-courses="usersCourses"
				:content-courses.sync="contentCourses"
				:content-teams.sync="contentTeams"
				@cancel="cancelHandle"
				@input="onInput"
				@setScopeId="setScopeId"
				@submit="submit"
				@removeDate="removeDate"
				@saveDate="saveDate"
				@prepareSubmit="prepareSubmit"
				@prepareRemove="prepareRemove"
				@prepareSave="prepareSave"
				@cancelConfirm="cancelConfirm"
			></appointment-modal>
		</div>
		<full-calendar :options="calendarOptions"></full-calendar>
	</div>
</template>
<script>
import AppointmentModal from "@components/organisms/Calendar/AppointmentModal";
//TODOs
// [ ] Dedicated Edit mode
// [ ] Handle permissions
// [x] Partial Data-Loading
// [x] On Event Click Go To Team Or Course page if its not a personal event
// [x] Locales
// [ ] Handling BBB Events
// [ ] Send course or team if on create if selected
// [ ] Courses and teams need permissions so we can filter which to display

import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import allLocales from "@fullcalendar/core/locales-all";
import moment from "moment";

export default {
	layout: "loggedInFull",
	components: { AppointmentModal, FullCalendar },
	data() {
		return {
			calendarOptions: {
				plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
				initialView: "timeGridWeek",
				editable: false,
				nowIndicator: true,
				dateClick: this.handleDateClick,
				eventClick: this.eventClick,
				events: this.loadEvents,
				headerToolbar: {
					center: "title",
					left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					right: "prev,today,next",
				},
				weekNumbers: false,
				scrollTime: "07:00:00",
				locales: allLocales,
				locale: this.$i18n.locale, //this.$store.getLocale(),
			},
			events: {},
			dateEditable: false,
			modalActive: false,
			calendar: undefined,
			currentUserId: undefined,
			currentEventId: undefined,
			usersTeams: [],
			usersCourses: [],
			contentTeams: {},
			contentCourses: {},
			confirmActive: false,
			isCoursesDDVisible: false,
			isTeamsDDVisible: false,
			isSave: false,
			isRemove: false,
			isSubmit: false,
			startDayInput: "",
			startTimeInput: "",
			endDayInput: "",
			endTimeInput: "",
			inputText: "",
			radioValue: "",
			teams: "Teams",
			courses: "Courses",
			currentScopeId: undefined,
		};
	},
	created() {
		this.init();
	},
	methods: {
		async loadEvents(info, successCallback, failureCallback) {
			console.log(info);
			try {
				//from=2020-10-16T09%3A00%3A00.000Z&until=
				const options = {
					from: info.startStr,
					until: info.endStr,
				};
				await this.$store
					.dispatch("calendar/getEvents", options)
					.then((res) => {
						res.forEach((event) => {
							(event.color = this.checkforCourseColor(event)),
								//store to internal key value store
								this.pushEvent(event);
						});
						successCallback(res);
					});
			} catch (error) {
				failureCallback(error);
			}
		},
		prepareSubmit() {
			this.confirmActive = true;
			this.isSubmit = true;
		},
		prepareRemove() {
			this.confirmActive = true;
			this.isRemove = true;
		},
		prepareSave() {
			this.confirmActive = true;
			this.isSave = true;
		},
		cancelConfirm() {
			this.isSave = false;
			this.isRemove = false;
			this.isSubmit = false;
			this.confirmActive = false;
		},
		handleDateClick(date) {
			console.log(date);
			const startDate = moment(date);
			const endDate = moment(startDate).add(30, "minutes");
			this.setModalEventAndState(startDate, endDate, "", "");
		},
		onInput(radioValue) {
			if (radioValue == "teams") {
				this.isTeamsDDVisible = true;
				this.isCoursesDDVisible = false;
			} else {
				this.isTeamsDDVisible = false;
				this.isCoursesDDVisible = true;
			}
		},
		setScopeId(input) {
			this.currentScopeId = input._id;
		},
		eventClick(event) {
			const id = event.event.extendedProps._id;
			console.log("clicked event" + id);
			const clickedEvent = this.events[id];
			if (clickedEvent) {
				console.log(clickedEvent.attributes["x-sc-featurevideoconference"]);
				//if this is true this is a videconference
				if (clickedEvent.attributes["x-sc-teamid"]) {
					// go to team page
					const target =
						"/teams/" +
						clickedEvent.attributes["x-sc-teamid"] +
						"/?activeTab=events";
					location.href = target;
				} else if (clickedEvent.attributes["x-sc-courseid"]) {
					// go to course page
					const target = "/courses/" + clickedEvent.attributes["x-sc-courseid"];
					location.href = target;
				}
			}
		},
		cancelHandle() {
			this.resetScope();
			this.modalActive = false;
			this.dateEditable = false;
		},
		init() {
			// initially set ScopeID to userId
			this.currentUserId = this.$store.currentUserId;
			this.currentScopeId = this.currentUserId;
			this.getUserTeams();
			this.getUserCourses();
		},
		submit() {
			const start = this.setTime(
				moment.utc(this.startDayInput),
				this.startTimeInput
			);
			const end = this.setTime(moment.utc(this.endDayInput), this.endTimeInput);
			this.postCalendarData(start.toISOString(), end.toISOString());
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
		},
		removeDate() {
			this.deleteDate();
			this.removeEvent();
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
			this.contentTeams = undefined;
			this.contentCourses = undefined;
		},
		saveDate() {
			this.deleteDate();
			this.removeEvent();
			const start = this.setTime(
				moment.utc(this.startDayInput),
				this.startTimeInput
			);
			const end = this.setTime(moment.utc(this.endDayInput), this.endTimeInput);
			this.postCalendarData(start.toISOString(), end.toISOString());
			this.update();
			this.resetScope();
			this.cancelConfirm();
			this.modalActive = false;
			this.dateEditable = false;
		},
		resetScope() {
			this.inputText = "";
			this.radioValue = "";
			this.isTeamsDDVisible = false;
			this.isCoursesDDVisible = false;
			this.currentScopeId = this.currentUserId;
		},
		setTime(dateToSet, timeForSetting) {
			const startTime = moment(timeForSetting, "HH:mm");
			dateToSet.set({
				hour: startTime.get("hour"),
				minute: startTime.get("minute"),
			});
			return dateToSet;
		},
		setModalEventAndState(startDate, endDate, title, id) {
			this.currentEventId = id;
			this.inputText = title;
			this.startDayInput = startDate.toISOString();
			this.startTimeInput = startDate.format("HH:mm");
			this.endDayInput = endDate.toISOString();
			this.endTimeInput = endDate.format("HH:mm");
			this.modalActive = true;
		},
		removeEvent() {
			this.events.forEach((event) => {
				if (event._id === this.currentEventId) {
					const index = this.events.indexOf(event);
					this.events.splice(index, 1);
				}
			});
		},
		isNewElement(elementArg, list) {
			// list is an object
			let found = false;
			if (list[elementArg._id]) {
				found = true;
			}
			return !found;
		},
		pushEvent(event) {
			if (this.isNewElement(event, this.events)) {
				this.events[event._id] = event;
			}
		},
		checkforCourseColor(event) {
			let courseColor = undefined;
			event.relationships["scope-ids"].forEach((id) => {
				this.usersCourses.forEach((course) => {
					if (id === course._id && course.color != undefined) {
						courseColor = course.color;
					}
				});
			});
			return courseColor;
		},
		pushScope(event, list) {
			if (this.isNewElement(event, list)) {
				list.push({
					_id: event._id,
					label: event.name,
					color: event.color,
				});
			}
		},
		async getUserTeams() {
			try {
				await this.$store.dispatch("teams/find").then((res) => {
					res.data.forEach((element) => {
						this.pushScope(element, this.usersTeams);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getUserCourses() {
			try {
				await this.$store.dispatch("courses/find").then((res) => {
					res.data.forEach((element) => {
						this.pushScope(element, this.usersCourses);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async postCalendarData(startDate, endDate) {
			this.$store.dispatch("calendar/create", {
				startDate: startDate,
				scopeId: this.currentScopeId,
				endDate: endDate,
				summary: this.inputText,
			});
		},
		async deleteDate() {
			this.$store.dispatch("calendar/removeDate", {
				id: this.currentEventId,
			});
		},
	},
};
</script>
