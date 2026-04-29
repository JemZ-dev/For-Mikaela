const frames = [
  "images/envelope1.png",
  "images/envelope2.png",
  "images/envelope3.png",
  "images/envelope4.png",
  "images/envelope5.png"
];

const message = `Hey, I wanted to say sorry again about earlier. Sorry for being pushy, and I can’t say I didn’t know what I was doing.

I know you’ve just been through a rough experience, which you didn’t deserve, and to have your trust broken again like that. The first one was bad enough.

Hope you’re coping well. It’ll work out in the end naman, and if it doesn’t, it ain’t the end.

Don't worry, you’ll meet plenty of people who will be deserving of your love and will reciprocate it just as much as you give them. Not implying it’s me ha, just sayin HUAHAHA.

Tbh, I don’t know why I made this. Could’ve just sent a message, I guess I just wanted to make the effort.

Try not to dwell on what happened too much. 

- Jem

Cheer up, oh eto cake.`;

let index = 0;
let isOpening = false;

const envelopeFrameDuration = 220;
const typingStartDelay = 1500;
const typingSpeed = 45;

function preloadImages() {
  const allImages = [
    ...frames,
    "images/cake.png",
    "images/sad.png",
    "images/happy-cake.png"
  ];

  allImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages();

function openEnvelope() {
  if (isOpening) return;

  isOpening = true;

  const envelope = document.getElementById("envelope");
  const wrapper = document.querySelector(".envelopeWrapper");

  wrapper.classList.add("opening");

  let frameIndex = 0;

  function nextFrame() {
    envelope.src = frames[frameIndex];
    frameIndex++;

    if (frameIndex < frames.length) {
      setTimeout(nextFrame, envelopeFrameDuration);
    } else {
      setTimeout(() => {
        openLetter();
      }, 700);
    }
  }

  nextFrame();
}

function openLetter() {
  const home = document.getElementById("home");
  const messageScreen = document.getElementById("messageScreen");

  home.style.opacity = "0";
  home.style.transform = "scale(0.95)";

  setTimeout(() => {
    home.style.display = "none";
    messageScreen.classList.remove("hidden");

    setTimeout(() => {
      typeLetter();
    }, typingStartDelay);
  }, 700);
}

function typeLetter() {
  const letterText = document.getElementById("letterText");
  const cursor = document.getElementById("cursor");

  if (index < message.length) {
    letterText.textContent += message.charAt(index);
    index++;
    setTimeout(typeLetter, typingSpeed);
  } else {
    cursor.style.display = "none";
    showCakeSection();
  }
}

function showCakeSection() {
  const cakeSection = document.getElementById("cakeSection");

  if (cakeSection) {
    cakeSection.classList.remove("hidden");
  }
}

function finishCakeDrop() {
  if (!cakeImage || !mikaelaImage || cakeImage.classList.contains("hideCake")) {
    return;
  }

  sadDropArea.classList.remove("dragOver");
  cakeImage.classList.add("hideCake");

  setTimeout(() => {
    cakeImage.style.display = "none";
    cakeImage.style.transform = "";
    cakeImage.style.opacity = "";
    mikaelaImage.style.opacity = "0";

    setTimeout(() => {
      mikaelaImage.src = "images/happy-cake.png";
      mikaelaImage.style.opacity = "1";
      mikaelaImage.classList.add("happyPop");
    }, 300);
  }, 250);
}

function isOverDropArea() {
  if (!cakeImage || !sadDropArea) {
    return false;
  }

  const cakeRect = cakeImage.getBoundingClientRect();
  const dropRect = sadDropArea.getBoundingClientRect();

  const cakeCenterX = cakeRect.left + cakeRect.width / 2;
  const cakeCenterY = cakeRect.top + cakeRect.height / 2;

  return (
    cakeCenterX >= dropRect.left &&
    cakeCenterX <= dropRect.right &&
    cakeCenterY >= dropRect.top &&
    cakeCenterY <= dropRect.bottom
  );
}

/* Cake drag and drop */
const cakeImage = document.getElementById("cakeImage");
const sadDropArea = document.getElementById("sadDropArea");
const mikaelaImage = document.getElementById("mikaelaImage");

if (cakeImage && sadDropArea && mikaelaImage) {
  let activePointerId = null;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  function updateCakePosition(x, y) {
    currentX = x - startX;
    currentY = y - startY;
    cakeImage.style.transform = `translate(${currentX}px, ${currentY}px)`;

    if (isOverDropArea()) {
      sadDropArea.classList.add("dragOver");
    } else {
      sadDropArea.classList.remove("dragOver");
    }
  }

  function resetCakePosition() {
    cakeImage.style.transition = "transform 0.25s ease";
    cakeImage.style.transform = "";
    sadDropArea.classList.remove("dragOver");

    setTimeout(() => {
      if (!cakeImage.classList.contains("hideCake")) {
        cakeImage.style.transition = "";
      }
    }, 250);
  }

  function stopPointerDrag() {
    if (activePointerId !== null) {
      cakeImage.releasePointerCapture(activePointerId);
    }

    activePointerId = null;
  }

  cakeImage.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", "cake");
  });

  sadDropArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    sadDropArea.classList.add("dragOver");
  });

  sadDropArea.addEventListener("dragleave", function () {
    sadDropArea.classList.remove("dragOver");
  });

  sadDropArea.addEventListener("drop", function (event) {
    event.preventDefault();
    finishCakeDrop();
  });

  cakeImage.addEventListener("pointerdown", function (event) {
    activePointerId = event.pointerId;
    startX = event.clientX - currentX;
    startY = event.clientY - currentY;
    cakeImage.setPointerCapture(activePointerId);
    cakeImage.style.transition = "none";
    cakeImage.style.cursor = "grabbing";
    event.preventDefault();
  });

  cakeImage.addEventListener("pointermove", function (event) {
    if (activePointerId !== event.pointerId) {
      return;
    }

    updateCakePosition(event.clientX, event.clientY);
  });

  function endPointerDrag(event) {
    if (activePointerId !== event.pointerId) {
      return;
    }

    cakeImage.style.cursor = "grab";

    if (isOverDropArea()) {
      stopPointerDrag();
      finishCakeDrop();
      return;
    }

    stopPointerDrag();
    currentX = 0;
    currentY = 0;
    resetCakePosition();
  }

  cakeImage.addEventListener("pointerup", endPointerDrag);
  cakeImage.addEventListener("pointercancel", endPointerDrag);

  cakeImage.addEventListener("lostpointercapture", function () {
    if (!cakeImage.classList.contains("hideCake")) {
      cakeImage.style.cursor = "grab";
    }
  });
}
