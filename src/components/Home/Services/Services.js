import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import fetcher from '../../../api/axios';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loadData, setLoadData] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const { data: { result } } = await fetcher.get('get-all-service')
        setLoadData(false);
        setServices(result);
      } catch (error) {
        setLoadData(false);
      }
    })()

  }, []);


  return (
    <section>
      <div className="text-center title">
        <h6 className="primary__color font__bold">OUR SERVICES</h6>
        <h2>Our Featured Services</h2>
      </div>
      {loadData ? (
        <div className="spin">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container>
          <Row className="py-4">
            {services?.map((service, idx) => (
              <ServiceCard key={idx} service={service} />
            ))}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Services;
