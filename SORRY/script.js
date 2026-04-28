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

/* Cake drag and drop */
const cakeImage = document.getElementById("cakeImage");
const sadDropArea = document.getElementById("sadDropArea");
const mikaelaImage = document.getElementById("mikaelaImage");

if (cakeImage && sadDropArea && mikaelaImage) {
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

    sadDropArea.classList.remove("dragOver");
    cakeImage.classList.add("hideCake");

    setTimeout(() => {
      cakeImage.style.display = "none";
      mikaelaImage.style.opacity = "0";

      setTimeout(() => {
        mikaelaImage.src = "images/happy-cake.png";
        mikaelaImage.style.opacity = "1";
        mikaelaImage.classList.add("happyPop");
      }, 300);
    }, 250);
  });
}
