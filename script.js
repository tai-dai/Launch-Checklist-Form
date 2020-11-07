window.addEventListener('load', function(){

   const form = document.querySelector('form');
   const pilotNameInput = document.querySelector('input[name = pilotName]');
   const copilotNameInput = document.querySelector('input[name = copilotName]');
   const fuelLevelInput = document.querySelector('input[name = fuelLevel]');
   const cargoMass = document.querySelector('input[name = cargoMass]');
   const faultyItemsDisplay = document.getElementById('faultyItems');
   const launchStatusDisplay = document.getElementById('launchStatus');
   const missionTarget = document.getElementById('missionTarget');

   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response){
         response.json().then(function(json){
            let planetId = Math.floor(Math.random() * 7);
            missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[planetId].name}</li>
                  <li>Diameter: ${json[planetId].diameter}</li>
                  <li>Star: ${json[planetId].star}</li>
                  <li>Distance from Earth: ${json[planetId].distance}</li>
                  <li>Number of Moons: ${json[planetId].moons}</li>
               </ol>
               <img src="${json[planetId].image}">
               </img>`;
         });
      });

   let launchStatusCheck = function(){
      document.getElementById('pilotStatus').innerHTML = `${pilotNameInput.value} ready.`;
      document.getElementById('copilotStatus').innerHTML = `${copilotNameInput.value} ready.`;

      if(fuelLevelInput.value < 10000){
         faultyItemsDisplay.style.visibility = 'visible';
         document.getElementById('fuelStatus').innerHTML = 'Fuel level not high enough for launch';
         launchStatusDisplay.innerHTML= 'Shuttle not ready for launch';
         launchStatusDisplay.style.color = 'red';
         
      } else if(cargoMass.value > 10000){
         faultyItemsDisplay.style.visibility = 'visible';
         document.getElementById('cargoStatus').innerHTML = 'Cargo mass not low enough for launch';
         launchStatusDisplay.innerHTML= 'Shuttle not ready for launch';
         launchStatusDisplay.style.color = 'red';
         
      } else {
         launchStatusDisplay.innerHTML= 'Shuttle is ready for launch';
         launchStatusDisplay.style.color = 'green';
         document.getElementById('fuelStatus').innerHTML = 'Fuel level high enough for launch';
         document.getElementById('cargoStatus').innerHTML = 'Cargo mass low enough for launch';
      }
   }

   form.addEventListener('submit', function(event){
      event.preventDefault();
      if (pilotNameInput.value.trim() === "" || copilotNameInput.value.trim() === ""|| fuelLevelInput.value.trim() === ""|| cargoMass.value.trim() === ""){
         alert('Looks like ya missed a field!');
      } 
      
      if (isNaN(fuelLevelInput.value) === true|| isNaN(cargoMass.value) === true){
         alert('Looks like you put letters where numbers go!');
      }

      launchStatusCheck();
   });
});