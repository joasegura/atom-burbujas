(() => {
	const title = document.querySelector('.typewriter');
	if (!title) return;
	const full = 'atom.';
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) { title.textContent = full; return; }

	const typeMs = 280;      // más lento al tipear
	const deleteMs = 200;    // borrado un poco más rápido
	const pauseStartMs = 500; // pausa antes de escribir
	const pauseEndMs   = 1200; // pausa al terminar de escribir

	let index = 0;
	let deleting = false;

	function tick(){
		if (deleting){
			index = Math.max(0, index - 1);
			title.textContent = full.slice(0, index);
			if (index === 0){
				deleting = false;
				setTimeout(tick, pauseStartMs);
				return;
			}
			setTimeout(tick, deleteMs);
			return;
		}

		index = Math.min(full.length, index + 1);
		title.textContent = full.slice(0, index);
		if (index === full.length){
			deleting = true;
			setTimeout(tick, pauseEndMs);
			return;
		}
		setTimeout(tick, typeMs);
	}

	title.textContent = '';
	setTimeout(tick, pauseStartMs);
})();

