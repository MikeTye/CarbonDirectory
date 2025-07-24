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
  const [query, setQuery] = useState('');
  const [carbonProjects, setProjects] = useState<Array<Schema["CarbonProject"]["type"]>>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchProjects = async (token?: string) => {
    setIsLoading(true);
    const result = await client.models.CarbonProject.list({
      limit: 10,
      ...(token ? { nextToken: token } : {})
    });
    if (result?.data) {
      setProjects((prev) => [...prev, ...result.data]);
      setNextToken(result.nextToken ?? null);
    }
    setIsLoading(false);
  };

  // const listProjects = async () => {
  //     const { data: items, errors } = await client.models.CarbonProject.list();
  //     setProjects(items);
  //   };

  useEffect(() => {
    fetchProjects();
  }, []);

  // function createTodo() {
  //   client.models.CarbonProject.create({
  //     content: window.prompt("Todo content"),
  //   });
  // }
  const filtered = carbonProjects.filter((p) => {
    return (
      (!query || p.projectName?.toLowerCase().includes(query.toLowerCase())) &&
      (!countryFilter || p.country === countryFilter) &&
      (!statusFilter || p.projectStatus === statusFilter)
    );
  });

  const countries = Array.from(new Set(carbonProjects.map((p) => p.country).filter(Boolean)));
  const statuses = Array.from(new Set(carbonProjects.map((p) => p.projectStatus).filter(Boolean)));

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carbon Projects Directory</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by project name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={String(c)} value={String(c)}>{String(c)}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={String(s)} value={String(s)}>{String(s)}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="grid gap-4 mb-6">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 border bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{item.projectName}</h2>
            <p className="text-sm text-gray-500">Country: {item.country}</p>
            <p className="text-sm text-gray-500">Status: {item.projectStatus}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500">No results found.</p>}
      </div>

      {nextToken && (
        <button
          onClick={() => fetchProjects(nextToken)}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
      <hr></hr>

      {/* <button onClick={createTodo}>+ new</button> */}
      <ul>
        {carbonProjects.map((carbonProject) => (
          <li key={carbonProject.id}>{carbonProject.projectName}</li>
        ))}
      </ul>
      <ul>
        {carbonProjects.map((carbonProject) => (
          <li key={carbonProject.id}>
            <Link href={`/carbon-project/${carbonProject.id}`}>
              {carbonProject.projectName}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Todo : Add new carbon project.
        <br />
      </div>
    </main>
  );
}