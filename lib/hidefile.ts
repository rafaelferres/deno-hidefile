import * as _path from "https://deno.land/std/path/mod.ts";

// attrib +s +h
class HideFile {
    private os: string;

    constructor(){
        this.os = Deno.build.os;
    }

    public async createHiddenFolder(path: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            

            let path_dirname = _path.dirname(path);
            let path_basename = _path.basename(path);

            if(path_basename.charAt(0) != "."){
                path_basename = "." + path_basename;
            }

            let new_path_dirname = _path.join(path_dirname, path_basename);
            await Deno.mkdirSync(new_path_dirname);

            if(this.os == "windows"){
                try{
                    await this.hiddenFolder(new_path_dirname);
                }catch(err){
                    reject(err);
                }
            }

            resolve({ path : new_path_dirname});
        });
    }

    public async createHiddenFile(path: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            let path_dirname = _path.dirname(path);
            let path_basename = _path.basename(path);
            
            if(path_basename.charAt(0) != "."){
                path_basename = "." + path_basename;
            }

            let new_path_dirname = _path.join(path_dirname, path_basename);
            Deno.createSync(new_path_dirname);

            if(this.os == "windows"){
                try{
                    await this.hiddenFolder(new_path_dirname);
                }catch(err){
                    reject(err);
                }
            }

            resolve({ path : new_path_dirname});
        });
    }

    public async hiddenExistsFolderOrFile(path: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            let path_dirname = _path.dirname(path);
            let path_basename = _path.basename(path);

            if(path_basename.charAt(0) != "."){
                path_basename = "." + path_basename;
            }

            let new_path_dirname = _path.join(path_dirname, path_basename);
            await Deno.renameSync(path, new_path_dirname);
            if(this.os == "windows"){
                try{
                    await this.hiddenFolder(new_path_dirname);
                }catch(err){
                    reject(err);
                }
            }

            resolve({ path : new_path_dirname});
        });
    }

    private async hiddenFolder(path: string): Promise<any>{
        return new Promise(async (resolve, reject) => {
            if(this.os == "windows"){
                var proc = Deno.run({
                    cmd: ["attrib", "+s", "+h", path],
                    stdin: 'piped',
                    stdout: 'piped',
                    stderr: 'piped',
                });
                
                var rawErrOutput = await proc.stderrOutput();

                var decodedErrOutput = new TextDecoder("utf-8").decode(rawErrOutput);
                if(decodedErrOutput){
                    reject(decodedErrOutput);
                    return;
                }

                resolve();
            }else{

            }
        });
    }
}

export default HideFile;