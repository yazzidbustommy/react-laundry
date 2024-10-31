import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { RiExchangeBoxFill, RiLogoutBoxLine } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      title: "Sign Out Success",
      icon: "success",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    navigate("/");
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/admin", name: "Home", icon: MdHomeFilled },
    { id: 2, path: "/admin/product", name: "Product", icon: AiFillProduct },

    { id: 3, path: "/admin/customer", name: "Customer", icon: FaUserGroup },
    {
      id: 4,
      path: "/admin/transaction",
      name: "Transaction",
      icon: RiExchangeBoxFill,
    },
  ];

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-gray-200">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-14"
          src="../../public/laundry.svg"
          alt="laundry logo"
        />
        <h1 className="text-center font-bold text-xl mb-8 hidden md:flex">
          React Laundry
        </h1>
      </div>
      <ul className="mt-2 space-y-6">
        {SIDEBAR_LINKS.map((link) => (
          <li
            key={link.id}
            className={`font-medium rounded-md py-2 px-5 hover:bg-blue-300 ${
              location.pathname === link.path ? "bg-blue-300 text-white" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
            >
              <span>{link.icon()}</span>
              <span className="text-sm text-black hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="w-full absolute bottom-5 left-0 py-2 cursor text-center">
        <Button
          className="text-sm font-bold text-black"
          size="sm"
          color="primary"
          variant="ghost"
          onPress={handleLogout}
          endContent={<RiLogoutBoxLine />}
        >
          <span className="md:flex hidden">Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
