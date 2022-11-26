import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTag,
  deleteTagById,
  readTagById,
  tagKeys,
  updateTag,
} from "../../services/TagService";
import { TagDetail } from "../../Types";

const TagDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id && id === "new";
  const queryClient = useQueryClient();

  const {
    data: tag,
    isLoading,
    isError,
    refetch,
  } = useQuery(tagKeys.detail(Number(id)), () => {
    if (!isNew) {
      return readTagById(Number(id));
    } else {
      return {
        id: -1,
        name: "",
        description: "",
      } as TagDetail;
    }
  });
  const { mutate: createTagMutator } = useMutation(createTag);
  const { mutate: updateTagMutator } = useMutation(updateTag);
  const { mutate: deleteTagMutator } = useMutation(deleteTagById);

  // TODO: for some reason this trick works on PostDetailPage but not here. I'm able to submit without any values at least once on the first visit to the page?
  // forces react hook form to reset once we have existing form data
  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("resetting", tag);
  //     reset(tag);
  //   }
  // }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<TagDetail>({
    // defaultValues: tag,
  });
  const onSubmit: SubmitHandler<TagDetail> = (formData) => {
    if (isNew) {
      console.log("formdata", formData);
      createTagMutator(
        {
          ...formData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(tagKeys.lists);
            navigate("/tags");
          },
        }
      );
    } else {
      updateTagMutator(
        {
          ...formData,
          id: Number(id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(tagKeys.lists);
            queryClient.invalidateQueries(tagKeys.detail(Number(id)));
            navigate("/tags");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    deleteTagMutator(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(tagKeys.lists);
        navigate("/tags");
      },
    });
  };

  return (
    <div className="flex-1">
      <div className="toolbar flex w-full items-center justify-between bg-secondary p-2">
        <button
          type="submit"
          form="tag-detail-form"
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

        <Link to="/tags">
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
            id="tag-detail-form"
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
                defaultValue={tag.name}
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
                defaultValue={tag.description}
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

export default TagDetailPage;
