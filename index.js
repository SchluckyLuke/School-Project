import { subjects } from "./dictionaries.js";

let active_week = null;

const master_container = document.getElementById("master_container");
let days_container = null;

let date_h2 = document.getElementById("date_h2");

let left_button = document.getElementById("left_btn");
let right_button = document.getElementById("right_btn");

let get_date_list = null;

left_button.addEventListener("click", week_back);
right_button.addEventListener("click", week_forward);


if(localStorage.getItem("activeWeek") == null){
    localStorage.setItem("activeWeek", 0);
}


function get_date(week_num){

    const today = new Date();

    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() || 7) - 1) + week_num);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    return [
        monday.getDate(),
        monday.getMonth()+1,
        friday.getDate(),
        friday.getMonth()+1,
        monday.getFullYear()
    ];
}


function create_days(slot_week_num){

    const date = get_date(slot_week_num);

    days_container = document.createElement("div");
    days_container.classList.add("days_container");

    for(let i = 1; i <= 5; i++){

        let hrs_container = document.createElement("div");
        hrs_container.classList.add("hrs_container");

        for(let e = 1; e <= 6; e++){

            let hr = document.createElement("a");
            hr.classList.add("hr");

            let subject = subjects[`${i}_${e}`];

            if(subject == "Latein" || subject == "Französisch"){
                hr.classList.add("blue_subject");
            }

            hr.textContent = subject;
            hr.href = `day.html?slot=${i}_${e}_${date[0]}_${date[2]}_${date[3]}`;

            hrs_container.appendChild(hr);
        }
        days_container.appendChild(hrs_container);
    }
    master_container.appendChild(days_container);
}


function week_back(){

    let oldActiveWeek = Number(localStorage.getItem("activeWeek")) - 7;
    localStorage.setItem("activeWeek", oldActiveWeek);

    if(days_container){
        master_container.removeChild(days_container);
    }

    create_days(oldActiveWeek);

    const date = get_date(oldActiveWeek);

    date_h2.textContent =
    `${date[0]}. ${date[1]}. - ${date[2]}. ${date[3]}. ${date[4]}`;
}


function week_forward(){

    let oldActiveWeek = Number(localStorage.getItem("activeWeek")) + 7;
    localStorage.setItem("activeWeek", oldActiveWeek);

    if(days_container){
        master_container.removeChild(days_container);
    }

    create_days(oldActiveWeek);

    const date = get_date(oldActiveWeek);

    date_h2.textContent =
    `${date[0]}. ${date[1]}. - ${date[2]}. ${date[3]}. ${date[4]}`;
}


get_date_list = get_date(Number(localStorage.getItem("activeWeek")));

create_days(Number(localStorage.getItem("activeWeek")));

date_h2.textContent =
`${get_date_list[0]}. ${get_date_list[1]}. - ${get_date_list[2]}. ${get_date_list[3]}. ${get_date_list[4]}`;