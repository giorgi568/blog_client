import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

async function fetchComments(postId: string | undefined) {
  try {
    if (typeof postId === 'undefined') {
      throw new Error('Failed to fetch the post, postId is undefined');
    }
    const comments = await fetch(
      `https://furry-leeward-ricotta.glitch.me/post/${postId}/comments`,
      {
        mode: 'cors',
      }
    );
    if (!comments.ok) {
      throw new Error('Failed to fetch the post');
    }
    const parsedComments = await comments.json();
    return parsedComments.comments;
  } catch (err) {
    console.error('error fetching the post', err);
  }
}
interface commentProps {
  postId?: string;
}
interface comment {
  text?: string;
  author?: string;
  timestamp?: string;
}

function Comment({ postId }: commentProps) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments(postId: string | undefined) {
      const comments = await fetchComments(postId);
      setComments(comments);
    }
    getComments(postId);
  }, [postId]);
  console.log(comments);
  return (
    <div>
      {comments.map((comment: comment) => {
        return (
          <div key={uuidv4()}>
            <p>{comment.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
