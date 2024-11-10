// PostAuthor.tsx
import { useSelector } from "react-redux";
import { selectAllUsers } from "../store/features/users/usersSlice";
import { RootState } from "../types";

interface PostAuthorProps {
    userId: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users.find((user) => user.id === userId);
    return <span>by {author ? author.name : "Unknown author"}</span>;
};
export default PostAuthor;