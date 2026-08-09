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
// ======================================
// Supabase
// ======================================

const SUPABASE_URL =
"https://ewwxqsuzrwhbiyyshste.supabase.co";

const SUPABASE_KEY =
"sb_publishable_NX_er_DE2uDS8rWjdM-NPg_-xqb_c7i";


// ======================================
// إعداد الأرشيف
// ======================================

const ARCHIVE_PASSWORD = "AhmedSara2026";

const messagesBox =
document.getElementById("allMessages");

let archiveOpen = false;


// ======================================
// إرسال التهنئة
// ======================================

async function sendMessage(){

    const nameInput =
    document.getElementById("name");

    const messageInput =
    document.getElementById("message");

    const sendButton =
    document.getElementById("sendMessageBtn");

    const name =
    nameInput.value.trim();

    const message =
    messageInput.value.trim();


    if(name === "" || message === ""){

        alert("من فضلك اكتب اسمك ورسالتك ❤️");

        return;

    }


    sendButton.disabled = true;

    sendButton.innerText =
    "جاري الإرسال...";


    try{

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/messages`,

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json",

                    "apikey":
                    SUPABASE_KEY,

                    "Authorization":
                    `Bearer ${SUPABASE_KEY}`,

                    "Prefer":
                    "return=minimal"

                },

                body:JSON.stringify({

                    name:name,

                    message:message

                })

            }

        );


        if(!response.ok){

            console.error(
                await response.text()
            );

            alert(
                "حصلت مشكلة أثناء إرسال التهنئة."
            );

            return;

        }


        nameInput.value = "";

        messageInput.value = "";


        alert(
            "تم إرسال تهنئتك بنجاح ❤️"
        );


        if(archiveOpen){

            loadMessages();

        }


    }catch(error){

        console.error(error);

        alert(
            "تعذر الاتصال بقاعدة البيانات."
        );


    }finally{

        sendButton.disabled = false;

        sendButton.innerText =
        "إرسال التهنئة";

    }

}


// ======================================
// فتح الأرشيف
// ======================================

function openArchive(){

    const passwordBox =
    document.getElementById("passwordBox");

    passwordBox.style.display =
    "block";

    document
    .getElementById("archivePassword")
    .focus();

}


// ======================================
// التحقق من كلمة المرور
// ======================================

function checkArchivePassword(){

    const password =
    document
    .getElementById("archivePassword")
    .value;


    const error =
    document
    .getElementById("passwordError");


    if(password === ARCHIVE_PASSWORD){

        document
        .getElementById("passwordBox")
        .style.display = "none";


        document
        .getElementById("archiveBtn")
        .style.display = "none";


        archiveOpen = true;

        messagesBox.style.display =
        "block";


        loadMessages();


    }else{

        error.textContent =
        "كلمة المرور غير صحيحة ❌";

        document
        .getElementById("archivePassword")
        .value = "";

    }

}


// ======================================
// تحميل الرسائل
// ======================================

async function loadMessages(){

    messagesBox.innerHTML = `
        <p class="loading-messages">
            جاري تحميل التهاني...
        </p>
    `;


    try{

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/messages?select=*&order=created_at.desc`,

            {

                method:"GET",

                headers:{

                    "apikey":
                    SUPABASE_KEY,

                    "Authorization":
                    `Bearer ${SUPABASE_KEY}`

                }

            }

        );


        if(!response.ok){

            console.error(
                await response.text()
            );

            messagesBox.innerHTML = `
                <p>
                    حصلت مشكلة في تحميل الأرشيف.
                </p>
            `;

            return;

        }


        const messages =
        await response.json();


        if(messages.length === 0){

            messagesBox.innerHTML = `
                <p class="empty-messages">
                    لا توجد تهاني حتى الآن ❤️
                </p>
            `;

            return;

        }


        messagesBox.innerHTML = "";


        messages.forEach(item => {

            const box =
            document.createElement("div");

            box.className = "msg";


            const name =
            document.createElement("h3");

            name.textContent =
            "💖 " + item.name;


            const text =
            document.createElement("p");

            text.textContent =
            item.message;


            const date =
            document.createElement("small");

            date.textContent =
            formatDate(item.created_at);


            box.appendChild(name);

            box.appendChild(text);

            box.appendChild(date);


            messagesBox.appendChild(box);

        });


    }catch(error){

        console.error(error);

        messagesBox.innerHTML = `
            <p>
                تعذر الاتصال بالأرشيف.
            </p>
        `;

    }

}


// ======================================
// تنسيق التاريخ
// ======================================

function formatDate(date){

    return new Date(date)
    .toLocaleDateString(

        "ar-EG",

        {

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

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
