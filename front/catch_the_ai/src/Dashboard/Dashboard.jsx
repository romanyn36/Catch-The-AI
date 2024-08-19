import * as React from "react";
import { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
function Dashboard() {
    return (
        <div className="bg-light">

            <div className="dashboard">
                <Sidebar />
                <div className="content">
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
