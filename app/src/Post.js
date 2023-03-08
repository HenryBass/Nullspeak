import './App.css';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Post({postContent}) {

  function getAgo(time) {
    let date = new Date(Date.now() - postContent.timestamp)
    if (Math.floor(date / 1000 / 60 / 60) < 24) {
      return Math.floor(date / 1000 / 60 / 60) + " hours ago";
    } else {
      return Math.floor(date / 1000 / 60 / 60 / 24) + " days ago";
    }
  }

  let isAdmin = {color:'white'}
  let user = postContent.userID;
  
  if (user == "48c710744581ec03258ab71904573069") {
    isAdmin = {color: 'red'}
  }
  if (user == "16e81f4197118f20ddab0ebcfa272922") {
    user = "Anonymous"
  }
  return (
    <div className = 'post'>
    <p  style = {isAdmin}>UserID: <b>{user}</b></p>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{postContent.content}</ReactMarkdown>
    <p className='unimportant'>{getAgo(postContent.timestamp)}</p>

    </div>
  );
}

export default Post;
