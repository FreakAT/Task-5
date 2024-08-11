let imageArray = [];
for (let i = 1; i <= 6; i++) {
	const currDiv = document.getElementById(`div${i}`);
	imageArray = [...imageArray, currDiv];
}

function dragStartHandler(e) {
	console.log(`dragging started for ${e.target.id}`);
	e.dataTransfer.setData("text/plain", e.target.id);
	setTimeout(() => {
		e.target.classList.add("selected");
	}, 0);
}

function dragEnterHandler(e) {
	e.preventDefault();
}

function dragOverHandler(e) {
	e.preventDefault();
}

function dropHandler(e) {
	const draggedId = e.dataTransfer.getData("text/plain");
	const draggedFrom = document.getElementById(draggedId);
	const draggedImg =
		draggedFrom.currentStyle || window.getComputedStyle(draggedFrom, false);
	const draggedImgUrl = draggedImg.backgroundImage
		.slice(4, -1)
		.replace(/['"]/g, "");

	const draggedTo = document.getElementById(e.target.id);
	const draggedToImg =
		draggedTo.currentStyle || window.getComputedStyle(draggedTo, false);
	const draggedToImgUrl = draggedToImg.backgroundImage
		.slice(4, -1)
		.replace(/['"]/g, "");

	draggedFrom.style.backgroundImage = `url(${draggedToImgUrl})`;
	draggedTo.style.backgroundImage = `url(${draggedImgUrl})`;
	console.log(`Images swapped with ${e.target.id}.`);
	draggedFrom.classList.remove("selected");
}

for (let elem of imageArray) {
	elem.addEventListener("dragstart", dragStartHandler);
}

for (let elem of imageArray) {
	elem.addEventListener("dragenter", dragEnterHandler);
	elem.addEventListener("dragover", dragOverHandler);
	// elem.addEventListener("dragleave", dragLeaveHandler);
	elem.addEventListener("drop", dropHandler);
}
