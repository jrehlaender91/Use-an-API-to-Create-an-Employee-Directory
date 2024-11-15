const closeButton = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');
let cards = document.querySelectorAll('.card');
let card = document.querySelector('.card');
const body = document.querySelector('body');
const grid = document.querySelector('.grid-container')
const randomUser = 'https://randomuser.me/api/?nat=us&results=12';
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const modal = document.querySelector('.modal-content');
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const aleft = document.querySelector('.arrow-left');
const aright = document.querySelector('.arrow-right');

//  ----------------------
//  FETCH FUNCTIONS
//  ----------------------

function fetchData(url) {
    return fetch(url)
            .then( response => response.json() )
}

fetchData(urlAPI)
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))    

//  ----------------------
//  HELPER FUNCTIONS
//  ----------------------

function arrayEmployees(data) {
    let employees = [];
    let employee;
    for(let i = 0; i < 12; i++) {
        employee = {
            "picture": data[i].picture.large,
            "name": data[i].name.first,
            "lname": data[i].name.last,
            "email": data[i].email,
            "city": data[i].location.city,
            "phone": data[i].phone,
            "adress": data[i].location.city,
            "pcode": data[i].location.postcode,
            "birthday": data[i].dob.date,
        };
        employees.push(employee);  
    }
    displayEmployees(employees)

}

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

    employeeHTML += `
        <div class="card" data-index="${index}" data-caption="${name.first} ${name.last}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });
    grid.innerHTML = employeeHTML;
}


function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);

    if(parseInt(index) >= 11) {
        aright.children[0].style.fill = "#aaaaaa";
        aright.children[1].style.fill = "#aaaaaa";
    } else if(parseInt(index) <= 0) {
        aleft.children[0].style.fill = "#aaaaaa";
        aleft.children[1].style.fill = "#aaaaaa";
    } else {
        aright.children[0].style.fill ="white";
        aright.children[1].style.fill ="white";
        aleft.children[0].style.fill ="white";
        aleft.children[1].style.fill ="white";
    }

    if (parseInt(index) < 1) {
        previous.style.cursor = 'not-allowed';
        next.style.cursor = 'pointer';
    } else if (parseInt(index) > 10) {
        next.style.cursor = 'not-allowed';
        previous.style.cursor = 'pointer';
    }  else {
        previous.style.cursor = 'pointer';
        next.style.cursor = 'pointer';
    }

    const modalHTML = `
        <a href="${picture.large}" data-caption="${name.first} ${name.last}" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            <hr />
            <p class="phone">${phone}</p>
            <p class="address">${street.name} ${street.number}, ${state} ${postcode}</p>
            <p class="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        </a>    
        `;
    overlay.classList.remove("hidden");
    modal.innerHTML = modalHTML;
}
 
grid.addEventListener('click', e => {
    if (e.target !== grid) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

closeButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
}); 

next.addEventListener("click", e => {
    const modal = document.querySelector('.modal-content a');
    const index = parseInt(modal.getAttribute('data-index'))+1;

    console.log(index);
    console.log(parseInt(index) <= 0);
    if(parseInt(index) >= 11) {
        aright.children[0].style.fill = "#aaaaaa";
        aright.children[1].style.fill = "#aaaaaa";
    } else {
        aright.children[0].style.fill ="white";
        aright.children[1].style.fill ="white";
        aleft.children[0].style.fill ="white";
        aleft.children[1].style.fill ="white";
    }

    if(parseInt(index) > 11) {
        next.style.cursor = 'not-allowed';
    } else {
        next.style.cursor = 'pointer';
        displayModal(index);
    }
});

previous.addEventListener("click", e => {
    const modal = document.querySelector('.modal-content a');
    const index = parseInt(modal.getAttribute('data-index'))-1;
    console.log(index);
    console.log(parseInt(index) <= 0);
    if(parseInt(index) <= 0) {
        aleft.children[0].style.fill = "#aaaaaa";
        aleft.children[1].style.fill = "#aaaaaa";
    } else {
        aleft.children[0].style.fill ="white";
        aleft.children[1].style.fill ="white";
        aright.children[0].style.fill ="white";
        aright.children[1].style.fill ="white";
    }

    if(parseInt(index) < 0) {
        previous.style.cursor = 'not-allowed';
    
    } else {
        previous.style.cursor = 'pointer';
        displayModal(index);
    }
});


