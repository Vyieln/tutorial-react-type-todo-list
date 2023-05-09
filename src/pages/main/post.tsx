import { Post as IPost } from "./main";
import { supabase } from "../../config/supabase";
import { useAuthState } from "../../components/useAuthState";
import { useState, useEffect } from "react";

interface Props {
  post: IPost;
}

interface Like {
  userid: string;
  id: number;
}
export const Post = (props: Props) => {
  const { post } = props;
  const { authUser } = useAuthState();
  const [likes, setLikes] = useState<Like[] | null>(null);

  const getlikes = async () => {
    let { data } = await supabase
      .from("likes")
      .select("*", { count: "exact" })
      .eq("postid", post.id);
    console.log(data);
    setLikes(data?.map((like) => ({ userid: like.userid, id: like.id })));
  };
  const addLike = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .insert([
          {
            postid: post.id,
            userid: authUser?.id,
          },
        ])
        .select();
      if (authUser) {
        setLikes((prev) =>
          prev
            ? [...prev, { userid: authUser?.id, id: data?.id }]
            : [{ userid: authUser?.id, id: data?.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("userid", authUser?.id)
        .eq("postid", post?.id)
        .select();
      console.log(data, "returned ");
      if (authUser) {
        setLikes((prev) => prev?.filter((like) => like.id !== data.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like?.userid === authUser?.id);

  useEffect(() => {
    getlikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">
        <p> {post.description}</p>
      </div>
      <div className="username">
        <p>@{post.username}</p>

        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        <br></br>
        {likes ? <p> Likes: {likes?.length} </p> : null}
      </div>
    </div>
  );
};
