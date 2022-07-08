import React, { useState, useRef, useCallback, useMemo } from "react";

import OrderComponent from "../components/order";
import MemberManager from "../components/memberManager";

const Order = () => {
  return (
    <>
      <MemberManager>
        <OrderComponent />
      </MemberManager>
    </>
  );
};

export default Order;
