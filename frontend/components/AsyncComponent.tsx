import React from 'react';

interface IAsyncComponent {
  Component: JSX.Element;
  isError: boolean;
  isLoading: boolean;
}

export const AsyncComponent = (props: IAsyncComponent) => {
  const { Component, isError, isLoading } = props;

  return (
    <>
      {isError && <div>Something went wrong.</div>}
      {isLoading ? <div>Loading...</div> : <>{Component}</>}
    </>
  );
};
