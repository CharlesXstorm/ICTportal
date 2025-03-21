"use client";

import React from "react";
import { tableHead as Thead } from "@/data";
// import userData from "../data/userData.json"
import TableBody from "./TableBody";
import { useStore } from "@/store";

const AdminPanel = () => {
  const adminData = useStore((state) => state.adminData);
  // let Tbody;
  // if (adminData) {
  //   Tbody = [...adminData];
  // }
  // console.log("admin data", adminData)
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Thead.map((items, index) => (
              <th key={index}>{items}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adminData?.map((item, index) => (
            <TableBody key={index} row={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
