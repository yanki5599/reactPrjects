import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "./store/features/posts/postsSlice";
import { fetchUsers } from "./store/features/users/usersSlice";
import { AppDispatch } from "./store/store";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("use effect");

    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <main className="App">
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
