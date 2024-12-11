(function () {
	const canvas = document.getElementById('dotMatrix');
	if (!canvas) return; // Exit if no canvas element exists
  
	const ctx = canvas.getContext('2d');
  
	let dots = [];
	let dotCount, lineThreshold, dotRadius;
  
	// Resize canvas and update variables
	function resizeCanvas() {
	  const dpr = window.devicePixelRatio || 1;
	  canvas.width = window.innerWidth * dpr;
	  canvas.height = document.documentElement.scrollHeight * dpr;
	  ctx.scale(dpr, dpr);
  
	  updateDynamicVariables(); // Update variables when canvas resizes
	}
  
	// Dynamically calculate dot settings based on window size
	function updateDynamicVariables() {
	  dotCount = Math.max(20, Math.min(50, Math.floor(window.innerWidth / 40))); // Dot count
	  lineThreshold = Math.max(50, Math.min(100, Math.floor(window.innerWidth / 15))); // Line threshold
	  dotRadius = Math.max(2, Math.min(4, window.innerWidth / 400)); // Dot size
  
	  initializeDots(); // Reinitialize dots with updated parameters
	}
  
	// Initialize the dots
	function initializeDots() {
	  dots = []; // Clear existing dots
	  for (let i = 0; i < dotCount; i++) {
		dots.push({
		  x: Math.random() * (canvas.width / (window.devicePixelRatio || 1) - dotRadius * 2) + dotRadius,
		  y: Math.random() * (canvas.height / (window.devicePixelRatio || 1) - dotRadius * 2) + dotRadius,
		  radius: dotRadius,
		  dx: (Math.random() - 0.5) * 2,
		  dy: (Math.random() - 0.5) * 2,
		});
	  }
	}
  
	// Draw the dots and lines
	function drawDots() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
	  // Draw connecting lines
	  for (let i = 0; i < dots.length; i++) {
		for (let j = i + 1; j < dots.length; j++) {
		  const dx = dots[i].x - dots[j].x;
		  const dy = dots[i].y - dots[j].y;
		  const distance = Math.sqrt(dx * dx + dy * dy);
		  if (distance < lineThreshold) {
			ctx.beginPath();
			ctx.moveTo(dots[i].x, dots[i].y);
			ctx.lineTo(dots[j].x, dots[j].y);
			ctx.strokeStyle = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000';
			ctx.lineWidth = 1;
			ctx.stroke();
		  }
		}
	  }
  
	  // Draw dots
	  for (const dot of dots) {
		ctx.beginPath();
		ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
		ctx.fillStyle = '#007bff';
		ctx.fill();
	  }
  
	  // Update dot positions and ensure they stay within canvas boundaries
	  for (const dot of dots) {
		dot.x += dot.dx;
		dot.y += dot.dy;
  
		if (dot.x - dot.radius < 0) {
		  dot.x = dot.radius;
		  dot.dx *= -1;
		}
		if (dot.x + dot.radius > canvas.width / (window.devicePixelRatio || 1)) {
		  dot.x = canvas.width / (window.devicePixelRatio || 1) - dot.radius;
		  dot.dx *= -1;
		}
  
		if (dot.y - dot.radius < 0) {
		  dot.y = dot.radius;
		  dot.dy *= -1;
		}
		if (dot.y + dot.radius > canvas.height / (window.devicePixelRatio || 1)) {
		  dot.y = canvas.height / (window.devicePixelRatio || 1) - dot.radius;
		  dot.dy *= -1;
		}
	  }
  
	  requestAnimationFrame(drawDots);
	}
  
	// Event listeners for resizing and initialization
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas(); // Initial call to set up canvas
	drawDots(); // Start animation loop
  })();
  