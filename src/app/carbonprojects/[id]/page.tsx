'use client';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUrl } from 'aws-amplify/storage';

type ProjectImageWithUrl = Schema['ProjectImage']['type'] & { signedUrl?: string };

const client = generateClient<Schema>();

export default function ProjectDetail() {
  const [project, setProject] = useState<Schema['CarbonProject']['type'] | null>(null);
  const [projectImages, setImages] = useState<ProjectImageWithUrl[]>([]);
  const [placeholderUrl, setPlaceholderUrl] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await client.models.CarbonProject.get({ id: params.id as string });
      setProject(data);
    };

    const fetchImage = async () => {
      const { data } = await client.models.ProjectImage.list({
        filter: { parentProjectId: { eq: params.id as string } },
      });

      if (!data) return setImages([]);

      const withUrls : ProjectImageWithUrl[] = await Promise.all(
        data.map(async (item) => {
          let signedUrl: string | undefined;
          if (item.s3url) {
            const result = await getUrl({ path: item.s3url });
            signedUrl = result.url.toString(); // this is the presigned URL
          }
          return { ...item, signedUrl };
        })
      );

      setImages(withUrls);
    };

  const fetchPlaceholderUrl = async () => {
      const result = await getUrl({ path: 'placeholder.jpg' });
      setPlaceholderUrl(result.url.toString());
    };

    fetchPlaceholderUrl();
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
                      src={img.signedUrl ?? placeholderUrl ?? ''}
                        onError={(e) => {
                          if (placeholderUrl) e.currentTarget.src = placeholderUrl;
                        }}
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