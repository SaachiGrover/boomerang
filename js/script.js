const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))
const audio = document.querySelector("audio")

const songArray = [
"audio/audio1.wav",
"audio/audio2.wav",
"audio/audio3.wav",
"audio/audio4.wav",
]

let isDragging = false, // Is mouse clicked/finger on device; only for browser hovers
  startPos = 0, // first click poistion
  currentTranslate = 0, // translateX value 
  prevTranslate = 0,
  animationID = 0, // id for canceling request frame  
  currentIndex = 0, // current slide
  isPlaying = true // Is slide audio playing

// Temp function for adding review clones to fill screen
appendNodes("Shefali Singh", null, null, null)
function appendNodes(name, stars, post_time, review) {
  let cards = Array.from(document.querySelectorAll('.card'))
  cards.forEach((card, index) => {
    for(let i=0; i<6; i++) {
      // console.log("clone")
      let clone = card.cloneNode(true)
      let user_name = clone.querySelector('.name')
      user_name.innerText = name
      card.parentNode.appendChild(clone);
    }
  })
}

slides.forEach((slide, index) => {
  // Prevent default image selection upon hover
  slide.addEventListener('dragstart', (e) => e.preventDefault())

  // Touch events for mobile devices
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse events for browser
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mouseleave', touchEnd)
  slide.addEventListener('mousemove', touchMove)
})

// Disable context menu
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

// Disable audio
// function loadAudio (){
//   audio.src = songArray[currentIndex]
// }

// function playAudio() {
//   loadAudio()
//   audio.play()
//   isPlaying = true
// }

// function pauseAudio() {
//   audio.pause()
//   isPlaying = false
// }

// Finger on device
function touchStart(index) {
  // console.log("touchstart" + index);
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true

    // https://css-tricks.com/using-requestanimationframe/
    // Better performance than set-interval 
    animationID = requestAnimationFrame(animation)
  }
}

// Non-functional; Needs revision 
// Does not reset paused/delayed animations 
// function revertAnimations() {
//   const allAnimations = document.getAnimations();
//   console.log(allAnimations)
//   allAnimations.forEach((ani) => {
//     // ani.pause();
//     console.log(ani.playState);
//     ani.reverse();
//     ani.play();
//   });
// }

// Finger Removed
function touchEnd() {
  // console.log("touchEnd");
  isDragging = false
  cancelAnimationFrame(animationID)

  // Snap in next slide after certain movement 
  const movedBy = currentTranslate - prevTranslate
  if (movedBy < -100 && currentIndex < slides.length - 1) {
    // if (isPlaying) pauseAudio()
      currentIndex += 1
    // playAudio()
    // revertAnimations()
  }
  if (movedBy > 100 && currentIndex > 0) {
    // if (isPlaying) pauseAudio()
      currentIndex -= 1
    // playAudio()
    // revertAnimations()
  }

  setPositionByIndex()
}

