import Event from "./event";

const form = document.forms.eventForm;
const eventArray = [];

function AddEvent(e) {
  const name = form.name.value;
  const participants = form.participants.value;
  const day = form.day.value;
  const time = form.time.value;
  const event = new Event(name, participants, day, time);
  eventArray.push(event);
  e.preventDefault();
  // eslint-disable-next-line no-alert
  alert(eventArray.toString());
}
form.onsubmit = AddEvent;
