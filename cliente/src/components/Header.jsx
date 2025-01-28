import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-nav">
      <div>
        <ul className="header-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registro">Registrar</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}