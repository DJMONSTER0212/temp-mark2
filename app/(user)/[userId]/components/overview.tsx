"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { LineChart, Line } from 'recharts';

const getToatalMarks = (result: any) => {
    let totalMarks = 0;
    totalMarks += Number(result.physicsMarks) + Number(result.mathsMarks) + Number(result.chemistryMarks) + Number(result.csmarks) + Number(result.englishMarks)
    return totalMarks;
}

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Dec",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
// ]



export function Overview({ results }: any) {

    const [data, setData] = useState<any>(results);
    let temp = results
    const formatData = () => {
        for (let i = 0; i < results.length; i++) {
            temp[i]["total"] = getToatalMarks(temp[i])
        }
        console.log(temp)
        setData(temp);
    }
    let n1 = []
    useEffect(() => {
        formatData();
    }, [results]);

    return (
        <>
            <LineChart width={600} height={400} data={data}>
                <Line type="monotone" dataKey="total" stroke="#2563eb" />
                <XAxis dataKey="examName" />

                <YAxis />
                <Tooltip />
            </LineChart>
            <p className="text-xs w-full items-center justify-center flex text-muted-foreground">
                out of 500
            </p>
            {/* <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                        dataKey="total"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                    />
                </BarChart>
            </ResponsiveContainer> */}
        </>
    )
}