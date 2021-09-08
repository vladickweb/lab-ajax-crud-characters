const charactersAPI = new APIHandler();

window.addEventListener('load', () => {

	document.getElementById('fetch-all').addEventListener('click', function (event) {
		document.querySelector('.characters-container').innerHTML = ""
		getAll()
	});

	document.getElementById('fetch-one').addEventListener('click', function (event) {
		document.querySelector('.characters-container').innerHTML = ""
		const formInput = document.querySelector('#fetch-one-input')
		if (formInput.value < 0){
			console.log('no hay registros')
			return
		}
		charactersAPI
			.getOneRegister(formInput.value)
			// .then(item => console.log(item))
			.then(item => {
				document.querySelector('.characters-container').innerHTML = `
					<div class="characters-container">
      				<div class="character-info">
					<div class="id">Id: ${item.data.id}</div>
					<div class="name">Character Name: ${item.data.name}</div>
					<div class="occupation">Character Occupation: ${item.data.occupation}</div>
					<div class="cartoon">Is a Cartoon? ${item.data.cartoon}</div>
					<div class="weapon">Character Weapon: ${item.data.weapon}</div>
					</div>
					</div>`


				formInput.value = ''

			})
			.catch(error => console.log(error))

	});

	document.getElementById('delete-one').addEventListener('click', function (event) {
		const formInput = document.querySelector('.delete input')

		charactersAPI
			.deleteOneRegister(formInput.value)
			.then(console.log('hecho'))
			.catch(error => console.log(error))

		formInput.value = ''



	});

	document.getElementById('edit-character-form').addEventListener('submit', function (event) {
		event.preventDefault()
		document.querySelector('.characters-container').innerHTML = ""


		const form = document.querySelectorAll('#edit-character-form input')

		const characterId = form[0].value

		const character = {
			name: form[1].value,
			occupation: form[2].value,
			weapon: form[3].value,
			cartoon: form[4].checked
		}

		charactersAPI
		.updateOneRegister(characterId, character )
        .then(() => {
			document.querySelector('#edit-character-form').reset()
			button = document.querySelector('#edit-character-form button')
			button.classList.add('active')
			setTimeout(() => {
				button.classList.remove('active')
			},1000)
        })
        .catch(err => {
			console.log(err)
			button = document.querySelector('#edit-character-form button')
			button.classList.add('inactive')
			setTimeout(() => {
				button.classList.remove('inactive')
			},1000)
		})
	});

	document.getElementById('new-character-form').addEventListener('submit', function (event) {
		event.preventDefault()
		document.querySelector('.characters-container').innerHTML = ""

		const form = document.querySelectorAll('#new-character-form input')

		const character = {
			name: form[0].value,
			occupation: form[1].value,
			weapon: form[2].value,
			cartoon: form[3].checked
		}
		
		charactersAPI
			.createOneRegister(character)
			.then(() => {
			// getAll()
			document.querySelector('#new-character-form').reset()
			button = document.querySelector('#new-character-form button')
			button.classList.add('active')
			setTimeout(() => {
				button.classList.remove('active')
			},1000)
			})
			.catch(err => console.log(err))
	});
});

function getAll(){
	charactersAPI
			.getFullList()
			.then(list => {
				list.data.reverse().forEach(item => {
					document.querySelector('.characters-container').innerHTML += `
					<div class="characters-container">
      				<div class="character-info">
					<div class="id">Id: ${item.id}</div>
					<div class="name">Character Name: ${item.name}</div>
					<div class="occupation">Character Occupation: ${item.occupation}</div>
					<div class="cartoon">Is a Cartoon? ${item.cartoon}</div>
					<div class="weapon">Character Weapon: ${item.weapon}</div>
					</div>
					</div>`
				})
			})
			.catch(error => console.error(error))
}