//GET ALL GLUCOSES
var db = firebase.firestore();
slides = document.getElementById('slides');

insulinsArr = [];
insulinsArrDate = [];
insulinsArrValue = [];

db.collection("insulin").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", (doc.data()).firstname);
        insulinsArrDate.push((doc.data()).createdat);
        insulinsArrValue.push((doc.data()).val);
        insulinsArr.push((doc.data()));



        // console.log(userName.length);

    });

    for (let s = 0; s < insulinsArrDate.length; s++) {
             var d = insulinsArrDate[s];
            var date = new Date(+d); 
            // console.log(glucosesArr[0]);
            console.log(date.toDateString());

            var markup=`
            <section>
            <div class="container">
                <div class="row">
                    <div class="cta cta--horizontal text-center-xs">
                        <div class="col-sm-3">
                            <h4>${date.toDateString()}</h4>
                        </div>
                        <div class="col-sm-3">
                            <p class="lead">
                                Units: ${insulinsArrValue[s]}
                            </p>
                        </div>
                        
                        <div class="col-sm-3 text-right text-center-xs">
                            <a class="btn type--uppercase" href="#">
                                <span class="btn__text">
                                    Edit value
                                </span>
                            </a>
                            
                        </div>
                        <div class="col-sm-3 text-right text-center-xs">
                            <a class="btn type--uppercase" onclick="remove(${s})">
                                <span class="btn__text">
                                    Delete value
                                </span>
                            </a>
                        
                    </div>
                </div>
                <!--end of row-->
            </div>  </section>`;
            
            
            
            slides.insertAdjacentHTML("afterbegin", markup);
    }
    
   


});
function remove(s){
    db.collection("insulin").doc(`insulin${insulinsArr[s].createdat}`).delete().then(function() {
        console.log("Document successfully deleted! insulin"+insulinsArr[s].createdat);
        alert(`The user${insulinsArr[s]} has been deleted`);
        location.reload();
    
    
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }