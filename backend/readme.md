## Hosting The Back End (non-dockerized method)

1. Make sure to download the .env file from the email and put into the backend directory.
2. If you have uv installed, follow all the steps. If you don't have uv installed, run `bash brew install uv` to install uv.

3. To install Python v3.13: `bash uv python install 3.13`
4. Create a virtual environment: `bash uv venv`
5. Activate the virtual environment: `source .venv/bin/activate`
6. To install all packages: `bash uv sync`
7. To start the prod. server: `bash uvicorn src.main:app --host 0.0.0.0 --port 8000`
