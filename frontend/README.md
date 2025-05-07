## Hosting The Front End (non-dockerized method)

If you have nvm installed, follow all the steps. If you don't have nvm installed, but have node installed, follow step 3 onwards.

If you want to install nvm:

```bash
 brew install nvm
```

If you want to install node:

```bash
 brew install node
```

1. To install node v23.11.0:

```bash
 nvm install 23.11.0
```

2. To use node v23.11.0 with nvm (run this within the frontend directory):

```bash
 nvm use
```

3. To install all packages (run this within the frontend directory):

```bash
 npm install
```

4. Build the project (run this within the frontend directory):

```bash
 npm run build
```

5. To start the prod. server (run this within the frontend directory):

```bash
 npm run start
```

6. Once the setup is complete, access the website via: [Here](http://localhost:3000/upload)
