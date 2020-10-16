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
// [ ] Partial Data-Loading
// [ ] On Event Click Go To Team Or Course page if its not a personal event
// [ ] Use Store for events
// [ ] Locales
// [ ] Handling BBB Events

import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import deLocale from "@fullcalendar/core/locales/de";
// import enLocale from "@fullcalendar/core/locales/en";
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
				events: [],
				headerToolbar: {
					center: "title",
					left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					right: "prev,today,next",
				},
				weekNumbers: false,
				scrollTime: "07:00:00",
				locales: [enLocale, deLocale],
				locale: deLocale, //https://fullcalendar.io/docs/locale
			},
			events: [],
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
			console.log("clicked event");
			console.log(event);
			const clickedEvent = event.event;
			const startDate = moment(clickedEvent.start);
			const endDate = moment(clickedEvent.end);
			this.dateEditable = true;
			this.setModalEventAndState(
				startDate,
				endDate,
				clickedEvent.title,
				clickedEvent._id
			);
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
			this.update();
		},
		submit() {
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
		update() {
			try {
				this.getCalendarData().then(() => {
					this.calendar.forEach((event) => {
						this.pushEvent(event);
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		isNewElement(elementArg, list) {
			let found = false;
			list.forEach((element) => {
				if (element._id === elementArg._id) {
					found = true;
				}
			});
			return !found;
		},
		pushEvent(event) {
			console.log(event);
			if (this.isNewElement(event, this.events)) {
				this.calendarOptions.events.push({
					title: event.title,
					start: event.start,
					end: event.end,
					_id: event._id,
					color: this.checkforCourseColor(event),
				});
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
		async getCalendarData() {
			try {
				await this.$store.dispatch("calendar/find").then((res) => {
					this.calendar = res;
				});
			} catch (error) {
				console.error(error);
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
