## Hosting The Back End (non-dockerized method)

First, make sure to download the .env file from the email and put into the backend directory.

If you have uv installed, follow all the steps. If you don't have uv installed, run `bash brew install uv` to install uv.

1. To install Python v3.13: `bash uv python install 3.13`
2. To install all packages: `bash uv sync`
3. To start the prod. server: `bash uvicorn src.main:app --host 0.0.0.0 --port 8000`
