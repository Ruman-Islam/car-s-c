import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';
import { UserContext } from '../../../App';
import ManageServiceCard from '../ManageServiceCard/ManageServiceCard';
import NotAccess from '../NotAccess/NotAccess';

const ManageService = () => {
  const [loggedInUser, , admin,] = useContext(UserContext);
  const [loadData, setLoadData] = useState(true);
  const [reload, setReload] = useState(false);
  const [manageServices, setManageServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: { result } } = await fetcher.get('get-all-service')
        setLoadData(false);
        setManageServices(result);
      } catch (error) {
        setLoadData(false);
      }
    })()

  }, [reload]);

  const deleteService = async (id) => {
    const res = await fetcher.patch(`delete-service?id=${id}`)
    if (res.status === 200) {
      setReload(!reload)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Service deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  return (
    <>
      {loadData ? (
        <div className="spinner">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className="p-3 d-flex justify-content-between">
            <h3>Add Review</h3>
            <h4 className="primary__color">{loggedInUser.displayName}</h4>
          </div>
          <div className="sidebar__right p-3">
            {admin ? (
              <Row>
                {manageServices.map((service, idx) => (
                  <ManageServiceCard
                    key={idx}
                    deleteService={deleteService}
                    service={service}
                  />
                ))}
              </Row>
            ) : (
              <NotAccess />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ManageService;
