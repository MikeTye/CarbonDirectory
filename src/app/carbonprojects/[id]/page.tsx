'use client';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const client = generateClient<Schema>();

export default function ProjectDetail() {
  const [project, setProject] = useState<Schema['CarbonProject']['type'] | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await client.models.CarbonProject.get({ id: params.id as string });
      setProject(data);
    };

    fetchProject();
  }, [params.id]);

  if (!project) return <div>Loading...</div>;

  return (
    <main>
      <h1>{project.projectName}</h1>
      <p>Status: {project.projectStatus}</p>
      <p>Country: {project.country}</p>
      {/* Add more fields */}
    </main>
  );
}