<script>
  const strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  }

  const characters = {
    uppercase: 'QWERTYUIOPASDFGHJKLZXCVBNM',
    lowercase: 'qwertyuiopasdfghjklzxcvbnm',
    numbers: '1234567890',
    symbols: '!@#$%^&*()-_=+[]{}<>?'
  }

  const password = {
    value: '',
    length: 10,
    uppercase: true,
    lowercase: true, 
    numbers: true,
    symbols: true
  }

  const generatePassword = () => {
    let valid_chars = ''
    valid_chars += password.uppercase ? characters.uppercase : ''
    valid_chars += password.lowercase ? characters.lowercase : ''
    valid_chars += password.numbers ? characters.numbers : ''
    valid_chars += password.symbols ? characters.symbols : ''
    if (valid_chars.length == 0) {
      password.value = 'Error'
      return
    }

    let result = ''
    while (result.length < password.length) {
      result += valid_chars[Math.floor(Math.random() * valid_chars.length)]
    }
    password.value = result
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password.value)
  }
</script>

<div class="container">
  <span class="gray font-md my-8">Password Generator</span>

  <div class="inner-box row bg-dark py-16 my-8">
    {#if password.value != ''}
      <span class="password light font-xl">{password.value}</span>
    {:else}
      <span class="password gray font-xl">Password</span>
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

    <input class="range w-full my-16" id="char-length-input" type="range" min="4" max="16" bind:value={password.length}>

    <div class="checkboxes my-16">
      <div class="checkbox-group my-16">
        <input class="checkbox" type="checkbox" id="include-uppercase" bind:checked={password.uppercase}>
        <label class="light font-sm" for="include-uppercase">Include Uppercase Letters</label>
      </div>
      <div class="checkbox-group my-16">
        <input class="checkbox" type="checkbox" id="include-lowercase" bind:checked={password.lowercase}>
        <label class="light font-sm" for="include-lowercase">Include Lowercase Letters</label>
      </div>
      <div class="checkbox-group my-16">
        <input class="checkbox" type="checkbox" id="include-numbers" bind:checked={password.numbers}>
        <label class="light font-sm" for="include-numbers">Include Numbers</label>
      </div>
      <div class="checkbox-group my-16">
        <input class="checkbox" type="checkbox" id="include-symbols" bind:checked={password.symbols}>
        <label class="light font-sm" for="include-symbols">Include Symbols</label>
      </div>
    </div>

    <div class="row strength-container bg-darker py-16">
      <span class="strength-title gray font-sm">STRENGTH</span>
      <div class="strength-box">
        <span class="light font-lg">MEDIUM</span>
      </div>
    </div>

    <button class="btn w-full py-16 my-8" on:click={generatePassword}>
      <span>GENERATE</span><i class="fa-sharp fa-solid fa-arrow-right font-xs" style="margin-left: 1rem;"></i>
    </button>
  </div>
</div>