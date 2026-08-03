// ===============================
// العناصر الأساسية
// ===============================

const openBtn = document.getElementById("openBtn");
const loading = document.querySelector(".loading");
const content = document.querySelector(".content");
const music = document.getElementById("music");

// ===============================
// فتح الظرف
// ===============================

openBtn.addEventListener("click", () => {

    const cover = document.querySelector(".cover");
    const paper = document.querySelector(".paper");

    cover.style.transform = "rotateX(180deg)";
    paper.style.transform = "translateY(-120px)";

    setTimeout(() => {

        loading.style.opacity = "0";

    }, 1000);

    setTimeout(() => {

        loading.style.display = "none";
        content.style.display = "block";

        music.play().catch(() => {});

    }, 1700);

});

// ===============================
// العد التنازلي
// ===============================

const weddingDate = new Date("August 21, 2026 19:00:00").getTime();

const countdown = document.getElementById("countdown");

const timer = setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        countdown.innerHTML = "🎉 بدأ الحفل";

        clearInterval(timer);

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    countdown.innerHTML =
        `${days} يوم : ${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;

}, 1000);
// ===============================
// رسائل التهنئة
// ===============================

let messages = JSON.parse(localStorage.getItem("messages")) || [];

showMessages();

function sendMessage() {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || message === "") {

        alert("من فضلك اكتب اسمك ورسالتك ❤️");
        return;

    }

    messages.unshift({

        name: name,
        message: message,
        date: new Date().toLocaleString("ar-EG")

    });

    localStorage.setItem("messages", JSON.stringify(messages));

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    showMessages();

}

function showMessages() {

    const box = document.getElementById("allMessages");

    box.innerHTML = "";

    messages.forEach(item => {

        box.innerHTML += `

        <div class="msg">

            <h3>💖 ${item.name}</h3>

            <p>${item.message}</p>

            <small>${item.date}</small>

        </div>

        `;

    });

}

// ===============================
// ظهور الكروت أثناء النزول
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(70px)";
    card.style.transition = "1s";

});

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

});
// ===============================
// مؤثرات إضافية
// ===============================

// تأثير بسيط عند الضغط على الأزرار
document.querySelectorAll("button,.btn").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.95)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        },150);

    });

});

// ===============================
// ظهور تدريجي للعناصر
// ===============================

const sections = document.querySelectorAll(
".gallery,.messages,.thanks"
);

function revealSections(){

    sections.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight-120){

            section.style.opacity="1";
            section.style.transform="translateY(0)";

        }

    });

}

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(60px)";

    section.style.transition="1s";

});

window.addEventListener("scroll",revealSections);

revealSections();


// ===============================
// تأثير سقوط القلوب
// ===============================

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.top = "-30px";
    heart.style.fontSize = (20 + Math.random()*20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "99999";
    heart.style.transition = "4s linear";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.top="110vh";
        heart.style.opacity="0";

    },50);

    setTimeout(()=>{

        heart.remove();

    },4000);

}

// عند فتح الظرف تظهر القلوب

openBtn.addEventListener("click",()=>{

    for(let i=0;i<30;i++){

        setTimeout(createHeart,i*120);

    }

});

// ===============================
// سقوط القلوب باستمرار
// ===============================

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-40px";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";

    document.body.appendChild(heart);

    let pos = -40;
    let speed = 1 + Math.random() * 2;

    const fall = setInterval(() => {

        pos += speed;
        heart.style.top = pos + "px";

        if(pos > window.innerHeight + 50){
            clearInterval(fall);
            heart.remove();
        }

    },20);

}

// إنشاء قلب جديد كل 300 مللي ثانية
setInterval(createHeart,1000);
