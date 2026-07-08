import React from 'react';

type Messages = typeof import('./messages/en.json');
declare interface IntlMessages extends Messages { };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}