export interface IStorage {
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    clear(): void;
    removeItem(key: string): void;
}
export declare class StorageService {
    private innerStorage;
    constructor(innerStorage: IStorage);
    getItem<T>(key: string): T;
    setItem<T>(key: string, value: T): void;
    clear(): void;
    removeItem(key: string): void;
}
