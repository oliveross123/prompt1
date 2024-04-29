"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react'

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  
  // Wrap the useSearchParams() hook with a Suspense boundary
  const Search = () => {
    const searchParams = useSearchParams()
   
    return <input placeholder="Search..." />
  }

  const Searchbar = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
    )
  }

  // Retrieve promptId inside the component
  const searchParams = useSearchParams();
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

    // Check if promptId exists before fetching prompt details
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
