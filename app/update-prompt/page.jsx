import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router
import { useSearchParams } from "next/dist/client/router"; // Import useSearchParams from next/dist/client/router
import { Suspense } from "react";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();

  const Search = () => {
    const searchParams = useSearchParams(); // Use useSearchParams inside the Search component

    return <input placeholder="Search..." />;
  };

  const Searchbar = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    );
  };

  const searchParams = useSearchParams(); // Move useSearchParams inside the component body
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Searchbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          type="Upravit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      </Suspense>
    </div>
  );
};

export default UpdatePrompt;
