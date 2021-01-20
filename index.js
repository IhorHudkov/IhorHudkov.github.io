import Event from "./event";

const form = document.forms.eventForm;

function AddEvent(e) {
  const name = form.name.value;
  const participants = form.participants.value;
  const day = form.day.value;
  const time = form.time.value;
  const event = new Event(name, participants, day, time);
  e.preventDefault();
  // eslint-disable-next-line no-alert
  alert(event.name);
  document.location.href = "index.html";
}
form.onsubmit = AddEvent;
