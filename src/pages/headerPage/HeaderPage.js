// // import './HeaderPage.css';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import ltiImage from '../../assests/LTI.png';

function HeaderPage() {
    return (
      <nav className="navbar bg-dark">
        <div className="container-fluid">
            <img src={ltiImage} height="50"/>
        </div>
    </nav>
  );
}

export default HeaderPage;