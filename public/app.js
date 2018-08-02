

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
  `);
}
function renderSignInForm() {
  return `
   <div class="sign-in">
    <h2>Sign In</h2>
    <form class="sign-in-form">
      <label for="username">Username</label>
      <input type="text" placeholder="name@domain.com" name="username" id="userName" required></br>
      <label for="password">Password</label>
      <input type="password" placeholder="Enter Password" name="password" id="password" required></br>
      <button class = "sign-in-btn" type="submit">Login</button>
    </form>
  </div>`;
}

function requestSignInForm() {
  $('.sign-in-btn').on('click', (event) => {
    event.preventDefault();
    $('.app-body').html(renderSignInForm);
    submitLogInInfo();
  });
}

function requestCreateAccountForm() {
  $('.new-account-btn').on('click', (event) => {
    event.preventDefault();
    $('.app-body').html(renderCreateAccountForm);
  });
}

function submitLogInInfo() {
  $('.sign-in-form').submit((event) => {
    event.preventDefault();
    // will send post request to API to validate user credentials, return confirmation or error
    // event.preventDefault();
    const userTarget = $(event.currentTarget).find('#userName');
    const passwordTarget = $(event.currentTarget).find('#password');
    const password = passwordTarget.val();
    const user = userTarget.val();
    getUserByUsername(user, password);
  });
}

function renderCreateAccountForm() {
  const createAcountForm = `
  <div class="create-account">
    <h2>Create Account</h2>
    <form class="create-account-form">
      <label  for="firstName">First Name</label>
      <input type="text" id="firstName" placeholder="Jane" name="firstName"></br>
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" placeholder="Doe"  name="lastName"></br>
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="name@domain.com" name="username"></br>
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter password" name="password"></br>
      <button class="new-account-btn" type="submit">Create Account</button>
   </form>
 </div>`;
  $('.app-body').html(createAcountForm);
  submitNewAccountInfo();
}

function submitNewAccountInfo() {
  $('.create-account-form').submit((event) => {
    // will sent post request to API, create new user account, return confirmation
    event.preventDefault();
    const body = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      username: $('#username').val(),
      password: $('#password').val(),
    };
    console.log(body);
    const settings = {
      async: true,
      crossDomain: true,
      url: 'http://localhost:8080/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      processData: false,
      data: JSON.stringify(body),
    };
    $.ajax(settings).done((response) => {
      console.log(response);
      renderWelcomePage(response);
    });
  });
}


// $.ajax({
//   contentType: 'application/jason; charset+utf-8',
//   data: JSON.stringify(body),
//   headers: {
//     accept: 'application/json; odata=verbose',
//   },
//   type: 'POST',
//   url: 'http://localhost:8080/auth/signup',
//   success: (data) => {
//     console.log(data);
//     console.log(`Thank you ${body.firstName} ${body.lastName}!  Your account has been created.`);
//     res();
//   },
//       error: (error) => {
//         console.log(error);
//         rej();
//       },
//     });
//   });
//   return promise;
// });
// $('.app-body').html(renderWelcomePage);
// requestCreateProfileForm();

function renderWelcomePage(response) {
  console.log('renderWelcomePage ran');
  console.log(response);
  const welcomePage = `
    <div class="welcome-page">
      <h3>Welcome ${response.firstName}!</h3>
      <p>To add a pet, click on the Add Pet button below.</p>
      <div></br>
      <button class="add-profile-btn" type="submit">Add Pet</button>
    </div>
 `;
  $('.app-body').html(welcomePage);
}


function getUserByUsername(user, password) {
  const body = {
    username: user,
    password,
  };
  const promise = new Promise((res, rej) => {
    $.ajax({
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(body),
      headers: {
        accept: 'application/json; odata=verbose',
      },
      type: 'POST',
      url: 'http://localhost:8080/auth/login',
      success: (data) => {
        console.log(data);
        $('#userName').val('');
        $('#password').val('');
        localStorage.setItem('jwToken', data.profile.token);
        console.log('Welcome! You are now logged in.');
        res();
        // renderMainPage(data);
      },
      error: (error) => {
        console.log(error);
        rej();
      },
    });
  });

  return promise;
}

function renderMainPage(data) {
  console.log(data);
  const mainPage = `
    <div class="main-page">
      <p>Hello ${data.firstName}! Click on one of your pets below to see your pet's information and add a photo album.</p>
    </div>
    `;
  $('.app-body').html(mainPage);
}

function renderPetList(pet) {
  // console.log('renderPetList ran');
  // console.log(pet);
  const petList = pet.map(pets => `
    <button class="pets-list" value="${pets.name}">
      <img class="avatar" src="${pets.avatar}"/>
      <div class="text-overlay">${pets.name}</div>
    </button>`);
  $('.app-body').append(petList);
  listenForProfileButtonClick();
}

function listenForProfileButtonClick() {
  // const selectedPet = petList[i].name;
  $('.pets-list').click(function () {
    // event.preventDefault();
    const petName = $(this).attr('value');
    // console.log(petName);
    getPetByPetname(petName);
  });
}

function getPetByPetname(petName) {
  console.log('getPetByPetName ran');
  for (let i = 0; i < STORE.userData.length; i++) {
    for (let n = 0; n < STORE.userData[i].pets.length; n++) {
      const name = STORE.userData[i].pets[n].name;
      if (petName === name) {
        const petData = STORE.userData[i].pets[n];
        console.log(petData);
        // console.log(petName);
        // console.log(name);
        // console.log(pets);
        console.log('pet names match!');
        renderPetProfile(petData);
        displayPhotoAlbum(petData);
        // renderPetAlbums(petData);
      }
    }
  }
}

function renderPetProfile(profileInfo) {
  // console.log(profileInfo.media[0]);
  const profile = `
  <div class="pet-profile">
    <h2>${profileInfo.name}</h2>
    <img src="${profileInfo.avatar}" class="avatar">
    <ul>
      <li>Gender: ${profileInfo.gender}</li>
      <li>Type: ${profileInfo.type}</li>
      <li>Color: ${profileInfo.color}</li>
      <li>Birthday: ${profileInfo.birthday}</li>
      <li>Age: ${profileInfo.age}</li>
      <li>Date Adopted: ${profileInfo.adopted_date}</li>
    </ul>
    <div class="photo-album-list">
      <input class="pet-album" type=image src="${profileInfo.media[0]}"
    </div
