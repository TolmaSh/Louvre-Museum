// FORM OPEN/CLOSE

const form = document.querySelector(".form");
const openForm = document.querySelector(".tickets__btn");
const closeForm = document.querySelector(".form__close");

openForm.addEventListener("click", function (e) {
	form.classList.add("form--active");
});

form.addEventListener("click", (e) => {
	if (e.target === form) {
		form.classList.remove("form--active");
	}
});

closeForm.addEventListener("click", function (e) {
	form.classList.remove("form--active");
});

// FORM CLOSE/OPEN

function randomPic() {
	const pictureInnerContainer = document.querySelector(".gallery__grid");

	function shuffle(array) {
		array
			.sort(() => Math.random() - 0.5)
			.map(function (i) {
				let img = document.createElement("img");
				img.classList.add("gallery__item");
				img.src = `images/gallery/galery${i}.jpg`;
				img.alt = `GaleryPhoto${i}`;
				pictureInnerContainer.append(img);
			});
		let child = document.querySelectorAll(".gallery__item");
		child[10].classList.add("gallery__item--11");
	}

	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	shuffle(arr);
}
randomPic();

// WELCOME SLIDER

const swiper = new Swiper(".swiper", {
	// Optional parameters
	loop: true,

	// If we need pagination
	pagination: {
		el: ".slider__buttons-pagination",
		clickable: true,
	},
	// Navigation arrows
	navigation: {
		nextEl: ".slider__buttons-next",
		prevEl: ".slider__buttons-prev",
	},
});

const fraction = document.querySelector(".slider__buttons-number");
const slideCount = swiper.slides.length - 2;
fraction.innerHTML = "0" + `1<span>|</span>` + "0" + `${slideCount}`;
swiper.on("slideChange", () => {
	let index = swiper.realIndex;
	fraction.innerHTML =
		"0" + `${index + 1}<span>|</span>` + "0" + `${slideCount}`;
});

// END WELCOME SLIDER

// ANIMATION ON SCROLL

const animItems = document.querySelectorAll(".gallery__item");

