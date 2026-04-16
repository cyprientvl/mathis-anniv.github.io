const container = document.getElementById("container");
const playIcon = document.getElementById("play-button");
const pCount = document.getElementById("p-count");
const popupWatchTime = document.querySelector(".popup-watch-time");
const backdrop = document.querySelector(".backdrop");

let slides = document.querySelectorAll(".slide");

let currentIndex = 0;
let nbMedia = 0;
let height = window.innerHeight;
let userInteracted = false;

function safePlay(video, resetTime = true) {
  if (!video) return;

  if(resetTime)
    video.currentTime = 0;

  const p = video.play();
  if (p && typeof p.catch === "function") {
    p.catch(() => {
      playIcon.style.display = "block";
    });
  }
}

const PRELOAD_RANGE = 2;

function manageVideoSources() {
  slides.forEach((slide, index) => {
    const video = slide.querySelector("video");
    if (!video) return;

    const distance = Math.abs(index - currentIndex);

    if (distance <= PRELOAD_RANGE) {
      const src = video.dataset.src;
      if (src && video.getAttribute("src") !== src) {
        video.src = src;
        video.load();
      }
    } else {
      if (video.getAttribute("src")) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    }
  });
}

function unlockVideos() {
  if (userInteracted) return;
  userInteracted = true;

  playIcon.style.display = "none";

  const video = slides[currentIndex]?.querySelector("video");
  if (video) {
    video.muted = false;
    safePlay(video);
  }
}

document.addEventListener("touchstart", unlockVideos, { once: true });
document.addEventListener("click", unlockVideos, { once: true });
document.addEventListener("keydown", unlockVideos, { once: true });


function isVideo(url) {
  return url.endsWith(".mp4") || url.endsWith(".webm");
}

function randomCount() {
  return Math.floor(Math.random() * 900 + 100) + "K";
}

function randomSmall() {
  return Math.floor(Math.random() * 500 + 10);
}


function generateSlides(dataArray) {
  const container = document.getElementById("container");

  dataArray.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const mediaHTML = isVideo(item.url)
      ? `<video class="main-image" data-src="assets/videos/${item.url}" loop muted playsinline preload="auto"></video>`
      : `<img class="main-image" src="assets/videos/${item.url}">`;

    slide.innerHTML = `
      <div class="slide-template">

        <div class="video-action">

          <div class="profile">
            <img src="assets/profiles/${item.profile_pic}">
            <svg width="23" data-e2e="" height="23" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g ><path fill-rule="evenodd" clip-rule="evenodd" d="M14 25C20.6274 25 26 19.6274 26 13C26 6.37258 20.6274 1 14 1C7.37258 1 2 6.37258 2 13C2 19.6274 7.37258 25 14 25Z" fill="#FE2C55"></path></g><path d="M9.5 14C9.22386 14 9 13.7761 9 13.5V12.5C9 12.2239 9.22386 12 9.5 12H18.5C18.7761 12 19 12.2239 19 12.5V13.5C19 13.7761 18.7761 14 18.5 14H9.5Z" fill="white"></path><path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H14.5C14.7761 8 15 8.22386 15 8.5V17.5C15 17.7761 14.7761 18 14.5 18H13.5C13.2239 18 13 17.7761 13 17.5V8.5Z" fill="white"></path><defs><filter id="RedPlusCircleColor_filter0_d" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
          </div>  

          <div class="action-item like-btn">
            <svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><g><path d="M24 9.44c3.2-4.03 7.61-5.56 12-4.67 2.31.47 5.59 2.28 7.75 5.48 2.26 3.32 3.21 7.99.98 13.85-1.75 4.57-5.5 8.83-9.28 12.2a56.6 56.6 0 0 1-10.52 7.47l-.93.49-.93-.49a56.6 56.6 0 0 1-10.52-7.47c-3.78-3.37-7.53-7.63-9.28-12.2-2.24-5.86-1.28-10.53.98-13.85C6.4 7.05 9.69 5.24 12 4.77c4.39-.9 8.8.64 12 4.67Z"  shape-rendering="crispEdges"></path></g><defs><clipPath id="Icon_Color-Like_Shadow_Alt_1_svg__a"><path d="M0 0h48v48H0z"></path></clipPath></defs></svg>                        
            <p>${randomCount()}</p>
          </div>

          <div class="action-item">
            <svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><g ><path fill-rule="evenodd" clip-rule="evenodd" d="M38.5 35.31c4.1-4.11 6.5-8.4 6.5-13.38C45 11.8 35.73 3.6 24.3 3.6S3.6 11.8 3.6 21.93C3.6 32.05 13.17 39 24.6 39v3.36c0 1.06 1.1 1.75 2.04 1.24 2.92-1.58 8.33-4.76 11.85-8.29ZM14.23 19.46a2.95 2.95 0 0 1 2.96 2.93 2.95 2.95 0 0 1-2.96 2.94 2.95 2.95 0 0 1-2.95-2.94 2.95 2.95 0 0 1 2.95-2.93Zm13.02 2.93a2.95 2.95 0 0 0-2.96-2.93 2.95 2.95 0 0 0-2.96 2.93 2.95 2.95 0 0 0 2.96 2.94 2.95 2.95 0 0 0 2.96-2.94Zm7.1-2.93a2.95 2.95 0 0 1 2.95 2.93 2.95 2.95 0 0 1-2.96 2.94 2.95 2.95 0 0 1-2.95-2.94 2.95 2.95 0 0 1 2.95-2.93Z" fill="#fff" ></path></g></svg>                        
            <p>${randomSmall()}</p>
          </div>

          <div class="action-item fav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="24" height="24"><path d="M4 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15.13a1 1 0 0 1-1.555.831l-6.167-4.12a.5.5 0 0 0-.556 0l-6.167 4.12A1 1 0 0 1 4 19.63z"></path></svg>                        
            <p>${randomSmall()}</p>
          </div>

          <div class="action-item">
            <svg viewBox="0 0 48 48" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><g  clip-path="url(#Icon_Color-Share_Shadow_Alt_2_svg__a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.56 4.07a1.98 1.98 0 0 0-2.15-.42 1.95 1.95 0 0 0-1.21 1.8v8.34c-5.4.35-10.04 2.2-13.43 5.68C4.97 23.35 3 29.03 3 36.19c0 .79.48 1.5 1.22 1.8.73.3 1.58.13 2.14-.42 3.34-3.31 7.65-4.56 11.25-4.95 1.8-.2 3.37-.18 4.5-.1h.09v9.03c0 .78.46 1.48 1.18 1.79.72.3 1.56.16 2.13-.37l18.87-17.49a1.94 1.94 0 0 0 .04-2.8L25.56 4.07Z" fill="#fff"  shape-rendering="crispEdges"></path></g><defs><clipPath id="Icon_Color-Share_Shadow_Alt_2_svg__a"><path fill="#fff" d="M0 0h48v48H0z"></path></clipPath></defs></svg>
            <p>${randomSmall()}</p>
          </div>

          <div class="sound">
            <img src="assets/profiles/${item.profile_pic}">
          </div>

        </div>

        <div class="video-description">
          <p class="profile-name">${item.profile}</p>
          <p class="description">${item.description}</p>
          <div class="hashtag">
            ${item.tags.map(tag => `<p>${tag}</p>`).join("")}
          </div>
        </div>

        ${mediaHTML}

      </div>
    `;

    container.appendChild(slide);
  });
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const shuffledData = shuffleArray(data.data);

    generateSlides([...shuffledData, ...data.static]);

    nbMedia = shuffledData.length + data.static.length;
    slides = document.querySelectorAll(".slide");

    manageVideoSources();
    updateSlides();
    initLikes();
    initFav();
  })
  .catch(console.error);


