import React from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Plaid = () => {
    const { open, ready } = usePlaidLink({
        token: 'link-sandbox-bd99f1a9-ebba-4531-b0d8-8d3726209752', /* link_token from /plaid-get-token api */
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