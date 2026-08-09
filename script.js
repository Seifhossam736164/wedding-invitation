// =========================================
// Wedding Invitation
// =========================================

const openBtn = document.getElementById("openBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const content = document.querySelector(".content");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");


// =========================================
// فتح الدعوة
// =========================================

openBtn.addEventListener("click", function () {

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transition = "opacity .8s ease";

    setTimeout(function () {

        welcomeScreen.style.display = "none";
        content.style.display = "block";

        if (music) {
            music.play().catch(function () {});
        }

        startHearts();

        revealCards();
        revealSections();

    }, 800);

});


// =========================================
// الموسيقى
// =========================================

musicBtn.addEventListener("click", function () {

    if (music.paused) {

        music.play().catch(function () {});

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    } else {

        music.pause();

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    }

});


// =========================================
// القلوب
// =========================================

let heartInterval = null;

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.top = "-30px";

    heart.style.fontSize =
        12 + Math.random() * 16 + "px";

    heart.style.opacity =
        0.25 + Math.random() * 0.5;

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9998";

    document.body.appendChild(heart);

    const duration =
        5000 + Math.random() * 4000;

    const startX =
        Math.random() * 60 - 30;

    const endX =
        Math.random() * 100 - 50;

    const animation = heart.animate(

        [
            {
                transform:
                    `translate(${startX}px,0) rotate(0deg)`
            },

            {
                transform:
                    `translate(${endX}px,110vh) rotate(360deg)`
            }
        ],

        {
            duration: duration,
            easing: "linear"
        }

    );

    animation.onfinish = function () {
        heart.remove();
    };

}


function startHearts() {

    if (heartInterval) return;

    createHeart();

    heartInterval =
        setInterval(createHeart, 900);

}


// =========================================
// العد التنازلي
// =========================================

const weddingDate =
    new Date(
        "August 21, 2026 19:00:00"
    ).getTime();

const countdown =
    document.getElementById("countdown");


function updateCountdown() {

    if (!countdown) return;

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;

    if (distance <= 0) {

        countdown.innerHTML =
            "🎉 بدأ الحفل ❤️";

        return;

    }

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );

    countdown.innerHTML =
        `${days} يوم : ${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// =========================================
// الرسائل
// =========================================

let messages =
    JSON.parse(
        localStorage.getItem("messages")
    ) || [];


function sendMessage() {

    const name =
        document.getElementById("name")
            .value
            .trim();

    const message =
        document.getElementById("message")
            .value
            .trim();


    if (!name || !message) {

        alert(
            "من فضلك اكتب اسمك ورسالتك ❤️"
        );

        return;

    }


    messages.unshift({

        name: name,

        message: message,

        date:
            new Date()
                .toLocaleDateString("ar-EG")

    });


    localStorage.setItem(
        "messages",
        JSON.stringify(messages)
    );


    document.getElementById("name").value = "";

    document.getElementById("message").value = "";


    showMessages();

}


function showMessages() {

    const allMessages =
        document.getElementById(
            "allMessages"
        );

    if (!allMessages) return;


    allMessages.innerHTML = "";


    if (messages.length === 0) {

        allMessages.innerHTML =
            `<p class="empty-messages">
                لا توجد تهنئات حتى الآن ❤️
            </p>`;

        return;

    }


    messages.forEach(function (item) {

        const msg =
            document.createElement("div");

        msg.className = "msg";


        const title =
            document.createElement("h3");

        title.textContent =
            "💖 " + item.name;


        const text =
            document.createElement("p");

        text.textContent =
            item.message;


        const date =
            document.createElement("small");

        date.textContent =
            item.date;


        msg.appendChild(title);
        msg.appendChild(text);
        msg.appendChild(date);


        allMessages.appendChild(msg);

    });

}


showMessages();


// =========================================
// أرشيف التهاني
// =========================================

function openArchive() {

    const passwordBox =
        document.getElementById(
            "passwordBox"
        );

    passwordBox.style.display =
        passwordBox.style.display === "block"
            ? "none"
            : "block";

}


function checkArchivePassword() {

    const password =
        document.getElementById(
            "archivePassword"
        ).value;

    const passwordError =
        document.getElementById(
            "passwordError"
        );


    // غيّر كلمة المرور هنا
    const correctPassword =
        "1234";


    if (password === correctPassword) {

        passwordError.textContent = "";

        document.getElementById(
            "allMessages"
        ).style.display = "block";

        showMessages();

    } else {

        passwordError.textContent =
            "كلمة المرور غير صحيحة ❌";

    }

}


// إخفاء الرسائل في البداية
document.getElementById(
    "allMessages"
).style.display = "none";


// =========================================
// ظهور الكروت
// =========================================

const cards =
    document.querySelectorAll(".card");


cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(60px)";

    card.style.transition =
        "opacity .8s ease, transform .8s ease";

});


function revealCards() {

    cards.forEach(function (card) {

        const top =
            card.getBoundingClientRect().top;


        if (
            top <
            window.innerHeight - 100
        ) {

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }

    });

}


// =========================================
// ظهور الأقسام
// =========================================

const sections =
    document.querySelectorAll(
        ".gallery, .messages, .thanks"
    );


sections.forEach(function (section) {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(60px)";

    section.style.transition =
        "opacity 1s ease, transform 1s ease";

});


function revealSections() {

    sections.forEach(function (section) {

        const top =
            section.getBoundingClientRect().top;


        if (
            top <
            window.innerHeight - 100
        ) {

            section.style.opacity = "1";

            section.style.transform =
                "translateY(0)";

        }

    });

}


window.addEventListener(
    "scroll",
    function () {

        revealCards();
        revealSections();

    }
);


// =========================================
// تنظيف القلوب
// =========================================

window.addEventListener(
    "beforeunload",
    function () {

        if (heartInterval) {

            clearInterval(heartInterval);

            heartInterval = null;

        }

    }
);


// =========================================
// Console
// =========================================

console.log(
    "❤️ Wedding Invitation Loaded Successfully ❤️"
);
