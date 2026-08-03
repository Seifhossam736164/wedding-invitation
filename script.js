// =====================================
// Wedding Invitation Script
// =====================================

// العناصر الأساسية
const openBtn = document.getElementById("openBtn");
const loading = document.querySelector(".loading");
const content = document.querySelector(".content");
const music = document.getElementById("music");

const cover = document.querySelector(".cover");
const paper = document.querySelector(".paper");

// =====================================
// تأثير القلوب
// =====================================

let heartInterval = null;

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "🤍";

    heart.style.position = "fixed";
    heart.style.left = Math.random()*100+"vw";
    heart.style.top = "-30px";

    heart.style.fontSize =
    (12+Math.random()*10)+"px";

    heart.style.opacity=".35";

    heart.style.pointerEvents="none";

    heart.style.zIndex="-1";

    document.body.appendChild(heart);

    let y=-30;

    let speed=.8+Math.random();

    const move=setInterval(()=>{

        y+=speed;

        heart.style.top=y+"px";

        if(y>window.innerHeight+50){

            clearInterval(move);

            heart.remove();

        }

    },20);

}

// =====================================
// فتح الظرف
// =====================================

openBtn.addEventListener("click",()=>{

    cover.style.transform="rotateX(180deg)";

    paper.style.transform="translateY(-120px)";

    if(!heartInterval){

        heartInterval=setInterval(createHeart,1500);

    }

    setTimeout(()=>{

        loading.style.opacity="0";

    },900);

    setTimeout(()=>{

        loading.style.display="none";

        content.style.display="block";

        music.play().catch(()=>{});

    },1700);

});

// =====================================
// العد التنازلي
// =====================================

const weddingDate=new Date(
"August 21, 2026 19:00:00"
).getTime();

const countdown=document.getElementById("countdown");

setInterval(()=>{

    const now=new Date().getTime();

    const distance=weddingDate-now;

    if(distance<0){

        countdown.innerHTML="🎉 بدأ الحفل";

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds=Math.floor((distance%(1000*60))/1000);

    countdown.innerHTML=
`${days} يوم : ${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;

},1000);
// =====================================
// رسائل التهنئة
// =====================================

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
        date: new Date().toLocaleDateString("ar-EG")
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    showMessages();
}

function showMessages() {

    const allMessages = document.getElementById("allMessages");

    allMessages.innerHTML = "";

    messages.forEach(item => {

        allMessages.innerHTML += `
        <div class="msg">
            <h3>💖 ${item.name}</h3>
            <p>${item.message}</p>
            <small>${item.date}</small>
        </div>
        `;

    });

}

// =====================================
// ظهور الكروت أثناء النزول
// =====================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = ".8s";

});

function revealCards() {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealCards);

revealCards();
// =====================================
// ظهور الأقسام الأخرى
// =====================================

const sections = document.querySelectorAll(
".gallery,.messages,.thanks"
);

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="1s";

});

function revealSections(){

    sections.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<window.innerHeight-100){

            section.style.opacity="1";
            section.style.transform="translateY(0)";

        }

    });

}

window.addEventListener("scroll",revealSections);

revealSections();


// =====================================
// تأثير الأزرار
// =====================================

document.querySelectorAll("button,.btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform="scale(.95)";

        setTimeout(()=>{

            btn.style.transform="scale(1)";

        },150);

    });

});


// =====================================
// إيقاف القلوب عند إغلاق الصفحة
// =====================================

window.addEventListener("beforeunload",()=>{

    if(heartInterval){

        clearInterval(heartInterval);

    }

});


// =====================================
// رسالة في الـ Console
// =====================================

console.log("❤️ Wedding Invitation Loaded Successfully ❤️");
