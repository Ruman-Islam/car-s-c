import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fetcher from '../../../api/axios';
import { UserContext } from '../../../App';
import { getStoredCart } from '../../../utils/shopping_cart';

const EmptyBook = () => {
  const [loggedInUser,] = useContext(UserContext);
  const [shoppingCartServices, setShoppingCartServices] = useState([]);
  const shoppingCart = Object.keys(getStoredCart());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetcher.post('get-user-shopping-cart', { shoppingCart: shoppingCart })
        if (res.status === 200) {
          setShoppingCartServices(res.data.result);
        }
      } catch (error) {

      }
    })()
  }, [])


  return (
    <>
      <div className="p-3 d-flex justify-content-between dashboard__menu">
        <h3>Order List</h3>
        <h4 className="primary__color">{loggedInUser.displayName}</h4>
      </div>
      {shoppingCartServices.length > 0 ?
        <Row>
          {shoppingCartServices?.map((sv, index) => {
            return (
              <Col lg={4} md={6} className="my-2">
                <div className="bookingCard rounded">
                  <div className="Card__top d-flex justify-content-between mb-3">
                    <div className="img">
                      <img className="rounded" src={sv?.serviceImage} alt={sv?.serviceName} />
                    </div>
                  </div>
                  <h3>{sv?.serviceNam}</h3>
                  <p>{sv?.serviceDesc}</p>
                  <Button style={{ marginRight: '10px' }} className="btn button">
                    <Link className="btn__link" to={`/admin/book/${sv?._id}`}>
                      Book Service
                    </Link>
                  </Button>
                </div>
              </Col>
            )
          })}
        </Row>
        :
        <div className="sidebar__right p-3">
          <h3 style={{ color: '#6b7c93' }} className="text-center">
            Your Card is Empty
          </h3>
          <span
            style={{ textDecoration: 'underline' }}
            className="d-block text-center"
          >
            <Link className="backToHome" to={'/'}>
              Back To Home
            </Link>
          </span>
        </div>}
    </>
  );
};

export default EmptyBook;
