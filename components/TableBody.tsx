import React from "react";

interface TbodyProps {
  row: { [key: string]: any };
}

const TableBody: React.FC<TbodyProps> = ({ row }) => {
  const elKeys: string[] = [];
  const subKeys: string[] = [];
  let bodyKeys: string[] = [];

  Object.keys(row).forEach((el) => {
    if (el != "user" && el != "__v" && el != "_id") {
      if (!(typeof row[el] === "object")) {
        elKeys.push(row[el]);
      } else {
        Object.keys(row[el]).forEach((subEl: any) =>
          subKeys.push(row[el][subEl])
        );
      }
    }
  });

  bodyKeys = [...elKeys, ...subKeys];

  return (
    <tr>
      {bodyKeys.length > 0 &&
        bodyKeys.map((item, index) => {
          if (item === row["photo"]) {
            return (
              <td key={index}>
                <img alt="" src={`${item}`} />
              </td>
            );
          } else {
            return <td key={index}>{item.toUpperCase()}</td>;
          }
        })}
    </tr>
  );
};

export default TableBody;
