import styles from "../../styles/dashboard/statistics.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useContext, useRef } from "react";
const data = [
  {
    name: "JAN",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "FEB",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "MAR",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "APR",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "JUN",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "JUL",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Statistics = () => {
  return (
    <>
      <div className={styles.Section}>
        <div className={styles.NavContainer}>
          <h1 className={styles.Header}>Statistics</h1>

          <div className={styles.search}>
            <input type="text" placeHolder="search property" />
            <img src="/navbar/search.svg" />
          </div>
        </div>

        <div className={styles.BoxContainer}>
          <div className={styles.Box}>
            <div className={styles.BoxHeader}>
                <Selection />
            </div>

              <div className={styles.ChartContainer}>
              <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="name" />
          
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#05458D" activeDot={{ r: 9 }} />
          
        </LineChart>
      </ResponsiveContainer>
              </div>
          </div>

          <p>Phone</p>
        </div>
      </div>
    </>
  );
};

export default Statistics;

const Selection = () => {
  const [type, setType] = useState("allListing");

  let allListing = "allListing";
  let recentlyAdded = "recentlyAdded";
  let featured = "featured";

  const handleChange = (newType) => {
    setType(newType);
  };

  return (
    <>
      <div className={styles.selection}>
        <p
          className={`${
            type === "allListing" ? styles.selected : styles.unselected
          }`}
          onClick={() => handleChange("allListing")}
        >
          All listings
        </p>
        <p
          className={`${
            type === "recentlyAdded" ? styles.selected : styles.unselected
          }`}
          onClick={() => handleChange("recentlyAdded")}
        >
          Recent
        </p>

        <p
          className={`${
            type === "featured" ? styles.selected : styles.unselected
          }`}
          onClick={() => handleChange("featured")}
        >
          Featured
        </p>
      </div>

      
        <select name="" className={styles.Date}>
          <option value="">This Year</option>
        </select>
      
    </>
  );
};
