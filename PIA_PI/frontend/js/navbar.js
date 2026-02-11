const navbarHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">Mundial 2026 ᯓ⚽︎ </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="ar-scan.html">AR Scanner</a></li>
        <li class="nav-item"><a class="nav-link" href="clips.html">Clips</a></li>
      </ul>
    </div>
  </div>
</nav>`;
document.body.insertAdjacentHTML('afterbegin', navbarHTML);