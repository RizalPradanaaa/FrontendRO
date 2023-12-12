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
import { getAllData, getDataByCity } from "../services/data.services";
import Select from "react-select";

export const ChartPage = () => {
  //   const datas = [
  //     {
  //       name: "Januari",
  //       "Meninggal sebelum pengobatan": 1,
  //       "Akan Diobati/Dirujuk": 3,
  //     },
  //   ];
  const [data, setData] = useState(null);
  const [kota, setKota] = useState(null);
  const [diagnosa, setDiagnosa] = useState([]);
  const [responsedata, setResponsedata] = useState("");

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

  //   const handleChange = async (e) => {
  //     const city = e.value;
  //     try {
  //       // Fetch Data API
  //       const response = await getDataByCity(city);

  //       //  Mengambil data bulan
  //       const bulan = new Set(response.map((item) => item.Bulan));
  //       const bulanunik = [...bulan];
  //       console.log(bulanunik);

  //       //  Mengambil data tndak lanjut
  //       const diagnosares = new Set(response.map((item) => item.TindakLanjut));
  //       const diagnosaunik = [...diagnosares];

  //       // Membuat object untuk data
  //       const result = response.reduce((accumulator, item) => {
  //         const tindakLanjut = item.TindakLanjut;

  //         // Mengecek apakah tindak lanjut sudah ada dalam objek accumulator
  //         if (accumulator.hasOwnProperty(tindakLanjut)) {
  //           accumulator[tindakLanjut]++;
  //         } else {
  //           accumulator[tindakLanjut] = 1;
  //         }

  //         return accumulator;
  //       }, {});

  //       // Menambahkan field 'name' dan mengubah format objek
  //       const resultWithNames = {
  //         name: "Januari", // Gantilah dengan nilai yang sesuai
  //         ...result,
  //       };

  //       setData([resultWithNames]);

  //       setDiagnosa(diagnosaunik);
  //     } catch (error) {
  //       setResponsedata(error.data.msg);
  //     }
  //   };

  const handleChange = async (e) => {
    const city = e.value;
    try {
      // Fetch Data API
      const response = await getDataByCity(city);

      //  Mengambil data tndak lanjut
      const diagnosares = new Set(response.map((item) => item.TindakLanjut));
      const diagnosaunik = [...diagnosares];
      setDiagnosa(diagnosaunik);

      // Mengambil data bulan
      const bulanUnik = [...new Set(response.map((item) => item.Bulan))];

      // Membuat array untuk menyimpan hasil setiap bulan
      const resultByMonth = [];

      // Loop melalui setiap bulan
      bulanUnik.forEach((bulan) => {
        // Filter data berdasarkan bulan
        const dataByMonth = response.filter((item) => item.Bulan === bulan);

        // Membuat objek untuk data
        const result = dataByMonth.reduce((accumulator, item) => {
          const tindakLanjut = item.TindakLanjut;

          // Mengecek apakah tindak lanjut sudah ada dalam objek accumulator
          if (accumulator.hasOwnProperty(tindakLanjut)) {
            accumulator[tindakLanjut]++;
          } else {
            accumulator[tindakLanjut] = 1;
          }

          return accumulator;
        }, {});

        // Menambahkan field 'name' dan mengubah format objek
        const resultWithNames = {
          name: bulan,
          ...result,
        };

        // Menyimpan hasil untuk bulan ini ke dalam array
        resultByMonth.push(resultWithNames);
      });

      // Menyimpan hasil akhir ke dalam state atau melakukan operasi lain sesuai kebutuhan
      console.log(resultByMonth);
      setData(resultByMonth);
    } catch (error) {
      setResponsedata(error.data.msg);
    }
  };

  // Fungsi bantu untuk mendapatkan warna berdasarkan key (opsional)
  const getFillColorByKey = (key) => {
    switch (key) {
      case "Akan Diobati/Dirujuk":
        return "#42f59b";
      case "Belum Mulai Pengobatan":
        return "#d7f542";
      case "Lost to follow up sebelum pengobatan":
        return "#f5c542";
      case "Melanjutkan Pengobatan Sebelumnya":
        return "#42bff5";
      case "Meninggal sebelum pengobatan":
        return "#f54263";
      default:
        return "#b342f5"; // Warna default atau sesuaikan dengan kebutuhan Anda
    }
  };

  return (
    <Dashboard>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mt-3 fs-1 fw-bold">
            <h1 className="h3 mb-4 mx-3 text-gray-800">Tuberculosis Data</h1>
          </div>
          <div className="row">
            <div className="col-4 ml-3 mb-4">
              <Select options={kota} onChange={(e) => handleChange(e)} />
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

              {diagnosa.map((key, index) => (
                <Bar key={index} dataKey={key} fill={getFillColorByKey(key)} />
              ))}
            </BarChart>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
