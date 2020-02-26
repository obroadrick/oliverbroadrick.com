<?php
  // Start session
  session_start();

  // Check if logged in
  if (isset($_SESSION['username'])) {
    $_SESSION = array();
    // Destroy the session
    session_destroy();
  }

  // Go back to login
  $home_url = "http://gwupyterhub.seas.gwu.edu/~obroadrick/hw4-obroadrick/src/login.php";
  header('Location: ' . $home_url);
?>
