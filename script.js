// ===== MENU =====
function toggleMenu(){
  document.getElementById("dropdown").classList.toggle("show");
}

// ===== MOSTRAR CUENTA =====
function mostrarCuenta(){
  let c = document.getElementById("cuenta");
  c.style.display = c.style.display === "none" ? "block" : "none";
}

// ===== MODO CLARO / OSCURO =====
function toggleModo(){
  document.body.classList.toggle("claro");
}

// ===== REGISTRO =====
document.getElementById("registerForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  let nombre = document.getElementById("regName").value;
  let correo = document.getElementById("regEmail").value;
  let pass = document.getElementById("regPass").value;

  if(!nombre || !correo || !pass){
    mostrarMensaje("Completa todos los campos");
    return;
  }

  localStorage.setItem("usuario", JSON.stringify({nombre, correo, pass}));
  mostrarMensaje("Cuenta creada correctamente");
});

// ===== LOGIN =====
document.getElementById("loginForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  let correo = document.getElementById("loginEmail").value;
  let pass = document.getElementById("loginPass").value;

  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if(!usuario){
    mostrarMensaje("No hay cuenta registrada");
    return;
  }

  if(usuario.correo === correo && usuario.pass === pass){
    localStorage.setItem("sesion", "activa");
    location.reload();
  } else {
    mostrarMensaje("Datos incorrectos");
  }
});

// ===== MOSTRAR USUARIO =====
window.addEventListener("load", function(){
  let sesion = localStorage.getItem("sesion");
  let usuario = JSON.parse(localStorage.getItem("usuario"));

  if(sesion === "activa" && usuario){
    let saludo = document.getElementById("saludo");
    let logout = document.getElementById("logout");

    if(saludo){
      saludo.innerText = "Bienvenido, " + usuario.nombre;
    }

    if(logout){
      logout.style.display = "inline-block";
    }
  }
});

// ===== CERRAR SESIÓN =====
function cerrarSesion(){
  localStorage.removeItem("sesion");
  location.reload();
}

// ===== MENSAJES =====
function mostrarMensaje(texto){
  let m = document.getElementById("mensaje");
  if(m){
    m.innerText = texto;
  }
}

// ===== FONDO ANIMADO =====
const canvas = document.getElementById("fondo");
if(canvas){
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let estrellas = [];

  for(let i=0;i<100;i++){
    estrellas.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*2
    });
  }

  function animar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    estrellas.forEach(e=>{
      ctx.fillStyle = "#BEA7B9";
      ctx.fillRect(e.x, e.y, e.size, e.size);

      e.y += 0.2;
      if(e.y > canvas.height) e.y = 0;
    });

    requestAnimationFrame(animar);
  }

  animar();

  // RESPONSIVE
  window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== AUDIO =====
let musica = document.getElementById("musica");

function toggleAudio(){
  if(!musica) return;

  if(musica.paused){
    musica.play();
  } else {
    musica.pause();
  }
}