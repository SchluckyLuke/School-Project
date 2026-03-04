import { subjects } from "./dictionaries.js";

function set_date(){
    const date = new Date();
    let date_h2 = document.getElementById("date_h2");
    let date_month = "";

    switch(date.getMonth()){
        case 0:
            date_month = "Jänner";
        
        case 1:
            date_month = "Ferbruar";

        case 2:
            date_month = "März";
    }

    date_h2.textContent = `${date.getDate()}. ${date_month} - ${date.getFullYear()}`;
}

function create_days(){
    let days_container = document.createElement("div");
    days_container.classList.add("days_container");

    for(let i = 1; i <= 5; i++){
        let hrs_container = document.createElement("div");
        hrs_container.classList.add("hrs_container");

        for(let e = 1; e <= 6; e++){
            let hr = document.createElement("a");
            hr.classList.add("hr");
            hrs_container.appendChild(hr);
            let subject = subjects[`${i}_${e}`];
            if(subject == "Latein" || subject == "Französisch"){
                hr.classList.add("blue_subject");
            }
            hr.textContent = subject;
            hr.href = `day.html?slot=${i}_${e}`;
        }
        days_container.appendChild(hrs_container);
    }
    const master_container = document.getElementById("master_container");
    master_container.appendChild(days_container);



}

set_date()
create_days()