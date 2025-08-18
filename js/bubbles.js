(() => {
	const cnv = document.getElementById('bubbles-canvas');
	const ctx = cnv.getContext('2d', { alpha: true });
	const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
	let W=0, H=0, t=0, rafId=0;

	const CFG = {
		count: 3,       // cantidad de burbujas
		minSize: 240,    // tamaño mínimo (px)
		maxSize: 720,    // tamaño máximo (px)
		baseSpeed: 5.11, // velocidad base
		drift: 5.7,      // deriva senoidal
		shadow: 25,      // blur halo
		alpha: 6.20,     // opacidad
	};

	const palette = [
		// Variantes muy cercanas al color principal para mayor consistencia
		{ inner:'#0097f6', mid:'#0097f6' },
		{ inner:'#0a9cf8', mid:'#0097f6' },
		{ inner:'#1aa2ff', mid:'#0097f6' }
	];

	// Luz para sombreado (simulación 3D)
	const LIGHT = { x: -0.35, y: -0.6 };
	const LIGHT_NORM = (() => {
		const len = Math.hypot(LIGHT.x, LIGHT.y) || 1;
		return { x: LIGHT.x/len, y: LIGHT.y/len };
	})();

	const bubbles = [];
	function rand(a,b){ return Math.random()*(b-a)+a; }
	function clamp(n,a,b){ return Math.max(a, Math.min(b,n)); }
	function hexToRgba(hex,a=1){
		const m=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if(!m) return `rgba(0,0,0,${a})`;
		const r=parseInt(m[1],16), g=parseInt(m[2],16), b=parseInt(m[3],16);
		return `rgba(${r},${g},${b},${a})`;
	}

	function resize(){
		const iw = window.innerWidth, ih = window.innerHeight;
		W = Math.floor(iw * DPR); H = Math.floor(ih * DPR);
		cnv.width = W; cnv.height = H;
		cnv.style.width = iw+'px'; cnv.style.height = ih+'px';
		bubbles.forEach(b => { b.boundX = iw; b.boundY = ih; });
	}

	function make(){
		bubbles.length = 0;
		for(let i=0;i<CFG.count;i++){
			const size = rand(CFG.minSize, CFG.maxSize);
			const speed = CFG.baseSpeed * (size/CFG.maxSize) * rand(0.6,1.4);
			bubbles.push({
				x: rand(0, window.innerWidth),
				y: rand(0, window.innerHeight),
				r: size/2,
				vx: rand(-1,1)*speed,
				vy: rand(-1,1)*speed,
				freq: rand(0.25,0.8),
				ampX: rand(10,40),
				ampY: rand(10,40),
				hue: palette[Math.floor(rand(0,palette.length))],
				phase: rand(0, Math.PI*2),
				boundX: window.innerWidth,
				boundY: window.innerHeight,
			});
		}
	}
	function draw(b){
		const x = b.x * DPR, y = b.y * DPR, r = b.r * DPR;
		const lx = LIGHT_NORM.x, ly = LIGHT_NORM.y;
		// Alpha efectiva acotada para evitar oscurecer, pero permitiendo más presencia de color
		const ALPHA = clamp(CFG.alpha, 0.12, 0.5);

		// Cuerpo con sombreado desplazado hacia la luz
		const cx = x - r * 0.35 * lx;
		const cy = y - r * 0.35 * ly;
		const gBody = ctx.createRadialGradient(cx, cy, r*0.08, x, y, r);
		gBody.addColorStop(0, hexToRgba(b.hue.inner, clamp(ALPHA*1.3,0,1)));
		gBody.addColorStop(0.5, hexToRgba(b.hue.mid, clamp(ALPHA*1.0,0,1)));
		gBody.addColorStop(1, hexToRgba(b.hue.mid, 0));

		// Usar 'lighter' para asegurar luminosidad sobre fondos claros
		ctx.globalCompositeOperation = 'lighter';
		ctx.shadowBlur = 0;
		ctx.beginPath();
		ctx.fillStyle = gBody;
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();

		// Tinte azul adicional para mayor saturación
		ctx.globalCompositeOperation = 'screen';
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0,151,246,0.22)';
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();

		// Brillo especular
		const hx = x - r * 0.55 * lx;
		const hy = y - r * 0.55 * ly;
		const gSpec = ctx.createRadialGradient(hx, hy, 0, hx, hy, r*0.4);
		gSpec.addColorStop(0, 'rgba(255,255,255,0.28)');
		gSpec.addColorStop(0.4, 'rgba(255,255,255,0.14)');
		gSpec.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.globalCompositeOperation = 'screen';
		ctx.beginPath();
		ctx.fillStyle = gSpec;
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();

		// Sombra suave en el lado opuesto a la luz
		const sx = x + r * 0.45 * lx;
		const sy = y + r * 0.45 * ly;
		const gShade = ctx.createRadialGradient(sx, sy, r*0.1, x, y, r*1.05);
		gShade.addColorStop(0, 'rgba(0,0,0,0)');
		gShade.addColorStop(1, 'rgba(0,0,0,0.12)');
		ctx.globalCompositeOperation = 'multiply';
		ctx.beginPath();
		ctx.fillStyle = gShade;
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();

		// Halo suave exterior para sensación volumétrica
		ctx.globalCompositeOperation = 'lighter';
		ctx.shadowColor = b.hue.inner;
		ctx.shadowBlur = CFG.shadow;
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0,0,0,0)';
		ctx.arc(x, y, r, 0, Math.PI*2);
		ctx.fill();
		ctx.shadowBlur = 0;
		ctx.globalCompositeOperation = 'source-over';
	}

	function loop(){
		t += 0.016;
		ctx.clearRect(0,0,W,H);
		// Ordenar por tamaño (simula profundidad: chicos atrás, grandes adelante)
		const ordered = bubbles.slice().sort((a,b)=>a.r - b.r);
		for(const b of ordered){
			b.x += b.vx + Math.sin(t*b.freq + b.phase)*(CFG.drift*0.6);
			b.y += b.vy + Math.cos(t*b.freq + b.phase)*(CFG.drift*0.6);

			// wrap para que recorran todo el fondo
			if (b.x < -b.r) b.x = b.boundX + b.r;
			if (b.x > b.boundX + b.r) b.x = -b.r;
			if (b.y < -b.r) b.y = b.boundY + b.r;
			if (b.y > b.boundY + b.r) b.y = -b.r;

			draw(b);
		}
		rafId = requestAnimationFrame(loop);
	}

	window.addEventListener('resize', resize, {passive:true});
	resize(); make(); loop();
	window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();

