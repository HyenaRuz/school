import React, { useMemo, useState } from "react";
import { COLUMNS } from "./columns.js";
import styles from "./Table.module.scss";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { ReactComponent as DropDown } from "../../images/svg/icon-dropdown.svg";
import Loader from "../Loader/Loader.js";
import { useSelector } from "react-redux";
import classNames from "classnames";

function Table({
  students,
  selectedStudent,
  tableActivity,
  setPage,
  total,
  page,
  loading,
}) {
  const [wrapper, setWrapper] = useState(false);
  const [rowId, setRowId] = useState();

  const user = useSelector((state) => state.user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => students, [students]);

  const pageCount = Math.ceil(total / 6);

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const backButton = () => {
    return (
      <button
        className={styles.pages_left}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      >
        <DropDown className={styles.pages_left_svg} />
      </button>
    );
  };

  const forwardButton = () => {
    return (
      <button
        className={styles.pages_right}
        onClick={() => setPage((prev) => Math.min(prev + 1, total))}
        disabled={page === pageCount}
      >
        <DropDown className={styles.pages_right_svg} />
      </button>
    );
  };

  const pages = () => {
    return (
      <div style={{ display: "flex", gap: 16 }}>
        {page === pageCount ? (
          <button
            className={styles.pages_button}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <h5 style={{ fontWeight: 400 }}>{page - 1}</h5>
          </button>
        ) : (
          <div style={{ width: 50 }}></div>
        )}

        <button className={`${styles.pages_button} ${styles.active}`}>
          <h5>{page}</h5>
        </button>

        {!(page === pageCount) ? (
          <button
            className={styles.pages_button}
            onClick={() => setPage((prev) => Math.min(prev + 1, total))}
            disabled={page === pageCount}
          >
            <h5 style={{ fontWeight: 400 }}>{page + 1}</h5>
          </button>
        ) : (
          <>
            {" "}
            <div style={{ width: 50 }}></div>
          </>
        )}
      </div>
    );
  };

  // const wrapperHandler = (id) => {
  //   if (id === rowId || rowId === undefined) {
  //     setWrapper(!wrapper);
  //     tableActivity(wrapper);
  //     setRowId(id);
  //   } else {
  //     setRowId(id);
  //   }
  // };

  const wrapperHandler = (id) => {
    if (rowId === undefined) {
      setRowId(id);
      setWrapper(true);
      tableActivity(true);
    } else if (id === rowId) {
      setWrapper((prevWrapper) => {
        const newWrapper = !prevWrapper;
        tableActivity(newWrapper);
        return newWrapper;
      });
    } else {
      setRowId(id);
      setWrapper(true);
      tableActivity(true);
    }
  };

  const connectionExists = (connections) => {
    if (!connections || !Array.isArray(connections)) {
      return false;
    }
    const exist = connections.some((connection) => connection.id === user.id);
    return exist;
  };

  return (
    <div className={classNames(styles.wrapper, { [styles.active]: wrapper })}>
      <table className={styles.table}>
        <thead className={styles.table_thead}>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((columnEl) => {
                  return (
                    <th
                      className={styles.table_thead_th}
                      key={columnEl.id}
                      // style={{ width: `${columnEl.getSize()}%` }}
                    >
                      <h6>
                        {flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                      </h6>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            tableInstance.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className={styles.table_row}>
                  {row.getVisibleCells().map((cell, index, cellsArray) => {
                    const isLastCell = index === cellsArray.length - 1;
                    return (
                      <td
                        key={cell.id}
                        className={classNames(styles.table_row_td, {
                          [styles.active]: connectionExists(
                            row.original.connections
                          ),
                        })}
                        onClick={
                          !isLastCell
                            ? () => {
                                selectedStudent(row.original);
                                wrapperHandler(row.id);
                              }
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className={styles.fotter}>
        <div className={styles.fotter_text}>
          <h6>Showing</h6>
          <h6 className={styles.fotter_text_p}>{page}</h6>
          <h6>from</h6>
          <h6 className={styles.fotter_text_p}>
            {!pageCount ? "" : pageCount}
          </h6>
          <h6>pages</h6>
        </div>

        <div className={styles.pages}>
          {backButton()}
          {pages()}
          {forwardButton()}
        </div>
      </div>
    </div>
  );
}

export default Table;
