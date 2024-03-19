"use client";
import CategoryOrLabelModel from "@/components/CategoryOrLabelModel";
import React, { useState } from "react";

const page = () => {
  const [lableData, setLableData] = useState([]);
  const [filterLabelData, setFilterLabelData] = useState([]);
  return (
    <CategoryOrLabelModel
      myData={lableData}
      setMyData={setLableData}
      filterMyData={filterLabelData}
      setFilterMyData={setFilterLabelData}
    />
  );
};

export default page;
