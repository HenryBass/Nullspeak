import './App.css';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Icon from '@hackclub/icons'

function Post({postContent}) {

  function handleClick() {
    window.location.href = "/comments?" + encodeURIComponent(postContent._id)
  }

  function getAgo(time) {
    let date = new Date(Date.now() - postContent.timestamp)
    if ((date / 1000 / 60) < 60) {
      return Math.floor(date / 1000 / 60) + " minute" + (Math.floor(date / 1000 / 60) == 1 ? "" : "s") + " ago";
    } else if (Math.floor(date / 1000 / 60 / 60) < 24) {
      return Math.floor(date / 1000 / 60 / 60) + " hour" + (Math.floor(date / 1000 / 60 / 60) > 1 ? "s" : "") + " ago";
    } else {
      return Math.floor(date / 1000 / 60 / 60 / 24) + " day" + (Math.floor(date / 1000 / 60 / 60 / 24) > 1 ? "s" : "") + " ago";
    }
  }

  let isAdmin = {color:'white'}
  let user = postContent.userID;
  
  if (postContent.replyCount == undefined) {
    postContent.replyCount = 0;
  }

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
    <button className='repliesButton' onClick={handleClick}><Icon glyph="message-simple-fill" size={28}/> {postContent.replyCount}</button>
    </div>
  );
}

export default Post;
