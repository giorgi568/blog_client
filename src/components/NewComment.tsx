import { useState } from 'react';
import TinyMCEEditor from './TinyMCEEditor';
import styles from '../styles/newComment.module.css'

interface commentProps {
  postId?: string;
}

function NewComment({ postId }: commentProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        style={{ marginRight: '100%', width: 200 + 'px' }}
      >
        Add A New Comment
      </button>

      {isActive && (
        <form
          action={`https://furry-leeward-ricotta.glitch.me/post/${postId}/comment`}
          method='post'
          className={styles.form}
        >
          <div className={styles.wrapper}>
            <label htmlFor='author' className={styles.username}> Enter Your Name:</label>
            <input type='text' name='author' id='author' className={styles.usernameInput} />
          </div>
          <TinyMCEEditor value='Write Your Comment Here'/>
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default NewComment;
