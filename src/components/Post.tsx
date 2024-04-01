import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/post.module.css';
import { DateTime } from 'luxon';
import Comment from './Comment';
import NewComment from './NewComment';

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
  const [post, setPost] = useState({
    title: '',
    text: '',
    timestamp: '',
  });
  const params = useParams();
  const [reloadNewComment, setReloadNewComment] = useState(false);
  const reloadFn = () => {
    setReloadNewComment(!reloadNewComment);
  };
  useEffect(() => {
    async function getPost(postId: string | undefined) {
      const post = await fetchPost(postId);
      setPost(post);
    }
    getPost(params.id);
  }, [params.id]);
  // console.log(post);
  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.text}>{post.text}</p>
        <em className={styles.timestamp}>
          {DateTime.fromISO(post.timestamp).toLocaleString(
            DateTime.DATETIME_MED
          )}
        </em>
      </div>
      <h3 className={styles.comments}>Comments:</h3>
      <NewComment postId={params.id} reloadFn={reloadFn}></NewComment>
      <Comment postId={params.id} reloadNewComment={reloadNewComment}></Comment>
    </div>
  );
}

export default Post;
