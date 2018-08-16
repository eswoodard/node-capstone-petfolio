function renderLandingPage() {
  const landingPage = `
  <div class="landing-page">
    <div class="landing-page-text">
      <h2>You love your pets.</h2>
      <p class="app-info-text">Now you can upload, organize, and store photos and important information all in one place.</p>
        <div class="account-btns">
          <button class="new-account-btn">Get Started</button>
        </div>
      <div class="demo">
        <p>Demo Username: demo</p>
        <p>Demo Password: password</p>
      </div>
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
      <form class="sign-in-form" autocomplete="nope">
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
      <p class="create-account-error-msg" style="display: none">Uh-oh! Username already exists!  Please choose another Username.</p>
      <form class="submit-account-form">
        <input type="text" id="firstName" placeholder="Enter First Name" name="firstName" aria-label="first-name"required></br>
        <input type="text" id="lastName" placeholder="Enter Last Name"  name="lastName" aria-label="last-name" required></br>
        <input type="text" id="username" placeholder="Enter Username" name="username" aria-label="username" required></br>
        <input type="password" id="password" placeholder="Enter Password" name="password" aria-label="password" required></br>
        <button type="submit">Create Account</button></br>
        <button class="cancel-btn">Cancel</button>
        <p>Already registered? <a class="nav-link" href="/signin">Sign In</a></p>
    </form>
    </fieldset>
 </div>`;
  $('.app-body').html(createAcountForm);
}

function renderMainPage() {
  const mainPage = `
    <div class="main-page">
      <p>Welcome to your pet page!  A snapshot view of your pet is below.  Click the "Edit Pet" button to update your pet's information or add a photo album (coming soon!). You can add a new pet by clicking the "Add a Pet" button.</p>
      <button class="add-profile-btn" type="submit">Add Pet</button>
    </div>
    `;
  $('.app-body').html(mainPage);
}

function renderPetList() {
  const petList = STORE.pets.map(pet => `
  <div class="pet-profile-card box-effect pet" name="${pet.petName}">
  <div class="card-left">
    <img src="${pet.avatar ? pet.avatar.path.slice(7) : '/images/paw-print.png'}" class="profile-avatar">
  </div>
  <div class="card-right">
    <h2>${pet.petName}</h2>
    <ul class="pet-info">
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
    <button class="edit-pet-btn">Edit Pet</button>
  </div>
</div>
<div class="photo-album-list">

</div>
    `);
  console.log(petList);
  $('.app-body').append(petList);
}

function renderCreateProfileForm() {
  const createProfileForm = `
  <div class="create-profile form-container">
  <fieldset>
    <img alt="petfolio-logo" src="/images/color_logo_transparent.png" class="logo">
    <legend>Create Pet Profile Form</legend>
    <h2>Create New Pet Profile</h2>
    <form name="profile" class="create-profile-form">
      <input type="text" id="petName" placeholder="Enter Pet Name" name="petName" aria-label="pet-name"></br>
      <input type="text" id="petGender" placeholder="Enter Pet Gender" name="petGender" aria-label="pet-gender"></br>
      <input type="text" id="petSpecies" placeholder="Enter Pet Species" name="petSpecies" aria-label="pet-species"></br>
      <input type="text" id="petColor" placeholder="Enter Pet Color" name="petColor" aria-label="pet-color"></br>
      <input type="text" id="petBirthday" placeholder="Enter Pet Birthday" name="petBirthday" aria-label="pet-birthday"></br>
      <input type="text" id="petAge" placeholder="Enter Pet Age" name="petAge" aria-label="pet-age"></br>
      <input type="text" id="adopted-date" placeholder="Enter Date Adopted" name="dateAdopted" aria-label="date-adopted"></br>
      <input type="text" id="petVet" placeholder="Enter Vet Name" name="petVet" aria-label="pet-vet"></br>
      <input type="text" id="petAllergies" placeholder="Enter Pet Allergies" name="petAllergies" aria-label="pet-allergies"></br>
      <input type="text" id="petMedicalCondition" placeholder="Enter Medical Conditions" name="petMedicalCondition" aria-label="medical-conditions"></br>
      <input type="text" id="petMedications" placeholder="Enter Medications" name="petMedications" aria-label="medications"></br>
      <input type="text" id="additionalInformation" placeholder="Enter Additional Information" name="additionalInformation" aria-label="additional-information"></br>
      <label for="avatar">Upload Photo:</label></br>
      <input type="file" id="petAvatar" placeholder="Add Avatar" name="avatar" aria-label="avatar"></br>
      <button class="submit-profile-btn">Submit</button></br>
      <button class="cancel-btn cancel-profile-btn">Cancel</button>
    </form>
  </fieldset>
</div>
  `;
  $('.app-body').html(createProfileForm);
  $('.return-to-petlist').show();
}