function updateSlides() {
  updatePCountText();

  manageVideoSources();
  playIcon.style.display = "none";

  slides.forEach((slide, index) => {
    slide.style.transform = `translateY(${(index - currentIndex) * 100}vh)`;

    const video = slide.querySelector("video");
    if (!video) return;

    if (index === currentIndex) {
      if(currentIndex == 0){
         playIcon.style.display = "block";
        return;

      }

      video.muted = !userInteracted;

      if (video.readyState >= 2) {
        safePlay(video);
      } else {
        video.addEventListener("canplay", () => safePlay(video), { once: true });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });

  if (currentIndex === slides.length - 2) {
    popupWatchTime.style.display = "flex";
    backdrop.style.display = "block";
    playIcon.style.display = "block";
    setTimeout(() => {
      slides.forEach(slide => {
        const video = slide.querySelector("video");
        if (video) video.pause();
      });
    }, 500);
  }
}


const hammer = new Hammer(container);
hammer.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

hammer.on("swipeup", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlides();
  }
});

hammer.on("swipedown", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlides();
  }
});


hammer.on("tap", (ev) => {
  const slide = slides[currentIndex];
  const video = slide?.querySelector("video");

  if (!video) return;

  const rect = slide.getBoundingClientRect();
  const x = ev.center.x - rect.left;
  const y = ev.center.y - rect.top;

  const isCenter =
    x > rect.width * 0.4 &&
    x < rect.width * 0.8 &&
    y > rect.height * 0.4 &&
    y < rect.height * 0.8;

  if (isCenter) {
    userInteracted = true;

    if (video.paused) {
      video.muted = false;
      safePlay(video, false);
      playIcon.style.display = "none";
    } else {
      video.pause();
      playIcon.style.display = "block";
    }
  }
});


function initLikes() {
  document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("liked"));
  });
}

function initFav() {
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("faved"));
  });
}

function updatePCountText() {
  pCount.innerText = `${currentIndex + 1}/${nbMedia}`;
}


window.addEventListener("resize", () => {
  height = window.innerHeight;
  updateSlides();
});

function closeWatchTimePopup() {
  popupWatchTime.style.display = "none";
  backdrop.style.display = "none";
}