</div>
  `;
  $('.app-body').html(profile);
}

function displayPhotoAlbum(profileInfo) {
  $('.pet-album').on('click', (event) => {
    event.preventDefault();
    const item = profileInfo.media;
    console.log(item);
    const photos = item.map(items => `
    <div class="photo-album">
      <img class="album-photo" src="${items}">
    </div>`);
    console.log(photos);
    $('.app-body').html(photos);
  });
}

function renderCreateProfileForm() {
  return `
    <div class="create-profile">
    <h2>Create New Pet Profile</h2>
      <form action="#" class="create-profile-form">
        <label for="petName">Pet Name:</label>
        <input type="text" placeholder="Spot" name="petName"></br>
        <label for="gender">Gender:</label>
        <input type="text" placeholder="Male" name="gender"></br>
        <label for="type">Type:</label>
        <input type="text" placeholder="dog" name="type"></br>
        <label for="color">Color:</label>
        <input type="text" placeholder="brown" name="color"></br>
        <label for="birthday">Birthday:</label>
        <input type="text" placeholder="Aug 25" name="birthday"></br>
        <label for="age">Age</label>:</label>
        <input type="text" placeholder="12" name="age"></br>
        <label for="adopted-date">Date Adopted:</label>
        <input type="text" placeholder="Aug 25" name="adopted-date"></br>
        <label for="vet">Vet:</label>
        <input type="text" placeholder="Dr. Jones" name="vet"></br>
        <label for="allergies">Allergies:</label>
        <input type="text" placeholder="Chicken" name="birthday"></br>
        <label for="medical-condition">Medical Condition:</label>
        <input type="text" placeholder="Diabetes" name="medical-condition"></br>
        <label for="medications">Medications:</label>
        <input type="text" placeholder="Insulin" name="medications"></br>
        <label for="additional-info">Additional Information:</label>
        <input type="text" placeholder="More info" name="additional-info"></br>
        <label for="add-avatar">Upload Avatar:</label>
        <input type="file" placeholder="Add Avatar" name="add-avatar"></br>
        <button class="submit-profile-btn">Submit</button>
      </form>
    </div>
  `;
}

function requestCreateProfileForm() {
  $('.add-profile-btn').on('click', (event) => {
    event.preventDefault();
    $('.app-body').html(renderCreateProfileForm);
    submitCreateProfileForm();
  });
}

// function submitCreateProfileForm() {
//   $('.submit-profile-btn').on('click', (event) => {
//     // will sent post request to API, create pet profile, return confirmation
//     event.preventDefault();
//     renderMainPage();
//     renderPetList();
//   });
// }

function handleAppLoad() {
  renderAppInfo();
  requestSignInForm();
  requestCreateAccountForm();
}

$(handleAppLoad);
