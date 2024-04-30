"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form"; // Import the Form component

const UpdatePrompt = () => {
  const router = useRouter();
  const promptId = router.query?.id || ""; // Check if router.query is defined before accessing id

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        if (promptId) {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();

          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch prompt details only if promptId exists
    getPromptDetails();
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
      <Suspense fallback={<div>Loading...</div>}>
        <Form // Use the imported Form component
          type="Edit"
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