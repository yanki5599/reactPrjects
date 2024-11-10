import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/features/posts/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useEffect } from "react";

const PostsList: React.FC = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts;
  // .slice()
  // .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {});

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        {/* בדיקה שקיים userId לפני העברה לקומפוננטה */}
        {post.userId && <PostAuthor userId={post.userId} />}
        <TimeAgo timestamp={post.date} />
      </p>
      {/* <ReactionButtons post={post} /> */}
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
