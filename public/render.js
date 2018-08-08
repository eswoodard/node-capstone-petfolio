function renderLandingPage() {
  const landingPage = `
  <div class="app-info">
    <p class="app-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Dictum non consectetur a erat nam. Dictum at tempor commodo ullamcorper a lacus vestibulum sed.</p>
  </div>
  <div class="account-btns">
    <button class="sign-in-btn button" type="submit">Sign In</button>
    <p>Don't have an account?  Create one now:</p>
    <button class="new-account-btn">Create New Account</button>
  </div>
  `;
  $('.app-body').html(landingPage);
}

function renderLogInForm() {
  const signInForm = `
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
  $('.app-body').html(signInForm);
}

function renderCreateAccountForm() {
  const createAcountForm = `
  <div class="create-account">
    <h2>Create Account</h2>
    <form class="submit-account-form">
      <label  for="firstName">First Name</label>
      <input type="text" id="firstName" placeholder="Jane" name="firstName" required></br>
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" placeholder="Doe"  name="lastName"> required</br>
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="name@domain.com" name="username" required></br>
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter password" name="password" required></br>
      <button class="new-account-btn" type="submit">Create Account</button>
   </form>
 </div>`;
  $('.app-body').html(createAcountForm);
  submitNewAccountInfo();
}

function renderWelcomePage(response) {
  console.log('renderWelcomePage ran');
  console.log(response);
  const welcomePage = `
    <div class="welcome-page">
      <h3>Welcome ${response.user.firstName}!</h3>
      <p>To add a pet, click on the Add Pet button below.</p>
      <div></br>
      <button class="add-profile-btn" type="submit">Add Pet</button>
    </div>
 `;
  $('.app-body').html(welcomePage);
}

function renderMainPage(data) {
  console.log(data);
  const mainPage = `
    <div class="main-page">
      <p>Welcome back!! Click on one of your pets below to see your pet's information and add a photo album.</p>
      <button class="add-profile-btn" type="submit">Add Pet</button>
    </div>
    `;
  $('.app-body').html(mainPage);
}

function renderPetList(pets) {
  // console.log('renderPetList ran');
  console.log(pets);
  const petList = pets.map(pet => `
    <button class="pets-list" value="${pet.petName}">
    <img class="avatar" src="${pet.petAvatar}"/>
    <div class="text-overlay">${pet.petName}</div>
    </button>
    `);
  $('.app-body').append(petList);
  listenForProfileButtonClick();
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

function renderCreateProfileForm() {
  const createProfileForm = `
    <div class="create-profile">
    <h2>Create New Pet Profile</h2>
      <form action="#" class="create-profile-form">
        <label for="petName">Pet Name:</label>
        <input type="text" id="petName" placeholder="Spot" name="petName"></br>
        <label for="gender">Gender:</label>
        <input type="text" id="petGender" placeholder="Male" name="gender"></br>
        <label for="type">Species:</label>
        <input type="text" id="petSpecies" placeholder="dog" name="type"></br>
        <label for="color">Color:</label>
        <input type="text" id="petColor" placeholder="brown" name="color"></br>
        <label for="birthday">Birthday:</label>
        <input type="text" id="petBirthday" placeholder="Aug 25" name="birthday"></br>
        <label for="age">Age</label>:</label>
        <input type="text" id="petAge" placeholder="12" name="age"></br>
        <label for="adopted-date">Date Adopted:</label>
        <input type="text" id="adopted-date" placeholder="Aug 25" name="adopted-date"></br>
        <label for="vet">Vet:</label>
        <input type="text" id="petVet" placeholder="Dr. Jones" name="vet"></br>
        <label for="allergies">Allergies:</label>
        <input type="text" id="petAllergies" placeholder="Chicken" name="birthday"></br>
        <label for="medical-condition">Medical Condition:</label>
        <input type="text" id="petMedicalCondition"placeholder="Diabetes" name="medical-condition"></br>
        <label for="medications">Medications:</label>
        <input type="text" id="petMedications"placeholder="Insulin" name="medications"></br>
        <label for="additional-info">Additional Information:</label>
        <input type="text" id="additionalInformation" placeholder="More info" name="additional-info"></br>
        <label for="add-avatar">Upload Avatar:</label>
        <input type="file" id="petAvatar" placeholder="Add Avatar" name="add-avatar"></br>
        <button class="submit-profile-btn">Submit</button>
      </form>
    </div>
  `;
  $('.app-body').html(createProfileForm);
}
