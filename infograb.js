var submitbtn = document.getElementsByClassName("submit-btn");

submitbtn.addEventListener("click", funciton(e){
	var email = document.getElementByName("email").value;
	var password = document.getElementByName("password").value;
	
	insertValues(email,password);
	
})