function renderEditPetForm() {
  const editPetForm = `
  <div class="edit-pet form-container">
    <img alt="petfolio-logo" src="/images/color_logo_transparent.png" class="logo">
    <h2>Edit Pet Profile</h2>
    <div class="edit-button-container">
      <button class="update-pet-link edit-button">Update Pet Info</button>
      <button class="delete-pet-link edit-button">Delete Pet Profile</button>
      <button class="create-album-button edit-button">Create Photo Album</button></br>
      <button class="cancel-btn cancel-profile-btn">Cancel</button>
    </div>
  </div>
    `;
  $('.app-body').html(editPetForm);
}


function renderUpdateForm() {
  const updateProfileForm = `
  <div class="update-profile form-container">
  <fieldset>
    <img alt="petfolio-logo" src="/images/color_logo_transparent.png" class="logo">
    <h2>Update Pet Profile</h2>
    <legend>Update Pet Profile Form</legend>
    <form action="#" name="profile" class="update-profile-form">
      <label>Pet Name:</label></br>
      <input type="text" id="petName" placeholder="Enter Pet Name" name="petName" aria-label="pet-name" value="${STORE.currentPet.petName}"></br>
      <label>Pet Gender:</label></br>
      <input type="text" id="petGender" placeholder="Enter Pet Gender" name="petGender" aria-label="pet-gender" value="${STORE.currentPet.petGender}"></br>
      <label>Pet Species:</label></br>
      <input type="text" id="petSpecies" placeholder="Enter Pet Species" name="petSpecies" aria-label="pet-species" value="${STORE.currentPet.petSpecies}"></br>
      <label>Pet Color:</label></br>
      <input type="text" id="petColor" placeholder="Enter Pet Color" name="petColor" aria-label="pet-color" value="${STORE.currentPet.petColor}"></br>
      <label>Pet Birthday:</label></br>
      <input type="text" id="petBirthday" placeholder="Enter Pet Birthday" name="petBirthday" aria-label="pet-birthday" value="${STORE.currentPet.petBirthday}"></br>
      <label>Pet Age:</label></br>
      <input type="text" id="petAge" placeholder="Enter Pet Age" name="petAge" aria-label="pet-age" value="${STORE.currentPet.petAge}"></br>
      <label>Adopted Date:</label></br>
      <input type="text" id="adopted-date" placeholder="Enter Date Adopted" name="dateAdopted" aria-label="date-adopted" value="${STORE.currentPet.dateAdopted}"></br>
      <label>Vet Name:</label></br>
      <input type="text" id="petVet" placeholder="Enter Vet Name" name="petVet" aria-label="pet-vet" value="${STORE.currentPet.petVet}"></br>
      <label>Pet Allergies:</label></br>
      <input type="text" id="petAllergies" placeholder="Enter Pet Allergies" name="petAllergies" aria-label="pet-allergies" value="${STORE.currentPet.petAllergies}"></br>
      <label>Medical Conditions:</label></br>
      <input type="text" id="petMedicalCondition" placeholder="Enter Medical Conditions" name="petMedicalCondition" aria-label="medical-conditions" value="${STORE.currentPet.petMedicalCondition}"></br>
      <label>Medications:</label></br>
      <input type="text" id="petMedications" placeholder="Enter Medications" name="petMedications" aria-label="medications" value="${STORE.currentPet.petMedications}"></br>
      <label>Additional Information:</label></br>
      <input type="text" id="additionalInformation" placeholder="Enter Additional Information"   aria-label="additional-information" name="additionalInformation"value="${STORE.currentPet.additionalInformation}"></br>
      <label for="avatar">Upload Avatar:</label></br>
      <input type="file" id="petAvatar" placeholder="Add Avatar" name="avatar" aria-label="avatar" value="${STORE.currentPet.petAvatar}"></br>
      <button>Submit</button></br>
      <button class="cancel-btn cancel-update-btn">Cancel</button>
    </form>
    </fieldset>
  </div>

  `;
  $('.app-body').html(updateProfileForm);
  $('.return-to-petlist').show();
}

function renderPhotoAlbum() {
  const photoAlbum = `
    <div class ="future-feature">
      <p>This feature will be added in the next release.  Thank you for your patience.</p>
      <button class="cancel-btn cancel-album-btn">Cancel</button>
    </div>`;
  $('.app-body').html(photoAlbum);
}

// ****Future Feature to be added later****

// function renderPhotoUploadForm() {
//   const photoUploadForm = `
//   <form name="photo-upload" class = "photo-upload">
//     <label for="album-name">Album Name</label>
//     <input type="text" id="album-name" name="album-name"></br>
//     <label for="photo-upload">Upload Photos</label>
//     <input type="file"  id="pet-photos" name="pet-photos"></br>
//     <button>Upload Now</button>`;
//   $('.app-body').html(photoUploadForm);
// }

// function renderPhotoAlbum() {
//   const photoAlbum = `
//   <div class="photo-album">
//     `;
// }
