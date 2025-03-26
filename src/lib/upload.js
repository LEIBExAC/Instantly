import { Client, Storage } from "appwrite";

const upload = async (file) => {
  const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project_id);

  const storage = new Storage(client);

  const bucket_id = import.meta.env.VITE_APPWRITE_BUCKET_ID;
  const promise = storage.createFile(bucket_id, ID.unique(), file);

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
};

export default upload;
