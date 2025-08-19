export default function PropertyListingPage() {
  const hasFilters = false; // Replace with logic to detect active filters or search
  const searchQuery = "cyberjaya"; // Replace with actual query

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex justify-center px-4">
      <div className="w-full max-w-screen-xl">
        {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-4 md:px-6 py-4 shadow bg-white">
        <div className="text-xl font-bold text-blue-600">Carbon Economy</div>
        <div className="text-sm mt-2 md:mt-0">
          <nav className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">News</a>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
            <a href="#" className="hover:text-blue-600">Login / Sign up</a>
          </nav>
        </div>
      </header>

      {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4 px-4 md:px-6 py-4 bg-white border-b text-sm text-gray-700">
          <input className="border p-2 rounded flex-grow min-w-[200px]" placeholder="Search properties..." />
          <select className="border p-2 rounded w-full sm:w-auto">
            <option>All Residential</option>
          </select>
          <select className="border p-2 rounded w-full sm:w-auto">
            <option>Price</option>
          </select>
          <select className="border p-2 rounded w-full sm:w-auto">
            <option>Bedrooms</option>
          </select>
          <select className="border p-2 rounded w-full sm:w-auto">
            <option>Built-up Area</option>
          </select>
        </div>

      {/* Title */}
        <div className="px-4 md:px-6 py-4 text-gray-700">
          <h2 className="text-xl font-semibold">
            {hasFilters
              ? `Showing results for "${searchQuery}"`
              : "Showing all results."}
          </h2>
        </div>

        {/* Property Card */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 md:px-6 pb-10 text-gray-700">
            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">PREMIUM</div>
                <div className="grid grid-cols-2">
                  <img src="/sample1.jpg" alt="Interior" className="w-full h-40 object-cover" />
                  <img src="/sample2.jpg" alt="Exterior" className="w-full h-40 object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 text-white text-xs">
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">Landed</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">1,400 sqft</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">4 BR</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">3 B</div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-sm text-gray-500">3 hours ago</div>
                <h3 className="font-semibold text-lg">CasaView @ Cybersouth</h3>
                <div className="text-sm text-gray-600">JALAN CV, Cyberjaya, Selangor</div>
                <div className="text-blue-600 font-bold mt-2 text-lg">RM 585,000 <span className="text-sm font-normal text-gray-500">(RM 298.62 Psf)</span></div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <img src="/agent.jpg" alt="Agent" className="w-6 h-6 rounded-full" />
                    <div>
                      <div className="text-sm font-semibold">Zarizi Zaimi <span className="text-red-500 text-xs font-bold ml-1">PRO</span></div>
                      <div className="text-xs text-gray-500">2-Storey Casaview @ Cybersouth</div>
                    </div>
                  </div>
                  <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">Enquire Now</button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">PREMIUM</div>
                <div className="grid grid-cols-2">
                  <img src="/sample1.jpg" alt="Interior" className="w-full h-40 object-cover" />
                  <img src="/sample2.jpg" alt="Exterior" className="w-full h-40 object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 text-white text-xs">
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">Landed</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">1,400 sqft</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">4 BR</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">3 B</div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-sm text-gray-500">3 hours ago</div>
                <h3 className="font-semibold text-lg">CasaView @ Cybersouth</h3>
                <div className="text-sm text-gray-600">JALAN CV, Cyberjaya, Selangor</div>
                <div className="text-blue-600 font-bold mt-2 text-lg">RM 585,000 <span className="text-sm font-normal text-gray-500">(RM 298.62 Psf)</span></div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <img src="/agent.jpg" alt="Agent" className="w-6 h-6 rounded-full" />
                    <div>
                      <div className="text-sm font-semibold">Zarizi Zaimi <span className="text-red-500 text-xs font-bold ml-1">PRO</span></div>
                      <div className="text-xs text-gray-500">2-Storey Casaview @ Cybersouth</div>
                    </div>
                  </div>
                  <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">Enquire Now</button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">PREMIUM</div>
                <div className="grid grid-cols-2">
                  <img src="/sample1.jpg" alt="Interior" className="w-full h-40 object-cover" />
                  <img src="/sample2.jpg" alt="Exterior" className="w-full h-40 object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 text-white text-xs">
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">Landed</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">1,400 sqft</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">4 BR</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">3 B</div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-sm text-gray-500">3 hours ago</div>
                <h3 className="font-semibold text-lg">CasaView @ Cybersouth</h3>
                <div className="text-sm text-gray-600">JALAN CV, Cyberjaya, Selangor</div>
                <div className="text-blue-600 font-bold mt-2 text-lg">RM 585,000 <span className="text-sm font-normal text-gray-500">(RM 298.62 Psf)</span></div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <img src="/agent.jpg" alt="Agent" className="w-6 h-6 rounded-full" />
                    <div>
                      <div className="text-sm font-semibold">Zarizi Zaimi <span className="text-red-500 text-xs font-bold ml-1">PRO</span></div>
                      <div className="text-xs text-gray-500">2-Storey Casaview @ Cybersouth</div>
                    </div>
                  </div>
                  <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">Enquire Now</button>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition duration-200">
              <div className="relative">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">PREMIUM</div>
                <div className="grid grid-cols-2">
                  <img src="/sample1.jpg" alt="Interior" className="w-full h-40 object-cover" />
                  <img src="/sample2.jpg" alt="Exterior" className="w-full h-40 object-cover" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-2 text-white text-xs">
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">Landed</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">1,400 sqft</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">4 BR</div>
                  <div className="bg-black bg-opacity-50 px-2 py-1 rounded">3 B</div>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="text-sm text-gray-500">3 hours ago</div>
                <h3 className="font-semibold text-lg">CasaView @ Cybersouth</h3>
                <div className="text-sm text-gray-600">JALAN CV, Cyberjaya, Selangor</div>
                <div className="text-blue-600 font-bold mt-2 text-lg">RM 585,000 <span className="text-sm font-normal text-gray-500">(RM 298.62 Psf)</span></div>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <img src="/agent.jpg" alt="Agent" className="w-6 h-6 rounded-full" />
                    <div>
                      <div className="text-sm font-semibold">Zarizi Zaimi <span className="text-red-500 text-xs font-bold ml-1">PRO</span></div>
                      <div className="text-xs text-gray-500">2-Storey Casaview @ Cybersouth</div>
                    </div>
                  </div>
                  <button className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-50">Enquire Now</button>
                </div>
              </div>
            </div>
            {/* Repeat above for other properties */}
          </div>
          </div>

        {/* Pagination */}
        <div className="flex justify-center py-6">
          <nav className="inline-flex -space-x-px text-sm">
            <button className="px-3 py-1 border rounded-l bg-white text-gray-600 hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 border bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border bg-white text-gray-600 hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border bg-white text-gray-600 hover:bg-gray-100">3</button>
            <button className="px-3 py-1 border rounded-r bg-white text-gray-600 hover:bg-gray-100">Next</button>
          </nav>
        </div>
      </div>
    </div>
  );
}