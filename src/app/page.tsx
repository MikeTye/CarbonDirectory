"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "./../../amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [carbonProjects, setProjects] = useState<Array<Schema["CarbonProject"]["type"]>>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async (token?: string) => {
    setIsLoading(true);
    const result = await client.models.CarbonProject.list({
      limit: 100, // preload enough to paginate locally
      ...(token ? { nextToken: token } : {})
    });
    if (result?.data) {
      setProjects((prev) => [...prev, ...result.data]);
      setNextToken(result.nextToken ?? null);
    }
    setIsLoading(false);
  };

  const filtered = carbonProjects.filter((p) =>
    (!query || p.projectName?.toLowerCase().includes(query.toLowerCase())) &&
    (!countryFilter || p.country === countryFilter) &&
    (!statusFilter || p.projectStatus === statusFilter)
  );

  // Client-side pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginated = filtered.slice(0, currentPage * itemsPerPage);
  const hasMore = filtered.length > paginated.length;

  const countries = Array.from(new Set(carbonProjects.map(p => p.country).filter(Boolean)));
  const statuses = Array.from(new Set(carbonProjects.map(p => p.projectStatus).filter(Boolean)));

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 bg-white shadow z-10 gap-2">
        <h1 className="text-2xl font-bold">Carbon Projects Directory</h1>
        <Link href="/signin" className="text-blue-600 hover:underline">Sign In</Link>
      </header>

      {/* Content */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by project name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full p-3 mt-4 mb-4 border border-gray-300 rounded"
        />

        {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            className="p-2 border rounded"
            value={countryFilter}
            onChange={(e) => {
              setCountryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={String(c)} value={String(c)}>{String(c)}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={String(s)} value={String(s)}>{String(s)}</option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="grid gap-4 mb-6">
          {paginated.map((item) => (
            <Link href={`/carbonprojects/${item.id}`} key={item.id}>
              <div className="p-4 border bg-white rounded shadow hover:bg-gray-50 cursor-pointer w-full">
                <h2 className="text-lg sm:text-xl font-semibold">{item.projectName}</h2>
                <p className="text-sm text-gray-500">Country: {item.country}</p>
                <p className="text-sm text-gray-500">Status: {item.projectStatus}</p>
              </div>
            </Link>
          ))}
          {paginated.length === 0 && <p className="text-gray-500">No results found.</p>}
        </div>

        {/* Pagination */}
        {hasMore && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Show More
          </button>
        )}
      </div>
    </main>
  );
}