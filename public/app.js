console.log(STORE);

function renderPetList() {
  const listHtml=STORE.pets.map(pet => {
    return `
    <li>
      <p>Name: ${pet.name}</p>
      <img src="${pet.media[0]}"/>
    </li>`
  }).join('');
  console.log(listHtml);
  const petList = document.querySelector('.pet-list');
  petList.innerHTML = listHtml;
}

renderPetList();