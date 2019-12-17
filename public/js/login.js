// forgot password alert
forgotPassword = () => {
  Swal.fire("Please contact your Administrator!")
};

// form Validation
const form = document.getElementById("loginForm");
form.checkValidity();

ValidityState = {
  badInput: false,
  valid: false,
  valueMissing: true
};

let f = function() {
  this.classList.add('touched')
};

document
  .querySelectorAll('input')
  .forEach((e) => {
  e.addEventListener('blur', f, false)
  e.addEventListener('keydown', f, false)
});

// checking form for disablity button
checkForm = () => {
  const isValidForm = form.checkValidity();
  if(isValidForm){
    document.getElementById("loginButton").disabled = false;
  } else {
    document.getElementById("loginButton").disabled = true;
  }
}

