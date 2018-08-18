const STORE = {
  pets: [],
  currentPet: null,
  albums: [],
};

// handles user login and passes values on to be authenticated
function submitLogInForm() {
  $(document).on('submit', '.sign-in-form', (event) => {
    event.preventDefault();
    const userTarget = $(event.currentTarget).find('#userName');
    const passwordTarget = $(event.currentTarget).find('#password');
    const password = passwordTarget.val();
    const user = userTarget.val();
    getUserByUsername(user, password);
    $('body').removeClass('bg').addClass('bg2');
  });
}

// get request to retrieve stored pet data
function retrievePetDataFromApi() {
  const token = localStorage.getItem('jwToken');
  const settings = {
    async: true,
    crossDomain: true,
    url: '/pets',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    },
  };
  $.ajax(settings).done((response) => {
    STORE.pets = response.pets;
    renderPetList();
  });
}

// receives user data from login in and posts to API, receives token and sets it to local storage
function getUserByUsername(user, password) {
  const body = {
    username: user,
    password,
  };
  const settings = {
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(body),
    headers: {
      accept: 'application/json; odata=verbose',
    },
    type: 'POST',
    url: '/auth/login',
  };
  $.ajax(settings).done((response) => {
    $('#userName').val('');
    $('#password').val('');
    localStorage.setItem('jwToken', response.profile.token);
    renderNavLinks(true);
    console.log('Welcome! You are now logged in.');
    renderMainPage(response);
    retrievePetDataFromApi();
  }).fail((error) => {
    console.log(error);
    $('.login-error-msg').show();
  });
}

// renders navigation links in the DOM
function renderNavLinks(isLoggedIn) {
  if (isLoggedIn) {
    $('#logged-out-links').hide();
    $('#logged-in-links').show();
  } else {
    $('#logged-out-links').show();
    $('#logged-in-links').hide();
  }
}

// displays account creation form
function requestCreateAccountForm() {
  $(document).on('click', '.new-account-btn', (event) => {
    event.preventDefault();
    renderCreateAccountForm();
  });
}
// pulls user data from account creation form and posts to API for account creation
function submitNewAccountInfo() {
  $(document).on('submit', '.submit-account-form', (event) => {
    // will sent post request to API, create new user account, return confirmation
    event.preventDefault();
    const body = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      username: $('#username').val(),
      password: $('#password').val(),
    };
    const settings = {
      async: true,
      crossDomain: true,
      url: '/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      processData: false,
      data: JSON.stringify(body),
    };
    $.ajax(settings).done((response) => {
      localStorage.setItem('jwToken', response.token);
      window.initialToken = response.token;
      renderMainPage();
      renderNavLinks(true);
      $('body').removeClass('bg').addClass('bg2');
    })
      .fail((error) => {
        console.log(error);
        $('.create-account-error-msg').show();
      });
  });
}

// handles navigation via nav links
function renderPath(path) {
  switch (path) {
    case '/signin':
      renderLogInForm();
      break;
    case '/signup':
      renderCreateAccountForm();
      break;
    case '/logout':
      localStorage.removeItem('jwToken');
      renderLandingPage();
      renderNavLinks(false);
      $('body').removeClass('bg2').addClass('bg');
      break;
    case '/petlist':
      renderMainPage();
      renderPetList();
      $('.petlist-link').hide();
      break;
    default:
      renderLandingPage();
  }
}

// binds all event listeners
function bindEventListeners() {
  $(document).on('click', '.add-profile-btn', (event) => {
    renderCreateProfileForm();
  });
  submitCreateProfileForm();
  $(document).on('click', '.nav-link', function (event) {
    event.preventDefault();
    const path = $(this).attr('href');
    renderPath(path);
  });
  $(document).on('click', '.sign-in-btn', (event) => {
    event.preventDefault();
    renderLogInForm();
  });
  $(document).on('click', '.cancel-btn', (event) => {
    event.preventDefault();
    renderLandingPage();
  });

  $(document).on('click', '.cancel-profile-btn', (event) => {
    event.preventDefault();
    renderMainPage();
    renderPetList();
  });
  $(document).on('click', '.cancel-update-btn', (event) => {
    event.preventDefault();
    renderEditPetForm();
  });
  $(document).on('click', '.create-album-button', (event) => {
    event.preventDefault();
    renderPhotoAlbum();
  });

  $(document).on('click', 'cancel-album-btn', (event) => {
    event.preventDefault();
    renderMainPage();
    renderPetList();
  });

  submitLogInForm();
  submitNewAccountInfo();
  handleProfileButtonClick();
  handlePetProfileUpdate();
  handlePetProfileDeleteLink();
  submitUpdateForm();
  handleCreateAlbumButtonClick();
  requestCreateAccountForm();
}

