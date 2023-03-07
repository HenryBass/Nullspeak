import './App.css';


function About() {
  return (
    <div className='about'>
    <h1>FAQ:</h1>
      <div className = 'post'>
      <h2>What are userIDs?</h2>
      The userID is a way of verifying who users are. It's the result of a one way cryptographic operation on the poster's key, meaning that only people who know the secret key of an ID can post with it. You can leave the user key blank to post under a generic ID too.
      </div>
      <div className = 'post'>
      <h2>Is this moderated?</h2>
      Posts can be deleted, and users can be IP banned. That said, expect very little actual moderation.
      </div>
      <div className = 'post'>
      <h2>Are there any rules?</h2>
      Not really. Use common sense, that's all.
      </div>
      <div className = 'post'>
      <h2>How can I tell if a post comes from an admin?</h2>
      As of now, the admin user ID is: <b style={{color:'red'}}>48c710744581ec03258ab71904573069</b><br/>The admin userID will be highlighted red.
      </div>
    </div>
  );
}

export default About;
