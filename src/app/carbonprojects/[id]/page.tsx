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
                      src={img.s3url ?? 'https://amplify-d6k6151j3tgkd-mas-amplifycarbonwebbucket32-yunwng8a0u1d.s3.ap-southeast-1.amazonaws.com/placeholder.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIARVR6EM5TGIXI25GX%2F20250801%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250801T005545Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAMkHx3uvg9O7dD80dWWgeBruDi50BefEpsEFRwSMSCo3AiBI9h44tETkSN51%2FpjDRjLW3vIL4eemeFNK%2FFL9uqH5DirmAgji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDExNTAyMDY4NzIwNiIMaQeLRA%2FmpwolZ6isKroC7h2GCIFTCm3S%2B4tkEphm2ni6ASR5A6UUAIqsU15cappi0OK6UpCYizu4u%2B3oI1jyIQAwVXCt7FA6glQob%2BRHEPzlzv9foc3qarm%2FxsNc%2BLCDFt760nUj7HAofJAtfFV3zozq9FowcTIipxcdKavFE21p5ks4TEznX%2Bs%2FAqDlevXR1G44kPolWWPMWb0iSuMejo0AKJdaHngrtTKUPs%2Fp0Debq%2BopMWg6BGDRU%2Bi1LL%2FDDIujbKLPVGm6f2fSnY6Ir3H%2FWMnkQBLN3qArK9LS%2F%2BfTxv619lHNPQNNYD%2FjeIVgN9UDaEL4iO5zY0WOtdhfnr9bPPfCHEMZhqBXHLhqAA1EPd04yMgccAfDFCoGWbo6nZExPqwK2y7V3AwUFjToEFg9gnFxHmY6YeGi88nw7D1utk%2FE03q6%2FbAw3ZSwxAY6rQIy6ygjg062O9bnmH2%2BaE6w0I08UZihEUNFwD7%2B%2BBUgm3idbEMAbft90%2BLijoqzD%2Bxp1KgF%2BFG11VWI5oiV%2Fatl6S9tK3RWfhA190LwPo554p3lUxCMwhNoHvZ1JYAxuylm2OFDaELyXlPiOchEKglQbyFAbxaowJjNQHwAei6kG0ytEw4iKMhh0cqqG0ztUQAjTo1khNwGjnkssu7dpK2R9To7PhgAzt4hyzg52yD1SgCg%2FXmZjC4vntP1oxUZJXuG9vm58XzQtD%2BFgyWUm7EOmyr9b%2F8I2ACXvgxps8ug8rwMYdZYtbFDZQhwapcIwiIau3Xj1lqRL29QitH1DWdB9d4P8M25U62nlrVx634wRXBSo17fnPuZwb4QG%2BkBVejnhf7qQjIiD0TzGiRq&X-Amz-Signature=2fc050d98a1226a4c040fa78196684545633a24d1f3c8ae29d902290f54a9d5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'}
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