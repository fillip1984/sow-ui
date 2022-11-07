import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { readAllPosts } from "../../services/PostService";

import { FiFilePlus, FiRefreshCw } from "react-icons/fi";
import PostCard from "./PostCard";
import { Post } from "../../Types";

const PostList = () => {
  const [search, setSearch] = useState("");

  const {
    data: posts,
    isError,
    isLoading,
    refetch,
  } = useQuery(["posts"], readAllPosts);

  return (
    <div>
      <div className="toolbar flex gap-2 bg-emerald-500 p-2">
        <button
          type="button"
          className="bg-emerald-400 p-4 text-2xl text-white"
          onClick={() => refetch()}>
          <FiRefreshCw />
        </button>
        <Link to="/posts/new">
          <button
            type="button"
            className="bg-emerald-400 p-4 text-2xl text-white">
            <FiFilePlus />
          </button>
        </Link>
        <input
          className="bg-emerald-400 p-2 text-white"
          placeholder="find a post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {posts?.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>

      {!isLoading && !isError && posts.length === 0 && (
        <div>There are no posts</div>
      )}
      {isLoading && (
        <div className="loading -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Loading...
        </div>
      )}
      {isError && (
        <div className="error -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Error
          <button
            className="rounded bg-slate-400 p-4 text-white"
            onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
