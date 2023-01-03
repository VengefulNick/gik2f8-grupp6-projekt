// EventListeners

addUserForm.addEventListener("submit", onSumbit);

const cardContainer = document.getElementById('cardContainer');
const api = new Api("http://localhost:5000/users");

// InputValidation

// SubmitFunc
function onSumbit(e) {
    e.preventDefault();
    saveUser();
}

// SaveFunc
function saveUser(){
    console.log('saveUser')
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
    // Clear fields after submit
    addUserForm.username.value = '';
    addUserForm.email.value = '';
    addUserForm.joinDate.value = '';
    addUserForm.theme.value = '';
    addUserForm.avatar.value = '';
}

// RenderFunc
function renderUsers(){
    console.log('renderUsers')
    api.getUsers().then((users) => {
        cardContainer.innerHTML = ' ';

        if (users && users.length > 0) {
            users.forEach((user) => {
                cardContainer.insertAdjacentHTML('beforeend', renderUser(user));
            });
        }
    });
}

function renderUser({id, username, email, joinDate, theme, avatar}) {
    console.log('renderUser!')
    let html = `
    <div
    id="${id}" class="bg-blue-500 rounded-xl col-span-1 row-span-1 min-w-full flex-auto flex-col justify-center items-center">
    <div id="cardTop" class="min-w-full rounded-t-xl min-h-[200px] bg-center bg-[url('../server/public/images/bg/bars/${theme}.png')] flex justify-center items-center">
      <img class="max-w-[100px]" src="../server/public/images/avatars/${avatar}.svg" alt=""/>
    </div>
    <div id="cardBot" class="min-w-full min-h-[200px] flex flex-col justify-evenly items-center">
      <h2 class="text-4xl text-white">${username}</h2>
      <a href="mailto:${email}" class="flex justify-center items-center text-2xl animate-bounce hover:animate-none hover:scale-125">
        <span class="text-5xl">📧</span>${email}</a>
      <p class="text-white">${joinDate}</p>
      <div class="flex justify mt-3">
        <button onclick="editUser(${id})" class="rounded-md bg-gradient-to-r from-cyan-500 to-emerald-600 text-white px-10 py-3 mx-4 hover:scale-125">
          Edit
        </button>
        <button onclick="deleteUser(${id})" class="rounded-md bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 mx-4 hover:scale-125">
          Delete
        </button>
      </div>
    </div>
  </div>`;

  return html;
}

// DeleteFunc

function deleteUser(id){
    api.removeUser(id).then((result) =>{
        renderUsers();
    });
}

// EditFunc

function editUser(id){
    api.updateUser(id).then((result) =>{
        renderUsers();
    });
}


renderUsers()