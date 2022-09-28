import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import fetcher from '../../../api/axios';
import ReviewCard from '../ReviewCard/ReviewCard';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: { result } } = await fetcher.get('get-all-review')
        setLoadData(false);
        setReviews(result);
      } catch (error) {
        setLoadData(false);
      }
    })()

  }, []);

  return (
    <section className="review ">
      <div className="text-center title">
        <h6 className="primary__color font__bold">CLIENT REVIEW</h6>
        <h2>Our Service Review</h2>
      </div>
      {loadData ? (
        <div className="spin">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container>
          <Row className="py-4">
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} reviewInfo={review} />
            ))}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Review;
