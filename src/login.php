<?php
  require_once('connectvars.php');

  // Start the session
  session_start();

  // Clear the error message
  $error_msg = "";

  // If the user isn't logged in, try to log them in
  if (!isset($_SESSION['username'])) {
    if (isset($_POST['submitlogin'])) {
      // Connect to the database
      $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

      // Grab the user-entered log-in data
      $user_username = mysqli_real_escape_string($dbc, trim($_POST['username']));
      $user_password = mysqli_real_escape_string($dbc, trim($_POST['password']));

      if (!empty($user_username) && !empty($user_password)) {
        // Look up the username and password in the database
        $query = "SELECT * FROM customer_ WHERE username='$user_username' AND password='$user_password'"; 
        $data = mysqli_query($dbc, $query);

        // If The log-in is OK 
        if (mysqli_num_rows($data) == 1) {
          
          $row = mysqli_fetch_array($data);

          //so set the user ID and username session vars
          $_SESSION['username'] = $user_username;

          //redirect to index.php 
          $home_url = "http://gwupyterhub.seas.gwu.edu/~obroadrick/hw4-obroadrick/src/store.php";
          header('Location: ' . $home_url);
        }
        else {
          // The username/password are incorrect so set an error message
          $error_msg = 'Sorry, you must enter a valid username and password to log in.';
        }
      }
      else {
        // The username/password weren't entered so set an error message
        $error_msg = 'Sorry, you must enter your username and password to log in.';
      }
    } 
    // Register new account instead of login
    else if (isset($_POST['submitregister'])) {
      // Connect to the database
      $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

      // Grab the user-entered register data
      $user_newusername = mysqli_real_escape_string($dbc, trim($_POST['newusername']));
      $user_firstname = mysqli_real_escape_string($dbc, trim($_POST['firstname']));
      $user_lastname = mysqli_real_escape_string($dbc, trim($_POST['lastname']));
      $user_newpassword = mysqli_real_escape_string($dbc, trim($_POST['newpassword0']));
      $user_newpassword1 = mysqli_real_escape_string($dbc, trim($_POST['newpassword1']));

      if (strcmp($user_newpassword, $user_newpassword1) != 0) {
        $error_msg = "The new passwords must match to register.";
      } else if (!empty($user_newusername) && !empty($user_newpassword)) {
        // Look up the username in the database to make sure it's not already taken
        $query = "SELECT * FROM customer_ WHERE username='$user_newusername'"; 
        $data = mysqli_query($dbc, $query);

        // If The log-in is OK 
        if (mysqli_num_rows($data) == 0) {
          // Add the log-in info to the database
          $insert = "INSERT INTO customer_ (username, password, firstname, lastname) VALUES ('$user_newusername','$user_newpassword','$user_firstname','$user_lastname')";
          mysqli_query($dbc, $insert);

          // Set the username session vars
          $_SESSION['username'] = $user_newusername;

          // Also create this user's cart
          $next_order_num = 1 + mysqli_fetch_array(mysqli_query($dbc,'SELECT MAX(ordernum) AS maxnum FROM order_made'))['maxnum'];
          $query = 'INSERT INTO order_made (isShoppingcart,ordernum,username) VALUES (1,' . $next_order_num . ',"' . $_SESSION['username'] . '")';
          mysqli_query($dbc, $query);

          //redirect to index.php 
          $home_url = "http://gwupyterhub.seas.gwu.edu/~obroadrick/hw4-obroadrick/src/store.php";
          header('Location: ' . $home_url);
        }
        else {
          // The username/password are incorrect so set an error message
          $error_msg = 'Sorry, you must enter a valid username and password to register.';
        }
      }
      else {
        // The username/password weren't entered so set an error message
        $error_msg = 'Sorry, you must enter your username and password to register.';
      }
    }

  }

  // Insert the page header
  $page_title = 'Log In';
  require_once('header.php');

  // Insert the navmenu
  require_once('navmenu.php');

  // If the session var is empty, show any error message and the log-in form; otherwise confirm the log-in
  if (empty($_SESSION['username'])) {
    echo '<p class="error">' . $error_msg . '</p>';
?>

  <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <fieldset>
      <legend>Log In</legend>
      <label for="username">Username:</label>
      <input type="text" name="username" value="<?php if (!empty($user_username)) echo $user_username; ?>" /><br />
      <label for="password">Password:</label>
      <input type="password" name="password" />
    </fieldset>
    <input type="submit" value="Log In" name="submitlogin" />
  </form>
  <br>
  <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
    <fieldset>
      <legend>Register a New Account</legend>
      <label for="username">Username:</label>
      <input type="text" name="newusername" value="<?php if (!empty($user_newusername)) echo $user_newusername; ?>" /><br />
      <label for="firstname">First Name:</label>
      <input type="text" name="firstname" value="<?php if (!empty($user_firstname)) echo $user_firstname; ?>" /><br />
      <label for="lastname">Last Name:</label>
      <input type="text" name="lastname" value="<?php if (!empty($user_lastname)) echo $user_lastname; ?>" /><br />
      <label for="password">Password:</label>
      <input type="password" name="newpassword0" /><br>
      <label for="password">Confirm Password:</label>
      <input type="password" name="newpassword1" />
    </fieldset>
    <input type="submit" value="Register" name="submitregister" />
  </form>

<?php
  }
  else {
    // Confirm the successful log-in
    echo('<p class="login">You are logged in as ' . $_SESSION['username'] . '.</p>');
  }
?>

<?php
  // Insert the page footer
  require_once('footer.php');
?>
