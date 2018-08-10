const STORE = {
  pets: [],
};

function submitLogInForm() {
  $(document).on('submit', '.sign-in-form', (event) => {
    event.preventDefault();
    const userTarget = $(event.currentTarget).find('#userName');
    const passwordTarget = $(event.currentTarget).find('#password');
    const password = passwordTarget.val();
    const user = userTarget.val();
    getUserByUsername(user, password);
  });
}

function retrievePetDataFromApi() {
  console.log('hello');
  const token = localStorage.getItem('jwToken');
  const settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:8080/pets',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
    },
  };
  $.ajax(settings).done((response) => {
    // console.log(response);
    STORE.pets = response.pets;
    renderPetList();
  });
}

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
    url: 'http://localhost:8080/auth/login',
  };
  $.ajax(settings).done((response) => {
    // console.log(response);
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

function renderNavLinks(isLoggedIn) {
  if (isLoggedIn) {
    $('#logged-out-links').hide();
    $('#logged-in-links').show();
  } else {
    $('#logged-out-links').show();
    $('#logged-in-links').hide();
  }
}

function requestCreateAccountForm() {
  $('.new-account-btn').on('click', (event) => {
    event.preventDefault();
    renderCreateAccountForm();
  });
}

function submitNewAccountInfo() {
  $('.submit-account-form').submit((event) => {
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
      url: 'http://localhost:8080/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      processData: false,
      data: JSON.stringify(body),
      error(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      },
    };
    $.ajax(settings).done((response) => {
      localStorage.setItem('jwToken', response.token);
      console.log(response);
      renderWelcomePage(response);
    });
  });
}

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

function bindEventListeners() {
  $(document).on('click', '.add-profile-btn', (event) => {
    renderCreateProfileForm();
  });
  submitCreateProfileForm();
  $('.nav-link').on('click', function (event) {
    event.preventDefault();
    const path = $(this).attr('href');
    renderPath(path);
    console.log(path);
  });
  $(document).on('click', '.sign-in-btn', (event) => {
    event.preventDefault();
    renderLogInForm();
  });

  submitLogInForm();
}

function submitCreateProfileForm() {
  $(document).on('click', '.submit-profile-btn', (event) => {
    // will sent post request to API, create pet profile, return confirmation
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
      url: 'http://localhost:8080/pets',
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
      console.log(response);
      STORE.pets.push(response.pets);
      renderMainPage(response);
      renderPetList();
    });
  });
}

function handlePetProfileUpdateLink(pet) {
  $('.update-pet-link').on('click', (event) => {
    event.preventDefault();
    const petId = pet._id;
    console.log(petId);
    renderCreateProfileForm();
  });
}

function handleProfileButtonClick() {
  $('.pet-list').click(function () {
    console.log('pet clicked');
    const petName = $(this).attr('name');
    console.log(petName);
    getPetByPetname(petName);
  });
}

function getPetByPetname(petName) {
  console.log(petName);
  STORE.pets.map((pet) => {
    if (pet.petName === petName) {
      console.log(pet.petName);
      console.log(petName);
      console.log(pet);
      renderPetProfile(pet);
      $('.petlist-link').show();
      handlePetProfileUpdateLink(pet);
      // displayPhotoAlbum(pet);
      // renderPetAlbums(pet);
    }
  });
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


function handleAppLoad() {
  renderLandingPage();
  requestCreateAccountForm();
  bindEventListeners();
}

$(handleAppLoad);
