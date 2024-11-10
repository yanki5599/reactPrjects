import { useDispatch } from "react-redux";
import { reactionAdded } from "../store/features/posts/postsSlice";
import { Post } from "../types";

// הגדרת טיפוס לסוגי התגובות האפשריות
type ReactionType = keyof Post['reactions'];

// הגדרת טיפוס לאובייקט האימוג'ים כך שהמפתחות יתאימו לטיפוס התגובות
const reactionEmoji: Record<ReactionType, string> = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
};

interface ReactionButtonsProps {
    post: Post;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        // כאן name כבר יהיה מטיפוס ReactionType
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ 
                        postId: post.id, 
                        reaction: name as ReactionType 
                    }))
                }
            >
                {emoji} {post.reactions[name as ReactionType]}
            </button>
        );
    });

    return <div>{reactionButtons}</div>;
};

export default ReactionButtons;