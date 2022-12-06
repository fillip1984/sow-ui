import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { BiCategory, BiCommentDetail, BiPurchaseTagAlt } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { postKeys, readPostById } from "../../services/PostService";
import { PostSummary } from "../../Types";

interface PostCardProps {
  postSummary: PostSummary;
}

const PostCard = ({ postSummary }: PostCardProps) => {
  const { userAccount } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const prefetchPost = async (postId: number) => {
    await queryClient.prefetchQuery(postKeys.detail(postId), () =>
      readPostById(postId, userAccount)
    );
  };

  return (
    <div
      className="m-2 rounded border border-white bg-grey p-2 shadow hover:shadow-md"
      onMouseEnter={() => prefetchPost(postSummary.id)}>
      <Link to={`${postSummary.id}`} className="flex">
        <div className="card-title rounded py-2 px-4">
          <h3>{postSummary.title}</h3>
        </div>
      </Link>
      <div className="card-body m-1">
        <div className="post-description">{postSummary.shortDescription}</div>
        <div className="post-meta-container mt-4 flex justify-end gap-2">
          <div className="flex flex-1 items-center rounded border bg-dark text-2xl">
            <BiPurchaseTagAlt className="ml-2" />
            {postSummary.tags?.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
          <Link
            to={`/posts/${postSummary.id}#comments`}
            className="post-comment flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCommentDetail />
            {postSummary.commentCount}
          </Link>

          <Link
            to={`/topics/${postSummary.topic.id}`}
            className="post-topic flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCategory />
            {postSummary.topic.name}
          </Link>
          <Link
            to={`/authors/${postSummary.author.id}`}
            className="post-author flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <FiUser /> {postSummary.author.fullNameFirstThenLast}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
