async function getData(json) {
    try {
        const response = await fetch(json);
        const data = await response.json();

        // App version
        console.log(data.appversions);
        const version = document.querySelector('#app-version');
        data.appversions.forEach(appvers => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `<a class="${appvers.class}" href="${appvers.url}">${appvers.version}</a>`;
            version.appendChild(listItem);
        });
        
        // App description
        console.log(data.appnotes);
        const note = document.querySelector('#app-notes');
        data.appnotes.forEach(notes => {
            const notedetail = document.createElement('li');
            notedetail.innerHTML = `${notes.text}`;
            note.appendChild(notedetail);
        });

        // Request card
        console.log(data.requests);
        const requestitem = document.querySelector('#request-list');
        data.requests.forEach(request => {
            const rqust = document.createElement('div');
            rqust.innerHTML = `<input class="${request.class}" type="${request.type}" name="fav_language">
            <label for="html">${request.request}</label>`;
            requestitem.appendChild(rqust);
        });

        // Ticket list
        const listContainer = document.getElementById("ticket-list");
        data.tickets.forEach(ticket => {
            const li = document.createElement("li");
            li.className = "row py-3 border-bottom list-group-item";
            const div1 = document.createElement("div");
            div1.className = "col col-10 fs-6 fw-bold";
            div1.textContent = ticket.status;
            const div2 = document.createElement("div");
            div2.className = "col col-2 d-flex text-secondary justify-content-end";
            div2.textContent = ticket.count;
            li.appendChild(div1);
            li.appendChild(div2);
            listContainer.appendChild(li);
        });

        // Task list
        const taskListContainer = document.getElementById("task-list");
        data.tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "row py-3 border-bottom";

            // Create checkbox column
            const div1 = document.createElement("div");
            div1.className = "col col-1 d-flex align-items-center";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            div1.appendChild(checkbox);
            li.appendChild(div1);

            // Create task text column
            const div2 = document.createElement("div");
            div2.className = "col col-9 fs-6"; 
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            div2.appendChild(taskText);
            li.appendChild(div2);

            // Create priority badge column
            if (task.priority) {
                const div3 = document.createElement("div");
                div3.className = "col col-2 d-flex justify-content-end"; 
                const priorityBadge = document.createElement("span");
                priorityBadge.className = "badge text-white"; 
                priorityBadge.textContent = task.priority;

                // Adjust colors based on priority
                switch (task.priority.toUpperCase()) {
                    case "URGENT":
                        priorityBadge.style.backgroundColor = "rgb(255, 177, 7)"; 
                        break;
                    case "NEW":
                        priorityBadge.classList.add("bg-success"); 
                        break;
                    case "DEFAULT":
                        priorityBadge.classList.add("bg-secondary"); 
                        break;
                }

                div3.appendChild(priorityBadge);
                li.appendChild(div3);
            }

            taskListContainer.appendChild(li);
        });
    } catch(error) {
        console.error(error);
    }
}

getData('/assets/data/data.json');
