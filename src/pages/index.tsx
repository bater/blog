import React, { JSX } from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): JSX.Element {
    const blogUrl = useBaseUrl('/blog');
    return <Redirect to={blogUrl} />;
}
