<div className="w-full container flex items-center justify-between py-4">
        {/* Logo Section */}
      <div className="flex items-center justify-between">
        <div className="flex ml-5 items-center pl-[1.2px]"> {/* Add padding to the left */}
          <div className="text-lg font-bold bg-black text-white px-2 py-1 rounded">
            TECH
          </div>
          <span className="ml-1 font-bold">CUBE</span>
        </div>

        {/* Navigation Links */}
                    
          <nav className="hidden md:flex space-x-6 ml-7">
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 font-medium">
                All category
              </button>
              {/* Dropdown Example */}
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded w-48 mt-2">
                <ul className="text-gray-700 text-sm py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Category 1</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Category 2</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Category 3</li>
                </ul>
              </div>
            </div>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Accessories
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              TV & Watches
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Electronics
            </a>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between ">
          

          </div>

        {/* User Icons */}
        <div className=" ml-2">
          <div className="flex space-x-4 text-gray-700 ml-[10px]"> {/* Add padding to the right */}
            <button className="hover:text-blue-500">👤</button>
            <button className="hover:text-blue-500">🛒</button>
            <button className="hover:text-blue-500">🌙</button>
          </div>
        </div>
        
      </div>