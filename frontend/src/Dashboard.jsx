import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ token }) {
    const [tanks, setTanks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/level", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTanks(res.data);
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Tank Level Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tanks.map((tank, idx) => (
                    <div key={idx} className="border p-4 rounded shadow">
                        <h2 className="text-lg mb-4">{tank.tankId}</h2>
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                            <div
                                className="absolute inset-0 rounded-full border-8 border-green-500 transition-all"
                                style={{
                                    clipPath: `polygon(50% 50%, -50% -50%, ${
                                        tank.levelPercent <= 25
                                            ? `${tank.levelPercent * 4}% -50%`
                                            : tank.levelPercent <= 50
                                            ? '100% -50%, 100% ${(tank.levelPercent - 25) * 4}%'
                                            : tank.levelPercent <= 75
                                            ? '100% 100%, ${100 - ((tank.levelPercent - 50) * 4)}% 100%'
                                            : '-50% 100%, -50% ${100 - ((tank.levelPercent - 75) * 4)}%'
                                    })`
                                }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold">{Math.round(tank.levelPercent)}%</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 text-center">
                            Last Updated: {new Date(tank.updatedAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;