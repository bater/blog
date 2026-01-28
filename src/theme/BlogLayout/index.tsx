import React, {useState, useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import {BlogSidebarVisibilityContext} from '@site/src/theme/BlogSidebar/visibilityContext';

import type {Props} from '@theme/BlogLayout';

const STORAGE_KEY = 'blogSidebarHidden';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getStoredSidebarState(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return false;
    }
    const {hidden, expiry} = JSON.parse(stored);
    if (Date.now() > expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return hidden;
  } catch {
    return false;
  }
}

function setStoredSidebarState(hidden: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const data = {
      hidden,
      expiry: Date.now() + ONE_DAY_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const [sidebarHidden, setSidebarHidden] = useState(false);

  // Read from localStorage on mount (client-side only)
  useEffect(() => {
    setSidebarHidden(getStoredSidebarState());
  }, []);

  // Save to localStorage when state changes
  const handleSetHidden = (hidden: boolean) => {
    setSidebarHidden(hidden);
    setStoredSidebarState(hidden);
  };

  return (
    <BlogSidebarVisibilityContext.Provider
      value={{hidden: sidebarHidden, setHidden: handleSetHidden}}>
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
            {toc && !sidebarHidden && <div className="col col--2">{toc}</div>}
          </div>
        </div>
      </Layout>
    </BlogSidebarVisibilityContext.Provider>
  );
}
