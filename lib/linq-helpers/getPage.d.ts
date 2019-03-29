declare global {
    interface Array<T> {
        getPage(page: number, pageSize: number): T[];
    }
}
export default function getPage<T>(collection: T[], page: number, pageSize: number): T[];
