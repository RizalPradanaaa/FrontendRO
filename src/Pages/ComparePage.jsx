import React, { useState } from "react";
import { Dashboard } from "../Components/Layouts/Dashboard";
import { compareExcel } from "../services/compare.services";
import { saveData } from "../services/data.services";

export const ComparePage = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonnull, setComparisonnull] = useState("");
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [responseSaveData, setResponseSaveData] = useState("");

  // Untuk Menangani Bulan
  // Daftar nama bulan
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Mendapatkan nama bulan saat ini
  const currentMonth = months[new Date().getMonth()];

  // State untuk menyimpan nilai bulan yang dipilih
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Fungsi untuk menangani perubahan pada pilihan bulan
  const handleMonthChange = (event) => {
    const selected = event.target.value;
    setSelectedMonth(selected);
  };

  // Untuk Menangani File Upload
  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await compareExcel(file1, file2);

      setComparisonResult(response);
    } catch (error) {
      setComparisonnull(error.data.msg);
    }
  };

  const handleSaveData1 = async (e) => {
    e.preventDefault();
    const data = comparisonResult.file1NotInFile2;
    // Menambah Tipe Untuk Membedakan Tipe
    data.forEach((e) => {
      e.Tipe = 1;
      e.Bulan = selectedMonth;
    });
    //console.log(data);
    try {
      const response = await saveData(data);
      setResponseSaveData(response.msg);
    } catch (error) {
      setResponseSaveData(error.data.msg);
    }
  };

  const handleSaveData2 = async (e) => {
    e.preventDefault();
    const data = comparisonResult.file2NotInFile1;
    // Menambah Tipe Untuk Membedakan Tipe
    data.forEach((e) => {
      e.Tipe = 0;
    });
    //console.log(data);
    try {
      const response = await saveData(data);
      setResponseSaveData(response.msg);
    } catch (error) {
      setResponseSaveData(error.data.msg);
    }
  };

  const itemsPerPage = 10; // Maksimal 10 Data Yang Ditampilkan
  const maxPageNumbers = 5; // Maksimal 5 angka halaman yang ditampilkan

  // Untuk Menangani File Yang Dihapus Tabel 1
  const handleDeleteRow1 = (index) => {
    const updatedFile1NotInFile2 = [...comparisonResult.file1NotInFile2];
    updatedFile1NotInFile2.splice(index, 1);
    setComparisonResult({
      ...comparisonResult,
      file1NotInFile2: updatedFile1NotInFile2,
    });
  };
  // Untuk Menangani File Yang Dihapus Tabel 2
  const handleDeleteRow2 = (index) => {
    const updatedFile2NotInFile1 = [...comparisonResult.file2NotInFile1];
    updatedFile2NotInFile1.splice(index, 1);
    setComparisonResult({
      ...comparisonResult,
      file2NotInFile1: updatedFile2NotInFile1,
    });
  };

  // Render Tabel Data 1
  const renderTable1Data = () => {
    if (!comparisonResult) return null;

    const startIndex = (currentPage1 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return comparisonResult.file1NotInFile2
      .slice(startIndex, endIndex)
      .map((row, index) => (
        <tr key={index}>
          <td>{startIndex + index + 1}</td>
          <td>{row.NIK}</td>
          <td>{row.Nama}</td>
          <td>{row.KabupatenKota}</td>
          <td>{row.NamaFasyankes}</td>
          <td>{row.TindakLanjut}</td>
          <td>
            <button
              className="badge rounded-pill btn btn-danger shadow"
              onClick={() => handleDeleteRow1(index)}
            >
              Hapus
            </button>
          </td>
        </tr>
      ));
  };

  // Render Data Tabel 2
  const renderTable2Data = () => {
    if (!comparisonResult) return null;

    const startIndex = (currentPage2 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return comparisonResult.file2NotInFile1
      .slice(startIndex, endIndex)
      .map((row, index) => (
        <tr key={index}>
          <td>{startIndex + index + 1}</td>
          <td>{row.NIK}</td>
          <td>{row.Nama}</td>
          <td>{row.NamaFasyankes}</td>
          <td>
            <button
              className="badge rounded-pill btn btn-danger shadow"
              onClick={() => handleDeleteRow2(index)}
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

  return (
    <Dashboard>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mt-3 fs-1 fw-bold">
            <h1 className="h3 mb-4 mx-3 text-gray-800">Excel Compare Page </h1>
          </div>
          {comparisonnull && (
            <div className="row d-flex justify-content-center">
              <div className="col-xl-8">
                <div
                  className="alert alert-danger alert-dismissible fade show text-center"
                  role="alert"
                  style={{ display: "block" }}
                >
                  <strong>{comparisonnull}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setComparisonnull("");
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
          {responseSaveData && (
            <div className="row d-flex justify-content-center">
              <div className="col-xl-8">
                <div
                  className="alert alert-warning alert-dismissible fade show text-center"
                  role="alert"
                  style={{ display: "block" }}
                >
                  <strong>{responseSaveData}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setResponseSaveData("");
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
        <div className="row d-flex justify-content-start ml-xl-1 ">
          <div className="col-xl-4 col-md-6 mb-4 ">
            <div className="card border-left-primary shadow h-100 py-2 px-3 ">
              <div className="card-body ">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="mb-3">
                      <label htmlFor="file1" className="form-label ">
                        <p className="text-sm font-weight-bold text-primary mb-1 ">
                          Pilih File Excel Dinkes
                        </p>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="file1"
                        onChange={handleFile1Change}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 mb-4 ">
            <div className="card border-left-primary shadow h-100 py-2 px-3 ">
              <div className="card-body ">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="mb-3">
                      <label htmlFor="file2" className="form-label ">
                        <p className="text-sm font-weight-bold text-primary mb-1 ">
                          Pilih File Excel Komunitas
                        </p>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="file2"
                        onChange={handleFile2Change}
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2 align-self-end mb-4">
            <button className="btn btn-primary shadow" onClick={handleUpload}>
              Bandingkan
            </button>
          </div>
        </div>

        <div className="row ml-xl-1">
          <div className="col-12">
            <h3 className="h3 mb-3 text-gray-800">Hasil Perbandingan:</h3>
          </div>
        </div>

        {comparisonResult ? (
          <div className="container-xl">
            <div className="row">
              <div className="col-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <div className="row d-flex justify-content-evenly">
                      <div className="col-4">
                        <h4 className="m-0 font-weight-bold text-primary">
                          Data Unik Dinkes
                        </h4>
                      </div>
                      <div className="col-4">
                        <div className="input-group">
                          <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect01"
                          >
                            Bulan
                          </label>
                          <select
                            className="form-select"
                            id="inputGroupSelect01"
                            value={selectedMonth}
                            onChange={handleMonthChange}
                          >
                            <option value="" disabled>
                              Pilih...
                            </option>
                            {months.map((month, index) => (
                              <option key={index} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-4 text-end ">
                        <form onSubmit={handleSaveData1}>
                          <button
                            type="submit"
                            className="  btn btn-primary shadow"
                          >
                            Simpan
                          </button>
                        </form>
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
                            <th>Kabupaten / Kota</th>
                            <th>Nama Fasyankes</th>
                            <th>Tindak Lanjut</th>
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
                        Total : {comparisonResult.file1NotInFile2.length}
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
                                comparisonResult.file1NotInFile2.length /
                                  itemsPerPage
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
                                comparisonResult.file1NotInFile2.length
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
                        <form onSubmit={handleSaveData2}>
                          <button
                            type="submit"
                            className="  btn btn-primary shadow"
                          >
                            Simpan
                          </button>
                        </form>
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
                        Total : {comparisonResult.file2NotInFile1.length}
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
                                comparisonResult.file2NotInFile1.length /
                                  itemsPerPage
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
                                comparisonResult.file2NotInFile1.length
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
            <p className="h-5 mb-4 ml-xl-4 text-gray-800">
              Hasil perbandingan!!
            </p>
          </>
        )}
      </div>
    </Dashboard>
  );
};
