/// <reference types="jquery" />

/**
 * Allows jQuery Promises to interop with non-jQuery promises
 */
interface JQueryGenericPromise<T> {
    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     *
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when the Deferred is notified on progress.
     * @see {@link https://api.jquery.com/deferred.then/#deferred-then-doneFilter-failFilter-progressFilter}
     */
    then<U>(
        doneFilter: (value: T, ...values: any[]) => U | JQueryPromise<U>,
        failFilter?: (...reasons: any[]) => any,
        progressFilter?: (...progression: any[]) => any,
    ): JQueryPromise<U>;

    /**
     * Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.
     *
     * @param doneFilter A function that is called when the Deferred is resolved.
     * @param failFilter An optional function that is called when the Deferred is rejected.
     * @param progressFilter An optional function that is called when the Deferred is notified on progress.
     * @see {@link https://api.jquery.com/deferred.then/#deferred-then-doneFilter-failFilter-progressFilter}
     */
    then(
        doneFilter: (value: T, ...values: any[]) => void,
        failFilter?: (...reasons: any[]) => any,
        progressFilter?: (...progression: any[]) => any,
    ): JQueryPromise<void>;
}

/**
 * Interface for the JQuery promise/deferred callbacks
 */
interface JQueryPromiseCallback<T> {
    (value: T, ...args: any[]): void;
}

/**
 * Interface for the JQuery promise, part of callbacks
 * @see {@link https://api.jquery.com/category/deferred-object/}
 */
export interface JQueryPromise<T> extends JQueryGenericPromise<T> {
    /**
     * Determine the current state of a Deferred object.
     * @see {@link https://api.jquery.com/deferred.state/}
     */
    state(): string;
    /**
     * Add handlers to be called when the Deferred object is either resolved or rejected.
     *
     * @param alwaysCallback1 A function, or array of functions, that is called when the Deferred is resolved or rejected.
     * @param alwaysCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.
     * @see {@link https://api.jquery.com/deferred.always/}
     */
    always(
        alwaysCallback1?: JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[],
        ...alwaysCallbackN: Array<JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]>
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object is resolved.
     *
     * @param doneCallback1 A function, or array of functions, that are called when the Deferred is resolved.
     * @param doneCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.
     * @see {@link https://api.jquery.com/deferred.done/}
     */
    done(
        doneCallback1?: JQueryPromiseCallback<T> | JQueryPromiseCallback<T>[],
        ...doneCallbackN: Array<JQueryPromiseCallback<T> | JQueryPromiseCallback<T>[]>
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object is rejected.
     *
     * @param failCallback1 A function, or array of functions, that are called when the Deferred is rejected.
     * @param failCallbackN Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.
     * @see {@link https://api.jquery.com/deferred.fail/}
     */
    fail(
        failCallback1?: JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[],
        ...failCallbackN: Array<JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]>
    ): JQueryPromise<T>;
    /**
     * Add handlers to be called when the Deferred object generates progress notifications.
     *
     * @param progressCallback1 A function, or array of functions, to be called when the Deferred generates progress notifications.
     * @param progressCallbackN Optional additional functions, or arrays of functions, to be called when the Deferred generates progress notifications.
     * @see {@link https://api.jquery.com/deferred.progress/}
     */
    progress(
        progressCallback1?: JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[],
        ...progressCallbackN: Array<JQueryPromiseCallback<any> | JQueryPromiseCallback<any>[]>
    ): JQueryPromise<T>;

    // Deprecated - given no typings
    pipe(
        doneFilter?: (x: any) => any,
        failFilter?: (x: any) => any,
        progressFilter?: (x: any) => any,
    ): JQueryPromise<any>;

    /**
     * Return a Deferred's Promise object.
     *
     * @param target Object onto which the promise methods have to be attached
     * @see {@link https://api.jquery.com/deferred.promise/}
     */
    promise(target?: any): JQueryPromise<T>;

    resolve(value?: T): void;

    reject(reason?: any): void;
}

export interface JQueryCallbacks<T> {
    add(callback: (value: T) => void): JQueryCallbacks<T>;
    remove(callback: (value: T) => void): JQueryCallbacks<T>;
}

/**
 * @see https://uploadcare.com/docs/api_reference/javascript/files_uploads/#file-info
 */
export interface FileInfo {
    uuid: string;
    name: string;
    size: number;
    mimeType: string;
    isStored: boolean;
    isImage: boolean;
    cdnUrl: string;
    cdnUrlModifiers: string | null;
    originalUrl: string;
    originalImageInfo: null | {
        width: number;
        height: number;
        format: string;
        dpi: number | null;
    };
}

/**
 * @see https://uploadcare.com/docs/file_uploader_api/files_uploads/#upload-info
 */
export interface UploadInfo {
    /**
     * File ready state combines the progress of both upload and preparing info,
     * as a value ranging from 0 to 1.
     */
    progress: number;
    state: 'uploading' | 'uploaded' | 'ready';
    /**
     * Upload progress as a value ranging from 0 to 1.
     */
    uploadProgress: number;
}

export interface FilePromise extends JQueryPromise<FileInfo> {}

export interface FileGroup {
    files: () => FilePromise[];
}

export interface CollectionOfPromises {
    add: (item: FilePromise) => void;
    clear: () => void;
    get(): FilePromise[];
    get(index: number): FilePromise;
    replace: (original: FilePromise, replacement: FilePromise) => void;
    onAdd: JQueryCallbacks<FilePromise>;
    onAnyProgress: (file: FilePromise, progress: number) => void;
    onAnyFail: (file: FilePromise) => void;
    onAnyDone: (file: FilePromise) => void;
    onRemove: JQueryCallbacks<FilePromise>;
    onReplace: JQueryCallbacks<FilePromise>;
    onSort: JQueryCallbacks<FilePromise>;
    remove: (item: FilePromise) => void;
    sort(comparator: (a: FilePromise, b: FilePromise) => number): CollectionOfPromises;
}

interface CropSettings {
    downscale: boolean;
    upscale: boolean;
    notLess: boolean;
    preferedSize: [number, number];
}

/**
 * This interface typing is incomplete
 */
export interface Settings {
    captions: boolean;
    clearable: boolean;
    crop: CropSettings[];
    imagesOnly: boolean;
    multiple: boolean;
}

export interface CropWidget {
    new (
        imageElement: JQuery,
        dimensions: [number, number],
        cropSettings: CropSettings,
    ): CropWidget;
    __api: {
        destroy(): void;
    };
    applySelectionToFile(filePromise: FilePromise): FilePromise;
    setSelectionFromModifiers(cdnUrlModifiers: FileInfo['cdnUrlModifiers']): void;
}

export interface DialogOptions {
    audioBitsPerSecond?: number;
    cdnBase?: string;
    crop?: 'disabled' | 'free' | string;
    doNotStore?: boolean;
    imageShrink?: string;
    imagesOnly?: boolean;
    inputAcceptTypes?: string;
    multipartMinSize?: number;
    multiple?: boolean;
    multipleMax?: number;
    multipleMin?: number;
    preferredTypes?: string;
    previewProxy?: string;
    previewStep?: boolean;
    previewUrlCallback?: (originalUrl: string, fileInfo: FileInfo) => string;
    publicKey?: string;
    secureExpire?: number;
    secureSignature?: string;
    tabs?: string[];
    validators?: ((fileInfo: FileInfo) => void)[];
    videoBitsPerSecond?: number;
}

export interface Dialog<T = FilePromise | FilePromise[]> extends JQueryPromise<T> {
    fileColl: CollectionOfPromises;
    addFiles(files: FilePromise[]): void;
    switchTab(tab: string): void;
    hideTab(tab: string): void;
    showTab(tab: string): void;
    isTabVisible(tab: string): boolean;
    onTabVisibility(tab: string, callback: (tab: string, visibility: boolean) => void): boolean;
}

export interface Uploadcare {
    fileFrom(source: 'uploaded', cdnUrl: string): FilePromise;
    fileFrom(source: 'uploaded', uuid: string): FilePromise;
    fileFrom(source: 'url', fileUrl: string): FilePromise;
    fileFrom(source: 'object', nativeFile: File): FilePromise;
    fileFrom(source: 'input', inputIdentifier: string): FilePromise;

    openDialog<T = FilePromise | FilePromise[]>(
        files: T | null,
        tab?: string,
        options?: DialogOptions,
    ): Dialog<T>;
    openDialog<T = FilePromise | FilePromise[]>(
        files: T | null,
        options?: DialogOptions,
    ): Dialog<T>;

    plugin(callback: (pluginApi: UploadcarePluginApi) => void): void;

    registerTab<T = FilePromise | FilePromise[]>(
        tabId: string,
        callback: (
            container: JQuery,
            button: JQuery,
            dialogApi: Dialog<T>,
            settings: Settings,
            name: string,
        ) => void,
    ): void;

    tabsCss: {
        addStyle(stylesheet: string): void;
    };
}

export interface UploadcarePluginApi {
    crop: {
        CropWidget: CropWidget;
    };

    openPreviewDialog<T = FilePromise>(file: T | null, settings?: Settings): Dialog<T>;
}

declare const uploadcare: Uploadcare;

export default uploadcare;
