import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTopic,
  deleteTopicById,
  readTopicById,
  topicKeys,
  updateTopic,
} from "../../services/TopicService";
import { TopicDetail } from "../../Types";

const TopicDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id && id === "new";
  const queryClient = useQueryClient();

  const {
    data: topic,
    isLoading,
    isError,
    refetch,
  } = useQuery(topicKeys.detail(Number(id)), () => {
    if (!isNew) {
      return readTopicById(Number(id));
    } else {
      return {
        id: -1,
        name: "",
        description: "",
      } as TopicDetail;
    }
  });
  const { mutate: createTopicMutator } = useMutation(createTopic);
  const { mutate: updateTopicMutator } = useMutation(updateTopic);
  const { mutate: deleteTopicMutator } = useMutation(deleteTopicById);

  // TODO: for some reason this trick works on PostDetailPage but not here. I'm able to submit without any values at least once on the first visit to the page?
  // forces react hook form to reset once we have existing form data
  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("resetting", topic);
  //     reset(topic);
  //   }
  // }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<TopicDetail>({
    // defaultValues: topic,
  });
  const onSubmit: SubmitHandler<TopicDetail> = (formData) => {
    if (isNew) {
      console.log("formdata", formData);
      createTopicMutator(
        {
          ...formData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(topicKeys.lists);
            navigate("/topics");
          },
        }
      );
    } else {
      updateTopicMutator(
        {
          ...formData,
          id: Number(id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(topicKeys.lists);
            queryClient.invalidateQueries(topicKeys.detail(Number(id)));
            navigate("/topics");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    deleteTopicMutator(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(topicKeys.lists);
        navigate("/topics");
      },
    });
  };

  return (
    <div className="flex-1">
      <div className="toolbar flex w-full items-center justify-between bg-secondary p-2">
        <button
          type="submit"
          form="topic-detail-form"
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

        <Link to="/topics">
          <button className="rounded border border-white px-4 py-2">
            Cancel
          </button>
        </Link>
      </div>

      {!isLoading && !isError && (
        <div className="p-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            id="topic-detail-form"
            noValidate>
            <div>
              <label htmlFor="name" className="text-2xl">
                Name
              </label>
              <input
                className="mt-1 w-full rounded"
                type="text"
                {...register("name", {
                  required: "Field is required",
                  minLength: {
                    value: 2,
                    message: "Field must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Field must be 100 characters or less",
                  },
                })}
                autoFocus
                defaultValue={topic.name}
              />
              {errors.name && (
                <span className="font-bold text-primary">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="description" className="text-2xl">
                Description
              </label>
              <textarea
                className="mt-1 w-full rounded"
                rows={4}
                {...register("description", {
                  required: "Field is required",
                  minLength: {
                    value: 5,
                    message: "Field must be at least 5 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Field must be 500 characters or less",
                  },
                })}
                defaultValue={topic.description}
              />
              {errors.description && (
                <span className="font-bold text-primary">
                  {errors.description.message}
                </span>
              )}
            </div>
          </form>
        </div>
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
            className="rounded bg-grey p-4 text-white"
            onClick={() => {
              refetch();
            }}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;
