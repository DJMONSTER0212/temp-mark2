"use client"

import { ColumnDef } from "@tanstack/react-table"
// import { CellAction } from "./cell-action"
export type ResultColumn = {
    id: string
    examName: String
    mathsMarks: String
    physicsMarks: String
    chemistryMarks: String
    csmarks: String
    englishMarks: String
    overall: String
    userId : String
    createdAt: Date
    updatedAt: Date
}

export const columns : ColumnDef<ResultColumn>[] = [
    {
        accessorKey : "examName",
        header : "Exam Name",
    },
    {
        accessorKey : "mathsMarks",
        header : "Maths Marks",
    },
    {
        accessorKey : "physicsMarks",
        header : "Physics Marks",
    },
    {
        accessorKey : "chemistryMarks",
        header : "Chemistry Marks",
    },
    {
        accessorKey : "csmarks",
        header : "CS Marks",
    },
    {
        accessorKey : "englishMarks",
        header : "English Marks",
    },
    {
        accessorKey : "overall",
        header : "Overall",
    }
]   
