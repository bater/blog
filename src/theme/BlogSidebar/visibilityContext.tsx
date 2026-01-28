import {createContext, useContext} from 'react';

type BlogSidebarVisibility = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

export const BlogSidebarVisibilityContext =
  createContext<BlogSidebarVisibility>({
    hidden: false,
    setHidden: () => {},
  });

export function useBlogSidebarVisibility() {
  return useContext(BlogSidebarVisibilityContext);
}
