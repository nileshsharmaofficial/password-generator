<script>
  const strength = {
    0: "WORST",
    1: "BAD",
    2: "WEAK",
    3: "FINE",
    4: "STRONG",
  }

  const characters = {
    uppercase: 'QWERTYUIOPASDFGHJKLZXCVBNM',
    lowercase: 'qwertyuiopasdfghjklzxcvbnm',
    numbers: '1234567890',
    symbols: '!@#$%^&*()[]{}<>?'
  }

  const password = {
    value: null,
    length: 8,
    uppercase: true,
    lowercase: true, 
    numbers: true,
    symbols: false,
    strength: null
  }
  
  const containsAlphabets = (string) => {
    const alphabets_regex = /[a-zA-Z]/
    return alphabets_regex.test(string)
  }
  const containsNumbers = (string) => {
    const numbers_regex = /[0-9]/
    return numbers_regex.test(string)
  }
  const containsSpecialChars = (string) => {
    const special_chars_regex = /[!@#$%^&*()\[\]{}<>?]/
    return special_chars_regex.test(string)
  }

  const generatePassword = () => {
    let valid_chars = ''
    valid_chars += password.uppercase ? characters.uppercase : ''
    valid_chars += password.lowercase ? characters.lowercase : ''
    valid_chars += password.numbers ? characters.numbers : ''
    valid_chars += password.symbols ? characters.symbols : ''
    if (valid_chars.length == 0 || password.length == 0) {
      password.value = null
      return
    }

    let result = ''
    while (result.length < password.length) {
      result += valid_chars[Math.floor(Math.random() * valid_chars.length)]
    }
    password.value = result

    password.strength = 0

    if (password.value.length >= 8) {
      password.strength += 1
    }
    if (containsAlphabets(password.value)) {
      password.strength += 1
    }
    if (containsNumbers(password.value)) {
      password.strength += 1
    }
    if (containsSpecialChars(password.value)) {
      password.strength += 1
    }
  }

  const copyPassword = () => {
    if (password.value == null) {
      return
    }
    navigator.clipboard.writeText(password.value)
  }
</script>

<div class="container">
  <span class="gray font-md my-8">Password Generator</span>

  <div class="inner-box row bg-dark py-16 my-8">
    {#if password.value != null}
      <span class="password light font-xl">{password.value}</span>
    {:else}
      <span class="password gray font-xl">P4$5W0rD!</span>
    {/if}
    <button class="clear-btn" on:click={copyPassword}>
      <i class="fa-sharp fa-regular fa-copy green hover-light font-md"></i>
    </button>
  </div>

  <div class="inner-box bg-dark py-16 my-8">
    <div class="row my-8">
      <span class="light font-sm">Character Length</span>
      <span class="green font-xl" id="char-length-output">{password.length}</span>
    </div>

    <input class="range w-full my-16" id="char-length-input" type="range" min="0" max="16" bind:value={password.length}>

    <div class="checkboxes my-16">
      <label class="checkbox-group my-16 light font-sm" for="include-uppercase"> Include Uppercase Letters
        <input class="checkbox" type="checkbox" id="include-uppercase" bind:checked={password.uppercase}>
        <span class="checkmark"></span>
      </label>
      <label class="checkbox-group my-16 light font-sm" for="include-lowercase"> Include Lowercase Letters
        <input class="checkbox" type="checkbox" id="include-lowercase" bind:checked={password.lowercase}>
        <span class="checkmark"></span>
      </label>
      <label class="checkbox-group my-16 light font-sm" for="include-numbers"> Include Numbers
        <input class="checkbox" type="checkbox" id="include-numbers" bind:checked={password.numbers}>
        <span class="checkmark"></span>
      </label>
      <label class="checkbox-group my-16 light font-sm" for="include-symbols"> Include Symbols
        <input class="checkbox" type="checkbox" id="include-symbols" bind:checked={password.symbols}>
        <span class="checkmark"></span>
      </label>
    </div>

    <div class="row strength-container bg-darker py-16">
      <span class="strength-title gray font-sm">STRENGTH</span>
      <div class="strength-box">
          <span class="light font-lg">
            {#if password.strength != null }
              {strength[password.strength]}
            {/if}
          </span>
        <div class={`strength-meter strength-${password.strength != null ? password.strength : ''}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <button class="btn w-full py-16 my-8" on:click={generatePassword}>
      <span>GENERATE</span><i class="fa-sharp fa-solid fa-arrow-right font-xs" style="margin-left: 1rem;"></i>
    </button>
  </div>
</div>