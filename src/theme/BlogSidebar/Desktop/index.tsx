import React, {memo} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type {Props as BlogSidebarContentProps} from '@theme/BlogSidebar/Content';
import type {Props} from '@theme/BlogSidebar/Desktop';
import {useBlogSidebarVisibility} from '@site/src/theme/BlogSidebar/visibilityContext';

import styles from './styles.module.css';

const ListComponent: BlogSidebarContentProps['ListComponent'] = ({items}) => {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName={clsx(styles.sidebarItemList, 'clean-list')}
      liClassName={styles.sidebarItem}
      linkClassName={styles.sidebarItemLink}
      linkActiveClassName={styles.sidebarItemLinkActive}
    />
  );
};

function BlogSidebarDesktop({sidebar}: Props) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {hidden, setHidden} = useBlogSidebarVisibility();

  return (
    <aside
      className={clsx('col col--3', styles.sidebarContainer, {
        [styles.sidebarContainerHidden]: hidden,
      })}>
      <div className={styles.sidebarSticky}>
        <button
          type="button"
          title={hidden ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={hidden ? 'Expand sidebar' : 'Collapse sidebar'}
          className={clsx(styles.collapseSidebarButton, {
            [styles.collapseSidebarButtonHidden]: hidden,
          })}
          onClick={() => setHidden(!hidden)}>
          {hidden ? '→' : '←'}
        </button>
        {!hidden && (
          <nav
            className={clsx(styles.sidebar, 'thin-scrollbar')}
            aria-label={translate({
              id: 'theme.blog.sidebar.navAriaLabel',
              message: 'Blog recent posts navigation',
              description:
                'The ARIA label for recent posts in the blog sidebar',
            })}>
            <div
              className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
              {sidebar.title}
            </div>
            <BlogSidebarContent
              items={items}
              ListComponent={ListComponent}
              yearGroupHeadingClassName={styles.yearGroupHeading}
            />
          </nav>
        )}
      </div>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
