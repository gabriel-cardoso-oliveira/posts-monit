import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import { toast } from 'react-toastify';
import api from '../../services/api';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

const PostsList = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const [posts, setPosts] = useState([]);

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const getPosts = async users => {
    try {
      const { data } = await api.get('posts');

      const postsTmp = data.map(post => {
        const user = users.find(user => user.id === post.userId);

        if (!user) {
          post.userName = 'Unidentified user';
          post.company = 'Unidentified company';

          return post;
        }

        post.userName = user.name;
        post.company = user.company;

        return post;
      });

      return setPosts(postsTmp);
    } catch (error) {
      return toast.error('Ocorreu um erro inesperado. Tente novamente!');
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await api.get('users');

      const users = data.map(user => {
        return {
          id: user.id,
          name: user.name,
          company: user.company.name,
        };
      });

      return getPosts(users);
    } catch (error) {
      return toast.error('Ocorreu um erro inesperado. Tente novamente!');
    }
  };

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <div className={tilesClasses}>

            {
              posts.map(post => (
                <div
                  key={post.id}
                  className="tiles-item reveal-from-left is-revealed"
                  data-reveal-delay="200"
                >
                  <div className="tiles-item-inner">
                    <span className="testimonial-item-name text-color-high">
                      {post.title.toUpperCase()}
                    </span>
                    <div className="testimonial-item-content">
                      <p className="text-sm mb-0">
                        — {post.body}
                      </p>
                    </div>
                    <div
                      className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"
                    >
                      <span className="testimonial-item-name text-color-high">
                        {post.userName}
                      </span>
                      <span className="text-color-low"> / </span>
                      <span className="testimonial-item-link">
                        <a href="#0">{post.company}</a>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    </section>
  );
}

PostsList.propTypes = propTypes;
PostsList.defaultProps = defaultProps;

export default PostsList;
