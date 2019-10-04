(longcat => {
	var cat = document.querySelector(".longcat"),
		catHeight = cat.offsetHeight,
		catGrowAmount = 11,
		achievBanner = document.querySelector(".achiev-banner"),
		achievName = document.querySelector(".achiev-name span"),
		achievReq = document.querySelector(".achiev-req"),
		lengthCt = document.querySelector(".count"),
		numberF = new Intl.NumberFormat("en-US"),
		achievements = [
			{name: "Looooong", pts: 1000},
			{name: "Loooooooooong", pts: 2000},
			{name: "The Mile Stone", pts: 5280},
			{name: "Leviacat", pts: 10000},
			{name: "Catzilla", pts: 15000},
			{name: "Pierce the Clouds", pts: 20000},
			{name: "Catch the White Dots", pts: 25000},
			{name: "Catch Poptart Cats", pts: 35000},
			{name: "Felinity and Beyond!", pts: 99999}
		],
		observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0
		},
		observer = new IntersectionObserver((entries, observer) => { 
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// increase cat length
					catHeight += catGrowAmount;
					lengthCt.innerHTML = catHeight;
					cat.style.height = catHeight + "px";
					
					// check if achievement reached
					for (let a of achievements) {
						if (catHeight >= a.pts && catHeight <= a.pts + catGrowAmount) {
							achievBanner.className = "achiev-banner achiev-earned";
							setTimeout(() => {
								achievBanner.className = "achiev-banner";
							}, 4000);
							achievName.innerHTML = a.name;
							achievReq.innerHTML = "Reached " + numberF.format(a.pts) + "px";
						}
					}

					window.scrollBy({
						top: -entry.boundingClientRect.height,
						left: 0,
						behavior: "smooth"
					});
				}
			});
		}, observerOptions),
		barrier = document.querySelector('.barrier');
	
	observer.observe(barrier);
	
	// initial height
	lengthCt.innerHTML = catHeight;
})();