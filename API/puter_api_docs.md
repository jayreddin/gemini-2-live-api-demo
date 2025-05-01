<!\[CDATA[
## Puter.js API Documentation

### Authentication

Puter.js provides functions for signing in, signing out, and getting user information.

```javascript
// Sign in
puter.auth.signIn().then((res) => {
    puter.print('Signed in<br>' + JSON.stringify(res));
});

// Sign out
puter.auth.signOut();

// Get user information
puter.auth.getUser().then((user) => {
    puter.print(JSON.stringify(user));
});
```

### AI Functions

Puter.js provides access to AI models like GPT-4o, Claude 3.7 Sonnet, and DALL·E 3.

```javascript
// Chat with GPT-4o mini
puter.ai.chat(`What is life?`).then(puter.print);

// Generate an image of a cat using DALL·E 3
puter.ai.txt2img('A picture of a cat.', true).then((image)=>{
    document.body.appendChild(image);
});
```

### Cloud Storage Functions

Puter.js provides functions for interacting with cloud storage.

```javascript
// Write a file to the cloud
puter.fs.write('hello.txt', 'Hello, world!').then((file) => {
    puter.print(`File written successfully at: ${file.path}`);
});

// Read a file from the cloud
puter.fs.read(filename).then((blob) => {
    blob.text().then((content) => {
        puter.print(`File content: ${content}`);
    });
});
```

### Key-Value Store Functions

Puter.js provides functions for interacting with a NoSQL database.

```javascript
// Save user preference
puter.kv.set('userPreference', 'darkMode').then(() => {
    // Get user preference
    puter.kv.get('userPreference').then(value => {
        puter.print(`User preference: ${value}`);
    });
});
```

### Hosting Functions

Puter.js provides functions for hosting static websites.

```javascript
// Publish a static website
puter.hosting.create(subdomain, dirName).then((site) => {
    puter.print(`Website hosted at: <a href="https://${site.subdomain}.puter.site" target="_blank">https://${site.subdomain}.puter.site</a>`);
});
```

### API Endpoints

*   `/share`: Shares files and apps with other users.
*   `/sharelink/apply`: Applies a sharelink to the current user.
*   `/sharelink/check`: Checks the validity of a sharelink.
*   `/group/add-users`: Adds users to a group.

]]>