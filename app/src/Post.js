import './App.css';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Post({postContent}) {
  let isAdmin = {color:'white'}
  if (postContent.userID == "48c710744581ec03258ab71904573069") {
    isAdmin = {color: 'red'}
  }
  return (
    <div className = 'post'>
    <p  style = {isAdmin}>UserID: <b>{postContent.userID}</b></p>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{postContent.content}</ReactMarkdown>
    </div>
  );
}

export default Post;
