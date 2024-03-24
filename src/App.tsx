import { useEffect, useState } from 'react';
import './App.css';
import { DateTime } from 'luxon';

async function fetchPosts() {
  try {
    const posts = await fetch('https://furry-leeward-ricotta.glitch.me/posts', {
      mode: 'cors',
    });
    if (!posts.ok) {
      throw new Error('Failed to fetch posts');
    }
    const parsedPosts = await posts.json();
    console.log(parsedPosts.posts);
    return parsedPosts.posts;
  } catch (err) {
    console.error('Error fetching posts:', err);
  }
}

interface postObj {
  title?: string;
  author?: authorObj;
  published?: boolean;
  text?: string;
  timestamp?: string;
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
    <div className='content'>
      {posts.map((post: postObj, index: number) => {
        return (
          <div key={index} className='postCard'>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            {typeof post.author !== 'undefined' ? (
              <em>{post.author?.username}</em>
            ) : (
              'unknown'
            )}
            <br />
            
            {/* <em>{post.timestamp}</em> */}
            <em>
              {DateTime.fromISO(post.timestamp).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </em>
          </div>
        );
      })}
    </div>
  );
}

export default App;
