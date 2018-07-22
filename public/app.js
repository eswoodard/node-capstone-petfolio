console.log(STORE)

function renderAppInfo () {
  $('.app-body').html(`
  <div class="app-info">
    <p class="app-info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Dictum non consectetur a erat nam. Dictum at tempor commodo ullamcorper a lacus vestibulum sed.</p>
  </div>
  <div class="account-btns">
    <button class="sign-in-btn button" type="submit">Sign In</button>
    <p>Don't have an account?  Create one now:</p>
    <button class="create-account-btn">Create Account</button>
  </div>
  `
  )
}

function renderSignInForm () {
  return `
   <div class="sign-in-form">
    <h2>Sign In<h2>
    <form action="/server.js">
      <label for="username">Username</label>
      <input type="text" placeholder="name@domain.com" name="username" required></br>
      <label for="password">Password</label>
      <input type="password" placeholder="Enter Password" name="password" required></br>
      <button type="submit">Login</button>
    </form>
  </div>`
}

function displaySignInForm () {
  $('.sign-in-btn').on('click', event => {
    event.preventDefault()
    $('.app-body').html(renderSignInForm)
  })
}

function renderCreateAccountForm () {
  return `
  <div class="create-account-form">
    <h2>Create Account</h2>
    <form action="/server.js">
      <label for="firstName">First Name</label>
      <input type="text" placeholder="Jane" name="firstName" required></br>
      <label for="lastName">Last Name</label>
      <input type="text" placeholder="Doe"  name="lastName" required></br>
      <label for="username">Username</label>
      <input type="text" placeholder="name@domain.com" name="username" required></br>
      <label for="password">Password</label>
      <input type="password" placeholder="Enter Password" name="password" required></br>
      <label for="confirm-password">Confirm Password</label>
      <input type="password" placeholder="Re-enter Password" name="confirm-password" required></br>
      <button type="submit">Create Account</button>
   </form>
 </div>`
}

function displayCreateAccountForm () {
  $('.create-account-btn').on('click', event => {
    event.preventDefault()
    $('.app-body').html(renderCreateAccountForm)
  })
}

// function renderPetList() {
//   const listHtml=STORE.pets.map(pet => {
//     return `
//     <li>
//       <p>Name: ${pet.name}</p>
//       <img src="${pet.media[0]}"/>
//     </li>`
//   }).join('');
//   console.log(listHtml);
//   const petList = document.querySelector('.pet-list');
//   petList.innerHTML = listHtml;
// }

function handleAppLoad () {
  renderAppInfo()
  displaySignInForm()
  displayCreateAccountForm()
  // renderPetList();
}

$(handleAppLoad)
