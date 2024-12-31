import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import img from"../src/assets/logo.png"

function Layout() {
return (
    <>
        <div className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl flex items-center">
                    <img src={img} className="inline-block h-8 w-8 mr-2" alt="logo" />
                    <span>Task</span>
                    <span className="text-cyan-400">Bites</span>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center space-x-4 mr-4 md:mr-8 lg:mr-16 xl:mr-24">
                        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-700">Home</Link>
                        <Link to="/bites" className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-700">Bites</Link>
                    </div>
                </div>
            </div>              
        </div>
            <Outlet/>

    </>
)
}

export default Layout