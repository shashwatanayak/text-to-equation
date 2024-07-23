<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style>
    /* Basic Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .header-main {
      background: #f4f4f4; /* Light background */
      color: #333;
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 1000;
    }
    
    

    .header-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
    }

    .header-logo {
      display: flex;
      align-items: center;
    }

    .header-logo img {
      height: 50px; /* Logo size can be adjusted */
    }

    .header-title {
      margin-left: 20px;
      color: #000; /* Lighter text */
      font-size: 18px;
    }

    .header-links {
      list-style: none;
      display: flex;
    }

    .header-links li {
      padding: 0 10px;
    }

    .header-links a {
      color: #333;
      text-decoration: none;
    }

    .header-menu-toggle {
      display: none;
      font-size: 24px;
      cursor: pointer;
    }
    
    img{border-radius:58px;}

    @media (max-width: 768px) {
      .header-links {
        display: none;
        position: absolute;
        background-color: #f4f4f4; /* Light background for mobile menu */
        right: 0;
        left: 0;
        top: 60px; /* Adjusted to not overlap the logo */
        flex-direction: column;
        width: 100%;
      }

      .header-menu-toggle {
        display: block;
      }

      .header-links li {
        text-align: center;
        padding: 10px 0;
      }
    }
</style>
</head>
<body>
<header class="header-main">
  <nav class="header-nav">
    <div class="header-logo">
      <img src="assets/misc/logo.png" alt="Logo"> 
      <h2 class="header-title">Type to Equation</h2>
    </div>
    <div class="header-menu-toggle" onclick="toggleMenu()">
      <i class="fas fa-bars"></i>
    </div>
    <ul class="header-links">
      <li><a href="v2.php">MathJax 2</a></li>
      <li><a href="v3.php">MathJax 3</a></li>
    </ul>
  </nav>
</header>

<script>
function toggleMenu() {
  const links = document.querySelector('.header-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
  }
}
</script>
</body>
</html>
