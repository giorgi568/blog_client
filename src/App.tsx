import { useEffect, useState } from 'react';
import './App.css';
import styles from './styles/app.module.css';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

async function fetchPosts() {
  try {
    const posts = await fetch('https://furry-leeward-ricotta.glitch.me/posts', {
      mode: 'cors',
    });
    if (!posts.ok) {
      throw new Error('Failed to fetch posts');
    }
    const parsedPosts = await posts.json();
    const postsObj = parsedPosts.posts;
    const publishedPosts = postsObj.filter((post: postObj) => {
      return post.published === true;
    });
    return publishedPosts;
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
}

interface postObj {
  title?: string;
  author?: authorObj;
  published?: boolean;
  text?: string;
  timestamp: string;
  _id: string;
}
interface authorObj {
  username?: string;
}

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    }
    getPosts();
  }, []);

  return (
    <div>
      <nav>
        <img src="\article.svg" alt="image of an article" style={{float: 'left', width: '50px'}}/>
        <h4 style={{ fontSize: '20px', margin: '0px' }}>Simple Blog</h4>
      </nav>
      <div className={styles.content}>
        {posts.map((post: postObj, index: number) => {
          return (
            <div key={index} className={styles.postCard}>
              <Link to={`/post/${post._id}`}>
                <h3 className={styles.title}>{post.title}</h3>
                <div className={styles.wrapper}>
                  {typeof post.author !== 'undefined' ? (
                    <em>By {post.author?.username}</em>
                  ) : (
                    'unknown'
                  )}
                  <em>
                    {DateTime.fromISO(post.timestamp).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </em>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
