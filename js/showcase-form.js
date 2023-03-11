const scriptURL =
  "https://script.google.com/macros/s/AKfycbwDkdB0tmuKcPKg3QB8620OM6ZdLQkTC4dnIjOjCViIawWk7IRG8ppddFWktYvGwZSz/exec";
const form = document.getElementById("form");
const inputs = [
  document.getElementById("project_name"),
  document.getElementById("project_type"),
  document.getElementById("project_repo"),
  document.getElementById("dev_name"),
  document.getElementById("dev_teams"),
  document.getElementById("dev_division"),
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  fetch(scriptURL, { method: "POST", body: formData })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "success") alert("Success");
      else alert("Error");
    })
    .catch((err) => {
      console.error("Error!", err.message);
      alert("Error");
    });
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const key = input.name;
    const value = input.value;

    localStorage.setItem(key, value);
  });
});

// Load input value for the first time
inputs.forEach((input) => {
  input.value = localStorage.getItem(input.name) || "";
});
