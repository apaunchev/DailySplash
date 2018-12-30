import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";

const StyledClock = styled.div`
  color: #fff;
  font-size: 24px;
  line-height: 1;
`;

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useInterval(() => setDate(new Date()), 1000);

  return (
    <StyledClock>
      {date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })}
    </StyledClock>
  );
};

export default Clock;
