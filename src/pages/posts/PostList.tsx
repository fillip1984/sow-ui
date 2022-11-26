import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { postKeys, readAllPosts } from "../../services/PostService";

import { DebounceInput } from "react-debounce-input";
import { FiFilePlus, FiRefreshCw, FiSearch } from "react-icons/fi";
import PostCard from "./PostCard";

const PostList = () => {
  const [filter, setFilter] = useState("");

  const {
    data: postSummaries,
    isError,
    isLoading,
    refetch,
  } = useQuery(postKeys.list(filter), () => readAllPosts(filter));

  return (
    <div className="p-4">
      <div className="toolbar flex justify-between bg-primary p-2 text-2xl">
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-secondary p-4"
            onClick={() => refetch()}>
            <FiRefreshCw />
          </button>
          <Link to="/posts/new">
            <button type="button" className="rounded bg-secondary p-4">
              <FiFilePlus />
            </button>
          </Link>
        </div>
        <div className="flex w-2/3 items-center gap-2 rounded-l bg-secondary pl-2">
          <button
            onClick={() => refetch()}
            className="flex h-full w-8 items-center justify-center">
            <FiSearch />
          </button>
          <DebounceInput
            className="h-full flex-1 rounded p-2 placeholder-lite"
            placeholder="find a post"
            minLength={2}
            debounceTimeout={300}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4">
        {postSummaries?.map((postSummary) => (
          <PostCard postSummary={postSummary} key={postSummary.id} />
        ))}
      </div>

      {!isLoading && !isError && postSummaries.length === 0 && (
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
          <button className="rounded bg-grey p-4" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
