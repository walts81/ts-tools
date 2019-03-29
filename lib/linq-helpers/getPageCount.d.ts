declare global {
    interface Array<T> {
        getPageCount(pageSize: number): number;
    }
}
export default function getPageCount(total: number, pageSize: number): number;
