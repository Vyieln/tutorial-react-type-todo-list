import React from "react";
import { supabase } from "../../config/supabase";
import { useState, useEffect } from "react";
import { Post } from "./post";
export interface Post {
  id: string;
  title: string;
  user_id: string;
  username: string;
  description: string;
  created_at: string;
}
export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const getPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*");
    console.log(posts);
    setPostsList(posts as Post[]);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
