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
    console.log('hello');
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
    console.log(response);
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
    console.log(response);
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
    const token = localStorage.getItem('jwToken');
    console.log(token);
    const body = {
      petName: $('#petName').val(),
      petGender: $('#petGender').val(),
      petSpecies: $('#petSpecies').val(),
      petColor: $('#petColor').val(),
      petbirthday: $('#petbirthday').val(),
      petAge: $('#petAge').val(),
      adoptedDate: $('#adopted-date').val(),
      petVet: $('#petVet').val(),
      petAllergies: $('#petAllergies').val(),
      petMedicalCondition: $('#petMedicalCondition').val(),
      petMedications: $('#petMedications').val(),
      additionalInformation: $('#additionalInformation').val(),
      petAvatar: $('#petAvatar').val(),
    };
    const settings = {
      async: true,
      crossDomain: true,
      url: 'http://localhost:8080/pets',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      processData: false,
      data: JSON.stringify(body),
      error(error) {
        console.log(error);
      },
    };

    $.ajax(settings).done((response) => {
      console.log(response);
      renderMainPage(response);
      STORE.pets.push(response.pets);
      renderPetList();
    });
  });
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
