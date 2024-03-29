import { useState } from 'react';

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
        >
          <label htmlFor='username'> Enter Your Name</label>
          <input type='text' name='username' id='username' />
          <textarea id="mytextarea"></textarea>
        </form>
      )}
    </div>
  );
}

export default NewComment;
