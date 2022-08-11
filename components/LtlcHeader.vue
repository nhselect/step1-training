<template>
  <header class="nhsuk-header nhsuk-header" role="banner">
    <div class="nhsuk-width-container-fluid nhsuk-header__container">
      <div class="nhsuk-header__logo nhsuk-header__logo--only">
        <a class="nhsuk-header__link" href="https://ergonomics.org.uk/" target="_blank" aria-label="CIEHF website">
          <img class="cieh-logo" src="../assets/img/ciehf-logo.png" />
        </a>
      </div>
      <div class="nhsuk-header__logo nhsuk-header__logo--only">
        <a class="nhsuk-header__link" href="https://www.hee.nhs.uk/" target="_blank" aria-label="HEE website">
          <img class="hee-logo" src="../assets/img/HEE.png" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/header/header';

.nhsuk-header {
  background-color: #fff;
  ::after {
    content: none;
  }
}

.nhsuk-header__container {
  display: flex;
  align-content: space-between;
  justify-content: space-between;
}

.nhsuk-header__logo.nhsuk-header__logo--only {
  max-width: 40%;
}

.nhsuk-header__link {
  height: auto;
  width: auto;
}

.cieh-logo, .hee-logo {
  max-height: 56px;
  width: 100%;
}
</style>
