import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import { formatDate } from './../helpers/dateHelper'
import Thumbup from 'material-ui/svg-icons/action/thumb-up';
import Thumbdown from 'material-ui/svg-icons/action/thumb-down';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import * as actions from './../actions';

export class PostView extends Component {
    upVote = () => {
        const postId = this.props.post.id;
        this.props.votePost('upVote', postId);
    }
    downVote = () => {
        const postId = this.props.post.id;
        this.props.votePost('downVote', postId);
    }
    render() {
        const { post } = this.props;
        return (<div className="card-item">

            <Card>
                <Link to={`/${post.category}/${post.id}`}>
                    <CardHeader className='card-header'
                        avatar={`https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png`}
                        title={post.title.length > 30 ? `${post.title.substr(0, 30)}...` : post.title}
                        subtitle={`by ${post.author} - ${formatDate(post.timestamp)}`}
                    />

                    <CardText className="card-body">
                        {post.body}
                    </CardText>
                </Link>
                <CardText className="card-vote">
                    {`${post.commentCount} comments`}
                    <div className="action-buttons-container">
                        <div className="up-down-vote-container">

                            <IconButton onClick={this.upVote} tooltip="Upvote">
                                <Thumbup />
                            </IconButton>
                            <p>{post.voteScore} votes</p>
                            <IconButton onClick={this.downVote} tooltip="Downvote">
                                <Thumbdown />
                            </IconButton>
                        </div>
                    </div>
                </CardText>
            </Card>
        </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        votePost: (voteOption, postId) => dispatch(actions.voteForPost(voteOption, postId))
    };
}

export default connect(null, mapDispatchToProps)(PostView);