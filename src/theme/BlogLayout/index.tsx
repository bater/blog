import React, {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import {BlogSidebarVisibilityContext} from '@site/src/theme/BlogSidebar/visibilityContext';

import type {Props} from '@theme/BlogLayout';

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <BlogSidebarVisibilityContext.Provider
      value={{hidden: sidebarHidden, setHidden: setSidebarHidden}}>
      <Layout {...layoutProps}>
        <div className="container margin-vert--lg">
          <div className="row">
            <BlogSidebar sidebar={sidebar} />
            <main
              className={clsx('col', {
                'col--7': hasSidebar && !sidebarHidden,
                'col--9 col--offset-1': !hasSidebar || sidebarHidden,
              })}>
              {children}
            </main>
            {toc && <div className="col col--2">{toc}</div>}
          </div>
        </div>
      </Layout>
    </BlogSidebarVisibilityContext.Provider>
  );
}
