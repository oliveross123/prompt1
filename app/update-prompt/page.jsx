"use client";

import { Suspense } from "react"; // Import Suspense
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const [promptId, setPromptId] = useState(null);
  
  // Wrap the useSearchParams() call with a Suspense boundary
  const searchParams = useSuspenseSearchParams();

  useEffect(() => {
    // Use searchParams.get() safely
    const id = searchParams.get("id");
    if (id) {
      setPromptId(id);
    }
  }, [searchParams]);

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return; // Exit early if promptId is not available

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
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with Suspense */}
      <Form
        type="Upravit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
}

export default UpdatePrompt;
