import type { FilePromise } from '@prezly/uploadcare-widget';
import uploadcare from '@prezly/uploadcare-widget';

const file: FilePromise | null = null;

console.log(file);

uploadcare.openDialog([], 'googlephotos', {
    multiple: true,
})
