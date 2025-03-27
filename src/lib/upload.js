import { Client, Storage } from "appwrite";

const upload = async (file, onSuccess) => {
  const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project_id);

  const storage = new Storage(client);

  const bucket_id = import.meta.env.VITE_APPWRITE_BUCKET_ID;
  const promise = storage.createFile(bucket_id, Date.now(), file);

  promise.then(
    function (response) {
      // console.log(response); // Success
      const imageId = response.$id;
      const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${response.bucketId}/files/${response.$id}/view?project=67e432d8000121b9d7f1&mode=admin`;

      // Call the onSuccess callback with imageId and imageUrl
      if (onSuccess) {
        onSuccess({ imageId, imageUrl });
      }
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export default upload;
