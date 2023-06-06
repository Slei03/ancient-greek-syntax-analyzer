import React, { useMemo } from "react";
import { useTable } from "react-table";
import './AttrTable.css'

// Referenced: https://www.copycat.dev/blog/react-table/

export default function AttrTable({data}) {
    const columns = useMemo(() => [
        {
            Header: "text",
            accessor: "text"
        },
        {
            Header: "lemma",
            accessor: "lemma_"
        },
        {
            Header: "pos",
            accessor: "pos_"
        },
        {
            Header: "dep",
            accessor: "dep_"
        },
    ], []);


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
    } = useTable({columns, data});

    return (
        <div>
            {allColumns.map((column, index) => (
                <label key={index} htmlFor={column.Header}>
                    <input type="checkbox" name={column.Header} id={column.Header} {...column.getToggleHiddenProps()}/>
                    {column.Header}
                </label>
            ))}
            <div id="attr-table">
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
