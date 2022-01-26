import React, { useState } from 'react';
import { VscStarFull } from 'react-icons/vsc';
import styled from 'styled-components';

const StarLabel = styled.div`
  display: inline-block;
  label {
    input {
      display: none;
    }
    .star {
      cursor: pointer;
      color: 200ms;
    }
  }
`;
export default function StarRating() {
  const [rating, setRating] = useState(null);
  console.log(rating);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <StarLabel>
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <VscStarFull
                size={30}
                className="star"
                color={ratingValue <= rating ? '#ffc107' : 'black'}
              />
            </label>
          </StarLabel>
        );
      })}
    </div>
  );
}
