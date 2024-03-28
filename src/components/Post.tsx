import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

async function fetchPost(postId: string | undefined) {
  try {
    if (typeof postId === 'undefined') {
      throw new Error('Failed to fetch the post, postId is undefined');
    }
    const post = await fetch(
      `https://furry-leeward-ricotta.glitch.me/post/${postId}`,
      {
        mode: 'cors',
      }
    );
    if (!post.ok) {
      throw new Error('Failed to fetch the post');
    }
    const parsedPost = await post.json();
    return parsedPost.post;
  } catch (err) {
    console.error('error fetching the post', err);
  }
}

function Post() {
  const [post, setPost] = useState({title: ''});
  const params = useParams();
  useEffect(() => {
    async function getPost(postId: string | undefined) {
      const post = await fetchPost(postId)
      setPost(post)
    }
    getPost(params.id)
  },[params.id]);
  
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}

export default Post;
