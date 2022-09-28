import React from 'react';
import Select from '@material-ui/core/Select';
import './OrderListTable.css';
import fetcher from '../../../api/axios';
import Swal from 'sweetalert2';


const OrderListTable = ({
  order,
  handleChange,
  updateLoader,
  setReload,
  reload
}) => {

  const { _id, serviceName, userName, email, payWith, orderStatus } = order;
  let className;
  switch (orderStatus) {
    case 'Pending':
      className = 'pending';
      break;
    case 'Done':
      className = 'done';
      break;
    case 'On-going':
      className = 'ongoing';
      break;
    default:
      className = 'default';
      break;
  }

  const handleUpdate = async (e, id) => {

    const res = await fetcher.patch(`update-order-status?status=${e.target.value}&id=${id}`)
    if (res.status === 200) {
      setReload(!reload);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order status updated',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setReload(!reload);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  };


  return (
    <tr>
      <td>{serviceName}</td>
      <td>{userName}</td>
      <td>{email}</td>
      <td style={{ textTransform: 'capitalize' }}>{payWith}</td>
      <td>
        <Select
          className={className}
          native
          value={orderStatus}
          onChange={(e) => handleUpdate(e, _id)}
        >
          <option value={orderStatus}>{orderStatus}</option>
          <option value="Pending">Pending</option>
          <option value="On-going">On Going</option>
          <option value="Done">Done</option>
        </Select>
      </td>
    </tr>
  );
};

export default OrderListTable;
