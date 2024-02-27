import React from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Plaid = () => {
    const { open, ready } = usePlaidLink({
        token: 'link-sandbox-f309464f-6b37-4aab-b91c-4921b1dfd07d', /* link_token from /plaid-get-token api */
        onSuccess: (public_token, metadata) => {
            // send public_token to server
            console.log('Your public token is', public_token);
        },
    });
    return (
        <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
        </button>
    );
}

export default Plaid;