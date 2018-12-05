//get all glucoses for user param
//GET ALL GLUCOSES
var db = firebase.firestore();
slides = document.getElementById('slides');
units = document.getElementById('units');
picker2 = document.getElementById('datum');



glucosesArr = [];

var params;
var docid=[];

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
            docid.push(doc.id);
            glucosesArr.push(doc.data());
        });
        for (let s = 0; s < glucosesArr.length; s++) {
            // console.log(glucosesArr[s].createdat.getTime()+"=====");

            var d = glucosesArr[s].createdat;
            var date = new Date(+d); 
            // console.log(glucosesArr[0]);
            // console.log(date.toDateString());

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
                                Units: ${glucosesArr[s].val}
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
            </div>  
        
            
            </section>
            `;
            
            
            
            slides.insertAdjacentHTML("beforebegin", markup);
    }
    

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

var getIndex;
function showModal2(s){
    $(".modal-container").addClass('modal-active');
    getIndex = docid[s];
    console.log(docid[s]+" = = = ="+params);

    
};


function remove(s){
    result = confirm(`Are u sure that u want to delete ${docid[s]}`);
    if (result) {
     db.collection("glucoses").doc(docid[s]).delete().then(function() {
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
        }
    }


function writeNewPost() {
    console.log(getIndex);
    var ref = db.collection("glucoses").doc(getIndex);
    var dat = new Date(picker2.value);

    // Set the "capital" field of the city 'DC'
    return ref.update({
        createdat: dat,
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
