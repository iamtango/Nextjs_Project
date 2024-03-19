"use client";
import HelpDeskTable from "@/components/HelpDeskTable";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    help_topic: "Billing",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "ISVN",
    department: "Support",
    priority: "Normal",
  },
  {
    id: 2,
    help_topic: "Bouncing",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "AWARE",
    department: "Support",
    priority: "Emergency",
  },
  {
    id: 3,
    help_topic: "Support",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "Cloud",
    department: "Support",
    priority: "High",
  },
  {
    id: 4,
    help_topic: "Bouncing",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "ISVN",
    department: "Support",
    priority: "Normal",
  },
  {
    id: 5,
    help_topic: "Billing",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "AWARE",
    department: "Support",
    priority: "Emergency",
  },
  {
    id: 6,
    help_topic: "Support",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "ISVN",
    department: "Support",
    priority: "High",
  },
  {
    id: 7,
    help_topic: "Bouncing",
    status: "Active",
    autoresponse: "Yes",
    inventory_type: "AWARE",
    department: "Support",
    priority: "Emergency",
  },
];

const page = () => {
  const [helpTopics, setHelpTopics] = useState([]);
  const [filterHelpTopics, setFilterHelpTopics] = useState([]);
  return (
    <HelpDeskTable
      data={data}
      helpTopics={helpTopics}
      setHelpTopics={setHelpTopics}
      filterHelpTopics={filterHelpTopics}
      setFilterHelpTopics={setFilterHelpTopics}
    />
  );
};

export default page;
