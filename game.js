//variables and constants 
const gameBody = document.getElementById("game-body"); const $lives = document.getElementById("lives"); var seconds = document.getElementById("timer").textContent; var zombieId = 0; const img = [ "zombie-1.png", "zombie-2.png", "zombie-4.png", "zombie-5.png", "zombie-6.png", ]; 
// shotgun sound
 const expAudio = new Audio( "https://freespecialeffects.co.uk/soundfx/weapons/shotgun_3.wav" ); expAudio.volume = 0.2; gameBody.onclick = () => { expAudio.pause(); expAudio.currentTime = 0; expAudio.play(); }; // background sound
  const backgroundSound = new Audio( "https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/soundtrack.mp3" ); backgroundSound.play(); backgroundSound.loop = true; 
  //lives
   const maxlives = 4; var lives = 4; 
   //Function to make a zombie
    function makeZombie() { randomImage = img[getRandomInt(0, img.length)]; gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`; let zombie = document.getElementById("zombie" + zombieId); zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`; zombie.style.animationDuration = `${getRandomInt(2, 6)}s`; zombie.onclick = () => { zombieDestruct(zombie); }; } 
    // Function to check if the player missed a zombie
     function checkCollision(zombie) { if (zombie.getBoundingClientRect().top <= 0) { lives--; return true; } return false; } 
     // Function to destroy a zombie when it is shot or missed
      function zombieDestruct(zombie) { zombie.style.display = "none"; zombieId++; makeZombie(); }
       //start game by calling the first zombie
        makeZombie(zombieId);
         //helper function to get random integer 
         function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min;}
           //The maximum is exclusive and the minimum is inclusive } // Timer
            var timer = setInterval(function () { seconds--; document.getElementById("timer").textContent = seconds; let zombie = document.getElementById("zombie" + zombieId); if (checkCollision(zombie) == true) { zombieDestruct(zombie); if (lives == 0) { clearInterval(timer); location.href = "./game-over.html"; } } if (seconds == 0) { clearInterval(timer); location.href = "./win.html"; } }, 1000);