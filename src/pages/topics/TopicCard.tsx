import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { topicKeys, readTopicById } from "../../services/TopicService";
import { TopicSummary } from "../../Types";

interface TopicCardProps {
  topicSummary: TopicSummary;
}

const TopicCard = ({ topicSummary }: TopicCardProps) => {
  const queryClient = useQueryClient();
  const prefetchTopic = async (topicId: number) => {
    await queryClient.prefetchQuery(topicKeys.detail(topicId), () =>
      readTopicById(topicId)
    );
  };

  return (
    <div
      className="m-2 rounded border border-white bg-grey p-2 shadow hover:shadow-md"
      onMouseEnter={() => prefetchTopic(topicSummary.id)}>
      <Link to={`${topicSummary.id}`} className="flex">
        <div className="card-title rounded py-2 px-4">
          <h3>{topicSummary.name}</h3>
        </div>
      </Link>
      <div className="card-body m-1">
        <div className="topic-description">{topicSummary.description}</div>
        <div className="topic-meta-container mt-4 flex justify-end gap-2">
          {/* <div className="flex flex-1 items-center rounded border bg-dark text-2xl">
            <BiPurchaseTagAlt className="ml-2" />
            {topicSummary.tags?.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div> */}
          {/* <Link
            to={`/topics/${topicSummary.id}#comments`}
            className="topic-comment flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCommentDetail />
            {topicSummary.commentCount}
          </Link> */}

          {/* <Link
            to={`/topics/${topicSummary.topic.id}`}
            className="topic-topic flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <BiCategory />
            {topicSummary.topic.name}
          </Link> */}
          {/* <Link
            to={`/topics/${topicSummary.topic.id}`}
            className="topic-topic flex items-center gap-1 rounded border-2 bg-dark p-2 text-xl">
            <FiUser /> {postSummary.topic.fullNameFirstThenLast}
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
