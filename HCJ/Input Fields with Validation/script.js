document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  let valid = true;

  const errors = form.querySelectorAll(".error");
  errors.forEach((err) => (err.textContent = ""));

  const inputs = form.querySelectorAll(
    "input:not([type='checkbox']):not([type='radio'])"
  );
  inputs.forEach((input) => {
    input.classList.remove("error-border");
    if (!input.value.trim()) {
      const errorPara = input.nextElementSibling;
      errorPara.textContent = `${
        input.name.charAt(0).toUpperCase() + input.name.slice(1)
      } is required.`;
      input.classList.add("error-border");
      valid = false;
    }
  });

  const courseCheckboxes = form.querySelectorAll(
    "input[name='course']:checked"
  );
  const courseError = form
    .querySelector("input[name='course']")
    .closest(".form-group")
    .querySelector(".error");
  if (courseCheckboxes.length === 0) {
    courseError.textContent = "Please select at least one course.";
    valid = false;
  }

  const genderRadios = form.querySelectorAll("input[name='gender']:checked");
  const genderError = form
    .querySelector("input[name='gender']")
    .closest(".form-group")
    .querySelector(".error");
  if (genderRadios.length === 0) {
    genderError.textContent = "Please select your gender.";
    valid = false;
  }

  if (valid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});
