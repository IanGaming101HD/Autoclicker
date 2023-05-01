const signupButton = document.getElementById('signin_btn')
const signin = document.getElementById('signin')
const tos = document.getElementById('tos')

tos.href = ''
signin.href = '../login/index.html'

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const hasAtLeastOneCharacter = (string, array) => array.some((character) => string.includes(character));
    const hasInvalidCharacter = (string, array) => string.split('').some((character) => !array.includes(character));
    const validUsernameCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-']
    const validPasswordCharacters = {
        lower_case: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        upper_case: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        special_characters: [' ', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', '|', '\\', ',', ':', ';', '\'', ',', '.', '>', '/', '?']
    }

    let username = document.getElementById('username').value
    if (username.length < 8 || username.length > 100 ) {
        return
    }
    if (hasInvalidCharacter(username.toLowerCase(), validUsernameCharacters)) {
        return
    }
    if (await electron.findUsername(username.toLowerCase())) {
        return
    }

    let regex = /^([^@]*@){0,1}[^@]*$/

    let email = document.getElementById('email').value.toLowerCase()
    if (!email.includes('@') || !regex.test(email) || await electron.findEmail(email.toLowerCase())) {
        return
    }

    let password = document.getElementById('password').value
    if (password.length < 12 || password.length > 100) {
        return
    }
    // // if (hasInvalidCharacter(password, Object.values(validPasswordCharacters))) {
    // //     return
    // // }
    // if (hasAtLeastOneCharacter(password, validPasswordCharacters.lower_case)) {
    //     return
    // }
    // // if (hasAtLeastOneCharacter(password, validPasswordCharacters.upper_case)) {
    // //     return
    // // }
    // if (hasAtLeastOneCharacter(password, validPasswordCharacters.numbers)) {
    //     console.log(9)
    //     return
    // }
    // // if (hasAtLeastOneCharacter(password, validPasswordCharacters.special_characters)) {
    // //     return
    // // }

    let passwordConfirmation = document.getElementById('confirm_password').value
    if (passwordConfirmation !== password) {
        return
    }

    let checkbox = document.getElementById('checkbox')
    if (!checkbox.checked) {
        return
    }

    await electron.createLogin(username.toLowerCase(), email.toLowerCase(), password)

    let session = await electron.session
    session.username = username.toLowerCase()
    session.password = password
    await electron.writeFileSync('./src/session.json', JSON.stringify(session))

    location.href = '../menu/index.html'
    await electron.changeWindowSize(1250, 725)
    await electron.centreWindow()
})

tos.addEventListener('click', async (e) => {
    window.open('../terms/index.html', '_blank', 'width=900, height=500, center=yes, resizable=no, toolbar=no, autoHideMenuBar=yes')
})

signin.addEventListener('click', async (e) => {
    await electron.changeWindowSize(450, 310)
    await electron.centreWindow()
})