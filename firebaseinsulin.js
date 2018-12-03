//GET ALL GLUCOSES
var db = firebase.firestore();
slides = document.getElementById('slides');
datum = document.getElementById('datum');
units = document.getElementById('units');

insulinsArr = [];
insulinsArrDate = [];
insulinsArrValue = [];

var params;
        

if (location.search) {
    var parts = location.search.substring(1).split('?');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        params = nv[1];
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
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
                        
                        <div class="modal-instance block col-sm-3 text-right text-center-xs">
                            <a class="btn modal-trigger type--uppercase" onclick="showModal2(${s})">
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
var getIndex;
function showModal2(s){
    $(".modal-container").addClass('modal-active');
    getIndex = s;
   
    
};
function remove(s){
    db.collection("insulin").doc(`insulin${insulinsArr[s].createdat}`).delete().then(function() {
        console.log("Document successfully deleted! insulin"+insulinsArr[s].createdat);
        alert(`The user${insulinsArr[s]} has been deleted`);
        location.reload();
    
    
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    
function writeNewPost() {
        var ref = db.collection("insulin").doc(`insulin${insulinsArrValue[getIndex].createdat}`)
    
        // Set the "capital" field of the city 'DC'
        return ref.update({
            updatedat: Date.now(),
            userId: params,
            val: units.value
        })
        .then(function() {
            console.log("Document successfully updated!");
            location.reload();
    
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        
          
        }