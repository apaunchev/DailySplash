import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";

const StyledClock = styled.div`
  color: #fff;
  font-size: 7.5rem;
  font-weight: 500;
  line-height: 1;
  text-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  user-select: none;

  @media (min-width: 768px) {
    font-size: 10rem;
  }
`;

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useInterval(() => setDate(new Date()), 1000);

  return (
    <StyledClock>
      {date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </StyledClock>
  );
};

export default Clock;
