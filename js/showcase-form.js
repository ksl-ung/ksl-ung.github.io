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
const buttons = {
  submit: document.getElementById("submit"),
  spinner: document.getElementById("spinner"),
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // hide submit button
  buttons.submit.classList.add("d-none");
  // show spinner button
  buttons.spinner.classList.remove("d-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "success") {
        success("Berhasil menyimpan data");
        reset();
      } else error("Gagal menambahkan data");
    })
    .catch((err) => {
      console.error("Error!", err.message);
      error("Gagal menambahkan data");
    })
    .finally(() => {
      buttons.submit.classList.remove("d-none");
      buttons.spinner.classList.add("d-none");
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

function success(msg) {
  Swal.fire({
    icon: "success",
    title: "Sukses",
    text: msg,
  });
}

function error(msg) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: msg,
  });
}

function reset() {
  form.reset();
  inputs.forEach((input) => {
    localStorage.setItem(input.name, "");
  });
}
