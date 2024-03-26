const title = document.querySelector(".text1");
const img = document.querySelector(".img");
const audio = document.querySelector(".audio");

const prevBtn = document.querySelector(".prevBtn");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".nextBtn");
const rower = document.querySelector(".rower");
const progresWidth = document.querySelector(".progress");
const bars = document.querySelector("#bars");
const exit = document.querySelector("#exit");
const modal = document.querySelector(".modal");
const currentTime = document.querySelector(".currentTime");
const durationEnd = document.querySelector(".duration");
const progressBox = document.querySelector(".progres");
const volumeInput = document.querySelector(".volumeInput");
const musicData = document.querySelector(".musicData");
const repeat = document.querySelector("#repeat");
const random = document.querySelector("#random");

const musics = ["Bilmaydi", "Havo", "Insonlar", "Jinnixona","O'zbekistonlik","O'ylamading"];

musics.forEach((item) => {
  musicData.innerHTML += ` <li class="song">${item}</li>`;
});
var index = 0;

var loadSong = (item) => {
  if (localStorage.getItem("musicIndex")) {
    img.setAttribute(
      "src",
      `./musicImg/${musics[localStorage.getItem("musicIndex")]}.jpg`
    );
    audio.setAttribute(
      "src",
      `./music/${musics[localStorage.getItem("musicIndex")]}.mp3`
    );
    title.textContent = musics[localStorage.getItem("musicIndex")];
  } else {
    img.setAttribute("src", `./musicImg/${musics[item]}.jpg`);
    audio.setAttribute("src", `./music/${musics[item]}.mp3`);
    title.textContent = musics[item];
  }
};
loadSong(index);

var playMusic = () => {
  audio.play();
  rower.classList.add("playing");
  playBtn.innerHTML = `<i  class="fa-solid fa-pause"></i>`;
};

var pauseMusic = () => {
  audio.pause();
  rower.classList.remove("playing");
  playBtn.innerHTML = `  <i  class="fa-solid fa-play"></i>`;
};

const nextMusic = () => {
  if (index == musics.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  loadSong(index);
  audio.play();
  rower.classList.add("playing");
  playBtn.innerHTML = `<i  class="fa-solid fa-pause"></i>`;
};

prevBtn.addEventListener("click", () => {
  localStorage.clear();
  if (index == 0) {
    index = musics.length - 1;
  } else {
    index = index - 1;
  }
  loadSong(index);
  audio.play();
  rower.classList.add("playing");
  playBtn.innerHTML = `<i  class="fa-solid fa-pause"></i>`;
});
const progress = (e) => {
  var curTime = e.srcElement.currentTime;
  var duration = e.srcElement.duration;
  var percent = (parseInt(curTime) * 100) / parseInt(duration);
  progresWidth.style.width = `${percent}%`;
  a = 10;
  var startMinuts = parseInt(curTime / 60);
  var startSeconds = parseInt(curTime % 60);

  currentTime.textContent = `${
    startMinuts < 10 ? `0${startMinuts}` : startMinuts
  } : ${startSeconds < 10 ? `0${startSeconds}` : startSeconds} `;

  if (duration) {
    var endMinutes =
      parseInt(duration / 60) < 10
        ? `0${parseInt(duration / 60)}`
        : parseInt(duration / 60);
    var endSeconds =
      parseInt(duration % 60) < 10
        ? `0${parseInt(duration % 60)}`
        : parseInt(duration % 60);

    durationEnd.textContent = `${endMinutes}:${endSeconds}`;
  } else {
    durationEnd.textContent = `00:00`;
  }
};

const setProgres = (e) => {
  var allWidth = progressBox.clientWidth;
  var clickPoint = e.offsetX;
  var duration = audio.duration;
  audio.currentTime = (duration * clickPoint) / allWidth;
};

playBtn.addEventListener("click", () => {
  if (!rower.classList.contains("playing")) {
    playMusic();
  } else {
    pauseMusic();
  }
});
audio.addEventListener("timeupdate", progress);
progressBox.addEventListener("click", setProgres);
nextBtn.addEventListener("click", () => {
  localStorage.clear();
  nextMusic();
});
audio.addEventListener("ended", nextMusic);

volumeInput.addEventListener("input", () => {
  audio.volume = volumeInput.value / 100;
});

bars.addEventListener("click", () => {
  modal.classList.add("active");
});

exit.addEventListener("click", () => {
  modal.classList.remove("active");
});

const songs = document.querySelectorAll(".song");

songs.forEach((item) => {
  item.addEventListener("click", () => {
    img.setAttribute("src", `./musicImg/${item.textContent}.jpg`);
    audio.setAttribute("src", `./music/${item.textContent}.mp3`);
    title.textContent = item.textContent;

    playMusic();
    modal.classList.remove("active");
    localStorage.clear();
  });
});

repeat.addEventListener("click", () => {
  localStorage.setItem("musicIndex", index);
});

document.addEventListener("keypress", (e) => {
  playing(e.key);
});

const playing = (item) => {
  if (item == " " || item == "Enter") {
    if (!rower.classList.contains("playing")) {
      playMusic();
    } else {
      pauseMusic();
    }
  } else if (item == "6") {
    localStorage.clear();
    nextMusic();
  } else if (item == "4") {
    localStorage.clear();
    if (index == 0) {
      index = musics.length - 1;
    } else {
      index = index - 1;
    }
    loadSong(index);
    audio.play();
    rower.classList.add("playing");
    playBtn.innerHTML = `<i  class="fa-solid fa-pause"></i>`;
  } else if (item == "-") {
    var num = volumeInput.value - 5;
    volumeInput.value = num;

    audio.volume = volumeInput.value / 100;
  } else if (item == "+") {
    var num = +volumeInput.value + 5;
    volumeInput.value = num;

    audio.volume = volumeInput.value / 100;
  }
};
