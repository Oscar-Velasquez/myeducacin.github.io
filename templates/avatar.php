<?php
include '../private/Config.php';

class Avatar {
  private $avatarPath;
  
  public function setAvatar($avatarPath) {
    $this->avatarPath = $avatarPath;
  }
  
  public function saveAvatar() {
    // Guardar el avatar en la base de datos
    global $connect;
    
    $avatarPath = $connect->real_escape_string($this->avatarPath); // Evitar inyección de SQL
    
    $query = "INSERT INTO avatares (avatar_path) VALUES ('$avatarPath')";
    
    if ($connect->query($query) === TRUE) {
      return true; // Avatar guardado correctamente
    } else {
      return false; // Error al guardar el avatar
    }
  }
}

// Obtener el avatar seleccionado desde el formulario
if (isset($_POST['avatar'])) {
  $avatarPath = $_POST['avatar'];
  
  $avatar = new Avatar();
  $avatar->setAvatar($avatarPath);
  $avatarGuardado = $avatar->saveAvatar();
  
  if ($avatarGuardado) {
    $message = "Avatar guardado correctamente.";
  } else {
    $message = "Error al guardar el avatar.";
  }
  
  // Redirigir a homepage.php con el mensaje de confirmación
  header("Location: homepage.php?message=" . urlencode($message));
  exit();
}
?>



<!DOCTYPE html>
<html>
<head>
  <title>Selecciona tu avatar</title>
  <link rel="stylesheet" href="../recursos/css/avatares.css"/>
  <script>
    function selectAvatar(avatarPath) {
      var selectedAvatar = document.getElementById('selectedAvatarPreview');
      selectedAvatar.src = avatarPath;
    }
    
    function saveAvatar() {
      // Aquí puedes agregar código adicional si es necesario
      // para enviar el avatar seleccionado al servidor
      // y guardar la información en la base de datos.
      alert("Avatar guardado correctamente.");
      window.location.href = "homepage.php";
    }
  </script>
</head>
<body>
  <div class="avatar-container">
    <div class="avatar-list">
      <h3>Selecciona un avatar:</h3>
      <div class="avatars">
        <div class="avatar-column">
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar1.jpeg')">
            <img src="../recursos/img/avatar1.jpeg" alt="Avatar 1" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar2.jpeg')">
            <img src="../recursos/img/avatar2.jpeg" alt="Avatar 2" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar3.jpeg')">
            <img src="../recursos/img/avatar3.jpeg" alt="Avatar 3" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar4.jpeg')">
            <img src="../recursos/img/avatar4.jpeg" alt="Avatar 4" class="avatar">
          </div>
        </div>
        <div class="avatar-column">
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar5.jpeg')">
            <img src="../recursos/img/avatar5.jpeg" alt="Avatar 5" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar6.jpeg')">
            <img src="../recursos/img/avatar6.jpeg" alt="Avatar 6" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar7.jpeg')">
            <img src="../recursos/img/avatar7.jpeg" alt="Avatar 7" class="avatar">
          </div>
          <div class="avatar-item" onclick="selectAvatar('../recursos/img/avatar8.jpeg')">
            <img src="../recursos/img/avatar8.jpeg" alt="Avatar 8" class="avatar">
          </div>
        </div>
      </div>
    </div>
    <div class="selected-avatar">
      <h3>Avatar seleccionado:</h3>
      <div class="selected-avatar-preview">
        <img id="selectedAvatarPreview" src="" alt="Avatar seleccionado">
      </div>
      <button class="guardar" onclick="saveAvatar()">Guardar</button>
    </div>
  </div>

  <script src="../recursos/avatar.js"></script>
</body>
</html>
