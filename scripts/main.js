// Gym page functions //

function schedulebutton() {

    event.preventDefault();


    $(".gym-info-tabs").html(
        `
        <li class="nav-item">
            <a class="information nav-link" href="#" >Information</a>
        </li>
        
        <li class="nav-item">
            <a class="location nav-link" href="#">Location</a>
        </li>

        <li class="nav-item">
            <a class="schedule nav-link active" href="#">Schedule</a>
        </li>    
        `
    )

    $(".gym-info").html(
        `
      
        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Monday </h5>      
            </div>
        
            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>
       
        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Tuesday </h5>      
            </div>
    
            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>
        

        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Wednesday </h5>      
            </div>

            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>

        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Thursday </h5>      
            </div>

            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>

        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Friday </h5>      
            </div>

            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>

        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Saturday </h5>      
            </div>

            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>

        <div class = "row">
            <div class ="col">
                <h5 class="weekdays"> Sunday </h5>      
            </div>

            <div class = "col">
                <p class = "gym-time"> 7:00am - 10:00pm </p>
            </div>    
        </div>   `
    )
}


function locationbutton() {

    event.preventDefault();

    $(".gym-info-tabs").html(
        `
        <li class="nav-item">
            <a class="information nav-link" href="#" >Information</a>
        </li>
        
        <li class="nav-item">
            <a class="location nav-link active" href="#">Location</a>
        </li>

        <li class="nav-item">
            <a class="schedule nav-link" href="#">Schedule</a>
        </li>    
        `
    )

    $(".gym-info").html(

        `
        
        <h5 class="d-flex"> Address:<p class = "px-2">XXX Street, VXX RXX</p> </h5>
        <div class="d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-dark">Map</button>
        </div>
    
     
        `
    )
}

function informationbutton(){

    event.preventDefault();

    $(".gym-info-tabs").html(
        `
        <li class="nav-item">
            <a class="information nav-link active" href="#" >Information</a>
        </li>
        
        <li class="nav-item">
            <a class="location nav-link" href="#">Location</a>
        </li>

        <li class="nav-item">
            <a class="schedule nav-link" href="#">Schedule</a>
        </li>    
        `
    )

    $(".gym-info").html(

        `
        <h5 class="drop-in">Drop in:</h5>
        <p class="drop-in-info">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
            accusamus aperiam odit necessitatibus fuga recusandae id eos, accusantium, officiis
            blanditiis facere ipsum veritatis beatae eum voluptatem explicabo consequatur? A, commodi.
        </p>

        <h5 class="price"> Price: </h5>
        <p class="price-info"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic dolorum
            corporis impedit quasi velit illo molestias laudantium beatae soluta porro in facilis fugit
            sapiente, quibusdam cupiditate reprehenderit asperiores. Fugit, cupiditate.
        </p>
    
        
        `
    )


}


function setup() {

    $(document).on('click', '.schedule', schedulebutton);
    $(document).on('click', '.location', locationbutton);
    $(document).on('click', '.information', informationbutton);
    




}


$(document).ready(setup)


// end of Gym page functions