// submits pet update to API via PUT request and returns updated pet profile
function submitUpdateForm() {
  $(document).on('submit', '.update-profile-form', function (event) {
    event.preventDefault();
    const petId = STORE.currentPet._id;
    const file = document.getElementById('petAvatar').files[0];
    const token = localStorage.getItem('jwToken');
    const form= new FormData();
    form.append('petName', $('#petName').val());
    form.append('petGender', $('#petGender').val());
    form.append('petSpecies', $('#petSpecies').val());
    form.append('petColor', $('#petColor').val());
    form.append('petBirthday', $('#petBirthday').val());
    form.append('petAge', $('#petAge').val());
    form.append('dateAdopted', $('#adopted-date').val());
    form.append('petVet', $('#petVet').val());
    form.append('petAllergies', $('#petAllergies').val());
    form.append('petMedicalCondition', $('#petMedicalCondition').val());
    form.append('petMedications', $('#petMedications').val());
    form.append('additionalInformation', $('#additionalInformation').val());
    form.append('avatar', file);
    const settings = {
      async: true,
      crossDomain: true,
      url: `/pets/${petId}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      processData: false,
      contentType: false,
      enctype: 'multipart/form-data',
      data: form,
    };
    $.ajax(settings).done((response) => {
      findByPetNameAndReplace(response);
      renderMainPage(response);
      renderPetList();
    });
  });
}

// POST request to API to create new pet profile and return confirmation
function submitCreateProfileForm() {
  $(document).on('click', '.submit-profile-btn', (event) => {
    event.preventDefault();

    const file = document.getElementById('petAvatar').files[0];
    const token = localStorage.getItem('jwToken');
    const form = new FormData();
    form.append('petName', $('#petName').val());
    form.append('petGender', $('#petGender').val());
    form.append('petSpecies', $('#petSpecies').val());
    form.append('petColor', $('#petColor').val());
    form.append('petBirthday', $('#petBirthday').val());
    form.append('petAge', $('#petAge').val());
    form.append('dateAdopted', $('#adopted-date').val());
    form.append('petVet', $('#petVet').val());
    form.append('petAllergies', $('#petAllergies').val());
    form.append('petMedicalCondition', $('#petMedicalCondition').val());
    form.append('petMedications', $('#petMedications').val());
    form.append('additionalInformation', $('#additionalInformation').val());
    form.append('avatar', file);

    const settings = {
      async: true,
      crossDomain: true,
      url: '/pets',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      processData: false,
      contentType: false,
      enctype: 'multipart/form-data',
      data: form,
    };

    $.ajax(settings).done((response) => {
      STORE.pets.push(response.pets);
      renderMainPage(response);
      renderPetList();
    });
  });
}

// locates selected pet and updates STORE.currentPet
function findByPetNameAndReplace(updatedPet) {
  const index = STORE.pets.map(pet => pet.petName).indexOf(STORE.currentPet.petName);
  STORE.pets[index] = updatedPet;
  renderMainPage();
  renderPetList();
}

// displays the update pet profile form
function handlePetProfileUpdate() {
  $(document).on('click', '.update-pet-link', (event) => {
    event.preventDefault();
    renderUpdateForm();
  });
}
// /sends DELETE request to API to remove selected pet
function handlePetProfileDeleteLink() {
  $(document).on('click', '.delete-pet-link', (event) => {
    event.preventDefault();
    const petId = STORE.currentPet._id;
    const token = localStorage.getItem('jwToken');

    const settings = {
      async: true,
      crossDomain: true,
      url: `/pets/${petId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      processData: false,
      data: `{\n\t"id": "${petId}"\n}`,
    };

    $.ajax(settings).done((response) => {
      findByPetNameAndReplace(response);
      // renderMainPage();
      // renderPetList();
    });
  });
}

// identifies selected pet and displays menu with profile edit options
function handleProfileButtonClick() {
  $(document).on('click', '.pet', function (event) {
    event.preventDefault();
    const petName = $(this).attr('name');
    STORE.currentPet = getPetByPetname(petName);
    renderEditPetForm();
  });
}
// locates selected pet in STORE
function getPetByPetname(petName) {
  return STORE.pets.filter(pet => pet.petName === petName)[0];
}
// will display option to upload photo album once feature is added
function handleCreateAlbumButtonClick() {
  $(document).on('click', '.create-album-btn', (event) => {
    event.preventDefault();
    renderPhotoUploadForm();
  });
}

function handleAppLoad() {
  renderLandingPage();
  bindEventListeners();
}

$(handleAppLoad);

// ***feature to be added at a later date***

// function displayPhotoAlbum(profileInfo) {
//   $('.pet-album').on('click', (event) => {
//     event.preventDefault();
//     const item = profileInfo.media;
//     console.log(item);
//     const photos = item.map(items => `
//     <div class="photo-album">
//       <img class="album-photo" src="${items}">
//     </div>`);
//     console.log(photos);
//     $('.app-body').html(photos);
//   });
// }
