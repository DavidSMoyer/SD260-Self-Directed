import {TextField, Switch, FormControlLabel} from '@material-ui/core';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

function CreatePost({user}) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [postPrivate, setPostPrivate] = useState(false);
  const history = useHistory();

  const update = (e, func, max = 99999) => {
    if (e.target.value.length < max) {
      func(e.target.value);
    } else {
      func(e.target.value.substr(0, max));
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    const post = {
      title,
      imageURL: img,
      content,
      likes: 0,
      comments: [],
      owner: {
        name: user.username,
        img: user.imageURL,
        id: user.id
      },
      private: postPrivate,
      postTime: Date.now()
    }

    const submit = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(post)
    });
    if (!submit.ok) {
      alert("Something went wrong.");
    } else {
      history.push("/");
    }
  }

  return (
    <form className="post-form" onSubmit={submit}>
      <TextField value={title} fullWidth label="Post Title" required onChange={(e) => update(e, setTitle, 120)} />
      <TextField value={img} fullWidth label="Post Image URL" onChange={(e) => update(e, setImg)} />
      <TextField value={content} fullWidth multiline rows={10} label="Post Content" required className="content-input" variant="filled" onChange={(e) => update(e, setContent, 1000)} />
      <FormControlLabel control={<Switch checked={postPrivate} onChange={(e) => setPostPrivate(e.target.checked)} />} label="Private Post" labelPlacement="top" />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default CreatePost;