//solar system
const solar =document.querySelector("#solar-system");
const divPlanets = document.querySelectorAll('.planet-div');
const planets = document.querySelectorAll('.planet');
const sun = document.querySelector('.star');
const sunWidth=sun.style.width; //###px
const sunWidthNum=sunWidth.slice(0,sunWidth.length-2); //###
console.log(sunWidthNum);
//card
const card=document.querySelector("#div-card");
const generalInfo=document.querySelectorAll(".card-general-span");
const cardPlanetImg=document.querySelector("#card-planet");


divPlanets.forEach((divPlanet) => {
  //
  //Set Distance
  //depending on 'data-order' value: div of planet changes size,
  //that way, planet is further away from center the larger the div
  let order=divPlanet.getAttribute('data-order');
  let distance=35+(order*32); //45px initial, plus order*45px for each planet
  divPlanet.style.width = `${distance}px`; 
  divPlanet.style.height = `${distance}px`; //div becomes square
  divPlanet.style.marginRight = `${sunWidthNum/2}px`;
  divPlanet.style.animationPlayState ="running";
  //
  //Set Speed
  divPlanet.style.animationDuration = `${190/order}s`;
  //
  //Initialize transform:rotate
  //divPlanet.style.transform =`rotate(${(360/8)*(order-1)}deg);`
  divPlanet.style.zIndex= `${10-order}`;

  
});



planets.forEach((planet) => {
  //Make Planet Stop Moving when MOUSEOVER
  planet.addEventListener('mouseover', () => {
    event.stopPropagation();
    //Get Div of Planet
    let parentDiv = planet.parentElement;
    //Make Div Lose Animation: no more spinning
    parentDiv.style.animationPlayState = "paused";
  });
  //Planet Continues Moving when MOUSEOUT
  planet.addEventListener('mouseout', () => {
    let parentDiv =planet.parentElement;
    parentDiv.style.animationPlayState ="running";
  });
  //CLICK
  planet.addEventListener('click', planetClicked);
});

let clickTimes = 0;

function planetClicked(event){
  //Shrink Solar System
  console.log("shrink");
  solar.classList.add('min-solar');
  clickTimes=1;
  //Update Card
  let planetOrder =event.target.getAttribute("data-order");
  console.log("Clicked on:", planetInfo[planetOrder]["title"]);
  updateCard(planetOrder);
}

window.addEventListener("click", event => {
  //Works only if planet has been clicked and then window (clickTimes==2)
  if (solar.classList.contains('min-solar') && clickTimes==2){
    solar.classList.remove('min-solar');
    solar.classList.add('max-solar');
    card.style.visibility="hidden";
    console.log("clicked window");
    clickTimes=0;
    setTimeout(function(){ solar.classList.remove('max-solar'); console.log("removed")}, 1000);
    console.log("waited 1 sec");
  }
  //Next click will maximize solar system make clickTimes==2
  if (clickTimes==1){
    clickTimes=2;
  }
  console.log("clickTimes",clickTimes);
});



function updateCard (order){
  card.style.visibility="visible";
  console.log("need to update to:", planetInfo[order]["title"]);
  //Change Info
  generalInfo.forEach((info) => {
    let type= info.getAttribute('data-general');
    let text= planetInfo[order][type];
    console.log("text:",text);
    info.textContent=text;
  });
  //Change Planet Img
  let newSrc=`./images/${planetInfo[order]["title"].toLowerCase()}.png`
  cardPlanetImg.setAttribute("src",newSrc);
}




//INFORMATION OBEJCT
const planetInfo ={
  "2":{
    title:"Mercury",
    from: "1st",
    distance: "57.91 million km",
    orbit: "88 days",
    radius: "2,439.7 km",
    day : "58d 15h 30m",
    gravity:"3.7 m/s²",
    info:"Mercury is the smallest and closest planet to the Sun in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets in the Solar System. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). ",
    moons: "0"

  },
  "3":{
    title:"Venus",
    from: "2nd",
    distance: "108.2 million km",
    orbit: "225 days",
    radius: "6,051.8 km",
    day : "116d 18h 0m",
    gravity:"8.87 m/s²",
    info:"Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasion, visible to the naked eye in broad daylight.[15][16] Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a little while before dawn",
    moons:"0"
  },
  "4":{
    title:"Earth",
    from: "3rd",
    distance: "149.6 million km",
    orbit: "365 days",
    radius: "6371 km ",
    day :"1d",
    gravity:"9.807 m/s²",
    info:"Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land consisting of continents and islands. The remaining 71% is covered with water, mostly by oceans, seas, gulfs, and other salt water bodies, but also by lakes, rivers, and other fresh water, which together constitute the hydrosphere.",
    moons:"1"
  },
  "5":{
    title:"Mars",
    from: "4th",
    distance: "244.7 million km",
    orbit: "687 days",
    radius: "3,389.5 km",
    day :"1d 0h 37m",
    gravity:"3.721 m/s²",
    info:"Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the \"Red Planet\".[16][17] The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.[18] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth. ",
    moons:"2"
  },
  "6":{
    title:"Jupiter",
    from: "5th",
    distance: "778.5 million km",
    orbit: "12 years",
    radius: "69,911 km",
    day :"0d 9h 56m",
    gravity:"24.79 m/s²",
    info:"Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two and a half times that of all the other planets in the Solar System combined. Jupiter is the third-brightest natural object in the Earth's night sky after the Moon and Venus. It has been observed since pre-historic times and is named after the Roman god Jupiter.[17] ",
    moons:"79"
  },
  "7":{
    title:"Saturn",
    from: "6th",
    distance: "1.434 billion km",
    orbit: "29 years",
    radius: "58,232 km",
    day :"0d 10h 42m",
    gravity:"10.44 m/s²",
    info:"Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine times that of Earth.[20][21] It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.[22][23][24] Saturn is named after the Roman god of wealth and agriculture; its astronomical symbol (♄) represents the god's sickle. The Romans named the seventh day of the week Saturday, Sāturni diēs (\"Saturn's Day\") no later than the 2nd century for the planet Saturn.[25] ",
    moons:"62"
  },
  "8":{
    title:"Uranus",
    from: "7th",
    distance: "2.871 billion km",
    orbit: "84 years",
    radius: "25,362 km",
    day :"0d 17h 14m",
    gravity:"8.87 m/s²",
    info:"Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, was the grandfather of Zeus (Jupiter) and father of Cronus (Saturn). It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. ",
    moons:"27"
  },
  "9":{
    title:"Neptune",
    from: "8th",
    distance: "4.495 billion km",
    orbit: "165 years",
    radius: "24,622 km",
    day :"0d 16h 6m",
    gravity:"11.15 m/s²",
    info:"Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere. The planet orbits the Sun once every 164.8 years at an average distance of 30.1 AU (4.5 billion km; 2.8 billion mi). It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident. ",
    moons:"14"
  },
}



/*

    let parentStyle = getComputedStyle(parentDiv);
    let parentAnimation = parentStyle.animationName;

*/