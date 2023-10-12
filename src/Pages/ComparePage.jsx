import React, { useState } from "react";
import { Dashboard } from "../Components/Layouts/Dashboard";
import { compareExcel } from "../services/compare.services";

export const ComparePage = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [comparisonnull, setComparisonnull] = useState("");
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

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

  const itemsPerPage = 10;
  const maxPageNumbers = 5; // Maksimal 5 angka halaman yang ditampilkan

  const renderTable1Data = () => {
    if (!comparisonResult) return null;

    const startIndex = (currentPage1 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return comparisonResult.file1NotInFile2
      .slice(startIndex, endIndex)
      .map((row, index) => (
        <tr key={index}>
          <td>{row.NIK}</td>
          <td>{row.Nama}</td>
        </tr>
      ));
  };

  const renderTable2Data = () => {
    if (!comparisonResult) return null;

    const startIndex = (currentPage2 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return comparisonResult.file2NotInFile1
      .slice(startIndex, endIndex)
      .map((row, index) => (
        <tr key={index}>
          <td>{row.NIK}</td>
          <td>{row.Nama}</td>
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
            <h1 className="h3 mb-4 mx-3 text-gray-800">Excel Compare Page</h1>
          </div>
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
                          Pilih File pertama
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
                          Pilih File Kedua
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

        {comparisonnull && (
          // <p className="text-danger fw-bold h1 text-center">{comparisonnull}</p>
          <div className="row d-flex justify-content-center">
            <div className="col-6">
              <div
                className="alert alert-warning alert-dismissible fade show text-center"
                role="alert"
              >
                <strong>{comparisonnull}</strong>
              </div>
            </div>
          </div>
        )}

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
                    <h6 className="m-0 font-weight-bold text-primary">
                      Data Unik File Pertama
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-stripe"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>NIK</th>
                            <th>Nama</th>
                          </tr>
                        </thead>
                        <tbody>{renderTable1Data()}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end mb-2">
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
                    <h6 className="m-0 font-weight-bold text-primary">
                      Data Unik File Pertama
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-stripe"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>NIK</th>
                            <th>Nama</th>
                          </tr>
                        </thead>
                        <tbody>{renderTable2Data()}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end">
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
