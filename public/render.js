function renderLandingPage() {
  const landingPage = `
  <div class="landing-page-text">
    <h2>You love your pets.</h2>
     <p class="app-info-text">Now you can upload, organize, and store photos and important information all in one place.</p>
      <div class="account-btns">
         <button class="new-account-btn">Get Started</button>
       </div>
   </div>
   `;
  $('.app-body').html(landingPage);
}

function renderLogInForm() {
  const signInForm = `
   <div class="sign-in form-container">

    <fieldset>
      <img alt="petfolio-logo" src="/images/color_logo_transparent.png" class="logo">
      <legend>Sign In Form</legend>
      <h2>Sign In</h2>
      <p class="login-error-msg" style="display: none">Uh-oh! Your Username or password are incorrect.  Please try again!</p>
      <form class="sign-in-form">
        <input type="text" placeholder="Enter Username" name="username" id="userName" aria-label="Username"required></br>
        <input type="password" placeholder="Enter Password" name="password" id="password" aria-label="password" required></br>
        <button type="submit">Login</button></br>
        <button class="cancel-btn">Cancel</button>
      </form>
    </fieldset>
  </div>`;
  $('.app-body').html(signInForm);
}

function renderCreateAccountForm() {
  const createAcountForm = `
  <div class="create-account form-container">
    <fieldset>
      <img alt="petfolio-logo" src="/images/color_logo_transparent.png" class="logo">
      <legend>Sign Up Form</legend>
      <h2>Create Account</h2>
      <form class="submit-account-form">
        <input type="text" id="firstName" placeholder="Enter First Name" name="firstName" aria-label="first-name"required></br>
        <input type="text" id="lastName" placeholder="Enter Last Name"  name="lastName" aria-label="last-name" required></br>
        <input type="text" id="username" placeholder="Enter Username" name="username" aria-label="username" required></br>
        <input type="password" id="password" placeholder="Enter Password" name="password" aria-label="password" required></br>
        <button class="new-account-btn" type="submit">Create Account</button></br>
        <button class="cancel-btn">Cancel</button>
        <p>Already registered? <a class="nav-link" href="/signin">Sign In</a></p>
    </form>
    </fieldset>
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

function renderMainPage() {
  // console.log(user);
  const mainPage = `
    <div class="main-page">
      <p>Welcome back!! Click on one of your pets below to see your pet's information and add a photo album.</p>
      <button class="add-profile-btn" type="submit">Add Pet</button>
    </div>
    `;
  $('.app-body').html(mainPage);
  $('petlist').addClass('hidden');
}

function renderPetList() {
  const petList = STORE.pets.map(pet => `
    <div class="pet" name="${pet.petName}">
      <img class="avatar" src="${pet.avatar.path.slice(7)}">
      <div class="text-overlay"><p>${pet.petName}</p></div>
    </div>
    `);

  $('.app-body').append(petList);
}

function renderPetProfile() {
  const pet = STORE.currentPet;
  const profile = `
  <div class="pet-profile">
    <h2>${pet.petName}</h2>
    <img src="${pet.avatar.path.slice(7)}" class="avatar">
    <ul>
      <li>Gender: ${pet.petGender}</li>
      <li>Species: ${pet.petSpecies}</li>
      <li>Color: ${pet.petColor}</li>
      <li>Birthday: ${pet.petBirthday}</li>
      <li>Age: ${pet.petAge}</li>
      <li>Date Adopted: ${pet.dateAdopted}</li>
      <li>Vet: ${pet.petVet}</li>
      <li>Allergies: ${pet.petAllergies}</li>
      <li>Medical Conditions: ${pet.petMedicalCondition}</li>
      <li>Medications: ${pet.petMedications}</li>
      <li>Additional Information: ${pet.additionalInformation}</li>
    </ul>
    <div class="photo-album-list">
      <button class="create-album-btn">Create Photo Album</button>
    </div>
    <div id="logged-in-links">

    </div>
  </div>
  `;
  $('.app-body').html(profile);
}

function renderCreateProfileForm() {
  const createProfileForm = `
    <div class="create-profile">
    <h2>Create New Pet Profile</h2>
      <form action="#" name="profile" class="create-profile-form">
        <label for="petName">Pet Name:</label>
        <input type="text" id="petName" placeholder="Spot" name="petName"></br>
        <label for="gender">Gender:</label>
        <input type="text" id="petGender" placeholder="Male" name="petGender"></br>
        <label for="type">Species:</label>
        <input type="text" id="petSpecies" placeholder="dog" name="petSpecies"></br>
        <label for="color">Color:</label>
        <input type="text" id="petColor" placeholder="brown" name="petColor"></br>
        <label for="birthday">Birthday:</label>
        <input type="date" id="petBirthday" placeholder="Aug 25" name="petBirthday"></br>
        <label for="age">Age</label>:</label>
        <input type="text" id="petAge" placeholder="12" name="petAge"></br>
        <label for="adopted-date">Date Adopted:</label>
        <input type="date" id="adopted-date" placeholder="Aug 25" name="dateAdopted"></br>
        <label for="vet">Vet:</label>
        <input type="text" id="petVet" placeholder="Dr. Jones" name="petVet"></br>
        <label for="allergies">Allergies:</label>
        <input type="text" id="petAllergies" placeholder="Chicken" name="petAllergies"></br>
        <label for="medical-condition">Medical Condition:</label>
        <input type="text" id="petMedicalCondition"placeholder="Diabetes" name="petMedicalCondition"></br>
        <label for="medications">Medications:</label>
        <input type="text" id="petMedications"placeholder="Insulin" name="petMedications"></br>
        <label for="additional-info">Additional Information:</label>
        <input type="text" id="additionalInformation" placeholder="More info" name="additionalInformation"></br>
        <label for="add-avatar">Upload Avatar:</label>
        <input type="file" id="petAvatar" placeholder="Add Avatar" name="avatar"></br>
        <button class="submit-profile-btn">Submit</button>
      </form>
    </div>
  `;
  $('.app-body').html(createProfileForm);
  $('.return-to-petlist').show();
}


function renderUpdateForm() {
  const updateProfileForm = `
    <div class="update-profile">
    <h2>Update Pet Profile</h2>
      <form action="#" name="profile" class="update-profile-form">
        <label for="petName">Pet Name:</label>
        <input type="text" id="petName" placeholder="Spot" name="petName" value="${STORE.currentPet.petName}"></br>
        <label for="gender">Gender:</label>
        <input type="text" id="petGender" placeholder="Male" name="petGender" value="${STORE.currentPet.petGender}"></br>
        <label for="type">Species:</label>
        <input type="text" id="petSpecies" placeholder="dog" name="petSpecies" value="${STORE.currentPet.petSpecies}"></br>
        <label for="color">Color:</label>
        <input type="text" id="petColor" placeholder="brown" name="petColor"value="${STORE.currentPet.petColor}"></br>
        <label for="birthday">Birthday:</label>
        <input type="date" id="petBirthday" placeholder="Aug 25" name="petBirthday"value="${STORE.currentPet.petBirthday}"></br>
        <label for="age">Age</label>:</label>
        <input type="text" id="petAge" placeholder="12" name="petAge"value="${STORE.currentPet.petAge}"></br>
        <label for="adopted-date">Date Adopted:</label>
        <input type="date" id="adopted-date" placeholder="Aug 25" name="dateAdopted"value="${STORE.currentPet.dateAdopted}"></br>
        <label for="vet">Vet:</label>
        <input type="text" id="petVet" placeholder="Dr. Jones" name="petVet"value="${STORE.currentPet.petVet}"></br>
        <label for="allergies">Allergies:</label>
        <input type="text" id="petAllergies" placeholder="Chicken" name="petAllergies"value="${STORE.currentPet.petAllergies}"></br>
        <label for="medical-condition">Medical Condition:</label>
        <input type="text" id="petMedicalCondition"placeholder="Diabetes" name="petMedicalCondition"value="${STORE.currentPet.petMedicalCondition}"></br>
        <label for="medications">Medications:</label>
        <input type="text" id="petMedications"placeholder="Insulin" name="petMedications"value="${STORE.currentPet.petMedications}"></br>
        <label for="additional-info">Additional Information:</label>
        <input type="text" id="additionalInformation" placeholder="More info" name="additionalInformation"value="${STORE.currentPet.additionalInformation}"></br>
        <label for="add-avatar">Upload Avatar:</label>
        <input type="file" id="petAvatar" placeholder="Add Avatar" name="avatar"value="${STORE.currentPet.petAvatar}"></br>
        <button>Submit</button>
      </form>
    </div>
  `;
  $('.app-body').html(updateProfileForm);
  $('.return-to-petlist').show();
}

function renderPhotoUploadForm() {
  const photoUploadForm = `
  <form name="photo-upload" class = "photo-upload">
    <label for="album-name">Album Name</label>
    <input type="text" id="album-name" name="album-name"></br>
    <label for="photo-upload">Upload Photos</label>
    <input type="file"  id="pet-photos" name="pet-photos"></br>
    <button>Upload Now</button>`;
  $('.app-body').html(photoUploadForm);
}

function renderPhotoAlbum() {
  const photoAlbum = `
  <div class="photo-album">
    `;
}
