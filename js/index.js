var firebaseConfig = {
  apiKey: "AIzaSyCiCHgMiBB85TVTqHJjeGNJaN_SfaCpeds",
  authDomain: "breath-2.firebaseapp.com",
  databaseURL: "https://breath-2-default-rtdb.firebaseio.com",
  projectId: "breath-2",
  storageBucket: "breath-2.appspot.com",
  messagingSenderId: "1041438408059",
  appId: "1:1041438408059:web:a8706395610ee725fd51de",
  measurementId: "G-17X6PSD06Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function () {
  var email = $("#email").val();
  var password = $("#password").val();
  if (email != "" && password != "") {
    var result = firebase.auth().signInWithEmailAndPassword(email, password);
    result.catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      window.alert("Message :" + errorMessage);
    });
  } else {
    window.alert("Please fill out all fields");
  }
});

$("#btn-signup").click(function () {
  var email = $("#semail").val();
  var password = $("#spassword").val();
  var cpassword = $("#confirmpassword").val();

  if (email != "" && password != "" && cpassword != "") {
    if (password == cpassword) {
      var result = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      result.catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        window.alert("Message :" + errorMessage);
      });
    } else {
      window.alert("password does not match");
    }
  } else {
    window.alert("Please fill out all fields");
  }
});

$("#btn-resetpassword").click(function () {
  var auth = firebase.auth();
  var email = $("#email").val();
  if (email != "") {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        window.alert("Please check your email");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        window.alert("Message :" + errorMessage);
      });
  } else {
    window.alert("Please fill out all fields");
  }
});

$("#btn-logout").click(function () {
  firebase.auth().signOut();
});
var id = "";
$("#btn-update").click(function () {
  var firstname = $("#firstname").val();
  var lastname = $("#lastname").val();
  var username = $("#input-username").val();
  var email = $("#input-email").val();
  var address = $("#input-address").val();
  var city = $("#input-city").val();
  var country = $("#input-country").val();
  var pcode = $("#input-postal-code").val();
  var about = $("#input-about").val();

  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;

  var userRef = rootRef.child(userID);
  if (
    firstname != "" &&
    lastname != "" &&
    username != "" &&
    email != "" &&
    address != "" &&
    city != "" &&
    country != "" &&
    pcode != ""
  ) {
    var userData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      address: address,
      city: city,
      country: country,
      pcode: pcode,
      about: about,
    };
    userRef.set(userData, function (error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message :" + errorMessage);
      } else {
        window.location.href = "home.html";
      }
    });
  } else {
    window.alert("Please fill out all fields");
  }
});

$("#btn-apo").click(function () {
  var username = $("#input-username").val();
  var email = $("#input-email").val();
  var date = $("#date").val();
  var time = $("#time").val();
  var conf = "pending";

  var rootRef = firebase.database().ref().child("Appointments");
  var userID = firebase.auth().currentUser.uid;

  var userRef = rootRef.child(userID);
  if (username != "" && email != "") {
    var userData = {
      username: username,
      email: email,
      date: date,
      time: time,
      confirmation: conf,
    };
    userRef.set(userData, function (error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message :" + errorMessage);
      } else {
        window.location.href = "view-ap.html";
      }
    });
  } else {
    window.alert("Please fill out all fields");
  }
});

$("#book").click(function () {
  window.location.href = "ap.html";
});

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=1a0304e4`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
   console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=1a0304e4`
      );
      const movieDetails = await result.json();
      details = movieDetails;
      console.log(movieDetails);

      displayMovieDetails(movieDetails);
      $("#btn-addlist").click(function () {
        var movtit = details.Title;
        var movpos = details.Poster;
        var movrat = details.Rated;
        var movieid = details.imdbID;
        var userID = firebase.auth().currentUser.uid;
        var rootRef = firebase.database().ref().child("Mov-list/"+userID);
        

        var userRef = rootRef.child(movieid);
        if (movieid != "") {
          var userData = {
            "movieID":movieid,
            "movietitle": movtit,
            "moviepos": movpos,
            "movieratings": movrat,
          };
          userRef.set(userData, function (error) {
            if (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
              window.alert("Message :" + errorMessage);
            } else {
              window.alert("Added to list");
            }
          });
        } else {
          window.alert("error");
        }
      });
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
          details.Awards
        }</p>
        <input id="btn-addlist" type="button" class="btn btn-info btn-add-favorite" value="+" />
        </div>
        
    `;
}

// function addMovies(details) {
//   var movtit = details.Title;
//   var movpos = details.Poster;
//   var movrat = details.Rated;
  

//   var rootRef = firebase.database().ref().child("Mov-list");
//   var userID = firebase.auth().currentUser.uid;
  
//   var userRef = rootRef.child(userID);
//   if (movtit != "") {
//     var userData = {
//       "user": userID,
//       "movie-title": movtit,
//       "movie-pos": movpos,
//       "movie-ratings": movrat,
//     };
//     console.log(userData);
//     userRef.set(userData, function (error) {
//       if (error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         window.alert("Message :" + errorMessage);
//       } else {
//         window.alert("Added to list");
//       }
//     });
//   } else {
//     window.alert("error");
//   }
 
// }

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
