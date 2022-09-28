import React from 'react';
import { Col, Button } from 'react-bootstrap';
import './ServiceCard.css';
import { Link } from 'react-router-dom';
import Icon from '../../../images/diagnostic.png';
import { addToLocalStorage } from '../../../utils/shopping_cart';

const ServiceCard = ({ service }) => {
  const { _id, serviceName, serviceImage, serviceDesc } = service;

  const background = {
    background: `url(${serviceImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '5px',
  };

  return (
    <Col md={6} lg={4} className="my-3">
      <div style={background} className="service">
        <div className="main">
          <h3>{serviceName}</h3>
          <div className='action-btn-box'>
            <Button style={{ marginRight: '10px' }} className="btn button">
              <Link className="btn__link" to={`/admin/book/${_id}`}>
                Book Service
              </Link>
            </Button>
            <Button onClick={() => addToLocalStorage(_id)} className="btn button">
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="overlay text-center">
          <div className="icon mb-2">
            <img src={Icon} alt="" />
          </div>
          <h3>{serviceName}</h3>
          <p>{serviceDesc}</p>
        </div>
      </div>
    </Col>
  );
};

export default ServiceCard;
