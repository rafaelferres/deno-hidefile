# Deno-Hidefile
>Create hidden files or folders in Deno 🦕

## Usage
>This module need --allow-read --allow-write --allow-run

### Create hidden file

```ts
import  HideFile  from  'https://deno.land/x/deno_hidefile/mod.ts';

let  x = await  HideFile.createHiddenFile("D://path.json"); // Create hidden file

console.log(x);
```

> console.log: { path: "D:\\.path.json" }

### Create hidden folder

```ts
import  HideFile  from  'https://deno.land/x/deno_hidefile/mod.ts';

let  x = await  HideFile.createHiddenFolder("D://path");

console.log(x);
```

> console.log: { path: "D:\\.path" }

### Hidden an exists folder or file

```ts
import  HideFile  from  'https://deno.land/x/deno_hidefile/mod.ts';

let  x = await  HideFile.hiddenExistsFolderOrFile(path);

console.log(x);
```

> console.log: { path: new_path }
