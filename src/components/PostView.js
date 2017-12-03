import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import { formatDate } from './../helpers/dateHelper'

export function PostView({ post }) {
    return (<div className="card-item">
        <Link to={`/post/${post.id}`}>
            <Card>
                <CardHeader className='card-header'
                    avatar={`https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png`}
                    title={post.title.length > 30 ? `${post.title.substr(0, 30)}...` : post.title}
                    subtitle={`by ${post.author} - ${formatDate(post.timestamp)}`}
                />
                <CardText className="card-body">
                    {post.body}
                </CardText>
                <CardText className="card-vote">
                    {post.voteScore} votes
            </CardText>
            </Card>
        </Link>
    </div>

    )
}