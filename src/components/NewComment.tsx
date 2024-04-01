import { useState } from 'react';
import TinyMCEEditor from './TinyMCEEditor';
import styles from '../styles/newComment.module.css';

interface commentProps {
  postId?: string;
  reloadFn?: () => void;
}

function NewComment({ postId, reloadFn }: commentProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
        style={{ width: 200 + 'px', float: 'left' }}
      >
        {isActive ? 'Discard' : 'Add A New Comment'}
      </button>
      <br />
      {isActive && (
        <form
          action=''
          className={styles.form}
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const formDataJson: { [key: string]: string } = {};

              formData.forEach((value, key) => {
                formDataJson[key] = value as string;
              });

              await fetch(
                `https://furry-leeward-ricotta.glitch.me/post/${postId}/comment`,
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },

                  body: JSON.stringify(formDataJson),
                }
              );
              if (reloadFn) {
                reloadFn();
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <div className={styles.wrapper}>
            <label htmlFor='author' className={styles.username}>
              {' '}
              Enter Your Name:
            </label>
            <input
              type='text'
              name='author'
              id='author'
              className={styles.usernameInput}
            />
          </div>
          <TinyMCEEditor value='Write Your Comment Here' />
          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default NewComment;