// Finger moved on device
function touchMove(event) {
  // console.log("touchMove");
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function getPositionX(event) {
  // Different fetch based on browser vs mobile
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition();
  if (currentIndex === 0) {
    animateTitle();
  }

  if (currentIndex === 2) {
    Array.from(document.querySelectorAll(".google-icons")).forEach(function(element) {
      element.style.animation = "appear 1s ease-in 2s forwards";
    });
  } else {
    Array.from(document.querySelectorAll(".google-icons")).forEach(function(element) {
      element.style.animation = "";
    });
  }

  if (currentIndex === 3) {
    updateCount();
    //confetti
    update();
    draw();
  }

  if (currentIndex === 4) {
    document.querySelector(".group1").style.animation = "fadeInOut1 2s linear, moveIcon1 2s";
    document.querySelector(".group2").style.animation = "fadeInOut2 6s linear, moveIcon2 6s";
    document.querySelector(".group3").style.animation = "fadeInOut3 10s linear, moveIcon3 10s";
    document.querySelector(".call-count").style.animation = "translate1 2s linear";
    document.querySelector(".call-text").style.animation = "translate1 2s linear";
    document.querySelector(".visit-count").style.animation = "translate2 6s linear";
    document.querySelector(".visit-text").style.animation = "translate2 6s linear";
    document.querySelector(".lead-count").style.animation = "translate3 10s linear";
    document.querySelector(".lead-text").style.animation = "translate3 10s linear";
  } else {
    document.querySelector(".group1").style.animation = "";
    document.querySelector(".group2").style.animation = "";
    document.querySelector(".group3").style.animation = "";
    document.querySelector(".call-count").style.animation = "";
    document.querySelector(".call-text").style.animation = "";
    document.querySelector(".visit-count").style.animation = "";
    document.querySelector(".visit-text").style.animation = "";
    document.querySelector(".lead-count").style.animation = "";
    document.querySelector(".lead-text").style.animation = "";
  }

  if (currentIndex == 10){
    document.getElementById("dashboard-video").play();
  }
  animateOrDisableDemographicsAge(currentIndex);
  animateOrDisableDemographicsGender(currentIndex);
  // animateOrDisableDemographicsLocation(currentIndex);
  animateStatusBar(currentIndex);
  animateOrDisableTextAppear(currentIndex);
  // Dissolve diabled
  animateOrDisableReviewDissolve(currentIndex);
}

function animateOrDisableTextAppear(currentIndex) {
  for (let i = 1; i < 11; i++) {
    if(i >= 2 && i <= 6) {
      continue;
    }
    
    id = "appear-animate-" + i;
    var elem =  document.getElementById(id);

    if (i === currentIndex) { 
      if (elem.className === "appear-animate") {
        if (currentIndex == 10) { elem.style.animation = "appear 1s ease-in 2.5s forwards"; }
        else { elem.style.animation = "appear 1s ease-in 4s forwards"; }
       
      } 
      else {
        elem.style.animation = "appear 0.8s ease-in forwards";
      }
    } 

    else {
      elem.style.animation = "";
    }
  }
}

function animateOrDisableReviewDissolve(currentIndex){
  var elem = document.getElementById("dissolve-reviews");
  elem.style.animation = "";
  if (currentIndex === 7) {
    elem.style.animation = "dissolve 2s ease-in 2s forwards";
  }
}

function animateStatusBar(currentIndex) {
  for(let i = 0; i < 11; i += 1) {
    var elem = document.getElementById('status-bar-' + i);
    elem.style.animation = ""; 
    if(currentIndex === i) {
      elem.style.animation = "bar_filling_move var(--slide_time) ease-in forwards";
    }
  }
}

function animateOrDisableDemographicsAge(currentIndex) {
  for (let i = 1; i <= 5; i += 1) {
    var elem = document.getElementById('demographics-age-bar-' + i);
    elem.style.animation = "";
    if(currentIndex === 5) {
      elem.style.animation = "age_bar_appears 1s ease-in var(--bar_appear_start_time) forwards, " + 
    "age_bar_retracts 1s ease-in var(--bar_retract_start_time) forwards";;
    }
  }
}

function animateOrDisableDemographicsGender(currentIndex) {
  for (let i = 1; i <= 10; i += 1) {
    var elem = document.getElementById('demographics-gender-person-' + i);
    elem.style.animation = "";
    if(currentIndex === 6) {
      elem.style.animation = "move_person 1s ease-in var(--move_person_start_time) forwards";
    }
  }
}

// function animateOrDisableDemographicsLocation(currentIndex) {
//   var loc = document.getElementById('demographics-location-img');
//   loc.style.animation = "";
//   if(currentIndex === 7) {
//     loc.style.animation = "location_image_appears 1s ease-in 500ms forwards, location_image_blurs 1s ease-in 2222ms forwards";
//   }

//   for (let i = 1; i <= 2; i += 1) {
//     var elem = document.getElementById('demographics-location-radius-' + i);
//     elem.style.animation = "";
//     if(currentIndex === 7) {
//       elem.style.animation = "location_radius_appears 1s ease-in var(--radius_appear_start_time) forwards";
//     }
//   }
// }

function animateTitle() {
  var textWrapper = document.querySelector('.ml2');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({loop: false})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 100,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}

document.addEventListener('DOMContentLoaded', function() {
  animateTitle();
  animateStatusBar(0);
});