
// Naslovi stavi na site strani
// Dodadi sliki na aptekite i na apcinjata ( ako sakas da ne ti se zavisni od internet slikite na git kaci gi i od tamu desen klik -> copy image address )
// Error stranata napravi ja so slika so tazno smajli ili nesto takvo i kopce sto nosi do Home i pisuva ( Try Again )
//od "kontakt" i "za nas" koa idam na lista na apteki ne mi dava nisto

$(window).ready(function() {
  
let apteki;
let searchMedicine;

let container = document.querySelector('.hide');
let searchRes = document.querySelector('.search-res');
let dropContainer = document.querySelector('#drop-container');
let aptekiContainer = document.querySelector('#apteki');
let dropresults = document.querySelector('#drop-res');

fetch("https://raw.githubusercontent.com/SanjaNaskova/jsonData/master/data.json")
.then (res => res.json())
.then (data => {
     container.style.display = "block";
     searchRes.style.display = "none";
    
     apteki = data;
     
})


  $("#btn-m").click(function() {
    container.style.display="none";
    searchRes.style.display="block";
               
     searchMedicine = $("#medicine").val();
     
    showResult();
      
})


$("#test").on("click",function(){

    container.style.display="none";   
    searchRes.style.display="none";

            makeCards(apteki);
          
         $("#drop-container").html(`<div class="dropdown">
         <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           Населба
         </button>
         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a class="dropdown-item" id="dropCentar" href="#">Центар</a>
           <a class="dropdown-item" href="#">Ново Лисиче</a>
           <a class="dropdown-item" href="#">Аеродром</a>
           <a class="dropdown-item" href="#">Карпош 3</a>
         </div>
       </div>`);
        

})



$("#dropCentar").click(function(){

    dropresults.style.display = "block";
    dropContainer.style.display = "block"
    container.style.display="none";
    searchRes.style.display="none";
    aptekiContainer.style.display = "none";
    showFromCentar();
})

function showFromCentar(){
     console.log("Show from Centar ");
  const centar =  apteki.pharmacies.filter(p => p.location.naselba = "Центар");

  pharmaciesCount = 0;
  pharmaciesString = "";

 if(pharmaciesCount % 2 == 0 && pharmaciesCount != centar.length - 1){
    console.log(1);
    pharmaciesString += `
    <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-4">
    <div class="card">
    <img src="${pharm.location.slika}"   class="card-img-top" alt="">
    <h5 class="card-title">${pharm.name}</h5>
    <p id="card-text">
    ${pharm.location.address}<br>
    <h6> Населба: ${pharm.location.naselba} </h6><br>
    <h6> Во залиха: ${med.stock} парчиња</h6><br>
    <h6> Цена: ${med.price} денари</h6><br>
    </p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `  }
    else if(pharmaciesCount % 2 != 0){
        console.log(2);
        pharmaciesString += `
        
        <div class="col-md-4">
        <div class="card">
        <img src="${pharm.location.slika}"  class="card-img-top" alt="">
        <h5 class="card-title">${pharm.name}</h5>
        <p id="card-text">
        ${pharm.location.address}<br>
        <h6> Населба: ${pharm.location.naselba} </h6>
        <h6> Во залиха: ${med.stock} парчиња</h6><br>
        <h6> Цена: ${med.price} денари</h6><br>
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        </div>
    `    } 

    else if(pharmaciesCount == centar.length - 1){
        console.log(3);
        pharmaciesString += `
        <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
        <div class="card">
        <img src="${pharm.location.slika}"  class="card-img-top" alt="">
        <h5 class="card-title">${pharm.name}</h5>
        <p id="card-text">
        ${pharm.location.address}<br>
        <h6> Населба: ${pharm.location.naselba} </h6>
        <h6> Во залиха: ${med.stock} парчиња</h6><br>
        <h6> Цена: ${med.price} денари</h6><br>
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        </div>
    `    }

    pharmaciesCount++;

 
 $("#drop-res").html(centar);

}


function showResult(){

    pharmaciesCount = 0;
    pharmaciesString = "";

    let medExsists = false;
  
  apteki.pharmacies.forEach(pharm => {
      
      pharm.items.forEach(med => {
         
          if (med.name.toLowerCase() === searchMedicine.toLowerCase()) {
                medExsists =true;
              if (med.stock === 0) {
                 //just skip
              }
              else{
                  
                if(pharmaciesCount % 2 == 0 && pharmaciesCount != apteki.pharmacies.length - 1){
                     console.log(1);
                     pharmaciesString += `
                     
                     <div class="row">
                     <div class="col-md-3">
                     <div class="card">
                     <div class="pharm-img" style="background-image: url('${pharm.location.slika}');"></div>
                     <h5 class="card-title">${pharm.name}</h5>
                     <p id="card-text">
                     ${pharm.location.address}<br>
                     <h6> Населба: ${pharm.location.naselba} </h6><br>
                     <h6> Во залиха: ${med.stock} парчиња</h6><br>
                     <h6> Цена: ${med.price} денари</h6><br>
                     </p>
                     <a href="#" class="btn btn-primary">Go somewhere</a>
                     </div>
                     </div>
                     `  }
                     else if(pharmaciesCount % 2 != 0){
                        console.log(2);
                        pharmaciesString += `
                        
                        <div class="col-md-3">
                        <div class="card">
                        <div class="pharm-img" style="background-image: url('${pharm.location.slika}');"></div>
                        <h5 class="card-title">${pharm.name}</h5>
                        <p id="card-text">
                        ${pharm.location.address}<br>
                        <h6> Населба: ${pharm.location.naselba} </h6>
                        <h6> Во залиха: ${med.stock} парчиња</h6><br>
                        <h6> Цена: ${med.price} денари</h6><br>
                        </p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                        </div>
                    `    } 
                
                    else if(pharmaciesCount == data.pharmacies.length - 1){
                        console.log(3);
                        pharmaciesString += `
                        <div class="row">
                        <div class="col-md-3">
                        <div class="card">
                        <div class="pharm-img" style="background-image: url('${pharm.location.slika}');"></div>
                        <h5 class="card-title">${pharm.name}</h5>
                        <p id="card-text">
                        ${pharm.location.address}<br>
                        <h6> Населба: ${pharm.location.naselba} </h6>
                        <h6> Во залиха: ${med.stock} парчиња</h6><br>
                        <h6> Цена: ${med.price} денари</h6><br>
                        </p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                        </div>
                    `    }
               
                    pharmaciesCount++;
              }
          }                      
      });
             //ova da se smeniiiii!!!! pojavuva povekje pati
           if(!medExsists) {
           pharmaciesString += `
           <div class="row">
           <div class="col-md-2"></div>
           <div class="col-md-4">
           <div class="card">
           <h5 class="card-title"> Бараниот лек не постои </h5>
           <p id="card-text">
           </p>
           <a href="#" class="btn btn-primary">Go somewhere</a>
           </div>
           </div>
           </div>
       `  }  
  });
  $("#res").append(pharmaciesString);
  }



function makeCards(data){
    console.log("makecards")
let pharmaciesCount = 0;
let pharmaciesString = "";
data.pharmacies.forEach(pharm => {
    if(pharmaciesCount % 2 == 0 && pharmaciesCount != data.pharmacies.length - 1){
        console.log(1);
        pharmaciesString += `
        <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
        <div class="card">
        <img src="${pharm.location.slika}"   width="100px" height="100px" class="card-img-top" alt="">
        <h5 class="card-title">${pharm.name}</h5>
        <p id="card-text">
        ${pharm.location.address}<br>
       <h6> Населба: ${pharm.location.naselba} </h6>
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    `  } 

    else if(pharmaciesCount % 2 != 0){
        console.log(2);
        pharmaciesString += `
        <div class="col-md-4">
        <div class="card">
        <img src="${pharm.location.slika}"   width="100px" height="100px" class="card-img-top" alt="">
        <h5 class="card-title">${pharm.name}</h5>
        <p id="card-text">
        ${pharm.location.address}<br>
        <h6> Населба: ${pharm.location.naselba} </h6>
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        </div>
    `    } 

    else if(pharmaciesCount == data.pharmacies.length - 1){
        console.log(3);
        pharmaciesString += `
        <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
        <div class="card">
        <img src="${pharm.location.slika}" width="100px" height="100px" class="card-img-top" alt="">
        <h5 class="card-title">${pharm.name}</h5>
        <p id="card-text">
        ${pharm.location.address}<br>
        <h6> Населба: ${pharm.location.naselba} </h6>
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        </div>
    `    }
    pharmaciesCount++;

});
       //res
      $("#apteki").html(pharmaciesString);
     
}










































});
