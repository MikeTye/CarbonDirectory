'use client';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const client = generateClient<Schema>();

export default function ProjectDetail() {
  const [project, setProject] = useState<Schema['CarbonProject']['type'] | null>(null);
  const [projectImages, setImages] = useState<Schema['ProjectImage']['type'][]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await client.models.CarbonProject.get({ id: params.id as string });
      setProject(data);
    };

    const fetchImage = async () => {
      const { data } = await client.models.ProjectImage.listImage({
        parentProjectId : params.id as string,
      });
      setImages(data ?? []);
    };

    fetchProject();
    fetchImage();
  }, [params.id]);

  if (!project) return <div>Loading...</div>;

  return (
    <main>
      <h1>{project.projectName}</h1>
      <p>Status: {project.projectStatus}</p>
      <p>Country: {project.country}</p>
      {/* Add more fields */}
      <hr></hr>
      {projectImages.length > 0 && (
        <div className="flex overflow-x-auto gap-4 py-4">
          {projectImages.length > 0 ? (
              <div className="flex overflow-x-auto gap-4 py-4">
                {projectImages.map((img, idx) => (
                  <div key={idx} className="flex-none w-64">
                    <img
                      src={img.s3url ?? '/fallback.png'}
                      alt={img.description ?? `Image ${idx + 1}`}
                      className="w-full h-40 object-cover rounded-xl shadow"
                    />
                    {img.description && <p className="text-sm mt-2">{img.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4">
                <img
                  src="/fallback.png"
                  alt="No project image"
                  className="w-64 h-40 object-cover rounded-xl shadow"
                />
                <p className="text-sm mt-2">No images available</p>
              </div>
            )}
        </div>
      )}
    </main>
  );
}