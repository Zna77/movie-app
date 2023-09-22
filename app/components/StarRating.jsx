import React from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  // Calculate the number of full stars and half star
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 !== 0;

  // Create an array to hold the star elements
  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400 text-2xl" />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <FaStar key="half" className="text-yellow-400 text-2xl half-star" />
    );
  }

  // Add empty stars to reach a total of 5 stars
  while (stars.length < 5) {
    stars.push(
      <FaStar key={stars.length} className="text-gray-300 text-2xl" />
    );
  }

  return <div className="flex">{stars.map((star, index) => star)}</div>;
};

export default StarRating;
