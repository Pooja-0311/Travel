/* LOGIN CHECK */
if(!localStorage.getItem("email")){
window.location.href="login.html";
}

/* SHOW USERNAME */
const user = localStorage.getItem("name");
if(user){
const userBox = document.getElementById("userName");
if(userBox){
userBox.innerHTML = "👤 " + user;
}
}

/* LOGOUT */
function logout(){
localStorage.removeItem("name");
localStorage.removeItem("email");
localStorage.removeItem("pass");
window.location.href="login.html";
}

/* SEARCH */
const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");

if(searchInput){
searchInput.addEventListener("keyup", () => {
const value = searchInput.value.toLowerCase();

cards.forEach(card => {
const name = card.getAttribute("data-name");
card.style.display = name.includes(value) ? "" : "none";
});
});
}

/* LIKE */
const likes = document.querySelectorAll(".like");

likes.forEach((btn, index) => {

const saved = localStorage.getItem("like"+index);
if(saved==="true"){btn.innerHTML="❤️";}

btn.addEventListener("click", (e) => {
e.stopPropagation();

if(btn.innerHTML==="🤍"){
btn.innerHTML="❤️";
localStorage.setItem("like"+index,"true");
}else{
btn.innerHTML="🤍";
localStorage.setItem("like"+index,"false");
}
});

});

/* OPEN PAGE */
function openPage(place){
window.location.href="details.html?place="+place;
}

/* ===== DETAILS PAGE ONLY ===== */
const params = new URLSearchParams(window.location.search);
const place = params.get("place");

/* ⭐ STAR RATING SYSTEM */
const stars = document.querySelectorAll(".rating span");

if(stars.length > 0){

stars.forEach(star=>{
star.addEventListener("click", ()=>{

let value = star.getAttribute("data-value");

/* SAVE MULTIPLE RATINGS */
let ratings = JSON.parse(localStorage.getItem(place+"_ratings")) || [];
ratings.push(Number(value));
localStorage.setItem(place+"_ratings", JSON.stringify(ratings));

highlightStars(value);
showAverage();

});
});

/* HIGHLIGHT STARS */
function highlightStars(value){
stars.forEach(star=>{
if(star.getAttribute("data-value") <= value){
star.classList.add("active");
}else{
star.classList.remove("active");
}
});
}

/* LOAD LAST RATING */
const savedRatings = JSON.parse(localStorage.getItem(place+"_ratings")) || [];
if(savedRatings.length > 0){
let last = savedRatings[savedRatings.length-1];
highlightStars(last);
}

/* SHOW AVERAGE */
function showAverage(){
let ratings = JSON.parse(localStorage.getItem(place+"_ratings")) || [];

if(ratings.length === 0) return;

let sum = ratings.reduce((a,b)=>a+b,0);
let avg = (sum / ratings.length).toFixed(1);

const result = document.getElementById("ratingResult");
if(result){
result.innerText = "Average Rating: " + avg + " ⭐ ("+ratings.length+" votes)";
}
}

showAverage();
}

/* 💬 COMMENTS WITH USERNAME */
function addComment(){
let text = document.getElementById("commentBox")?.value;
let user = localStorage.getItem("name");

if(!text || text==="") return;

let comments = JSON.parse(localStorage.getItem(place+"_comments")) || [];

comments.push({name:user, msg:text});

localStorage.setItem(place+"_comments", JSON.stringify(comments));

document.getElementById("commentBox").value="";
showComments();
}

/* SHOW COMMENTS */
function showComments(){
let comments = JSON.parse(localStorage.getItem(place+"_comments")) || [];

let html="";
comments.forEach(c=>{
html += `<p><b>👤 ${c.name}</b><br>💬 ${c.msg}</p>`;
});

const list = document.getElementById("commentsList");
if(list){
list.innerHTML = html;
}
}

showComments();