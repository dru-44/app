
       
 //var uid = firebase.auth().currentUser.uid;
        
        // var dbBloges= firebase.database().ref().child("Users");
        // dbBloges.on("value",function(blogs){
        //     if(blogs.exists()){
        //         var userHtml="";
        //         blogs.forEach(function(singleblog){
        //             counter=counter+1;
        //             userHtml+="<div class='row'>";
        //             userHtml+="<div class='col-sm-5'><p style='color:grey';>"
        //                 + "Name:"+blogs.val().username
        //                 +"</p></div>";
        //             userHtml+="</div>";    
        //         });
        //         $("#blogs").html(userHtml);
        //     }
        // });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                getUserData(user.uid)
            }
        })
        
        function getUserData() {
            var userID = firebase.auth().currentUser.uid;
            var l='Fav'
            firebase.database().ref("Mov-list/"+l).on("value", snap => {
                var movies = snap.val();
                var mainContainer = document.getElementById("app");
                for (let i in movies) {
                    
                    var div = document.createElement("div");
                    
                    div.innerHTML = `
                    <card>   
                    <a href="https://www.imdb.com/title/${movies[i].movieID}/?ref_=nv_sr_srsg_0" target="_blank">
                    <div class="card-wrap">
                        <div class="card ">
                        
                        <img class="card-bg " src="${movies[i].moviepos}" alt="Card image cap">
                        <div class="card-info">
                        
                            <h1 slot="header">${movies[i].movietitle}</h1>
                            
                            <p >.<br>
                            <!-- <button id="btn-remlist" class =btn cta-btn slot="content" name="subject" type="submit" value=${movies[i].movieID} onclick="removeData()">Remove</button> -->
                            View
                            </p>
                        </div>
                        </div>
                        </div> 
                        </a>
                    </card>        
                                        `;
                                        
                    mainContainer.appendChild(div);
                    console.log(movies[i]);
                }
                
                
                
                
            })
            

    
            
        }

        function removeData(){
            var l='Fav'
            // var a = document.getElementById("btn-remlist").value;
            var userID = firebase.auth().currentUser.uid;
            var rootRef = firebase.database().ref().child("Mov-list/");
            
            var userRef = rootRef.child(l);
            userRef.remove()
            window.location.reload();
            // var userID = firebase.auth().currentUser.uid;
            
            // var dbref='Mov-list/'+userID+'/'+a
            // var userRef=firebase.database().ref(dbref);
            
            
            // userRef.update()
            // console.log(dbref);

        }
        


        