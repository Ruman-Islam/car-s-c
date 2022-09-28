import React, { useContext, useEffect, useState } from 'react';
import './Book.css';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Spinner } from 'react-bootstrap';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import fetcher from '../../../api/axios';
import Swal from 'sweetalert2';
const axios = require('axios');


const Book = () => {
  const [loggedInUser, , ,] = useContext(UserContext);
  const history = useHistory();
  const [loadData, setLoadData] = useState(true);
  const [serviceData, setServiceData] = useState({});
  const { displayName, email } = loggedInUser;
  const { serviceName, servicePrice, serviceImage, serviceDesc } = serviceData;
  const { id } = useParams();


  useEffect(() => {
    (async () => {
      try {
        const { data: { result } } = await fetcher.get(`get-a-service?id=${id}`)
        setLoadData(false);
        setServiceData(result);
      } catch (error) {
        setLoadData(false);
      }
    })()
  }, [loadData, id, serviceData]);


  const handlePayment = (e) => {
    e.preventDefault();
    const paymentInfo = {
      userName: displayName,
      email: email,
      serviceName,
      servicePrice,
      serviceImage,
      serviceDesc,
      date: new Date(),
    };

    (async () => {
      try {
        const res = await fetcher.post('add-a-order', paymentInfo)
        if (res?.status === 200) {
          const msg = res.data.result;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: msg,
            showConfirmButton: false,
            timer: 1500
          })
          history.push('/admin/book-list')
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    })()

  };

  return (
    <>
      <div className="p-3 d-flex justify-content-between dashboard__menu">
        <h3>Book</h3>
        <h4 className="primary__color">{loggedInUser.displayName}</h4>
      </div>
      <div className="sidebar__right p-3">
        {loadData ? (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <div className="bookData">
              <label>User Name</label>
              <h3>{displayName}</h3>
              <label>User Email</label>
              <h3>{email}</h3>
              <label>Service Name</label>
              <h3>{serviceName}</h3>
            </div>
            <div className="payment">
              <h5 className="py-4">Pay With Stripe</h5>
              {/* <ProcessPayment
                servicePrice={servicePrice}
                handlePayment={handlePayment}
              /> */}
              <form onSubmit={handlePayment}>
                <div className='payment-box-wrapper'>
                  <div>
                    <h5>Card number</h5>
                    <input placeholder='1234 1234 1234 1234' type="number" name="" id="" />
                  </div>
                  <div className='payment-box'>
                    <div>
                      <h5>Expiration date</h5>
                      <input placeholder='MM/YY' type="number" name="" id="" />
                    </div>
                    <div className='cvc'>
                      <h5>CVC</h5>
                      <input placeholder='CVC' type="number" name="" id="" />
                    </div>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h6>Your service charge {serviceData?.servicePrice} $</h6>
                    <button type='submit' className='place-order-btn'>Place Order</button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Book;
