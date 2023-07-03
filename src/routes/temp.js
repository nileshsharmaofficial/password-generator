const generatePassword = () => {
  let char_types = []
  if (password.uppercase) {
    char_types.push(characters.uppercase);
  }
  if (password.lowercase) {
    char_types.push(characters.lowercase);
  }
  if (password.numbers) {
    char_types.push(characters.numbers);
  }
  if (password.symbols) {
    char_types.push(characters.symbols);
  }
  if (char_types.length == 0) {
    password.value = 'Error'
    return
  }

  let result = ''

  while (result.length < password.length) {
    const random_type_index = Math.floor(Math.random() * char_types.length)
    const random_char_index = Math.floor(Math.random() * char_types[random_type_index].length)
    result += char_types[random_type_index][random_char_index]
  }
  password.value = result
}