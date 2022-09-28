import React, { useContext, useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import fetcher from '../../../api/axios';
import { UserContext } from '../../../App';
import NotAccess from '../NotAccess/NotAccess';
import OrderListTable from '../OrderListTable/OrderListTable';

const OrderList = () => {
  const [loggedInUser, , admin,] = useContext(UserContext);
  const [orderState, setOrderState] = useState({ status: '', });
  const [loadData, setLoadData] = useState(true);
  const [reload, setReload] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetcher.get('get-order-list');
        if (res.status === 200) {
          setLoadData(false);
          setOrders(res.data.result);
        }
      } catch (error) {
        setLoadData(false);
      }
    })()
  }, [reload]);

  const handleChange = (event) => {
    const name = event.target.name;
    setOrderState({
      ...orderState,
      [name]: event.target.value,
    });
  };


  return (
    <>
      {loadData ? (
        (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        )
      ) : <>
        <div className="p-3 d-flex justify-content-between dashboard__menu">
          <h3>Order List</h3>
          <h4 className="primary__color">{loggedInUser.displayName}</h4>
        </div>
        <div className="sidebar__right p-3">
          {admin ? (
            <Table>
              <thead className="tableHead">
                <tr>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Service Name</th>
                  <th>Pay With</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <OrderListTable
                    key={idx}
                    handleChange={handleChange}
                    order={order}
                    setReload={setReload}
                    reload={reload}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <NotAccess />
          )}
        </div>
      </>}
    </>
  );
};

export default OrderList;
