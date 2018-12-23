import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../hooks/useInterval";

const Clock = styled.div`
  color: white;
  font-size: 10rem;
  font-weight: 500;
  line-height: 1;
  text-align: center;
`;

export default () => {
  const [date, setDate] = useState(new Date());

  useInterval(() => setDate(new Date()), 1000);

  return (
    <Clock>
      {date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })}
    </Clock>
  );
};
