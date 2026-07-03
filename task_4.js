/* =====================================
   TYPING ANIMATION
===================================== */

const typingText = document.getElementById("typing");

const words = [
    "Frontend Developer",
    "AI Enthusiast",
    "Python Developer",
    "Web Designer",
    "JavaScript Developer",
    "UI/UX Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex++);
    } else {
        typingText.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length + 1) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =====================================
   MOBILE MENU
===================================== */

const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});


/* =====================================
   TO-DO LIST
===================================== */

const taskInput = document.getElementById("taskInput");

const addTask = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks =
document.getElementById("completedTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/* ---------- SAVE ---------- */

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


/* ---------- COUNTER ---------- */

function updateCounter() {

    totalTasks.textContent =
        `Total : ${tasks.length}`;

    const completed =
        tasks.filter(task => task.completed).length;

    completedTasks.textContent =
        `Completed : ${completed}`;

}


/* ---------- DISPLAY ---------- */

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

        }

        const text = document.createElement("span");

        text.textContent = task.name;

        li.appendChild(text);

        const buttons = document.createElement("div");

        buttons.className = "task-buttons";

        /* COMPLETE */

        const completeBtn =
            document.createElement("button");

        completeBtn.textContent = "✓";

        completeBtn.className = "complete-btn";

        completeBtn.onclick = () => {

            tasks[index].completed =
                !tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        /* DELETE */

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent = "🗑";

        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        };

        buttons.appendChild(completeBtn);

        buttons.appendChild(deleteBtn);

        li.appendChild(buttons);

        taskList.appendChild(li);

    });

    updateCounter();

}


/* ---------- ADD TASK ---------- */

addTask.addEventListener("click", () => {

    const task = taskInput.value.trim();

    if (task === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        name: task,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    displayTasks();

});


/* ---------- ENTER KEY ---------- */

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask.click();

    }

});


displayTasks();

/* =====================================
   PRODUCT STORE
===================================== */

const products = [

{
    name:"Laptop",
    category:"electronics",
    price:65000,
    rating:4.8,
    image:"https://picsum.photos/300/200?random=1"
},

{
    name:"Wireless Headphones",
    category:"electronics",
    price:3500,
    rating:4.6,
    image:"https://picsum.photos/300/200?random=2"
},

{
    name:"Smart Watch",
    category:"electronics",
    price:7000,
    rating:4.5,
    image:"https://picsum.photos/300/200?random=3"
},

{
    name:"Sports Shoes",
    category:"sports",
    price:2800,
    rating:4.4,
    image:"https://picsum.photos/300/200?random=4"
},

{
    name:"Football",
    category:"sports",
    price:1200,
    rating:4.3,
    image:"https://picsum.photos/300/200?random=5"
},

{
    name:"Cricket Bat",
    category:"sports",
    price:2500,
    rating:4.7,
    image:"https://picsum.photos/300/200?random=6"
},

{
    name:"Men's Jacket",
    category:"fashion",
    price:2200,
    rating:4.2,
    image:"https://picsum.photos/300/200?random=7"
},

{
    name:"Women's Handbag",
    category:"fashion",
    price:1800,
    rating:4.6,
    image:"https://picsum.photos/300/200?random=8"
},

{
    name:"T-Shirt",
    category:"fashion",
    price:800,
    rating:4.1,
    image:"https://picsum.photos/300/200?random=9"
}

];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(productArray){

    productContainer.innerHTML="";

    if(productArray.length===0){

        productContainer.innerHTML=
        "<h3>No products found.</h3>";

        return;

    }

    productArray.forEach(product=>{

        const card=document.createElement("div");

        card.className="product-card";

        card.innerHTML=`

        <img src="${product.image}" alt="${product.name}">

        <div class="product-content">

            <h3>${product.name}</h3>

            <p><strong>Category:</strong> ${product.category}</p>

            <p><strong>Price:</strong> ₹${product.price}</p>

            <p><strong>Rating:</strong> ⭐ ${product.rating}</p>

            <button>View Details</button>

        </div>

        `;

        productContainer.appendChild(card);

    });

}


/* =====================================
   FILTER & SORT
===================================== */

function filterProducts(){

    let filtered=[...products];

    const search=searchInput.value.toLowerCase();

    const category=categorySelect.value;

    const sort=sortSelect.value;


    /* Search */

    if(search){

        filtered=filtered.filter(product=>

            product.name.toLowerCase().includes(search)

        );

    }


    /* Category */

    if(category!=="all"){

        filtered=filtered.filter(product=>

            product.category===category

        );

    }


    /* Sorting */

    switch(sort){

        case "priceLow":

            filtered.sort((a,b)=>a.price-b.price);

            break;

        case "priceHigh":

            filtered.sort((a,b)=>b.price-a.price);

            break;

        case "rating":

            filtered.sort((a,b)=>b.rating-a.rating);

            break;

    }

    displayProducts(filtered);

}


/* =====================================
   EVENTS
===================================== */

searchInput.addEventListener("input",filterProducts);

categorySelect.addEventListener("change",filterProducts);

sortSelect.addEventListener("change",filterProducts);


/* =====================================
   INITIAL LOAD
===================================== */

displayProducts(products);

/* =====================================
   CONTACT FORM VALIDATION
===================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");

    let isValid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {
            isValid = false;
            input.style.border = "2px solid red";
        } else {
            input.style.border = "2px solid #22c55e";
        }

    });

    if (isValid) {
        alert("Message sent successfully! 🚀");
        contactForm.reset();
    } else {
        alert("Please fill all fields!");
    }

});

}


/* =====================================
   SCROLL ACTIVE NAV LINK
===================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
    }

});

navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
    }

});

});


/* =====================================
   SCROLL TO TOP BUTTON
===================================== */

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "⬆";
scrollBtn.id = "scrollTopBtn";

document.body.appendChild(scrollBtn);


/* Button Style */
scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.padding = "12px 15px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.background = "#2563eb";
scrollBtn.style.color = "white";
scrollBtn.style.fontSize = "18px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";
scrollBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";


window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }

});


scrollBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================
   SMOOTH SECTION ANIMATION
===================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll("section").forEach(section => {

    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.6s ease";

    observer.observe(section);

});


/* =====================================
   INITIAL LOAD FIX
===================================== */

window.addEventListener("load", () => {
    document.body.style.opacity = 1;
});