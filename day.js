import { subjects } from "./dictionaries.js";

const params = new URLSearchParams(window.location.search);

const slot = params.get("slot");
const subject = subjects[slot];

const date = new Date();

console.log(date.getMonth());

let subject_h1 = document.createElement("h1");
subject_h1.textContent = subject;
document.body.prepend(subject_h1);