import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readAllAuthors } from "../../services/AuthorService";
import {
  createPost,
  deletePostById,
  readPostById,
  updatePost,
} from "../../services/PostService";
import { readAllTopics } from "../../services/TopicService";
import { AuthorSummary, PostDetail } from "../../Types";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id && id === "new";
  const queryClient = useQueryClient();

  //TODO: pull from context
  const [author, setAuthor] = useState<AuthorSummary | null>(null);
  useEffect(() => {
    const fetchAuthor = async () => {
      const authors = await readAllAuthors();
      const author = authors[0];
      const actualAuthor = {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        bio: author.bio,
      } as AuthorSummary;
      setAuthor(actualAuthor);
    };
    fetchAuthor().catch((e) =>
      console.error("Exception occurred while fetching author", e)
    );
  }, []);

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["posts", id],
    () => {
      if (!isNew) {
        return readPostById(Number(id));
      } else {
        return {
          id: -1,
          title: "",
          shortDescription: "",
          contents: "",
          author: author,
        } as PostDetail;
      }
    },
    { enabled: false }
  );
  const { mutate: createPostMutator } = useMutation(createPost);
  const { mutate: updatePostMutator } = useMutation(updatePost);
  const { mutate: deletePostMutator } = useMutation(deletePostById);

  /* trying to fix a bug in my code. When I run deletePostMutator and invalidateQueries 
     the useQuery on this page runs before I can navigate away and throws an HTTP 500 error 
     since the entity it is trying to fetch is no longer available
  */
  useEffect(() => {
    refetch();
    if (!isNew) {
      console.log(
        "reading post---got a bug I can't fix. When I delete this post and invalidate the query/cache this useQuery hook attempts to refetch the post we just deleted"
      );
    }
  }, []);

  // forces react hook form to reset once we have existing form data
  useEffect(() => {
    if (!isLoading) {
      reset(post);
    }
  }, [isLoading]);

  const {
    data: topics,
    isLoading: isTopicsLoading,
    isError: isTopicsError,
    refetch: topicRefetch,
  } = useQuery(["topics"], readAllTopics);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostDetail>({
    defaultValues: post,
  });
  const onSubmit: SubmitHandler<PostDetail> = (formData) => {
    if (isNew) {
      createPostMutator(
        {
          ...formData,
          author: author!,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
            navigate("/posts");
          },
        }
      );
    } else {
      updatePostMutator(
        {
          ...formData,
          // id: Number(id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
            navigate("/posts");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    deletePostMutator(Number(id), {
      onSuccess: () => {
        console.log("successfully deleted post, invalidating queries");
        queryClient.invalidateQueries(["posts"]);
        console.log("navigating to posts list");
        navigate("/posts");
      },
    });
  };

  return (
    <div className="flex-1">
      <div className="toolbar flex w-full items-center justify-between bg-secondary p-2">
        <button
          type="submit"
          form="post-detail-form"
          className="rounded bg-primary px-4 py-2 text-white">
          Save
        </button>
        {!isNew && (
          <button
            type="button"
            className="rounded bg-lite px-4 py-2 text-dark"
            onClick={handleDelete}>
            Delete
          </button>
        )}

        <Link to="/posts">
          <button className="rounded border border-white px-4 py-2">
            Cancel
          </button>
        </Link>
      </div>

      {!isLoading && !isError && !isTopicsLoading && !isTopicsError && (
        <div className="p-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            id="post-detail-form"
            noValidate>
            <div>
              <label htmlFor="title" className="text-2xl">
                Title
              </label>
              <input
                className="mt-1 w-full rounded"
                id="title"
                type="text"
                {...register("title", {
                  required: "Field is required",
                  minLength: {
                    value: 5,
                    message: "Field must be at least 5 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Field must be 100 characters or less",
                  },
                })}
                // defaultValue={post?.title}
                autoFocus
              />
              {errors.title && (
                <span className="font-bold text-primary">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="topic" className="text-2xl">
                Topic
              </label>
              <select
                className="w-full rounded"
                {...register("topic.id", {
                  required: true,
                  valueAsNumber: true,
                  // ended up being able to convert id to number and store as topic.id
                  // setValueAs: (v) =>
                  //   topics?.find((topic) => topic.id === Number(v)),
                })}>
                <option value="">Choose a topic...</option>
                {topics?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
              {/* TODO: for some reason this field doesn't display
              errors.topic.message properly so hard coding error message */}
              {errors.topic && (
                <span className="font-bold text-primary">
                  Field is required
                </span>
              )}
            </div>

            <div>
              <label htmlFor="shortDescription" className="text-2xl">
                Short Description
              </label>
              <textarea
                className="mt-1 w-full rounded"
                id="shortDescription"
                rows={4}
                {...register("shortDescription", {
                  required: "Field is required",
                  minLength: {
                    value: 10,
                    message: "Field must be at least 10 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Field must be 250 characters or less",
                  },
                })}
                // defaultValue={post?.shortDescription}
              />
              {errors.shortDescription && (
                <span className="font-bold text-primary">
                  {errors.shortDescription.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contents" className="text-2xl">
                Contents{" "}
                {errors.contents && (
                  <span className="font-bold text-primary">
                    {errors.contents.message}
                  </span>
                )}
              </label>
              <textarea
                className="mt-1 w-full rounded"
                id="contents"
                rows={50}
                {...register("contents", {
                  required: "Field is required",
                  minLength: {
                    value: 10,
                    message: "Field must be at least 10 characters",
                  },
                  maxLength: {
                    value: 9000,
                    message: "Field must be 9000 characters or less",
                  },
                })}
                // defaultValue={post?.contents}
              />
            </div>
          </form>
        </div>
      )}

      {isLoading && isTopicsLoading && (
        <div className="loading -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Loading...
        </div>
      )}
      {(isError || isTopicsError) && (
        <div className="error -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Error
          <button
            className="rounded bg-grey p-4 text-white"
            onClick={() => {
              refetch();
              topicRefetch();
            }}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
