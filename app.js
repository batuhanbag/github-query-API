const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearch);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    alert("Lütfen geçerli bir kullanıcı adı girin");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          //Kullanıcı bulunamadı
          ui.showError("Kullanıcı Bulunamadı");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch((err) => ui.showError(err));
  }
  ui.clearIpunt();

  e.preventDefault();
}
function clearAllSearch() {
  ////Tüm arananları temizleme
  if (confirm("Emin misiniz")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}

function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage();

  let result = "";
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}
