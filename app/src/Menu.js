import './App.css';
import { Link } from 'react-router-dom';

function handleClick() {
  window.location.href = "/search?" + encodeURIComponent(document.getElementById("searchBox").value)
}

function Menu() {
  return (
    <div className="App">
      <header className = "header">
        <ul className = 'navMenu'>
          <li><Link to="/" className='menuLink'><b>nullspeak</b></Link></li>
          <li><Link to="/post" className = 'menuLink'>Post</Link></li>
          <li><Link to="/about" className = 'menuLink'>FAQ</Link></li>
          <li><input placeholder='Query' className='search' id='searchBox' onkeydown = "if (event.keyCode == 13) {document.getElementById('btnSearch').click()}"></input></li>
          <li><button className='searchButton' onClick={handleClick}>Search</button></li>
        </ul> 
      </header>
    </div>
  );
}

export default Menu;
