import { useQueryClient } from "@tanstack/react-query";
import { BiCategory, BiCommentDetail, BiPurchaseTagAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { readAuthorById } from "../../services/AuthorService";
import { AuthorSummary } from "../../Types";

interface AuthorCardProps {
  authorSummary: AuthorSummary;
}

const AuthorCard = ({ authorSummary }: AuthorCardProps) => {
  const queryClient = useQueryClient();
  const prefetchAuthor = async (authorId: number) => {
    await queryClient.prefetchQuery(["authors", authorId], () =>
      readAuthorById(authorId)
    );
  };

  return (
    <div
      className="m-2 rounded border border-white bg-grey p-2 shadow hover:shadow-md"
      onMouseEnter={() => prefetchAuthor(authorSummary.id)}>
      <Link to={`${authorSummary.id}`} className="flex">
        <div className="card-title rounded py-2 px-4">
          <h3>{authorSummary.fullNameFirstThenLast}</h3>
        </div>
      </Link>
      <div className="card-body m-1">
        <div className="author-description">{authorSummary.bio}</div>
        <div className="author-meta-container mt-4 flex justify-end gap-2">
          {/* <div className="flex flex-1 items-center rounded border bg-dark text-2xl">
            <BiPurchaseTagAlt className="ml-2" />
            {authorSummary.tags?.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div> */}
          {/* <Link
            to={`/authors/${authorSummary.id}#comments`}
            className="author-comment flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCommentDetail />
            {authorSummary.commentCount}
          </Link> */}

          {/* <Link
            to={`/topics/${authorSummary.topic.id}`}
            className="author-topic flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCategory />
            {authorSummary.topic.name}
          </Link> */}
          {/* <Link
            to={`/authors/${authorSummary.author.id}`}
            className="author-author flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <FiUser /> {postSummary.author.fullNameFirstThenLast}
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
