// ======================================
// Wedding Invitation Script
// ======================================

// العناصر الأساسية
const welcomeScreen = document.getElementById("welcomeScreen");
const openBtn = document.getElementById("openBtn");
const content = document.querySelector(".content");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = musicBtn.querySelector("i");

let musicPlaying = false;
let heartInterval = null;

// ======================================
// تشغيل الموقع
// ======================================

openBtn.addEventListener("click", () => {

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "scale(.95)";
    welcomeScreen.style.transition = ".8s";

    setTimeout(() => {

        welcomeScreen.style.display = "none";

        content.style.display = "block";

        music.play().then(() => {

            musicPlaying = true;

            musicIcon.className = "fa-solid fa-volume-high";

        }).catch(() => {});

        heartInterval = setInterval(createHeart,1000);

    },800);

});

// ======================================
// زر الموسيقى
// ======================================

musicBtn.addEventListener("click",()=>{

    if(musicPlaying){

        music.pause();

        musicPlaying=false;

        musicIcon.className="fa-solid fa-volume-xmark";

    }else{

        music.play();

        musicPlaying=true;

        musicIcon.className="fa-solid fa-volume-high";

    }

});

// ======================================
// القلوب
// ======================================

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="️️️️️️️️️️️❤";

    heart.style.position="fixed";

    heart.style.left=Math.random()*100+"vw";

    heart.style.top="-40px";

    heart.style.fontSize=(18+Math.random()*10)+"px";

    heart.style.opacity=".4";

    heart.style.pointerEvents="none";

    heart.style.zIndex="-1";

    document.body.appendChild(heart);

    let y=-40;

    const speed=1+Math.random()*1.5;

    const move=setInterval(()=>{

        y+=speed;

        heart.style.top=y+"px";

        if(y>window.innerHeight+60){

            clearInterval(move);

            heart.remove();

        }

    },20);

}
// ======================================
// العد التنازلي
// ======================================

const weddingDate = new Date("August 21, 2026 19:00:00").getTime();

const countdown = document.getElementById("countdown");

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        countdown.innerHTML = "🎉 بدأ الحفل";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML =
        `${days} يوم : ${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;

},1000);


// ======================================
// رسائل التهنئة
// ======================================

let messages = JSON.parse(localStorage.getItem("messages")) || [];

showMessages();

function sendMessage(){

    const name = document.getElementById("name").value.trim();

    const message = document.getElementById("message").value.trim();

    if(name==="" || message===""){

        alert("اكتب اسمك ورسالتك ❤️");

        return;

    }

    messages.unshift({

        name:name,

        message:message,

        date:new Date().toLocaleDateString("ar-EG")

    });

    localStorage.setItem("messages",JSON.stringify(messages));

    document.getElementById("name").value="";

    document.getElementById("message").value="";

    showMessages();

}

function showMessages(){

    const allMessages=document.getElementById("allMessages");

    allMessages.innerHTML="";

    messages.forEach(item=>{

        allMessages.innerHTML += `
        <div class="msg">

            <h3>💖 ${item.name}</h3>

            <p>${item.message}</p>

            <small>${item.date}</small>

        </div>
        `;

    });

}
// ======================================
// ظهور الكروت أثناء النزول
// ======================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = ".8s";

});

function revealCards(){

    cards.forEach(card=>{

        const top = card.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealCards);

revealCards();


// ======================================
// ظهور الأقسام
// ======================================

const sections = document.querySelectorAll(".gallery,.messages,.thanks");

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="1s";

});

function revealSections(){

    sections.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            section.style.opacity="1";
            section.style.transform="translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();


// ======================================
// تأثير الضغط على الأزرار
// ======================================

document.querySelectorAll("button,.btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform="scale(.95)";

        setTimeout(()=>{

            btn.style.transform="scale(1)";

        },150);

    });

});


// ======================================
// إيقاف القلوب عند إغلاق الصفحة
// ======================================

window.addEventListener("beforeunload",()=>{

    if(heartInterval){

        clearInterval(heartInterval);

    }

});

console.log("❤️ Wedding Invitation Loaded Successfully ❤️");
