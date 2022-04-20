
       
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
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         getUserData(user.uid)
        //     }
        // })
        
        

        function removeData(){
            // var a = document.getElementById("btn-remlist").value;
            var userID = firebase.auth().currentUser.uid;
            var rootRef = firebase.database().ref().child('Mov-list');
            
            var userRef = rootRef.child(userID);
            userRef.remove()
            window.location.reload();
            // var userID = firebase.auth().currentUser.uid;
            
            // var dbref='Mov-list/'+userID+'/'+a
            // var userRef=firebase.database().ref(dbref);
            
            
            // userRef.update()
            // console.log(dbref);

        }
        


        