import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  authorKeys,
  createAuthor,
  deleteAuthorById,
  readAuthorById,
  updateAuthor,
} from "../../services/AuthorService";
import { AuthorDetail } from "../../Types";

const AuthorDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id && id === "new";
  const queryClient = useQueryClient();

  const {
    data: author,
    isLoading,
    isError,
    refetch,
  } = useQuery(authorKeys.detail(Number(id)), () => {
    if (!isNew) {
      return readAuthorById(Number(id));
    } else {
      return {
        id: -1,
        firstName: "",
        lastName: "",
      } as AuthorDetail;
    }
  });
  const { mutate: createAuthorMutator } = useMutation(createAuthor);
  const { mutate: updateAuthorMutator } = useMutation(updateAuthor);
  const { mutate: deleteAuthorMutator } = useMutation(deleteAuthorById);

  // TODO: for some reason this trick works on PostDetailPage but not here. I'm able to submit without any values at least once on the first visit to the page?
  // forces react hook form to reset once we have existing form data
  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("resetting", author);
  //     reset(author);
  //   }
  // }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<AuthorDetail>({
    // defaultValues: author,
  });
  const onSubmit: SubmitHandler<AuthorDetail> = (formData) => {
    if (isNew) {
      console.log("formdata", formData);
      createAuthorMutator(
        {
          ...formData,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(authorKeys.lists);
            navigate("/authors");
          },
        }
      );
    } else {
      updateAuthorMutator(
        {
          ...formData,
          id: Number(id),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(authorKeys.lists);
            queryClient.invalidateQueries(authorKeys.detail(Number(id)));
            navigate("/authors");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    deleteAuthorMutator(Number(id), {
      onSuccess: () => {
        queryClient.invalidateQueries(authorKeys.lists);
        navigate("/authors");
      },
    });
  };

  return (
    <div className="flex-1">
      <div className="toolbar flex w-full items-center justify-between bg-secondary p-2">
        <button
          type="submit"
          form="author-detail-form"
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

        <Link to="/authors">
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
            id="author-detail-form"
            noValidate>
            <div>
              <label htmlFor="firstName" className="text-2xl">
                First Name
              </label>
              <input
                className="mt-1 w-full rounded"
                id="firstName"
                type="text"
                {...register("firstName", {
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
                defaultValue={author.firstName}
              />
              {errors.firstName && (
                <span className="font-bold text-primary">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="text-2xl">
                Last Name
              </label>
              <input
                className="mt-1 w-full rounded"
                id="lastName"
                type="text"
                {...register("lastName", {
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
                defaultValue={author.lastName}
              />
              {errors.lastName && (
                <span className="font-bold text-primary">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="preferredName" className="text-2xl">
                Preferred Name <span className="font-thin">(Optional)</span>
              </label>
              <input
                className="mt-1 w-full rounded"
                id="preferredName"
                type="text"
                {...register("preferredName", {
                  maxLength: {
                    value: 100,
                    message: "Field must be 100 characters or less",
                  },
                })}
                defaultValue={author.preferredName}
              />
              {errors.preferredName && (
                <span className="font-bold text-primary">
                  {errors.preferredName.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="text-2xl">
                Bio
              </label>
              <textarea
                className="mt-1 w-full rounded"
                id="bio"
                rows={4}
                {...register("bio", {
                  maxLength: {
                    value: 500,
                    message: "Field must be 500 characters or less",
                  },
                })}
                defaultValue={author.bio}
              />
              {errors.bio && (
                <span className="font-bold text-primary">
                  {errors.bio.message}
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

export default AuthorDetailPage;
