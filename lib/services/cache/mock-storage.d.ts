import { IStorage } from './storage-service';
export declare class MockStorage implements IStorage {
    private map;
    getItem(key: string): string;
    setItem(key: string, value: string): void;
    clear(): void;
    removeItem(key: string): void;
    getKeys(): string[];
}
