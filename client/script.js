// EventListeners

addUserForm.addEventListener("submit", onSubmit);

// Variables
const cardContainer = document.getElementById('cardContainer');
const formContainer = document.getElementById('formContainer');
const api = new Api("http://localhost:5000/users");

// InputValidation

// SubmitFunc
function onSubmit(e) {
  const userId = document.getElementById('userId')
  console.log(userId.value)
  if (userId.value.length == 0) {
    console.log('new user')
    e.preventDefault();
    saveUser();
  }
  else {
    console.log('existing user')
    e.preventDefault();
    editUser(userId);
  }
}

// SaveFunc
function saveUser(){
    //console.log('saveUser')
    const user = {
        username: addUserForm.username.value,
        email: addUserForm.email.value,
        joinDate: addUserForm.joinDate.value,
        theme: addUserForm.theme.value,
        avatar: addUserForm.avatar.value
    };
    api.createUser(user)
    // console.log('createUser')
    .then((user) => {
        if (user) {
            renderUsers();
        }
    });
    clearForm();
}

// RenderFunc
function renderUsers(){
    api.getUsers().then((users) => {
        cardContainer.innerHTML = ' ';

        if (users && users.length > 0) {
            users.forEach((user) => {
                cardContainer.insertAdjacentHTML('beforeend', renderUser(user));
            });
        }
        cardContainer.insertAdjacentHTML('beforeend', renderAddBtn());
    });
}

function renderUser({id, username, email, joinDate, theme, avatar}) {
    let html = `
    <div
    id="${id}" class="bg-${theme}-200 rounded-xl col-span-1 row-span-1 min-w-full flex-auto flex-col justify-center items-center">
    <div class="flex justify-center items-center min-w-full rounded-t-xl min-h-[200px] bg-center bg-[url('../server/public/images/bg/bars/${theme}bg.png')]">
      <img class="max-w-[150px]" src="../server/public/images/avatars/${avatar}.svg" alt=""/>
    </div>
    <div class="flex flex-col justify-evenly items-center min-w-full rounded-b-xl min-h-[300px] bg-center bg-[url('../server/public/images/bg/waves/${theme}bg.png')]">
      <h2 class="text-4xl text-white my-3">${username}</h2>
      <a href="mailto:${email}" class="flex justify-center items-center text-2xl animate-bounce hover:animate-none hover:scale-125">
        <span class="text-5xl">📧</span>${email}</a>
      <p class="text-white">${joinDate}</p>
      <div class="flex justify mt-3">
        <button onclick="editForm(${id})" class="rounded-md bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-10 py-3 mx-4 hover:scale-125">
          Edit
        </button>
        <button onclick="deleteUser(${id})" class="rounded-md bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 mx-4 hover:scale-125">
          Delete
        </button>
      </div>
    </div>
  </div>
  `;
  return html;
}
// AddBtnRender Func
function renderAddBtn() {
  let html = `
  <div class="flex justify-center items-center min-h-[500px]">
    <button onclick="displayForm()" type="button" value="addUser" 
    class="flex justify-around items-center rounded-full min-w-[200px] min-h-[200px] bg-slate-200 text-slate-600 text-6xl before:content-['+'] hover:before:content-['Add']">
    </button>
  </div>
  `;
  return html;
}

// DisplayForm Func
function displayForm() {
  formContainer.classList.remove('hidden');
}
// HideForm Func
function hideForm() {
  formContainer.classList.add('hidden');
}
// ClearForm Func
function clearForm(){
  addUserForm.userId.value = '';
  addUserForm.username.value = '';
  addUserForm.email.value = '';
  addUserForm.joinDate.value = '';
  addUserForm.theme.value = '';
  addUserForm.avatar.value = '';
}

// DeleteFunc
function deleteUser(id){
    api.removeUser(id).then((result) => {
        renderUsers();
    });
}

// EditFunc
function editForm(id) {
  api.getUser(id).then((result) => {
    //console.log(result)
    displayForm()
    addUserForm.userId.value = id;
    addUserForm.username.value = result.username;
    addUserForm.email.value = result.email;
    addUserForm.joinDate.value = result.joinDate;
    addUserForm.theme.value = result.theme;
    addUserForm.avatar.value = result.avatar;
  });
}

function editUser(id){
  const user = {
    id : addUserForm.userId.value,
    username: addUserForm.username.value,
    email: addUserForm.email.value,
    joinDate: addUserForm.joinDate.value,
    theme: addUserForm.theme.value,
    avatar: addUserForm.avatar.value
  };
  clearForm();
  api.updateUser(id, user).then((result) => {
    renderUsers();
  });
}

renderUsers()