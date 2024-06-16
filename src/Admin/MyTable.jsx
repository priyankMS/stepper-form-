import React, { useEffect, useState } from "react";
import Model from "./Model";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyTable = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("formData");
    console.log(JSON.parse(data));
    setUserData(data ? JSON.parse(data) : []);
  }, []);

  const [search, setSearch] = useState("");

  const columns = userData.length > 0 ? Object.keys(userData[0]) : [];

  const value = columns.slice(0, 5);

  function handleDelete(id) {
    const filterItem = userData.filter((item) => item.useId !== id);
    localStorage.setItem("formData", JSON.stringify(filterItem));
    setUserData(filterItem);
  }

  const filteredData = userData.filter((item) => {
    const seachTerm = search.toLowerCase();

    const firstname = item.firstname?.toLowerCase() || "";
    const lastname = item.lastname?.toLowerCase() || "";
    const email = item.email?.toLowerCase() || "";
    const gender = item.gender?.toLowerCase() || "";
    const age = item.age?.toLowerCase() || "";

    return (
      firstname.includes(seachTerm) ||
      lastname.includes(seachTerm) ||
      email.includes(seachTerm) ||
      gender.includes(seachTerm) ||
      age.includes(seachTerm)
    );
  });

  const [sort, setSort] = useState("ASC");

  function handleSort(column) {
    const sortedData = userData.sort((a, b) => {
      if (sort === "ASC") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setSort(sort === "ASC" ? "DSC" : "ASC");
    setUserData([...sortedData]);
  }

  const generatePDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait";
    const doc = new jsPDF();
    const header = [
      [
        "F-Name",
        "L-Name",
        "Email",
        "Gender",
        "Age",
        "Dose1",
        "Date",
        "Dose2",
        "Date",
        "Dose3",
        "Date",
      ],
    ];
    const data = userData.map((item) => [
      item.firstname,
      item.lastname,
      item.email,
      item.gender,
      item.age,
      item.selectedValues[0],
      item.date[0],
      item.selectedValues[1],
      item.date[1],
      item.selectedValues[2],
      item.date[2],
    ]);

    let content = {
      startY: 50,
      head: header,
      body: data,
    };

    autoTable(doc, content);
    doc.save("table.pdf");
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", padding: "10px" }}>
        <label htmlFor="search-form">
          <span style={{marginRight:"10px"}}>search</span>
          <input
            type="search"
            name="search-form"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search here..."
          />
        </label>
      </div>

      <table className="table">
        <thead>
          {
            <>
              <tr>
                <th rowSpan={2}>
                  <div>
                    <span>firstname</span>
                  </div>
                </th>
                <th rowSpan={2}>Last Name</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Gender</th>
                <th rowSpan={2} onClick={() => handleSort(columns[4])}>
                  <div>
                    <span>age</span>
                    <span style={{cursor:"pointer"}}>
                      {sort === "ASC" ? (
                        <SortAscendingOutlined />
                      ) : (
                        <SortDescendingOutlined />
                      )}
                    </span>
                  </div>
                </th>
                <th colSpan={6} onClick={() => handleSort(columns)}>
                  <div>
                    <span>vaccine</span>
                    <span style={{cursor:"pointer"}}>
                      {sort === "ASC" ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      )}
                    </span>
                  </div>
                </th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Dose1</th>
                <th>date</th>
                <th>Dose2</th>
                <th>date</th>
                <th>Dose3</th>
                <th>date</th>
              </tr>
            </>
          }
        </thead>
        <tbody className="tbody">
          {filteredData.length > 0 &&
            filteredData.map((item) => (
              <tr key={item.id}>
                {value.map((column) => (
                  <>
                    <td key={column}>{item[column]}</td>
                  </>
                ))}
                <td>{item.selectedValues[0]}</td>
                <td>{item.date[0]}</td>
                <td>{item.selectedValues[1]}</td>
                <td>{item.date[1]}</td>
                <td>{item.selectedValues[2]}</td>
                <td>{item.date[2]}</td>

                <button onClick={() => handleDelete(item.useId)}>delete</button>

                <Model
                  userData={userData}
                  setUserData={setUserData}
                  useId={item.useId}
                />
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default React.memo(MyTable);
