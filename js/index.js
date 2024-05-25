let siteName = document.getElementById("Site Name");
let siteURL = document.getElementById("Site URL");
let msgInputs = document.getElementById("alertInputs");

let Bookmarkercontainer = [];

if (localStorage.getItem(" storageData  ") != null) {
  Bookmarkercontainer = JSON.parse(localStorage.getItem(" storageData  "));

  displayData();
}

function addUrl() {
  if (validationName() && validationURL()) {
    let Bookmarker = {
      name: siteName.value,
      url: siteURL.value,
    };
    Bookmarkercontainer.push(Bookmarker);

    clearInputs();

    displayData();

    localStorage.setItem(" storageData  ", JSON.stringify(Bookmarkercontainer));
  } else {
    msgInputs.classList.remove("d-none");
  }
}

function clearInputs() {
  name: siteName.value = null;
  url: siteURL.value = null;
  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");
}

function displayData() {
  let cartona = ``;

  for (let i = 0; i < Bookmarkercontainer.length; i++) {
    cartona += `

    <tr>
    <td> ${i + 1} </td>
    <td class="text-capitalize"> ${Bookmarkercontainer[i].name} </td>
    <td>
      <a target="_blank" href=" ${
        Bookmarkercontainer[i].url
      } "    class="btn btn-visit">
        <i class="fa-solid fa-eye pe-1"></i>
        Visit
      </a>
    </td>
    <td>
      <button class="btn btn-delete" onclick="deleteInputs( ${i} )" >
        <i class="fa-solid fa-trash-can pe-1"></i>
        Delete
      </button>
    </td>
    </tr>
    
    `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function deleteInputs(indexElement) {
  Bookmarkercontainer.splice(indexElement, 1);

  displayData();

  localStorage.setItem(" storageData  ", JSON.stringify(Bookmarkercontainer));
}

function validationName() {
  let text = siteName.value;

  let regex = /^[a-z]{3,10}$/;

  if (regex.test(text) == true) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validationURL() {
  let URL = siteURL.value;

  const urlPattern = new RegExp(
    "^(https?|ftp):\\/\\/" +
      "((([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,}))|" +
      "localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[([a-fA-F0-9:]+)\\])" +
      "(:\\d{1,5})?" +
      "(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$",
    "i"
  );

  if (urlPattern.test(URL) == true) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  }
}

function closeAlert() {
  msgInputs.classList.add("d-none");
}

window.addEventListener("click", (e) => {
  if (e.target.id == "alertInputs") {
    msgInputs.classList.add("d-none");
  }
});
