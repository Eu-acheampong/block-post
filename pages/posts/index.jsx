import React from "react";

const Posts = ({ posts }) => {
  // console.log(posts);
  return (
    <div>
      <h1>List of posts</h1>
      {posts.map((post, idx) => (
        <div key={idx} className="border border-gray-300 shadow-md p-5">
          <h1 className="text-2xl">{post.title}</h1>
          <h3>
            {post.author} - <small>{post.puplishedDate}</small>{" "}
          </h3>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Posts;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/posts");
  const posts = await res.json();

  // fetching takes place here

  return {
    props: {
      posts,
    },
  };
}
