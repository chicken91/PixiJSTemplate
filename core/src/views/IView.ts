
export interface IView {

    onAdded(): void;

    onRemoved(): void;

    onResize(width?: number, height?: number): void;
}