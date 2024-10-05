import React from "react";
import ReactStars from "react-rating-stars-component";
import "../styles.css";
import profileImg from "../../img/user/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    color: "hsl(0, 0%, 47%)",
    size: window.innerWidth < 600 ? 20 : 28,
    isHalf: true,
    value: review.rating,
    edit: false,
  };

  return (
    <>
      <div className="container">
        <div className="testimonials-box">
          {/* <!-- top --> */}
          <div className="box-top">
            {/* <!--profile --> */}
            <div className="profile">
              {/* <!-- img --> */}
              <div className="profile-img">
                <img src={profileImg} alt="user" />
              </div>
              {/* <!-- user name and name --> */}
              <div className="name-user">
                <strong>
                  {review.firstName} {review.lastName}
                </strong>
                <span>@{review.Username}</span>
              </div>
            </div>
            {/* <!-- reviews --> */}
            <div className="reviews">
              <ReactStars {...options} />
            </div>
          </div>

          {/* <!-- comments --> */}
          <div className="client-comment">
            <p>{review.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
