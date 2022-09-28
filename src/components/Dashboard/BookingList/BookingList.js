import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';
import { UserContext } from '../../../App';
import BookingListCard from '../BookingListCard/BookingListCard';


const BookingList = () => {
  const [loggedInUser,] = useContext(UserContext);
  const [loadData, setLoadData] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetcher.get(`get-user-book-list?email=${loggedInUser?.email}`)
        if (res.status === 200) {
          setLoadData(false)
          setUserOrders(res.data.result)
        }
      } catch (error) {
        setLoadData(false)
      }
    })()
  }, [loggedInUser.email]);


  return (
    <>
      {loadData ? (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="p-3 d-flex justify-content-between">
            <h3>Book List</h3>
            <h4 className="primary__color">{loggedInUser.displayName}</h4>
          </div>
          <div className="sidebar__right p-3">
            <p>Number of Orders {userOrders.length}</p>
            <div className="p-3">
              {userOrders.length > 0 ? (
                <Row>
                  {userOrders.map((orders, idx) => (
                    <BookingListCard key={idx} orders={orders} />
                  ))}
                </Row>
              ) : (
                <>
                  <h3 className="text-center">Your Haven't Order Yet</h3>
                  <span
                    style={{ textDecoration: 'underline' }}
                    className="d-block text-center"
                  >
                    <Link className="backToHome" to={'/'}>
                      Back To Home
                    </Link>
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingList;