if (animItems.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 100;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if (
				pageYOffset > animItemOffset - animItemPoint &&
				pageYOffset < animItemOffset + animItemHeight
			) {
				animItem.classList.add("_active");
			} else {
				if (!animItem.classList.contains("_anim-no-hide")) {
					animItem.classList.remove("_active");
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}

// END ANIMATION ON SCROLL

// MAPBOX
mapboxgl.accessToken = 'pk.eyJ1IjoidG9sbWFzaCIsImEiOiJja3VtbXI5aHcwbDloMm9wZm10cmkydDd0In0.n743r7IHY3MoYMPfRsXKQw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: "mapbox://styles/mapbox/light-v10",
center: [2.3364, 48.86091],
zoom: 16,
attributionControl: !1
});
map.addControl(new (mapboxgl.NavigationControl)),
map.addControl(new (mapboxgl.AttributionControl)({
            customAttribution: 'Map design by <a href="https://tolmash.github.io/rsschool-cv/" target="_blank" role="listitem">TolmaSh</a>'
        })),
        new (mapboxgl.Marker)({
            color: "black"
        }).setLngLat([2.3364, 48.86091]).addTo(map),
        new (mapboxgl.Marker)({
            color: "gray"
        }).setLngLat([2.3333, 48.8602]).addTo(map),
        new (mapboxgl.Marker)({
            color: "gray"
        }).setLngLat([2.3397, 48.8607]).addTo(map),
        new (mapboxgl.Marker)({
            color: "gray"
        }).setLngLat([2.333, 48.8619]).addTo(map),
        new (mapboxgl.Marker)({
            color: "gray"
        }).setLngLat([2.3365, 48.8625]).addTo(map)

	// END MAPBOX

	// Counter
	const inputBasic = document.querySelector('.input-price-basic');
	const inputSenior = document.querySelector('.input-price-senior');
	// const totalPrice = document.querySelector('.total-price');
	const basicAmountWrapper = document.querySelector('.basic__ammount-wrapper');
	const seniorAmountWrapper = document.querySelector('.senior__ammount-wrapper');
	const permanentType = document.querySelector('.tickets__permanent');
	const temporaryType = document.querySelector('.tickets__temporary');
	const combinedType = document.querySelector('.tickets__combined');
	const radioBtns = document.querySelectorAll('input[name = "ticketType"]');
	console.log(radioBtns);


	basicAmountWrapper.addEventListener('click', changeBasicValue);
	seniorAmountWrapper.addEventListener('click', changeSeniorValue);

	function changeBasicValue(event) {

		let target = event.target;
		const totalPrice = document.querySelector('.total-prices');
		const currentInputValue = Number(inputBasic.value);

		if (target.classList.contains('tickets__form-plus')) {
			// BASIC PLUS ON PERMANENT CHECKBOX
			if ( currentInputValue < 20 && permanentType.checked ) {
				inputBasic.value = currentInputValue + 1;
				const currentPrice = Number(totalPrice.innerHTML);
			const newPrice = currentPrice + 20;
			totalPrice.innerHTML = newPrice;
			}
			// BASIC PLUS ON TEMPORARY CHECKBOX
			if ( currentInputValue < 20 && temporaryType.checked ) {
				inputBasic.value = currentInputValue + 1;
				const currentPrice = Number(totalPrice.innerHTML);
			const newPrice = currentPrice + 25;
			totalPrice.innerHTML = newPrice;
			}
			// BASIC PLUS ON COMBINED CHECKBOX
			if ( currentInputValue < 20 && combinedType.checked ) {
				inputBasic.value = currentInputValue + 1;
				const currentPrice = Number(totalPrice.innerHTML);
			const newPrice = currentPrice + 40;
			totalPrice.innerHTML = newPrice;
			}
		}

		if (target.classList.contains('tickets__form-minus')) {

			const currentPrice = Number(totalPrice.innerHTML);

			if( currentPrice <= 0 ) {
				return;
			}
			// BASIC MINUS ON PERMANENT CHECKBOX
			if ( currentInputValue > 0  && permanentType.checked) {
				inputBasic.value = currentInputValue - 1;
				const newPrice = currentPrice - 20;
				totalPrice.innerHTML = newPrice;
			}
			// BASIC MINUS ON TEMPORARY CHECKBOX
			if ( currentInputValue > 0  && temporaryType.checked) {
				inputBasic.value = currentInputValue - 1;
				const newPrice = currentPrice - 25;
				totalPrice.innerHTML = newPrice;
			}
			// BASIC MINUS ON COMBINED CHECKBOX
			if ( currentInputValue > 0  && combinedType.checked) {
				inputBasic.value = currentInputValue - 1;
				const newPrice = currentPrice - 40;
				totalPrice.innerHTML = newPrice;
			}
		}
	}






	function changeSeniorValue(event) {
		let target = event.target;
		const totalPrice = document.querySelector('.total-prices');
		const currentInputValue = Number(inputSenior.value);

		if (target.classList.contains('tickets__form-plus')) {

			if ( currentInputValue < 20 ) {
				inputSenior.value = currentInputValue + 1;
				const currentPrice = + totalPrice.innerHTML;
				const newPrice = currentPrice + 10;
				totalPrice.innerHTML = newPrice;
			}

		}

		if (target.classList.contains('tickets__form-minus')) {

			const currentPrice = + totalPrice.innerHTML;

			if( currentPrice <= 0 ) {
				return;
			}

			if ( currentInputValue > 0 ) {
				inputSenior.value = currentInputValue - 1;

				const newPrice = currentPrice - 10;
				totalPrice.innerHTML = newPrice;
			}
		}
	}

	radioBtns.forEach(el => {
		el.addEventListener('change', (e) => {

			if (e.target.id == 'permanent') {
	
			}
			if (e.target.id == 'temporary') {

			}
			if (e.target.id == 'combined') {

			}
		})
	})