import React from "react";

const StarRating = ({ rating }) => {
  // Calculate the number of full stars and half star
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 !== 0;

  // Create an array to hold the star elements
  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-400">
        ★
      </span>
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400">
        ★
      </span>
    );
  }

  // Add empty stars to reach a total of 5 stars
  while (stars.length < 5) {
    stars.push(
      <span key={stars.length} className="text-gray-300">
        ★
      </span>
    );
  }

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

export default StarRating;
