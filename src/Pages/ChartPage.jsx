import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Dashboard } from "../Components/Layouts/Dashboard";
import { getAllData } from "../services/data.services";
import Select from "react-select";

export const ChartPage = () => {
  const data = [
    {
      name: "Januari",
      Terdiagnosa: 300,
      Meninggal: 30,
      Sembuh: 20,
    },
    {
      name: "Februari",
      Terdiagnosa: 200,
      Meninggal: 10,
      Sembuh: 30,
    },
    {
      name: "Maret",
      Terdiagnosa: 100,
      Meninggal: 2,
      Sembuh: 30,
    },
    {
      name: "April",
      Terdiagnosa: 231,
      Meninggal: 1,
      Sembuh: 27,
    },
    {
      name: "Mei",
      Terdiagnosa: 293,
      Meninggal: 12,
      Sembuh: 40,
    },
    {
      name: "Juni",
      Terdiagnosa: 120,
      Meninggal: 20,
      Sembuh: 20,
    },
    {
      name: "Juli",
      Terdiagnosa: 80,
      Meninggal: 4,
      Sembuh: 10,
    },
    {
      name: "Agustus",
      Terdiagnosa: 70,
      Meninggal: 30,
      Sembuh: 4,
    },
    {
      name: "September",
      Terdiagnosa: 30,
      Meninggal: 30,
      Sembuh: 0,
    },
    {
      name: "Oktober",
      Terdiagnosa: 80,
      Meninggal: 0,
      Sembuh: 20,
    },
    {
      name: "November",
      Terdiagnosa: 67,
      Meninggal: 2,
      Sembuh: 3,
    },
    {
      name: "Desember",
      Terdiagnosa: 30,
      Meninggal: 9,
      Sembuh: 6,
    },
  ];
  const [kota, setKota] = useState(null);

  // Mengambil data
  useEffect(() => {
    getAllData((data) => {
      const datanew = new Set(data.map((item) => item.KabupatenKota));
      const datanewunik = [...datanew];
      const result = datanewunik.map((data) => {
        return {
          value: data,
          label: data,
        };
      });
      setKota(result);
    });
  }, []);
  return (
    <Dashboard>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mt-3 fs-1 fw-bold">
            <h1 className="h3 mb-4 mx-3 text-gray-800">Tuberculosis Data</h1>
          </div>
          <div className="row">
            <div className="col-4 ml-3 mb-4">
              <Select options={kota} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-md-8">
            <BarChart
              width={1200}
              height={500}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Terdiagnosa" fill="#5187fc" />
              <Bar dataKey="Meninggal" fill="#fc3903" />
              <Bar dataKey="Sembuh" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
