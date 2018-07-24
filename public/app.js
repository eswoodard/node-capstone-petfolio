
function renderAppInfo() {
  $('.app-body').html(`
  <div class="app-info">
    <p class="app-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Dictum non consectetur a erat nam. Dictum at tempor commodo ullamcorper a lacus vestibulum sed.</p>
  </div>
  <div class="account-btns">
    <button class="sign-in-btn button" type="submit">Sign In</button>
    <p>Don't have an account?  Create one now:</p>
    <button class="new-account-btn">Create New Account</button>
  </div>
  ` );
}

function renderSignInForm() {
  return `
   <div class="sign-in">
    <h2>Sign In</h2>
    <form class="sign-in-form">
      <label for="username">Username</label>
      <input type="text" placeholder="name@domain.com" name="username" id="userName" required></br>
      <label for="password">Password</label>
      <input type="password" placeholder="Enter Password" name="password" required></br>
      <button class ="login-btn" type="submit">Login</button>
    </form>
  </div>`;
}

function displaySignInForm() {
  $('.sign-in-btn').on('click', (event) => {
    event.preventDefault();
    $('.app-body').html(renderSignInForm);
    submitLogInInfo();
  });

}

function renderCreateAccountForm() {
  return `
  <div class="create-account">
    <h2>Create Account</h2>
    <form class="create-account-form">
      <label for="firstName">First Name</label>
      <input type="text" placeholder="Jane" name="firstName"></br>
      <label for="lastName">Last Name</label>
      <input type="text" placeholder="Doe"  name="lastName"></br>
      <label for="username">Username</label>
      <input type="text" placeholder="name@domain.com" name="username"></br>
      <label for="password">Password</label>
      <input type="password" placeholder="Enter Password" name="password"></br>
      <label for="confirm-password">Confirm Password</label>
      <input type="password" placeholder="Re-enter Password" name="confirm-password"></br>
      <button class="create-account-btn" type="submit">Create Account</button>
   </form>
 </div>`;
}

function displayCreateAccountForm() {
  $('.new-account-btn').on('click', (event) => {
    event.preventDefault();
    $('.app-body').html(renderCreateAccountForm);
    submitNewAccountInfo();
  });
}

function renderWelcomePage() {
  console.log('renderWelcomePage ran');
  const user = STORE.userData[0];
  return `
    <div class="welcome-page">
      <h3>Welcome ${user.firstName}!</h3>
      <p>This is your overview page.  Your pets will appear here.</p>
      <div class="container">
        <div class="placeholder-album"></div>
        <div class="placeholder-album"></div>
        <div class="placeholder-album"></div>
      <div>
      <button class="add-profile-btn" type="submit">Add Profile</button>
    </div>
 `;
}

function submitNewAccountInfo() {
  $('.create-account-btn').on('click', (event) => {
    // will sent post request to API, create new user account, return confirmation
    event.preventDefault();
    $('.app-body').html(renderWelcomePage);
  });
}

function submitLogInInfo() {
  $('.sign-in-form').submit(event => {
    // will send post request to API to validate user credentials, return confirmation or error
    event.preventDefault();
    const userTarget = $(event.currentTarget).find('#userName');
    const user = userTarget.val();
    getUserByUsername(user);
  });
}

function getUserByUsername(user) {
  for(let i=0; i < STORE.userData.length; i++) {

    if(user === STORE.userData[i].userName){
      console.log(user);
      console.log(STORE.userData[i].userName);
      console.log('they match!');
      let pets =STORE.userData[i].pets;
      console.log(pets);
      renderPetList(pets);

    }

  }
}

function renderPetList(pet) {
  console.log('renderPetList ran');
  console.log(pet);
  const listHtml=pet.map(pet => {
    return `
    <div class="pets-list">
      <img class="avatar" src="${pet.avatar}"/>
      <div class="text-overlay">${pet.name}</div>
    </div>`
  }).join('');
  console.log(listHtml);
  const petList = document.querySelector('.app-body');
  petList.innerHTML = listHtml;
}

function handleAppLoad() {
  renderAppInfo();
  displaySignInForm();
  displayCreateAccountForm();
}

$(handleAppLoad);
