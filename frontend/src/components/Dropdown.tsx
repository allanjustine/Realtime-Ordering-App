import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Dropdown: React.FC = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);

  const { logout, user } = useAuth();

  // Refs for dropdowns
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserDropdown = () => setUserDropdownOpen(!isUserDropdownOpen);
  const toggleNotificationDropdown = () =>
    setNotificationDropdownOpen(!isNotificationDropdownOpen);

  // Handle clicks outside of the dropdowns
  const handleClickOutside = (event: MouseEvent) => {
    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target as Node)
    ) {
      setUserDropdownOpen(false);
    }
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target as Node)
    ) {
      setNotificationDropdownOpen(false);
    }
  };

  // Add event listener for clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-row items-center md:space-x-4">
      {/* Notifications Dropdown */}
      <div className="relative inline-block" ref={notificationDropdownRef}>
        <button
          onClick={toggleNotificationDropdown}
          className="flex items-center p-2 rounded-md"
        >
          <i className="text-white hover:text-gray-200 far fa-bell"></i>
        </button>
        {isNotificationDropdownOpen && (
          <div className="absolute md:w-[350px] w-[280px] right-0 z-20 mt-2 bg-white rounded-md shadow-lg">
            <div className="absolute right-3 top-[-4px] transform rotate-45 bg-white w-2 h-2"></div>
            <h4 className="m-2 text-sm font-bold md:m-3 md:text-md">Notifications</h4>
            <hr />
            <ul>
              <li className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100">
                <div className="flex items-start cursor-pointer hover:bg-gray-100">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Jane Smith"
                    className="w-8 h-8 mr-4 rounded-full md:w-12 md:h-12"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-semibold md:text-md">Jane Smith</div>
                    <div className="text-sm text-gray-700 md:text-md">
                      Your order has been shipped
                    </div>
                    <div className="text-xs text-gray-500 md:text-sm">3 hours ago</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* User Dropdown */}
      <div className="relative inline-block" ref={userDropdownRef}>
        <button
          onClick={toggleUserDropdown}
          className="flex items-center p-2 text-gray-700 rounded-md"
        >
          <img
            src="https://via.placeholder.com/40"
            alt="Jane Smith"
            className="w-8 h-8 rounded-full"
          />
        </button>
        {isUserDropdownOpen && (
          <div className="absolute right-2 z-20 w-[200px] mt-2 bg-white rounded-md shadow-lg">
            <div className="absolute right-3 top-[-4px] transform rotate-45 bg-white w-2 h-2"></div>
            <ul>
              <li className="px-4 py-2 truncate cursor-pointer hover:bg-gray-100" title={user?.email}>
                {user?.email}
              </li>
              <li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                Settings
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
