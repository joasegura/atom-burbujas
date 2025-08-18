(() => {
	const bgCanvas = document.getElementById('bubbles-canvas');
	const uiCanvas = document.getElementById('ui-canvas');
	const ui = uiCanvas.getContext('2d');
	const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
	const titleEl = document.querySelector('.typewriter');
	const btnEl = document.querySelector('.cta');
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	if (!bgCanvas || !uiCanvas || !ui || !titleEl || !btnEl) return;

	const BASE = { r:0, g:153, b:204 };
	const DARK = { r:0, g:44, b:66 };
	const WHITE = { r:255, g:255, b:255 };

	function hexToRgb(hex){
		const m = /#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex.trim());
		if(!m) return {r:0,g:0,b:0};
		return { r:parseInt(m[1],16), g:parseInt(m[2],16), b:parseInt(m[3],16) };
	}
	function srgbToLinear(c){ c/=255; return c<=0.04045? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
	function luminance(r,g,b){
		const R=srgbToLinear(r), G=srgbToLinear(g), B=srgbToLinear(b);
		return 0.2126*R + 0.7152*G + 0.0722*B;
	}
	function lerp(a,b,t){ return a + (b-a)*t; }
	function clamp(n,a,b){ return Math.max(a, Math.min(b,n)); }
	function smoothstep(edge0, edge1, x){
		const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
		return t * t * (3 - 2 * t);
	}

	const bgHex = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
	const bgRGB = hexToRgb(bgHex);
	const bgY = luminance(bgRGB.r, bgRGB.g, bgRGB.b);

	function resize(){
		const iw = window.innerWidth, ih = window.innerHeight;
		uiCanvas.width = iw;
		uiCanvas.height = ih;
		uiCanvas.style.width = iw+'px';
		uiCanvas.style.height = ih+'px';
		ui.setTransform(1,0,0,1,0,0);
	}

	const textMask = document.createElement('canvas');
	const textMaskCtx = textMask.getContext('2d');
	const bgSample = document.createElement('canvas');
	const bgSampleCtx = bgSample.getContext('2d');

	function renderElement(el, baseColor, opts={}){
		const rect = el.getBoundingClientRect();
		const style = getComputedStyle(el);
		const text = (el.textContent || '').trim();
		if (!text || rect.width<=0 || rect.height<=0) return;

		textMask.width = Math.ceil(rect.width);
		textMask.height = Math.ceil(rect.height);
		bgSample.width = textMask.width;
		bgSample.height = textMask.height;
		textMaskCtx.clearRect(0,0,textMask.width,textMask.height);
		bgSampleCtx.clearRect(0,0,bgSample.width,bgSample.height);

		textMaskCtx.fillStyle = '#ffffff';
		const fontPx = parseFloat(style.fontSize);
		const font = `${style.fontWeight} ${fontPx}px ${style.fontFamily}`;
		textMaskCtx.font = font;
		const metrics = textMaskCtx.measureText(text);
		const textW = metrics.width;
		const ascent = metrics.actualBoundingBoxAscent || fontPx * 0.8;
		const descent = metrics.actualBoundingBoxDescent || fontPx * 0.2;
		const textH = ascent + descent;
		let drawX = 0.5, drawY = 0.5 + Math.max(0, (textMask.height - textH) / 2);
		if (opts.center === true){
			drawX = Math.max(0.5, (textMask.width - textW) / 2);
		}
		textMaskCtx.textBaseline = 'alphabetic';
		textMaskCtx.fillText(text, drawX, drawY + ascent);

		const sX = Math.floor(rect.left * DPR);
		const sY = Math.floor(rect.top * DPR);
		const sW = Math.floor(rect.width * DPR);
		const sH = Math.floor(rect.height * DPR);
		try{
			bgSampleCtx.drawImage(bgCanvas, sX, sY, sW, sH, 0, 0, rect.width, rect.height);
		}catch(e){}

		const maskData = textMaskCtx.getImageData(0,0,textMask.width,textMask.height);
		const bgData = bgSampleCtx.getImageData(0,0,bgSample.width,bgSample.height);
		const outData = ui.createImageData(maskData.width, maskData.height);

		for(let i=0;i<maskData.data.length;i+=4){
			const a = maskData.data[i+3];
			if(a===0){ continue; }
			const rB = bgData.data[i], gB = bgData.data[i+1], bB = bgData.data[i+2];
			const aB = bgData.data[i+3] / 255;
			const rC = Math.round(rB * aB + bgRGB.r * (1 - aB));
			const gC = Math.round(gB * aB + bgRGB.g * (1 - aB));
			const bC = Math.round(bB * aB + bgRGB.b * (1 - aB));
			const y = luminance(rC,gC,bC);
			const delta = Math.abs(y - bgY);
			const t = smoothstep(0.06, 0.3, delta);
			const target = (y < 0.5) ? WHITE : DARK;
			const r = Math.round(lerp(baseColor.r, target.r, t));
			const g = Math.round(lerp(baseColor.g, target.g, t));
			const b = Math.round(lerp(baseColor.b, target.b, t));
			outData.data[i] = r;
			outData.data[i+1] = g;
			outData.data[i+2] = b;
			outData.data[i+3] = a;
		}

		ui.putImageData(outData, Math.floor(rect.left)+0.5, Math.floor(rect.top)+0.5);

		if (opts.drawBorder === true){
			const radius = Math.min(9999, rect.height/2);
			ui.beginPath();
			const x = Math.floor(rect.left)+0.5, y = Math.floor(rect.top)+0.5;
			const w = Math.floor(rect.width), h = Math.floor(rect.height);
			const r = Math.floor(radius);
			ui.moveTo(x+r, y);
			ui.arcTo(x+w, y, x+w, y+h, r);
			ui.arcTo(x+w, y+h, x, y+h, r);
			ui.arcTo(x, y+h, x, y, r);
			ui.arcTo(x, y, x+w, y, r);
			ui.closePath();

			const sampleW = w, sampleH = h;
			const tmp = document.createElement('canvas');
			tmp.width = sampleW; tmp.height = sampleH;
			const tctx = tmp.getContext('2d');
			try{ tctx.drawImage(bgCanvas, Math.floor(rect.left*DPR), Math.floor(rect.top*DPR), Math.floor(rect.width*DPR), Math.floor(rect.height*DPR), 0, 0, sampleW, sampleH); }catch(e){}
			const img = tctx.getImageData(0,0,sampleW,sampleH).data;
			let sumY = 0, count = 0;
			for(let yy=0; yy<sampleH; yy+=Math.max(1, Math.floor(sampleH/8))){
				for(let xx=0; xx<sampleW; xx+=Math.max(1, Math.floor(sampleW/8))){
					const idx = (yy*sampleW + xx) * 4;
					const aB = img[idx+3]/255;
					const rB = img[idx], gB = img[idx+1], bB = img[idx+2];
					const rC = Math.round(rB * aB + bgRGB.r * (1 - aB));
					const gC = Math.round(gB * aB + bgRGB.g * (1 - aB));
					const bC = Math.round(bB * aB + bgRGB.b * (1 - aB));
					sumY += luminance(rC,gC,bC); count++;
				}
			}
			const avgY = (count>0? sumY/count : bgY);
			const target = (avgY < 0.5) ? WHITE : DARK;
			const t = 0.6;
			const rS = Math.round(lerp(baseColor.r, target.r, t));
			const gS = Math.round(lerp(baseColor.g, target.g, t));
			const bS = Math.round(lerp(baseColor.b, target.b, t));
			ui.strokeStyle = `rgb(${rS},${gS},${bS})`;
			ui.lineWidth = 1;
			ui.stroke();
		}
	}

	function colorizeLink(el){
		const rect = el.getBoundingClientRect();
		if (rect.width<=0 || rect.height<=0) return;
		const sX = Math.floor(rect.left * DPR);
		const sY = Math.floor(rect.top * DPR);
		const sW = Math.max(1, Math.floor(rect.width * DPR));
		const sH = Math.max(1, Math.floor(rect.height * DPR));
		const sample = document.createElement('canvas');
		sample.width = sW; sample.height = sH;
		const sctx = sample.getContext('2d');
		try{ sctx.drawImage(bgCanvas, sX, sY, sW, sH, 0, 0, sW, sH); }catch(e){ return; }
		const data = sctx.getImageData(0,0,sW,sH).data;
		let sumR=0,sumG=0,sumB=0,sumA=0,count=0;
		for(let i=0;i<data.length;i+=4){
			const a = data[i+3]/255;
			sumA += a; sumR += data[i]*a; sumG += data[i+1]*a; sumB += data[i+2]*a; count++;
		}
		const rB = count? Math.round(sumR/Math.max(1,sumA)) : bgRGB.r;
		const gB = count? Math.round(sumG/Math.max(1,sumA)) : bgRGB.g;
		const bB = count? Math.round(sumB/Math.max(1,sumA)) : bgRGB.b;
		const y = luminance(rB,gB,bB);
		const target = (y < 0.5) ? WHITE : DARK;
		// Mezclar color de marca (BASE) con alto contraste para conservar identidad
		const mix = 0.6; // 0 = solo brand, 1 = solo contraste
		const r = Math.round(lerp(BASE.r, target.r, mix));
		const g = Math.round(lerp(BASE.g, target.g, mix));
		const b = Math.round(lerp(BASE.b, target.b, mix));
		el.style.color = `rgb(${r},${g},${b})`;
	}

	let rafId;
	function loop(){
		ui.clearRect(0,0,uiCanvas.width, uiCanvas.height);
		renderElement(titleEl, BASE, { center:false });
		renderElement(btnEl, BASE, { center:true, drawBorder:true });
		for(const a of navLinks){ colorizeLink(a); }
		rafId = requestAnimationFrame(loop);
	}

	window.addEventListener('resize', resize, { passive:true });
	resize();
	loop();
	window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();
