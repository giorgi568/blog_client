import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import styles from '../styles/comment.module.css';
import he from 'he';
import DOMpurify from 'dompurify';

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
  reloadNewComment?: boolean;
}
interface comment {
  text: string;
  author: string;
  timestamp: string;
}

function Comment({ postId, reloadNewComment }: commentProps) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getComments(postId: string | undefined) {
      const comments = await fetchComments(postId);
      setComments(comments);
    }
    getComments(postId);
  }, [postId, reloadNewComment]);
  return (
    <div className={styles.comments}>
      {comments.map((comment: comment) => {
        return (
          <div key={uuidv4()} className={styles.container}>
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(he.decode(comment.text)),
              }}
            ></p>
            <div className={styles.wrapper}>
              <em className={styles.comment}>by {comment.author}</em>
              <em className={styles.timestamp}>
                {DateTime.fromISO(comment.timestamp).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </em>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
