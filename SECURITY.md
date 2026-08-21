# Security policy

## Secrets

Never commit API keys, access tokens, passwords, or local `.env` files. Copy
`.env.example` to `.env.local` for local development and keep real values only
in the local environment or the deployment provider's encrypted environment
variables.

If a secret is committed, revoke or rotate it immediately. Removing the file in
a later commit does not remove the secret from Git history.

The YouTube API key must be restricted in Google Cloud to the YouTube Data API
v3 and to the deployment environment that makes the server-side request.

## Reporting a vulnerability

Report vulnerabilities privately to the repository owner. Do not include live
credentials in issues, pull requests, screenshots, logs, or chat messages.
