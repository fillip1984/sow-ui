import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPost,
  readPostById,
  updatePost,
} from "../../services/PostService";
import { Author, Post } from "../../Types";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id && id === "new";
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useQuery(["posts", id], () => {
    if (!isNew) {
      return readPostById(Number(id));
    } else {
      return {
        id: -1,
        title: "",
        shortDescription: "",
        contents: "",
        author: {
          id: -1,
          firstName: "Phillip",
          lastName: "Williams",
          bio: "IT Manager yadhuh yadhuh yadhuh",
        } as Author,
      } as Post;
    }
  });
  const { mutate: createPersonMutator } = useMutation(createPost);
  const { mutate: updatePersonMutator } = useMutation(updatePost);

  return <div>PostDetail</div>;
};

export default PostDetail;
