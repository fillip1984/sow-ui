import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { tagKeys, readTagById } from "../../services/TagService";
import { TagSummary } from "../../Types";

interface TagCardProps {
  tagSummary: TagSummary;
}

const TagCard = ({ tagSummary }: TagCardProps) => {
  const queryClient = useQueryClient();
  const prefetchTag = async (tagId: number) => {
    await queryClient.prefetchQuery(tagKeys.detail(tagId), () =>
      readTagById(tagId)
    );
  };

  return (
    <div
      className="m-2 rounded border border-white bg-grey p-2 shadow hover:shadow-md"
      onMouseEnter={() => prefetchTag(tagSummary.id)}>
      <Link to={`${tagSummary.id}`} className="flex">
        <div className="card-title rounded py-2 px-4">
          <h3>{tagSummary.name}</h3>
        </div>
      </Link>
      <div className="card-body m-1">
        <div className="tag-description">{tagSummary.description}</div>
        <div className="tag-meta-container mt-4 flex justify-end gap-2">
          {/* <div className="flex flex-1 items-center rounded border bg-dark text-2xl">
            <BiPurchaseTagAlt className="ml-2" />
            {tagSummary.tags?.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div> */}
          {/* <Link
            to={`/tags/${tagSummary.id}#comments`}
            className="tag-comment flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCommentDetail />
            {tagSummary.commentCount}
          </Link> */}

          {/* <Link
            to={`/tags/${tagSummary.tag.id}`}
            className="tag-tag flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCategory />
            {tagSummary.tag.name}
          </Link> */}
          {/* <Link
            to={`/tags/${tagSummary.tag.id}`}
            className="tag-tag flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <FiUser /> {postSummary.tag.fullNameFirstThenLast}
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default TagCard;
