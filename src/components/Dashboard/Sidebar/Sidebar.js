import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faThLarge,
  faShoppingCart,
  faShoppingBasket,
  faCommentDots,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';
import UseAdmin from '../../../hooks/UseAdmin';

const Sidebar = () => {
  const { url } = useRouteMatch();
  const [loggedInUser, , ,] = useContext(UserContext);
  const { isAdmin } = UseAdmin(loggedInUser);

  // useEffect(() => {

  //   fetch(`http://localhost:8000/isAdmin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email: loggedInUser.email }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setAdmin(data));

  // }, [loggedInUser.email, setAdmin]);

  return (
    <>
      {isAdmin ? (
        <>
          <Link className="sidebarLink" to={`${url}`}>
            <span>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            Order List
          </Link>
          <Link className="sidebarLink" to={`${url}/addService`}>
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            Add Service
          </Link>
          <Link className="sidebarLink" to={`${url}/make-admin`}>
            <span>
              <FontAwesomeIcon icon={faUserPlus} />
            </span>
            Make Admin
          </Link>
          <Link className="sidebarLink" to={`${url}/manage-service`}>
            <span>
              <FontAwesomeIcon icon={faThLarge} />
            </span>
            Manage Services
          </Link>
        </>
      ) : (
        <>
          <Link className="sidebarLink" to={`${url}/book`}>
            <span>
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
            Cart
          </Link>
          <Link className="sidebarLink" to={`${url}/book-list`}>
            <span>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </span>
            Book List
          </Link>
          <Link className="sidebarLink" to={`${url}/addReview`}>
            <span>
              <FontAwesomeIcon icon={faCommentDots} />
            </span>
            Add Review
          </Link>
        </>
      )}
    </>
  );
};

export default Sidebar;
