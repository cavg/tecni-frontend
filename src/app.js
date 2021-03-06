var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		    this.setState({data: data.Results});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	getInitialState: function() {
    	return {data: []};
	},
	componentDidMount: function() {
	    this.loadCommentsFromServer();
	    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
		  <div className="commentBox">
		    <h1>Comments</h1>
		     <CommentList data={this.state.data} />
		    <CommentForm />
		  </div>
		);
	}
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.Title}>
          {comment.Source}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

// const Card = require('../node_modules/material-ui/lib/card');
var Comment = React.createClass({
	rawMarkup: function() {
	    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
	    return { __html: rawMarkup };
	},
	render: function() {
	    return (
	      <div className="comment">
	        <h2 className="commentAuthor">
	          {this.props.author}
	        </h2>
	        <span dangerouslySetInnerHTML={this.rawMarkup()} />
	      </div>
	    );
	}
});

ReactDOM.render(
  <CommentBox url="/search?q=huechuraba&size=25&offset=0"  pollInterval={2000} />,
  document.getElementById('content')
);