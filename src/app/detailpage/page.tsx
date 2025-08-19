import Image from 'next/image'

export default function ProjectPage() {
  return (
<div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#46492f] flex items-center gap-2">
            <img src="/logo.svg" alt="iCR logo" className="h-8" />
            iCR
          </div>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#" className="hover:underline">Registry</a>
            <a href="#" className="hover:underline">Carbon Directory</a>
            <a href="#" className="hover:underline">Platform</a>
            <a href="#" className="hover:underline">ICR Program</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Academy</a>
            <a href="#" className="hover:underline">Latest</a>
          </nav>
          <div className="flex gap-4">
            <button className="text-sm text-[#46492f]">Log in</button>
            <button className="text-sm bg-lime-300 px-4 py-1 rounded-full font-medium">Sign up</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl overflow-hidden shadow bg-black/60 relative">
          <img
            src="/cover.jpg"
            alt="Mountain background"
            className="w-full h-64 object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center px-6">
            <img
              src="/act-logo.png"
              alt="ACT Commodities"
              className="h-20 w-20 rounded-full border-4 border-white shadow"
            />
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">ACT Commodities</h1>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span className="bg-[#46492f] text-white rounded-full px-2 py-0.5">United States</span>
                <a href="https://www.actcommodities.com/" target="_blank" className="underline text-lime-300">
                  https://www.actcommodities.com/
                </a>
              </div>
            </div>
            <div className="ml-auto mr-4 text-sm">
              <span className="bg-lime-300 text-[#46492f] font-semibold rounded-full px-3 py-1">Buyer</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow px-6 py-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-sm text-gray-700">
            ACT provides tailor-made sustainability solutions within all compliance and voluntary markets. As a major
            player in the global energy transition, ACT helps organizations hit their targets.
          </p>
        </div>

        <div className="mt-6 text-sm text-center bg-white rounded-xl py-4 shadow border border-dashed">
          <p>
            <strong>Is this your organization?</strong> Take control — claim your organization and connect with the Climate
            Network today!
          </p>
        </div>
      </main>
    </div>
  );
}