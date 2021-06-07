import {TextField} from '@material-ui/core';
import {useState} from 'react';

function CreatePost() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const update = (e, func, max = 99999) => {
    console.log(e.target.value.length);
    if (e.target.value.length < max) {
      func(e.target.value);
    } else {
      func(e.target.value.substr(0, max));
    }
  }

  return (
    <form className="post-form">
      <TextField value={title} fullWidth label="Post Title" required onChange={(e) => update(e, setTitle, 120)} />
      <TextField value={img} fullWidth label="Post Image URL" onChange={(e) => update(e, setImg)} />
      <TextField value={content} fullWidth multiline rows={10} label="Post Content" required className="content-input" variant="filled" onChange={(e) => update(e, setContent, 1000)} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default CreatePost;