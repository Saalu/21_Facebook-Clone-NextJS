import { useCollection } from "react-firebase-hooks/firestore";
import Post from "./Post";
import { db } from "../firebase";

function Posts({ posts }) {
  const [realtimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  return (
    <div className="">
      {realtimePosts
        ? realtimePosts?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              postImage={post.data().postImage}
              image={post.data().image}
              timestamp={post.data().timestamp}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              postImage={post.postImage}
              image={post.image}
              timestamp={post.timestamp}
            />
          ))}
    </div>
  );
}

export default Posts;
