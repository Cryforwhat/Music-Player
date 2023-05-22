const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const names = [
	"IMH",
	"Company",
	"Down",
	"Hold_on",
	"FDFMN",
	"IAW",
	"For_him.",
	"There_for_you",
	"The_Hills",
	"Be_be_your_love",
];
const len = list.length;
const deg = 360 / len;

let num = 0;
let active = 0;

names.forEach((name, index) => {
	const pic = list[index].querySelector(".pic");
	const h2 = list[index].querySelector(".txt h2");
	list[index].style.transform = `rotate(${
		deg * index
	}deg) translateY(-100vh)`;
	pic.style.backgroundImage = `url(img/${name}.jpeg)`;
	h2.innerText = name;

	const audio = document.createElement("audio");
	audio.setAttribute("src", `music/${name}.mp3`);
	audio.setAttribute("loop", "loop");
	list[index].append(audio);
});

const dl = document.querySelectorAll("dl");

prev.addEventListener("click", (e) => {
	frame.style.transform = `rotate(${deg * ++num}deg)`;

	active === 0 ? (active = len - 1) : active--;

	for (let el of list) el.classList.remove("on");
	list[active].classList.add("on");
	resetAllAudio();
});

next.addEventListener("click", (e) => {
	frame.style.transform = `rotate(${deg * --num}deg)`;

	active === len - 1 ? (active = 0) : active++;

	for (let el of list) el.classList.remove("on");
	list[active].classList.add("on");
	resetAllAudio();
});

for (let el of list) {
	const play = el.querySelector(".play");
	const pause = el.querySelector(".pause");
	const load = el.querySelector(".load");

	play.addEventListener("click", (e) => {
		e.currentTarget
			.closest("article")
			.querySelector(".pic")
			.classList.add("on");
		e.currentTarget.closest("article").querySelector("audio").play();
	});

	pause.addEventListener("click", (e) => {
		e.currentTarget
			.closest("article")
			.querySelector(".pic")
			.classList.remove("on");
		e.currentTarget.closest("article").querySelector("audio").pause();
	});

	load.addEventListener("click", (e) => {
		e.currentTarget
			.closest("article")
			.querySelector(".pic")
			.classList.add("on");
		e.currentTarget.closest("article").querySelector("audio").load();
		e.currentTarget.closest("article").querySelector("audio").play();
	});
}

function resetAllAudio() {
	for (let el of list) {
		const pause = el.querySelector(".pause");
		pause.closest("article").querySelector(".pic").classList.remove("on");
		pause.closest("article").querySelector("audio").pause();
		pause.closest("article").querySelector("audio").currentTime = 0;
	}
}
