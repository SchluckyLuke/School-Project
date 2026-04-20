import { subjects } from "./dictionaries.js";

const params = new URLSearchParams(window.location.search);

const slot = params.get("slot").split("_");
const subject = subjects[`${slot[0]}_${slot[1]}`];

/* ---------------------------------------------------------- */

const middle_childs = document.getElementsByClassName("middle_child");

const dropdownA = document.querySelectorAll("#category_dropdown .dropdown-content a");
const dropdownMenu = document.getElementsByClassName("dropdown-content");
const dropdownButton = document.getElementById("dropdown-btn");
const category_dropdown = document.getElementById("category_dropdown");

const event_name = document.getElementById("event_input");
const event_btn = document.getElementById("event-btn");
const event_textarea = document.getElementById("event_textarea");

let selectedCategory = null;
let slotKey = `${slot[0]}_${slot[1]}_${slot[2]}_${slot[3]}_${slot[4]}`;
let event_list = [];

let subject_h1 = document.createElement("h1");
subject_h1.classList.add("subject_title");
subject_h1.textContent = subject;
middle_childs[0].prepend(subject_h1);

category_dropdown.addEventListener("mouseenter", () => {
    dropdownMenu[0].style.display = "block";
});

category_dropdown.addEventListener("mouseleave", () => {
    dropdownMenu[0].style.display = "none";
});

dropdownA.forEach(category =>{
    category.addEventListener("click", event => {
        dropdownButton.textContent = category.textContent;
        selectedCategory = category.textContent;
        dropdownMenu[0].style.display = "none";
    })
})

event_btn.addEventListener("click", save_event);

function save_event(){
    let event_infos = {
        name: event_name.value,
        material: event_textarea.value,
        category: selectedCategory,
    }
    if(event_infos.name != null && event_infos.category != null){
        localStorage.setItem(JSON.stringify(event_infos), slotKey);
        dropdownButton.textContent = "Kategorie wählen*";
        event_name.value = "";
        load_events();
    }
}

function load_events(){
    event_list = [];
    middle_childs[1].innerHTML = "";
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)) == slotKey){
            event_list.push(localStorage.key(i));
        }
    }

    event_list.forEach(event => {
        let event_a = document.createElement("a");
        let event_info = document.createElement("p");
        let del_btn = document.createElement("button");
        event_a.classList.add("event-a");
        event_a.textContent = JSON.parse(event)["name"];
        event_info.textContent = JSON.parse(event)["material"];
        event_info.classList.add("event-info");
        del_btn.classList.add("del-btn");
        del_btn.textContent = "X";
        del_btn.onclick = () => delete_events(event_a, event_info, event, del_btn);
        middle_childs[1].appendChild(event_a);
        middle_childs[1].appendChild(event_info);
        middle_childs[1].appendChild(del_btn);
    })

    function delete_events(event_a, event_info, event, del_btn){
        middle_childs[1].removeChild(event_a);
        middle_childs[1].removeChild(event_info);
        middle_childs[1].removeChild(del_btn)
        let objectKey = {
            name: event_a.textContent,
            material: event_info.textContent,
            category: JSON.parse(event)["category"]
        }
        localStorage.removeItem(JSON.stringify(objectKey));
    }
}

load_events()