import sharp from 'sharp';
import {readdir,stat,readFile,writeFile} from 'node:fs/promises';
const root='public/images';let before=0,after=0;
for(const f of await readdir(root)){if(!f.endsWith('.png'))continue;const input=`${root}/${f}`,output=input.replace(/\.png$/,'.webp');before+=(await stat(input)).size;await sharp(input).webp({quality:88,effort:5}).toFile(output);after+=(await stat(output)).size;}
for(const file of ['app/page.tsx','app/globals.css','app/layout.tsx']){const s=await readFile(file,'utf8');await writeFile(file,s.replaceAll('.png','.webp'));}
console.log(`Imagens: ${(before/1048576).toFixed(1)} MB → ${(after/1048576).toFixed(1)} MB`);
