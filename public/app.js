const STORE = {
  pets: [],
};

function requestLogInForm() {
  $('.sign-in-btn').on('click', (event) => {
    event.preventDefault();
    renderLogInForm();
    submitLogInForm();
  });
}

function submitLogInForm() {
  $('.sign-in-form').submit((event) => {
    event.preventDefault();
    const userTarget = $(event.currentTarget).find('#userName');
    const passwordTarget = $(event.currentTarget).find('#password');
    const password = passwordTarget.val();
    const user = userTarget.val();
    getUserByUsername(user, password);
  });
}

function retrievePetDataFromApi() {
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
    console.log('Welcome! You are now logged in.');
    renderMainPage(response);
    retrievePetDataFromApi();
  });
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
      // requestCreateProfileForm();
    });
  });
}


// function requestCreateProfileForm() {
//   $('.add-profile-btn').on('click', (event) => {
//     renderCreateProfileForm();
//     submitCreateProfileForm();
//   });
// }

function bindEventListeners() {
  $(document).on('click', '.add-profile-btn', (event) => {
    renderCreateProfileForm();
  });
  submitCreateProfileForm();
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
    form.append('petBirthday', $('#petbirthday').val());
    form.append('petAge', $('#petAge').val());
    form.append('adoptedDate', $('#adopted-date').val());
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

function handleProfileButtonClick() {
  $('.pet-list').click(function () {
    console.log('pet clicked');
    // event.preventDefault();
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
      displayPhotoAlbum(pet);
      renderPetAlbums(pet);
    }
  });

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
  requestLogInForm();
  requestCreateAccountForm();
  bindEventListeners();
}

$(handleAppLoad);
