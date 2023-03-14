import React from "react";
import Post from "../../components/post/Post";
import "./timeline.css";

function Timeline() {
  let posts = [
    {
      title: "Lorem Ipsum",
      date: "2h ago",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      topics: ["TOPIC 1", "TOPIC 2"],
      groups: ["GROUP 1"],
      author: "Anders A.",
      profileInitials: "AA",
      comments: [
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
      ],
    },
    {
      title: "Lorem Ipsum",
      date: "2h ago",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      topics: ["TOPIC 1", "TOPIC 2"],
      groups: ["GROUP 1"],
      author: "Anders A.",
      profileInitials: "AA",
      comments: [
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
      ],
    },
  ];
  return (
    <div className="timeline">
      Timeline
      {posts.map((post) => (
        <Post
          title={post.title}
          date={post.date}
          body={post.body}
          topics={post.topics}
          groups={post.groups}
          author={post.author}
          profileInitials={post.profileInitials}
          comments={post.comments}
        />
      ))}
    </div>
  );
}

export default Timeline;
