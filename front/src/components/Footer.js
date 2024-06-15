import '../scss/common/common.scss'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <ul>
          <li>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/security">Security</Link>
            <Link to="/status">Status</Link>
            <Link to="/docs">Docs</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
