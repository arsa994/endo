//get all glucoses for user param
//GET ALL GLUCOSES
var db = firebase.firestore();
slides = document.getElementById('slides');
datum = document.getElementById('datum');
units = document.getElementById('units');



glucosesArr = [];
glucosesArrDate = [];
glucosesArrValue = [];

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
db.collection("glucoses").where("userId", "==", params)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            glucosesArrDate.push((doc.data()).createdat);
            glucosesArrValue.push((doc.data()).val);
            glucosesArr.push((doc.data()));
        });
        for (let s = 0; s < glucosesArrDate.length; s++) {

            var d = glucosesArrDate[s];
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
                                Units: ${glucosesArrValue[s]}
                            </p>
                        </div>
                        
                        <div class="modal-instance block col-sm-3 text-right text-center-xs">
                            <a class="btn modal-trigger type--uppercase" onclick="showModal2()">
                                <span class="btn__text">
                                    Edit value
                                </span>
                            </a>       
                            <div class="modal-container">
                            <div class="modal-content">
                                <section class="imageblock feature-large bg--site border--round ">
                                    <div class="imageblock__content col-md-5 col-sm-4 pos-left">
                                        <div class="background-image-holder">
                                            <img alt="image" src="img/product-small-4.jpg" />
                                        </div>
                                    </div>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-5 col-md-push-6 col-sm-6 col-sm-push-4">
                                                <h2>Add new Glucose</h2>

                                                <p>
                                                    Tivoli's most popular line of consumer digital radios just got a refresh &mdash; expect clearer highs and deeper lows. Massive
                                                    style upgrade with high-calibre aluminum frame and plush
                                                    knobs and dials.
                                                </p>
                                                <form class="form--clearfix">
                                                    <div class="col-sm-12">
                                                            <input id="datum" type="text" name="date" class="datepicker"  required="required" placeholder="Choose a date"/>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4">
                                                        <input type="number" id="units" name="quantity" required="required" placeholder="Units" />
                                                    </div>
                                                    <div class="col-sm-6 col-md-8">
                                                        <button id="addGlucose" type="button" class="btn btn--primary" onclick="writeNewPost(${s})">Add Units</button>
                                                    </div>
                                                </form>
                                                <div>
                                                    <p>
                                                        For more information
                                                        <a href="#">View Detailed Description &rarr;</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <!--end of row-->
                                    </div>
                                    <!--end of container-->
                                </section>
                            </div>
                        </div>                    
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
    

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


function showModal2 (){
    $(".modal-container").addClass('modal-active');
};


function remove(s){
    db.collection("glucoses").doc(`glucose${glucosesArr[s].createdat}`).delete().then(function() {
        console.log("Document successfully deleted! glucose"+glucosesArr[s].createdat);
        alert(`The user${glucosesArr[s]} has been deleted`);
        location.reload();
    
    
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }


function writeNewPost(uid) {

        var postData = {
            val: units,
            date: Date.now(),
            
        };
    
        var newPostKey = firebase.database().ref().child('posts').push().key;
    
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    
        return firebase.database().ref().update(updates);
    }
