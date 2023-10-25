import React, { useEffect, useState } from "react";
import { Dashboard } from "../Components/Layouts/Dashboard";
import { deleteDataId, getAllData } from "../services/data.services";
import * as XLSX from "xlsx";

export const DataPage = () => {
  const [dataResult, setDataResult] = useState(null);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [responseDeletedData, setResponseDeletedData] = useState("");

  // Untuk Menangani row Yang Dihapus Tabel 1
  const handleDeleteRow = async (id) => {
    try {
      const response = await deleteDataId(id);

      // Melakukan Get Data lagi
      getAllData((data) => {
        //console.log(data);
        setDataResult(data);
      });

      setResponseDeletedData("");
      setResponseDeletedData(response.msg);
    } catch (error) {
      setResponseDeletedData(error.data.msg);
    }
  };

  // Mengambil data
  useEffect(() => {
    getAllData((data) => {
      //console.log(data);
      setDataResult(data);
    });
  }, []);

  const itemsPerPage = 10; // Maksimal 10 Data Yang Ditampilkan
  const maxPageNumbers = 5; // Maksimal 5 angka halaman yang ditampilkan

  // Render Tabel Data 1
  const renderTable1Data = () => {
    if (!dataResult) return null;

    // Filter data berdasarkan "tipe" yang memiliki nilai 1
    const filteredData = dataResult.filter((row) => row.Tipe == 1);

    const startIndex = (currentPage1 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredData.slice(startIndex, endIndex).map((row, index) => (
      <tr key={index}>
        <td>{startIndex + index + 1}</td>
        <td style={{ display: "none" }}>{row.id}</td>
        <td>{row.NIK}</td>
        <td>{row.Nama}</td>
        <td>{row.NamaFasyankes}</td>
        <td>
          <button
            className="badge rounded-pill btn btn-danger shadow"
            onClick={() => handleDeleteRow(row.id)}
          >
            Hapus
          </button>
        </td>
      </tr>
    ));
  };

  const renderTable2Data = () => {
    if (!dataResult) return null;

    // Filter data berdasarkan "tipe" yang memiliki nilai 1
    const filteredData = dataResult.filter((row) => row.Tipe == 0);

    const startIndex = (currentPage2 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredData.slice(startIndex, endIndex).map((row, index) => (
      <tr key={index}>
        <td>{startIndex + index + 1}</td>
        <td style={{ display: "none" }}>{row.id}</td>
        <td>{row.NIK}</td>
        <td>{row.Nama}</td>
        <td>{row.NamaFasyankes}</td>
        <td>
          <button
            className="badge rounded-pill btn btn-danger shadow"
            onClick={() => handleDeleteRow(row.id)}
          >
            Hapus
          </button>
        </td>
      </tr>
    ));
  };

  const renderPageNumbers = (totalPages, currentPage, setCurrentPage) => {
    const pageNumbers = [];
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
    let startPage = currentPage - halfMaxPageNumbers;
    let endPage = currentPage + halfMaxPageNumbers;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageNumbers;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          className={`page-link d-inline-block ${
            currentPage === i ? "active" : "none"
          }`}
          key={i}
          onClick={() => setCurrentPage(i)}
          style={{
            cursor: "pointer",
            textDecoration: currentPage === i ? "underline" : "none",
          }}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  // Fungsi untuk mengonversi JSON ke XLSX
  const ExportToExcel = (data, name) => {
    // Menggunakan map untuk menciptakan salinan data yang sudah difilter
    const filteredData = data.map(
      ({ id, Tipe, createdAt, updatedAt, ...rest }) => rest
    );

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DataSheet");
    XLSX.writeFile(wb, name + ".xlsx"); // Mengunduh file dengan nama 'data.xlsx'
  };

  return (
    <Dashboard>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mt-3 fs-1 fw-bold">
            <h1 className="h3 mb-4 mx-3 text-gray-800">Excel Data Page</h1>
          </div>
          {responseDeletedData && (
            <div className="row d-flex justify-content-center">
              <div className="col-xl-12">
                <div
                  className="alert alert-success alert-dismissible fade show text-center"
                  role="alert"
                  style={{ display: "block" }}
                >
                  <strong>{responseDeletedData}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setResponseDeletedData("");
                      const alert = document.querySelector(
                        ".alert.alert-warning"
                      );
                      if (alert) {
                        alert.style.display = "none";
                      }
                    }}
                  ></button>
                </div>
              </div>
            </div>
          )}
        </div>
        {dataResult ? (
          <div className="container-xl">
            <div className="row">
              <div className="col-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <div className="row d-flex justify-content-between">
                      <div className="col-4">
                        <h4 className="m-0 font-weight-bold text-primary">
                          Data Unik Dinkes
                        </h4>
                      </div>
                      <div className="col-4 text-end mr-5">
                        <button
                          type="submit"
                          className="  btn btn-success shadow"
                          onClick={() =>
                            ExportToExcel(
                              dataResult.filter((row) => row.Tipe == 1),
                              "Data_Dinkes"
                            )
                          }
                        >
                          Eksport
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-stripe"
                        id="dataTable"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>NIK</th>
                            <th>Nama Pasien</th>
                            <th>Nama Fasyankes</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>{renderTable1Data()}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between mb-2">
                    <div className="col-4">
                      <p className="h-5 ml-xl-4 text-gray-900 fw-bold">
                        Total :{" "}
                        {dataResult
                          ? dataResult.filter((row) => row.Tipe == 1).length
                          : 0}
                      </p>
                    </div>

                    <div className="col-4">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage1(currentPage1 - 1)}
                              disabled={currentPage1 === 1}
                            >
                              Previous
                            </button>
                          </li>
                          <li className="page-item">
                            {renderPageNumbers(
                              Math.ceil(
                                dataResult.filter((row) => row.Tipe == 1)
                                  .length / itemsPerPage
                              ),
                              currentPage1,
                              setCurrentPage1
                            )}
                          </li>
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage1(currentPage1 + 1)}
                              disabled={
                                currentPage1 * itemsPerPage >=
                                dataResult.filter((row) => row.Tipe == 1).length
                              }
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <div className="row d-flex justify-content-between">
                      <div className="col-4">
                        <h4 className="m-0 font-weight-bold text-primary">
                          Data Unik Komunitas
                        </h4>
                      </div>
                      <div className="col-4 text-end mr-5">
                        <button
                          type="submit"
                          className="  btn btn-success shadow"
                          onClick={() =>
                            ExportToExcel(
                              dataResult.filter((row) => row.Tipe == 0),
                              "Data_Komunitas"
                            )
                          }
                        >
                          Eksport
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-stripe"
                        id="dataTable"
                        width="100%"
                      >
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>NIK</th>
                            <th>Nama</th>
                            <th>Nama Fasyankes</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>{renderTable2Data()}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between">
                    <div className="col-4">
                      <p className="h-5 ml-xl-4 text-gray-900 fw-bold">
                        Total :{" "}
                        {dataResult
                          ? dataResult.filter((row) => row.Tipe == 0).length
                          : 0}
                      </p>
                    </div>
                    <div className="col-4">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage2(currentPage2 - 1)}
                              disabled={currentPage2 === 1}
                            >
                              Previous
                            </button>
                          </li>
                          <li className="page-item">
                            {renderPageNumbers(
                              Math.ceil(
                                dataResult.filter((row) => row.Tipe == 0)
                                  .length / itemsPerPage
                              ),
                              currentPage2,
                              setCurrentPage2
                            )}
                          </li>
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage2(currentPage2 + 1)}
                              disabled={
                                currentPage1 * itemsPerPage >=
                                dataResult.filter((row) => row.Tipe == 0).length
                              }
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="h-5 mb-4 ml-xl-4 text-gray-800">Tidak Ada Data</p>
          </>
        )}
      </div>
    </Dashboard>
  );
};
