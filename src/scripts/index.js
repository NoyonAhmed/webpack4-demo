import axios from 'axios'

const BASE_URL = 'http://localhost:3000/users'




window.onload = function () {

    let tbody = document.querySelector('#tbody')

    //get data from server and fill the table when page loaded
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach(contact => {
                createTdElement(contact, tbody)
            });
        })
        .catch()


    // add eventlitener to save data into the server
    let saveContentBtn = document.querySelector('#saveContent');
    saveContentBtn.addEventListener('click', function () {
        createNewContact()
    })
    
}

// edit and delete button customize

function createNewContact() {
 
    let nameFeild = document.querySelector('#nameField')
    let phoneFeild = document.querySelector('#phoneField')
    let emailFeild = document.querySelector('#emailField')

    let contact = {
        name : nameFeild.value,
        phone : phoneFeild.value,
        email : emailFeild.value
    }

    axios.post(BASE_URL, contact)
        .then(res => {
            let tbody = document.querySelector('#tbody')
            createTdElement(res.data, tbody)

            nameFeild.value = ''
            phoneFeild.value = ''
            emailFeild.value = ''

        })
        .catch(err => console.log(err))

}





// recieve data from server
function createTdElement(contact, parentElement) {

    let tr = document.createElement('tr');

    // td name
    let tdName = document.createElement('td');
    tdName.innerHTML = contact.name
    tr.appendChild(tdName)

    // td phone
    let tdPhone =  document.createElement('td');
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A'
    tr.appendChild(tdPhone)


    // td email
    let tdEmail =  document.createElement('td');

    tdEmail.innerHTML = contact.email ? contact.email : 'N/A'
    tr.appendChild(tdEmail)


    // td button
    let tdAction =  document.createElement('td');

    let tdActionBtn = document.createElement('button')
    tdActionBtn.className = 'btn btn-warning'
    tdActionBtn.innerHTML = 'Edit'
    tdActionBtn.addEventListener('click', function () {
        
        let mainModal = $('#contactEditModal')
        mainModal.modal('toggle')

        let editName = document.querySelector('#edit-name')
        let editPhone = document.querySelector('#edit-phone')
        let editEmail = document.querySelector('#edit-email')

        editName.value = contact.name
        editPhone.value = contact.phone ? contact.phone : 'N/A'
        editEmail.value = contact.email ? contact.email : 'N/A'


        let updateContact = document.querySelector('#updateContact')

        updateContact.addEventListener('click', function () {
            
            axios.put(` ${BASE_URL}/${contact.id} `, {
                name : editName.value,
                phone : editPhone.value,
                email : editEmail.value
            })
                .then(res => {
                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email

                    mainModal.modal('hide')
                })
                .catch(err => console.log(err))

        })


    })
    tdAction.appendChild(tdActionBtn)


    let tdDeleteBtn = document.createElement('button')
    tdDeleteBtn.className = 'btn btn-danger mx-1'
    tdDeleteBtn.innerHTML = 'Delete'
    tdDeleteBtn.addEventListener('click', function () {
        
        axios.delete( ` ${BASE_URL}/${contact.id} ` )
            .then(res => {
                parentElement.removeChild(tr)
            })
            .catch(err => console.log(err))

    })
    tdAction.appendChild(tdDeleteBtn)
    

    tr.appendChild(tdAction)

    parentElement.appendChild(tr)

}
 
